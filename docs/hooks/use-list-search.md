# useListSearch

列表页搜索/重置联动，封装「搜索重置页码」和「重置清空表单」的标准交互模式。

## 基础用法

```ts
import { useListSearch, useServerPagination } from '@upcloudx/ui';

const formRef = ref(null);
const { resetPage } = useServerPagination({ loadFn: loadData });

const { handleSearch, handleReset } = useListSearch({
  formRef,
  resetPage,
  loadFn: loadData,
});
```

## 完整列表页示例

```vue
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useListSearch, useServerPagination } from '@upcloudx/ui';

const formRef = ref(null);
const searchForm = reactive({ name: '', status: undefined });
const list = ref([]);
const loading = ref(false);

const { currentPage, pageSize, total, resetPage, setTotal } =
  useServerPagination({ loadFn: loadData });

const { handleSearch, handleReset } = useListSearch({
  formRef,
  resetPage,
  loadFn: loadData,
  // 额外重置逻辑（可选）
  extraResetFn: () => {
    searchForm.name = '';
    searchForm.status = undefined;
  },
});

async function loadData() {
  loading.value = true;
  try {
    const res = await getListApi({ pageNum: currentPage.value, pageSize: pageSize.value, ...searchForm });
    list.value = res.data?.rows ?? [];
    setTotal(res.data?.total ?? 0);
  } finally {
    loading.value = false;
  }
}

onMounted(loadData);
</script>

<template>
  <a-form ref="formRef" layout="inline" :model="searchForm">
    <a-form-item label="名称" name="name">
      <a-input v-model:value="searchForm.name" placeholder="请输入名称" @keyup.enter="handleSearch" />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" @click="handleSearch">查询</a-button>
      <a-button @click="handleReset">重置</a-button>
    </a-form-item>
  </a-form>
</template>
```

## 执行顺序

```
handleSearch: resetPage() → loadFn()
handleReset:  resetFields() → extraResetFn?() → resetPage() → loadFn()
```

## 参数

| 属性 | 类型 | 说明 |
|------|------|------|
| formRef | `Ref<FormInstance>` | 表单引用，用于 `resetFields()` |
| resetPage | `() => void` | 重置页码函数（来自 `useServerPagination`） |
| loadFn | `() => void` | 数据加载函数 |
| extraResetFn | `() => void` | 额外重置逻辑（可选，在 resetFields 之后调用） |

## 返回值

| 方法 | 说明 |
|------|------|
| handleSearch | 重置页码后加载数据 |
| handleReset | 清空表单、重置页码后加载数据 |
