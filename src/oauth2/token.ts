import { useCookies } from '@vueuse/integrations/useCookies';

const DEFAULT_TOKEN_KEY = 'oauth2_access_token';

export function createTokenManager(tokenKey: string = DEFAULT_TOKEN_KEY) {
  const cookies = useCookies();

  function getStoredToken(): string {
    try {
      return localStorage.getItem(tokenKey) || cookies.get(tokenKey) || '';
    } catch {
      return cookies.get(tokenKey) || '';
    }
  }

  function saveToken(token: string, expiresIn?: number) {
    const tokenExpiry = new Date();
    tokenExpiry.setSeconds(tokenExpiry.getSeconds() + (expiresIn ?? 7 * 24 * 3600));
    try {
      localStorage.setItem(tokenKey, token);
    } catch (error) {
      console.warn('localStorage 保存失败:', error);
    }
    try {
      const isHttps = location.protocol === 'https:';
      cookies.set(tokenKey, token, {
        expires: tokenExpiry,
        httpOnly: false,
        path: '/',
        sameSite: 'lax',
        secure: isHttps,
      });
    } catch (error) {
      console.warn('Cookie 保存失败:', error);
    }
  }

  function clearToken() {
    const keys = [tokenKey, 'refresh_token', 'redirect_after_login', 'oauth2_state', 'oauth2_state_time'];
    try {
      keys.forEach((k) => localStorage.removeItem(k));
    } catch (error) {
      console.warn('localStorage 清除失败:', error);
    }
    try {
      const isHttps = location.protocol === 'https:';
      cookies.remove(tokenKey, { path: '/', sameSite: 'lax', secure: isHttps });
      sessionStorage.clear();
    } catch (error) {
      console.warn('Cookie 清除失败:', error);
    }
  }

  return { getStoredToken, saveToken, clearToken };
}

export function generateState(): string {
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return Array.from(array, (b) => b.toString(16).padStart(2, '0')).join('');
  }
  return Math.random().toString(36).slice(2, 15) + Math.random().toString(36).slice(2, 15);
}
