# useUserOptions

用户列表查询，提供 Select 组件 options 格式数据。

## 基础用法

```ts
import { useUserOptions } from '@upcloudx/ui';
import { getUserListApi } from '#/api';

const { userList, loading, options, load } = useUserOptions({
  fetchFn: getUserListApi,
  immediate: true, // 挂载时自动加载
});
```

## 在 Select 中使用

```vue
<script setup>
import { useUserOptions } from '@upcloudx/ui';
import { getUserListApi } from '#/api';

const { options, loading } = useUserOptions({
  fetchFn: getUserListApi,
  immediate: true,
});
</script>

<template>
  <a-select
    v-model:value="form.userId"
    :options="options"
    :loading="loading"
    placeholder="请选择负责人"
    allow-clear
    show-search
    :filter-option="(input, option) => option.label.includes(input)"
  />
</template>
```

## 在 SearchBar 中使用

```ts
const { options: userOptions, loading: userLoading } = useUserOptions({
  fetchFn: getUserListApi,
  immediate: true,
});

const fields = [
  {
    key: 'userId',
    label: '负责人',
    type: 'select',
    options: userOptions,
    optionsLoading: userLoading,
    width: 160,
  },
];
```

## options 格式

```ts
// label 优先使用 nickName，回退到 userName
// value 为 userId
[
  { label: '张三', value: 1 },
  { label: '李四', value: 2 },
]
```

## 参数

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| fetchFn | `() => Promise<ApiResponse<UserItem[]>>` | — | API 函数 |
| immediate | `boolean` | `false` | 挂载时自动加载 |

## 返回值

| 属性 | 类型 | 说明 |
|------|------|------|
| userList | `Ref<UserItem[]>` | 用户原始数据 |
| loading | `Ref<boolean>` | 加载状态 |
| options | `ComputedRef<SelectOption[]>` | Select options 格式 |
| load | `() => Promise<void>` | 手动触发加载 |
