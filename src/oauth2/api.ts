import type { CheckAuthResponse, TokenData, UserInfoData } from './types';

export function createOAuth2Api(requestClient: any) {
  async function checkAuthStatus(params: {
    client_id: string;
    redirect_uri: string;
    response_type?: string;
    scope?: string;
    state?: string;
  }): Promise<CheckAuthResponse> {
    return requestClient.get('/oauth2/check-auth', {
      params: {
        ...params,
        response_type: params.response_type || 'code',
        scope: params.scope || 'read',
        state: params.state || '',
      },
    }) as Promise<CheckAuthResponse>;
  }

  async function exchangeOAuth2Token(data: {
    client_id: string;
    code: string;
    grant_type: string;
    redirect_uri: string;
  }): Promise<TokenData> {
    return requestClient.post('/oauth2/token', data) as Promise<TokenData>;
  }

  async function getUserInfo(token?: string): Promise<UserInfoData> {
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    const response = (await requestClient.get('/oauth2/userinfo', config)) as UserInfoData;
    return {
      ...response,
      avatar: response.avatar,
      deptId: response.deptId || response.dept_id,
      deptName: response.dept_name,
      nickName: response.nickName || response.nick_name,
      phone: response.phone || response.phonenumber,
      roles: response.roles || [],
      userId: response.userId || response.user_id,
    };
  }

  async function oauth2Logout(token?: string): Promise<string> {
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    return requestClient.post('/oauth2/logout', {}, config) as Promise<string>;
  }

  return { checkAuthStatus, exchangeOAuth2Token, getUserInfo, oauth2Logout };
}

export type OAuth2Api = ReturnType<typeof createOAuth2Api>;
