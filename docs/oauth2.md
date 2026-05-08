# OAuth2

OAuth2 授权码流程的通用实现，无框架依赖（不依赖 pinia、vue-router）。

## 安装

```bash
pnpm add @upcloudx/ui
```

## 模块组成

| 导出 | 说明 |
|------|------|
| `createOAuth2Manager` | 核心流程管理器（换取 token、获取用户信息、登出） |
| `createPreAuth` | SPA 启动前的轻量认证（无 Vue 依赖，纯原生 JS） |
| `OAuth2Callback` | 回调页面 Vue 组件 |
| `createTokenManager` | token 存储工具（localStorage + Cookie 双写） |
| `createOAuth2Api` | OAuth2 API 工厂函数 |

---

## createOAuth2Manager

### 基础用法

```ts
import { createOAuth2Manager } from '@upcloudx/ui';

const oauth2 = createOAuth2Manager({
  // OAuth2 配置
  getOAuth2Config: () => ({
    authorizeUrl: 'https://auth.example.com/oauth2/authorize',
    clientId: 'my-client-id',
    redirectUri: 'https://app.example.com/oauth2/callback',
  }),
  // 请求客户端（axios 实例等）
  getRequestClient: () => requestClient,
  // token 存储 key（可选，默认 'oauth2_access_token'）
  tokenKey: 'my_app_token',
  // 路由跳转（可选，不传则使用 window.location.href）
  onRedirect: (path) => router.replace(path),
  // 用户信息回调（替代 useUserStore().setUserInfo）
  onUserInfoFetched: (userInfo) => {
    userStore.setUserInfo(userInfo);
  },
  // 登出回调（替代 resetAllStores）
  onLogout: () => {
    userStore.$reset();
    accessStore.$reset();
  },
});
```

### 在 main.ts 中初始化

```ts
// main.ts
import { createOAuth2Manager } from '@upcloudx/ui';

export const oauth2 = createOAuth2Manager({ ... });

// 检查 token，无 token 则跳转授权页
if (!oauth2.getAccessToken()) {
  oauth2.smartOAuth2Flow();
}
```

### 在路由守卫中使用

```ts
router.beforeEach(async (to) => {
  const token = oauth2.getAccessToken();
  if (!token && to.path !== '/oauth2/callback') {
    oauth2.startOAuth2Flow();
    return false;
  }
});
```

### API

| 方法 | 说明 |
|------|------|
| `getAccessToken()` | 获取当前 token |
| `setAccessToken(token, expiresIn?)` | 设置 token |
| `smartOAuth2Flow()` | 智能授权流程（先检查状态，已授权则直接换 token） |
| `startOAuth2Flow()` | 跳转到授权页面 |
| `handleOAuth2Callback(code, state)` | 处理回调，换取 token 并获取用户信息 |
| `fetchUserInfo(token?)` | 获取用户信息 |
| `logout(redirect?, skipApi?)` | 登出 |
| `authSSOLogin({ token })` | SSO 直接登录 |

### 配置项

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| getOAuth2Config | `() => OAuth2Config` | — | 返回 OAuth2 配置 |
| getRequestClient | `() => any` | — | 返回请求客户端 |
| onUserInfoFetched | `(userInfo) => void` | — | 用户信息获取成功回调 |
| onLogout | `() => void` | — | 登出后回调 |
| tokenKey | `string` | `'oauth2_access_token'` | token 存储 key |
| onRedirect | `(path: string) => void` | `window.location.href` | 路由跳转回调 |
| onLoginExpired | `() => void` | — | 登录过期回调 |
| onAfterLogout | `() => Promise<void>` | — | 额外登出清理 |
| defaultHomePath | `string` | `'/'` | 默认首页路径 |

---

## createPreAuth

在 Vue SPA 挂载前运行，处理 OAuth2 回调换取 token，无 Vue/Pinia/Router 依赖。

```ts
// main.ts（在 createApp 之前）
import { createPreAuth } from '@upcloudx/ui';

const preAuth = createPreAuth({
  apiUrl: 'https://api.example.com',
  authorizeUrl: 'https://auth.example.com/oauth2/authorize',
  clientId: 'my-client-id',
  redirectUri: 'https://app.example.com/oauth2/callback',
  tokenKey: 'my_app_token', // 可选
});

const ok = await preAuth.preAuth();
if (ok) {
  createApp(App).mount('#app');
}
```

### 流程说明

```
访问任意页面
  ├─ 是回调页（/oauth2/callback）→ 换取 token → 跳回原页面 → 挂载 App
  ├─ 有 token → 直接挂载 App
  └─ 无 token → 保存当前路径 → 跳转授权页
```

---

## OAuth2Callback 组件

回调页面组件，处理授权码换取 token 的 UI 展示。

```ts
// router.ts
import { OAuth2Callback } from '@upcloudx/ui';
import { oauth2 } from './main';

const routes = [
  {
    path: '/oauth2/callback',
    component: OAuth2Callback,
    props: { authStore: oauth2 },
  },
];
```

组件会自动从 `window.location` 读取 `code` 和 `state` 参数，无需 vue-router。

---

## NormalizedUserInfo

`onUserInfoFetched` 回调接收的标准化用户信息格式：

```ts
interface NormalizedUserInfo {
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
  [key: string]: any; // 原始字段透传
}
```
