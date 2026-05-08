# SearchBar 搜索栏

列表页搜索/筛选栏，支持 input、select、date-range、date-picker 四种字段类型。

## 基础用法

<script setup>
import { ref } from 'vue';
import { SearchBar } from '../../src/index.ts';

const fields = [
  { key: 'name', label: '名称', type: 'input', placeholder: '请输入名称', width: 180 },
  {
    key: 'status',
    label: '状态',
    type: 'select',
    placeholder: '请选择状态',
    width: 120,
    options: [
      { label: '启用', value: 1 },
      { label: '停用', value: 0 },
    ],
  },
  { key: 'dateRange', label: '创建时间', type: 'date-range' },
];

const result = ref(null);

function handleSearch(values) {
  result.value = values;
}
function handleReset() {
  result.value = null;
}
</script>

<SearchBar :fields="fields" @search="handleSearch" @reset="handleReset" />

<div v-if="result" style="margin-top:12px;padding:8px 12px;background:var(--vp-c-bg-soft);border-radius:6px;font-size:13px;">
  查询参数：<code>{{ JSON.stringify(result) }}</code>
</div>

```vue
<SearchBar
  :fields="[
    { key: 'name', label: '名称', type: 'input', placeholder: '请输入名称', width: 180 },
    {
      key: 'status',
      label: '状态',
      type: 'select',
      placeholder: '请选择状态',
      width: 120,
      options: [
        { label: '启用', value: 1 },
        { label: '停用', value: 0 },
      ],
    },
    { key: 'dateRange', label: '创建时间', type: 'date-range' },
  ]"
  :loading="loading"
  @search="handleSearch"
  @reset="handleReset"
/>
```

## 所有字段类型

<SearchBar
  :fields="[
    { key: 'keyword', label: '关键词', type: 'input', placeholder: '请输入', width: 160 },
    { key: 'type', label: '类型', type: 'select', width: 120, options: [{ label: '类型A', value: 1 }, { label: '类型B', value: 2 }] },
    { key: 'date', label: '日期', type: 'date-picker', width: 140 },
    { key: 'range', label: '时间范围', type: 'date-range' },
  ]"
  @search="() => {}"
  @reset="() => {}"
/>

```vue
{ key: 'keyword', label: '关键词', type: 'input', width: 160 }
{ key: 'type',    label: '类型',   type: 'select', width: 120, options: [...] }
{ key: 'date',    label: '日期',   type: 'date-picker', width: 140 }
{ key: 'range',   label: '时间范围', type: 'date-range' }
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| fields | `SearchField[]` | — | 搜索字段配置 |
| loading | `boolean` | `false` | 按钮 loading |

## SearchField

| 属性 | 类型 | 说明 |
|------|------|------|
| key | `string` | 字段标识，作为查询参数的 key |
| label | `string` | 标签文字 |
| type | `'input' \| 'select' \| 'date-range' \| 'date-picker'` | 字段类型 |
| placeholder | `string` | 占位文字 |
| width | `number \| string` | 字段宽度（数字为 px） |
| options | `{ label: string; value: any }[]` | select 选项列表 |
| optionsLoading | `boolean` | select 选项加载状态 |

## Events

| 事件 | 参数 | 说明 |
|------|------|------|
| search | `Record<string, any>` | 点击查询，返回所有字段当前值 |
| reset | — | 点击重置，清空所有字段 |
