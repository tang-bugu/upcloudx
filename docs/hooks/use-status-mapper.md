# useStatusMapper

状态码到显示文本和颜色的映射工具，配合 `StatusTag` 组件或自定义渲染使用。

## 基础用法

```ts
import { useStatusMapper } from '@upcloudx/ui';

const { getStatusLabel, getStatusColor } = useStatusMapper({
  0: { label: '禁用', color: 'default' },
  1: { label: '启用', color: 'success' },
  2: { label: '待审核', color: 'processing' },
});

getStatusLabel(1);   // '启用'
getStatusColor(1);   // 'success'
getStatusLabel(999); // '未知'（未匹配时的默认值）
getStatusColor(999); // 'default'
```

## 在表格列中使用

```vue
<script setup>
import { useStatusMapper } from '@upcloudx/ui';

const { getStatusLabel, getStatusColor } = useStatusMapper({
  0: { label: '停用', color: 'default' },
  1: { label: '运行中', color: 'success' },
  2: { label: '异常', color: 'error' },
});

const columns = [
  { title: '名称', dataIndex: 'name' },
  { title: '状态', dataIndex: 'status', key: 'status' },
];
</script>

<template>
  <DataTable :columns="columns" :data-source="list">
    <template #bodyCell="{ column, record }">
      <a-tag v-if="column.key === 'status'" :color="getStatusColor(record.status)">
        {{ getStatusLabel(record.status) }}
      </a-tag>
    </template>
  </DataTable>
</template>
```

## 从字典数据动态构建映射

配合 `useDictData` 使用，从后端字典接口动态构建状态映射：

```ts
import { useDictData, useStatusMapper } from '@upcloudx/ui';
import { getProjectStatusDictApi } from '#/api';

const { getStatusLabel, getStatusColor, fromDictList } = useStatusMapper({});

const { list: statusList } = useDictData(getProjectStatusDictApi, { immediate: true });

// 字典加载后构建映射，指定每个 dictValue 对应的颜色
watch(statusList, (list) => {
  fromDictList(list, {
    '0': 'processing',  // 申请中
    '1': 'success',     // 启动
    '2': 'default',     // 停用
  });
});
```

## 与 StatusTag 对比

| 场景 | 推荐方案 |
|------|----------|
| 状态映射固定，直接在模板渲染 | `StatusTag` 组件 |
| 需要在 JS 逻辑中获取状态文本/颜色 | `useStatusMapper` |
| 状态映射来自后端字典 | `useStatusMapper` + `fromDictList` |

## 参数

| 参数 | 类型 | 说明 |
|------|------|------|
| statusMap | `Record<number, { label: string; color: string }>` | 初始状态映射 |

## 返回值

| 方法 | 参数 | 返回 | 说明 |
|------|------|------|------|
| getStatusLabel | `status: number` | `string` | 获取状态文本，未匹配返回 `'未知'` |
| getStatusColor | `status: number` | `string` | 获取状态颜色，未匹配返回 `'default'` |
| fromDictList | `(list, colorMap?)` | `void` | 从字典数据动态构建映射 |
