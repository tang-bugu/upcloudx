# ActionButtons 操作按钮

表格操作列按钮组，超出自动收纳到下拉菜单。

## 基础用法

<script setup>
import { ActionButtons } from '../../src/index.ts';
const actions = [
  { label: '编辑', onClick: () => {} },
  { label: '配置', onClick: () => {} },
  { label: '删除', onClick: () => {}, danger: true },
];
</script>

<ActionButtons :actions="actions" />

## 超出收纳

<ActionButtons :actions="actions" :max-visible="2" />

```vue
<ActionButtons :actions="actions" :max-visible="2" />
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| actions | `ActionItem[]` | — | 操作配置数组 |
| maxVisible | `number` | — | 最多显示数，超出收纳 |

## ActionItem

| 属性 | 类型 | 说明 |
|------|------|------|
| label | `string` | 按钮文字 |
| onClick | `() => void` | 点击回调 |
| danger | `boolean` | 危险操作（红色） |
| disabled | `boolean \| () => boolean` | 是否禁用 |
| tooltip | `string` | 悬停提示 |
