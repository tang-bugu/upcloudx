# EmptyState 空状态

统一的空状态占位组件，不依赖 ant-design-vue，支持完全自定义。

## 不同类型

<script setup>
import { EmptyState } from '../../src/index.ts';
</script>

<div style="display:flex;gap:24px;">
  <div style="flex:1;border:1px solid #eee;border-radius:8px;">
    <EmptyState />
  </div>
  <div style="flex:1;border:1px solid #eee;border-radius:8px;">
    <EmptyState type="search" />
  </div>
  <div style="flex:1;border:1px solid #eee;border-radius:8px;">
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

```vue
<EmptyState>
  <template #image>
    <img src="/custom-empty.svg" width="64" />
  </template>
</EmptyState>
```

## 带操作按钮

```vue
<EmptyState type="error">
  <a-button type="primary" @click="reload">重新加载</a-button>
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
