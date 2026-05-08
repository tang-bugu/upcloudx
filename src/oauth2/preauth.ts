import type { PreAuthConfig, PreAuthInstance, PreAuthTokenResponse } from './types';

const REDIRECT_KEY = 'redirect_after_login';
const STATE_KEY = 'oauth2_state';
const STATE_TIME_KEY = 'oauth2_state_time';

export function createPreAuth(config: PreAuthConfig): PreAuthInstance {
  const TOKEN_KEY = config.tokenKey ?? 'oauth2_access_token';

  function escapeRegExp(str: string): string {
    return str.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);
  }

  function getCookieValue(name: string): string {
    const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${escapeRegExp(name)}=([^;]*)`));
    return match ? decodeURIComponent(match[1] ?? '') : '';
  }

  function saveToken(token: string): void {
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
      console.warn('localStorage 保存失败:', error);
    }
    try {
      const tokenExpiry = new Date();
      tokenExpiry.setDate(tokenExpiry.getDate() + 7);
      const isHttps = location.protocol === 'https:';
      const cookieParts = [
        `${TOKEN_KEY}=${encodeURIComponent(token)}`,
        `expires=${tokenExpiry.toUTCString()}`,
        `path=/`,
        `SameSite=Lax`,
      ];
      if (isHttps) cookieParts.push('Secure');
      document.cookie = cookieParts.join('; ');
    } catch (error) {
      console.warn('Cookie 保存失败:', error);
    }
  }

  function hasStoredToken(): boolean {
    try {
      if (localStorage.getItem(TOKEN_KEY)) return true;
    } catch { /* localStorage 不可用 */ }
    return !!getCookieValue(TOKEN_KEY);
  }

  function generateState(): string {
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      const array = new Uint8Array(16);
      crypto.getRandomValues(array);
      return Array.from(array, (b) => b.toString(16).padStart(2, '0')).join('');
    }
    return Math.random().toString(36).slice(2, 15) + Math.random().toString(36).slice(2, 15);
  }

  async function exchangeToken(code: string): Promise<PreAuthTokenResponse> {
    const response = await fetch(`${config.apiUrl}/oauth2/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: config.clientId,
        code,
        grant_type: 'authorization_code',
        redirect_uri: config.redirectUri,
      }),
    });
    if (!response.ok) throw new Error(`Token 交换失败: HTTP ${response.status}`);
    return response.json() as Promise<PreAuthTokenResponse>;
  }

  function cleanupUrl(): void {
    const savedPath = localStorage.getItem(REDIRECT_KEY) || '/';
    localStorage.removeItem(REDIRECT_KEY);
    window.history.replaceState({}, '', savedPath);
  }

  function saveRedirectPath(): void {
    const fullPath = window.location.pathname + window.location.search + window.location.hash;
    try { localStorage.setItem(REDIRECT_KEY, fullPath); } catch (error) {
      console.warn('保存重定向路径失败:', error);
    }
  }

  function redirectToAuth(): void {
    const state = generateState();
    try {
      localStorage.setItem(STATE_KEY, state);
      localStorage.setItem(STATE_TIME_KEY, Date.now().toString());
    } catch (error) {
      console.warn('保存 OAuth2 state 失败:', error);
    }
    window.location.href = `${config.authorizeUrl}?client_id=${config.clientId}&redirect_uri=${encodeURIComponent(config.redirectUri)}&response_type=code&state=${state}`;
  }

  function updateLoadingStatus(text: string): void {
    const el = document.querySelector<HTMLElement>('.preauth-status');
    if (el) el.textContent = text;
  }

  function showError(message: string): void {
    const errorEl = document.querySelector<HTMLElement>('.preauth-error');
    if (errorEl) { errorEl.textContent = message; errorEl.style.display = 'block'; }
    const spinnerEl = document.querySelector<HTMLElement>('.preauth-spinner');
    if (spinnerEl) spinnerEl.style.display = 'none';
  }

  function showRetryButton(): void {
    const retryEl = document.querySelector<HTMLElement>('.preauth-retry');
    if (retryEl) {
      retryEl.style.display = 'inline-block';
      retryEl.addEventListener('click', () => redirectToAuth());
    }
  }

  function unmountLoading(): void {
    document.querySelector<HTMLElement>('#__preauth-loading__')?.remove();
  }

  function isOAuth2Callback(): boolean {
    return window.location.pathname === '/oauth2/callback';
  }

  async function preAuth(): Promise<boolean> {
    try {
      if (isOAuth2Callback()) {
        const url = new URL(window.location.href);
        const code = url.searchParams.get('code');
        const state = url.searchParams.get('state');

        if (!code) {
          updateLoadingStatus('缺少授权码，即将重新认证...');
          setTimeout(() => redirectToAuth(), 3000);
          return false;
        }

        const savedState = localStorage.getItem(STATE_KEY);
        if (savedState && savedState !== state) {
          console.warn('OAuth2 state 不匹配，但继续处理');
        }

        const tokenData = await exchangeToken(code);
        if (tokenData.code !== 0) throw new Error(tokenData.msg || 'Token 交换失败');

        saveToken(tokenData.data.access_token);
        cleanupUrl();
        return true;
      }

      if (hasStoredToken()) return true;

      saveRedirectPath();
      redirectToAuth();
      return false;
    } catch (error) {
      showError(error instanceof Error ? error.message : '认证失败');
      showRetryButton();
      return false;
    }
  }

  return { hasStoredToken, isOAuth2Callback, preAuth, showError, showRetryButton, unmountLoading, updateLoadingStatus };
}
