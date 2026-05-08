# EmptyState 空状态

统一的空状态占位组件。

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

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| type | `'default' \| 'search' \| 'error'` | `'default'` | 空状态类型 |
| description | `string` | — | 自定义描述 |

## Slots

| 插槽 | 说明 |
|------|------|
| action | 操作按钮区域 |
