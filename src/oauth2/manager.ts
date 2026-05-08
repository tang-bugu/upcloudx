import { ref } from 'vue';

import { notification } from 'ant-design-vue';

import { createOAuth2Api } from './api';
import { createTokenManager, generateState } from './token';
import type { NormalizedUserInfo, OAuth2StoreOptions } from './types';

export function createOAuth2Manager(options: OAuth2StoreOptions) {
  const {
    defaultHomePath = '/',
    getOAuth2Config,
    getRequestClient,
    onRedirect,
    tokenKey,
    onUserInfoFetched,
    onLogout,
    onLoginExpired,
    onAfterLogout,
  } = options;

  const { getStoredToken, saveToken, clearToken } = createTokenManager(tokenKey);

  const accessToken = ref<string>(getStoredToken());
  let _isExchangingToken = false;
  let _api: null | ReturnType<typeof createOAuth2Api> = null;

  function getApi() {
    if (!_api) _api = createOAuth2Api(getRequestClient());
    return _api;
  }

  async function checkOAuth2AuthStatus(): Promise<null | string> {
    try {
      const config = getOAuth2Config();
      const state = generateState();
      const response = await getApi().checkAuthStatus({
        client_id: config.clientId,
        redirect_uri: config.redirectUri,
        response_type: 'code',
        scope: 'read',
        state,
      });
      return response.status === 'authorized' ? (response.redirect_url || null) : null;
    } catch (error) {
      console.error('检查授权状态失败:', error);
      return null;
    }
  }

  function startOAuth2Flow() {
    const config = getOAuth2Config();
    const state = generateState();
    const params = new URLSearchParams({
      client_id: config.clientId,
      redirect_uri: config.redirectUri,
      response_type: 'code',
      scope: 'read',
      state,
    });
    localStorage.setItem('oauth2_state', state);
    localStorage.setItem('oauth2_state_time', Date.now().toString());
    setTimeout(() => { window.location.href = `${config.authorizeUrl}?${params.toString()}`; }, 100);
  }

  async function smartOAuth2Flow() {
    const redirectUrl = await checkOAuth2AuthStatus();
    if (redirectUrl) {
      try {
        const url = new URL(redirectUrl);
        const code = url.searchParams.get('code');
        const state = url.searchParams.get('state');
        if (code) { await handleOAuth2Callback(code, state || ''); return; }
      } catch (error) {
        console.error('解析redirect_url失败:', error);
      }
    }
    startOAuth2Flow();
  }

  async function handleOAuth2Callback(code: string, state: string) {
    if (_isExchangingToken) { console.warn('Token 交换已在进行中'); return; }
    _isExchangingToken = true;
    try {
      const savedState = localStorage.getItem('oauth2_state');
      if (savedState && savedState !== state) console.warn('State不匹配，但继续处理');
      localStorage.removeItem('oauth2_state');
      localStorage.removeItem('oauth2_state_time');

      const config = getOAuth2Config();
      const tokenData = await getApi().exchangeOAuth2Token({
        client_id: config.clientId,
        code,
        grant_type: 'authorization_code',
        redirect_uri: config.redirectUri,
      });

      if (tokenData?.access_token) {
        setAccessToken(tokenData.access_token, tokenData.expires_in);
        if (tokenData.refresh_token) localStorage.setItem('refresh_token', tokenData.refresh_token);
        await fetchUserInfo(tokenData.access_token);
        const redirect = localStorage.getItem('redirect_after_login') || '/';
        localStorage.removeItem('redirect_after_login');
        if (onRedirect) onRedirect(redirect);
        else window.location.href = redirect;
      } else {
        throw new Error('获取访问令牌失败：响应数据格式不正确');
      }
    } catch (error: any) {
      console.error('OAuth2回调处理失败:', error);
      notification.error({ description: error.message || '认证过程出现错误', duration: 5, message: '登录失败' });
      localStorage.removeItem('oauth2_state');
      localStorage.removeItem('oauth2_state_time');
      setTimeout(() => startOAuth2Flow(), 2000);
    } finally {
      _isExchangingToken = false;
    }
  }

  async function fetchUserInfo(token?: string): Promise<NormalizedUserInfo> {
    const apiUserInfo = await getApi().getUserInfo(token);
    if (!apiUserInfo || !apiUserInfo.userId) {
      clearToken();
      accessToken.value = '';
      const error: any = new Error('令牌已过期或无效');
      error.code = 401;
      throw error;
    }
    const userInfo: NormalizedUserInfo = {
      ...apiUserInfo,
      avatar: apiUserInfo.avatar || '',
      deptId: apiUserInfo.deptId || apiUserInfo.dept_id,
      deptName: apiUserInfo.deptName || apiUserInfo.dept_name,
      homePath: apiUserInfo.homePath || defaultHomePath,
      realName: apiUserInfo.nickName || apiUserInfo.nick_name || apiUserInfo.username || '',
      roles: apiUserInfo.roles?.map((r: any) => r.roleKey || r.roleName || r) || [],
      token: token || '',
      userId: String(apiUserInfo.userId || apiUserInfo.user_id || ''),
      username: apiUserInfo.username || '',
    };
    onUserInfoFetched(userInfo);
    return userInfo;
  }

  async function logout(redirect: boolean = true, skipLogoutApi: boolean = false) {
    const currentToken = accessToken.value;
    try {
      if (currentToken && !skipLogoutApi) {
        try { await getApi().oauth2Logout(currentToken); } catch (error: any) {
          console.error('后端登出失败:', error);
        }
      }
    } finally {
      accessToken.value = '';
      clearToken();
      if (onAfterLogout) await onAfterLogout();
      onLoginExpired?.();
      onLogout();
      if (redirect) setTimeout(() => startOAuth2Flow(), 200);
    }
  }

  async function authSSOLogin({ token }: { token: string }) {
    setAccessToken(token);
    await fetchUserInfo(token);
  }

  function getAccessToken(): string {
    if (!accessToken.value) {
      const stored = getStoredToken();
      if (stored) accessToken.value = stored;
    }
    return accessToken.value;
  }

  function setAccessToken(token: string, expiresIn?: number): void {
    accessToken.value = token;
    if (token) saveToken(token, expiresIn);
    else clearToken();
  }

  return {
    accessToken,
    authSSOLogin,
    checkOAuth2AuthStatus,
    clearToken,
    fetchUserInfo,
    getAccessToken,
    handleOAuth2Callback,
    logout,
    setAccessToken,
    smartOAuth2Flow,
    startOAuth2Flow,
  };
}
