# SearchBar 搜索栏

列表页搜索/筛选栏。

## 基础用法

<script setup>
import { SearchBar } from '../../src/index.ts';
const fields = [
  { key: 'name', label: '名称', type: 'input', placeholder: '请输入名称' },
  { key: 'status', label: '状态', type: 'select', options: [{ label: '启用', value: 1 }, { label: '停用', value: 0 }] },
];
</script>

<SearchBar :fields="fields" @search="() => {}" @reset="() => {}" />

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| fields | `SearchField[]` | — | 搜索字段配置 |
| loading | `boolean` | `false` | 按钮 loading |

## SearchField

| 属性 | 类型 | 说明 |
|------|------|------|
| key | `string` | 字段标识 |
| label | `string` | 标签文字 |
| type | `'input' \| 'select' \| 'date-range' \| 'date-picker'` | 字段类型 |
| placeholder | `string` | 占位文字 |
| options | `{ label, value }[]` | select 选项 |
| width | `number \| string` | 字段宽度 |

## Events

| 事件 | 参数 | 说明 |
|------|------|------|
| search | `Record<string, any>` | 点击查询 |
| reset | — | 点击重置 |
