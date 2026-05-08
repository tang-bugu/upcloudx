# useServerPagination

服务端分页状态管理，提供统一的分页状态和 Ant Design Vue Table 的 pagination 配置。

## 基础用法

```ts
import { useServerPagination } from '@upcloudx/ui';

const { currentPage, pageSize, total, paginationConfig, resetPage, setTotal } =
  useServerPagination({ loadFn: loadData });
```

## 完整列表页示例

```vue
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useServerPagination, useListSearch, useConfirmAction } from '@upcloudx/ui';
import { getDomainListApi, deleteDomainApi } from '#/api';

const list = ref([]);
const loading = ref(false);
const searchForm = ref({ name: '', status: undefined });

const { currentPage, pageSize, total, paginationConfig, resetPage, setTotal } =
  useServerPagination({ loadFn: loadData });

const { handleSearch, handleReset } = useListSearch({
  formRef: ref(null),
  resetPage,
  loadFn: loadData,
});

const { confirmDelete } = useConfirmAction();

async function loadData() {
  loading.value = true;
  try {
    const res = await getDomainListApi({
      pageNum: currentPage.value,
      pageSize: pageSize.value,
      ...searchForm.value,
    });
    list.value = res.data?.rows ?? [];
    setTotal(res.data?.total ?? 0);
  } finally {
    loading.value = false;
  }
}

function handleDelete(record) {
  confirmDelete({
    title: '删除确认',
    content: `确定删除域名 ${record.domain} 吗？`,
    onOk: async () => {
      await deleteDomainApi(record.id);
      loadData();
    },
  });
}

onMounted(loadData);
</script>

<template>
  <DataTable
    :columns="columns"
    :data-source="list"
    :loading="loading"
    :total="total"
    :page-num="currentPage"
    :page-size="pageSize"
    @page-change="({ pageNum, pageSize }) => { currentPage = pageNum; pageSize = pageSize; loadData(); }"
  />
</template>
```

## 与 DataTable 配合

```vue
<!-- DataTable 内置分页，直接传 total/pageNum/pageSize 即可 -->
<DataTable
  :columns="columns"
  :data-source="list"
  :loading="loading"
  :total="total"
  :page-num="currentPage"
  :page-size="pageSize"
  @page-change="({ pageNum, pageSize }) => loadData(pageNum, pageSize)"
/>
```

## 与原生 a-table 配合

```vue
<!-- 使用 paginationConfig 直接传给 a-table -->
<a-table
  :columns="columns"
  :data-source="list"
  :loading="loading"
  :pagination="paginationConfig"
/>
```

## 参数

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| loadFn | `() => void` | — | 数据加载回调，页码/页大小变化时自动调用 |
| defaultPageSize | `number` | `10` | 默认每页条数 |

## 返回值

| 属性 | 类型 | 说明 |
|------|------|------|
| currentPage | `Ref<number>` | 当前页码 |
| pageSize | `Ref<number>` | 每页条数 |
| total | `Ref<number>` | 总条数 |
| paginationConfig | `ComputedRef` | 可直接传给 `a-table` 的 pagination 配置 |
| resetPage | `() => void` | 重置到第一页（搜索时调用） |
| setTotal | `(n: number) => void` | 更新总条数（接口返回后调用） |
