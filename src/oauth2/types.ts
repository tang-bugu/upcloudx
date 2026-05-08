/** Token 响应数据 */
export interface TokenData {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
}

/** 用户信息响应数据 */
export interface UserInfoData {
  avatar?: string;
  deptId?: number;
  deptName?: string;
  dept_id?: number;
  dept_name?: string;
  email?: string;
  homePath?: string;
  nickName?: string;
  nick_name?: string;
  permissions?: string[];
  phone?: string;
  phonenumber?: string;
  roles?: any[];
  userId?: number;
  user_id?: number;
  username?: string;
  [key: string]: any;
}

/** 检查授权状态响应 */
export interface CheckAuthResponse {
  redirect_url?: string;
  status: 'authorized' | 'need_login';
  [key: string]: any;
}

/** OAuth2 环境配置 */
export interface OAuth2Config {
  authorizeUrl: string;
  clientId: string;
  redirectUri: string;
}

/** OAuth2 Store 配置选项（去除 vben 依赖，改为回调注入） */
export interface OAuth2StoreOptions {
  /** 默认首页路径 */
  defaultHomePath?: string;
  /** 获取 OAuth2 配置 */
  getOAuth2Config: () => OAuth2Config;
  /** 获取请求客户端 */
  getRequestClient: () => any;
  /** 获取 Router 实例 */
  getRouter: () => any;
  /** token 存储 key，默认 'oauth2_access_token' */
  tokenKey?: string;
  /** 用户信息获取成功后的回调（替代 useUserStore().setUserInfo） */
  onUserInfoFetched: (userInfo: NormalizedUserInfo) => void;
  /** 登出后的回调（替代 resetAllStores） */
  onLogout: () => void;
  /** 登录过期状态重置回调（可选，替代 useAccessStore().setLoginExpired） */
  onLoginExpired?: () => void;
  /** 额外的登出清理（如重置 tenant store） */
  onAfterLogout?: () => Promise<void> | void;
}

/** 标准化后的用户信息（框架无关） */
export interface NormalizedUserInfo {
  avatar: string;
  deptId?: number;
  deptName?: string;
  email?: string;
  homePath: string;
  permissions?: string[];
  phone?: string;
  realName: string;
  roles: string[];
  token: string;
  userId: string;
  username: string;
  [key: string]: any;
}

/** PreAuth 配置对象 */
export interface PreAuthConfig {
  apiUrl: string;
  authorizeUrl: string;
  clientId: string;
  redirectUri: string;
  /** token 存储 key，默认 'oauth2_access_token' */
  tokenKey?: string;
}

/** PreAuth Token 交换响应 */
export interface PreAuthTokenResponse {
  code: number;
  data: {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    token_type: string;
  };
  msg: string;
}

/** PreAuth 实例接口 */
export interface PreAuthInstance {
  hasStoredToken(): boolean;
  isOAuth2Callback(): boolean;
  preAuth(): Promise<boolean>;
  showError(message: string): void;
  showRetryButton(): void;
  unmountLoading(): void;
  updateLoadingStatus(text: string): void;
}
