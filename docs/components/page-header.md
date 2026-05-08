# PageHeader 页面标题

带返回按钮的页面标题组件，返回按钮可配置显示/隐藏。

## 基础用法

<script setup>
import { PageHeader } from '../../src/index.ts';
</script>

<PageHeader title="域名管理" @back="() => {}" />

```vue
<PageHeader title="域名管理" @back="router.back()" />
```

## 隐藏返回按钮

<PageHeader title="控制面板" :show-back="false" />

```vue
<PageHeader title="控制面板" :show-back="false" />
```

## 带操作按钮

<PageHeader title="域名详情" @back="() => {}">
  <a-button type="primary" style="margin-left: auto;">编辑</a-button>
</PageHeader>

```vue
<PageHeader title="域名详情" @back="router.back()">
  <Button type="primary" style="margin-left: auto;">编辑</Button>
</PageHeader>
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | `string` | — | 页面标题文字 |
| showBack | `boolean` | `true` | 是否显示返回按钮 |

## Events

| 事件 | 说明 |
|------|------|
| back | 点击返回按钮时触发 |
