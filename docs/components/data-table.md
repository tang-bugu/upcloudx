# DataTable 数据表格

封装 Ant Design Vue Table，内置分页、空状态。

## 基础用法

<script setup>
import { DataTable, StatusTag, ActionButtons } from '../../src/index.ts';

const columns = [
  { title: '域名', dataIndex: 'domain', key: 'domain' },
  { title: '状态', dataIndex: 'status', key: 'status' },
  { title: '操作', key: 'action', width: 150 },
];
const dataSource = [
  { id: 1, domain: 'example.com', status: 4 },
  { id: 2, domain: 'test.cn', status: 2 },
  { id: 3, domain: 'demo.org', status: 5 },
];
</script>

<DataTable :columns="columns" :data-source="dataSource" :total="3" :page-num="1" :page-size="10">
  <template #bodyCell="{ column, record }">
    <StatusTag v-if="column.key === 'status'" :status="record.status" preset="domain" />
    <ActionButtons v-if="column.key === 'action'" :actions="[{ label: '编辑', onClick: () => {} }, { label: '删除', onClick: () => {}, danger: true }]" />
  </template>
</DataTable>

```vue
<script setup>
import { DataTable, StatusTag, ActionButtons } from '@upcloudx/ui';

const columns = [
  { title: '域名', dataIndex: 'domain', key: 'domain' },
  { title: '状态', dataIndex: 'status', key: 'status' },
  { title: '操作', key: 'action', width: 150 },
];
</script>

<template>
  <DataTable
    :columns="columns"
    :data-source="list"
    :loading="loading"
    :total="total"
    :page-num="pageNum"
    :page-size="pageSize"
    @page-change="({ pageNum, pageSize }) => fetchList(pageNum, pageSize)"
  >
    <template #bodyCell="{ column, record }">
      <StatusTag v-if="column.key === 'status'" :status="record.status" preset="domain" />
      <ActionButtons
        v-if="column.key === 'action'"
        :actions="[
          { label: '编辑', onClick: () => handleEdit(record) },
          { label: '删除', onClick: () => handleDelete(record), danger: true },
        ]"
      />
    </template>
  </DataTable>
</template>
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| columns | `ColumnType[]` | — | 列配置 |
| dataSource | `any[]` | — | 数据源 |
| loading | `boolean` | `false` | 加载状态 |
| total | `number` | `0` | 总条数 |
| pageNum | `number` | `1` | 当前页码 |
| pageSize | `number` | `10` | 每页条数 |
| bordered | `boolean` | `true` | 是否边框 |

## Events

| 事件 | 参数 | 说明 |
|------|------|------|
| page-change | `{ pageNum: number; pageSize: number }` | 分页变化 |
