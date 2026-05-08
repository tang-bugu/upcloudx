# useUtcTime

UTC 时间格式化为本地时间，统一处理后端返回的 UTC 时间字符串。

## 基础用法

```ts
import { useUtcTime } from '@upcloudx/ui';

const { formatUtcTime } = useUtcTime();

formatUtcTime('2024-01-15T10:30:00Z');  // '2024-01-15 18:30:00'（东八区）
formatUtcTime(null);                     // '-'
formatUtcTime(undefined);               // '-'
formatUtcTime('');                       // '-'
```

## 在表格列中使用

```vue
<script setup>
import { useUtcTime } from '@upcloudx/ui';

const { formatUtcTime } = useUtcTime();

const columns = [
  { title: '域名', dataIndex: 'domain', key: 'domain' },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    customRender: ({ text }) => formatUtcTime(text),
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    customRender: ({ text }) => formatUtcTime(text),
  },
];
</script>
```

## 在模板中使用

```vue
<template>
  <a-descriptions-item label="创建时间">
    {{ formatUtcTime(record.createTime) }}
  </a-descriptions-item>
</template>
```

## 返回值

| 方法 | 参数 | 返回 | 说明 |
|------|------|------|------|
| formatUtcTime | `string \| null \| undefined` | `string` | 格式化为 `YYYY-MM-DD HH:mm:ss`，空值返回 `'-'` |
