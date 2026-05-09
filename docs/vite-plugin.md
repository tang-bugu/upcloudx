# Vite 插件

`@upcloudx/ui/vite` 导出 Vite 构建插件，用于在 HTML 中注入预认证 Loading 界面。

## 安装

```bash
pnpm add @upcloudx/ui
```

## vitePreauthLoadingPlugin

在 `index.html` 的 `<body>` 开头注入预认证 Loading Screen，确保在 JS 加载前就显示认证等待界面。

### 使用方式

```ts
// vite.config.ts
import { vitePreauthLoadingPlugin } from '@upcloudx/ui/vite';

export default defineConfig({
  plugins: [
    vitePreauthLoadingPlugin(),
  ],
});
```

### 工作原理

1. 构建时将一段纯 HTML/CSS 注入到 `index.html` 的 `<body>` 开头
2. 浏览器加载页面时立即渲染 Loading 界面（无需等待 JS）
3. `createPreAuth` 运行时通过 DOM 选择器与 Loading 界面交互（更新状态文字、显示错误、显示重试按钮）
4. SPA 启动完成后调用 `unmountLoading()` 移除 Loading 界面

### 配合 createPreAuth 使用

```ts
// main.ts
import { createPreAuth } from '@upcloudx/ui';

const { preAuth, unmountLoading, hasStoredToken, isOAuth2Callback } =
  createPreAuth({
    clientId: import.meta.env.VITE_OAUTH2_CLIENT_ID,
    authorizeUrl: import.meta.env.VITE_OAUTH2_AUTHORIZE_URL,
    redirectUri: import.meta.env.VITE_OAUTH2_REDIRECT_URI,
    apiUrl: import.meta.env.VITE_API_URL,
    tokenKey: 'access_token',
  });

// preAuth() 会自动与注入的 Loading 界面交互
const canProceed = await preAuth();
if (canProceed) {
  await initApplication(unmountLoading);
}
```

### Loading 界面 DOM 结构

插件注入的 HTML 包含以下可交互元素（`createPreAuth` 内部使用）：

| 选择器 | 说明 |
|--------|------|
| `#__preauth-loading__` | 根容器，`unmountLoading()` 移除此元素 |
| `.preauth-status` | 状态文字（"正在验证身份..."） |
| `.preauth-spinner` | 加载动画 |
| `.preauth-error` | 错误信息容器（默认隐藏） |
| `.preauth-retry` | 重试按钮（默认隐藏） |
