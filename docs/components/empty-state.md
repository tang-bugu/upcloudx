# EmptyState 空状态

统一的空状态占位组件，支持完全自定义。

## 不同类型

<script setup>
import { EmptyState } from '../../src/index.ts';
</script>

<div style="display:flex;gap:24px;">
  <div style="flex:1;border:1px solid var(--upx-border,#eee);border-radius:8px;">
    <EmptyState />
  </div>
  <div style="flex:1;border:1px solid var(--upx-border,#eee);border-radius:8px;">
    <EmptyState type="search" />
  </div>
  <div style="flex:1;border:1px solid var(--upx-border,#eee);border-radius:8px;">
    <EmptyState type="error" />
  </div>
</div>

```vue
<EmptyState />
<EmptyState type="search" />
<EmptyState type="error" />
```

## 自定义描述

<EmptyState description="这里什么都没有~" />

```vue
<EmptyState description="这里什么都没有~" />
```

## 自定义图标

<EmptyState>
  <template #image>
    <svg width="64" height="48" viewBox="0 0 64 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="24" r="20" stroke="currentColor" stroke-width="1.5" opacity="0.3"/>
      <path d="M24 24L30 30L40 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.5"/>
    </svg>
  </template>
</EmptyState>

```vue
<EmptyState>
  <template #image>
    <svg><!-- 自定义 SVG --></svg>
  </template>
</EmptyState>
```

## 带操作按钮

<EmptyState type="error">
  <button style="padding:4px 12px;background:var(--upx-primary,#1664ff);color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:13px">重新加载</button>
</EmptyState>

```vue
<EmptyState type="error">
  <Button type="primary" @click="reload">重新加载</Button>
</EmptyState>
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| type | `'default' \| 'search' \| 'error'` | `'default'` | 空状态类型 |
| description | `string` | — | 自定义描述文案 |

## Slots

| 插槽 | 说明 |
|------|------|
| image | 自定义图标区域 |
| description | 自定义描述内容 |
| default | 操作按钮区域 |
