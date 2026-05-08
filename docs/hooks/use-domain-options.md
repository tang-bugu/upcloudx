# useDomainOptions

域名列表查询，提供 Select options 格式数据，支持多种响应结构。

## 基础用法

```ts
import { useDomainOptions } from '@upcloudx/ui';
import { getDomainListApi } from '#/api';

const { options, loading, load } = useDomainOptions({
  fetchFn: getDomainListApi,
  immediate: true,
});
```

## 在 Select 中使用

```vue
<a-select
  v-model:value="form.domain"
  :options="options"
  :loading="loading"
  placeholder="请选择域名"
  allow-clear
  show-search
/>
```

## value 使用 ID 而非域名字符串

```ts
const { options } = useDomainOptions({
  fetchFn: getDomainListApi,
  valueKey: 'id',  // 默认为 'domain'
  immediate: true,
});
// options: [{ label: 'example.com', value: 1 }, ...]
```

## 带参数查询

```ts
const { options, load } = useDomainOptions({
  fetchFn: getDomainListApi,
  params: { customerId: 123 },
  immediate: true,
});

// 动态更新参数后重新加载
async function onCustomerChange(customerId) {
  await load({ customerId });
}
```

## 在 SearchBar 中使用

```ts
const { options: domainOptions, loading: domainLoading } = useDomainOptions({
  fetchFn: getDomainListApi,
  immediate: true,
});

const fields = [
  {
    key: 'domain',
    label: '域名',
    type: 'select',
    options: domainOptions,
    optionsLoading: domainLoading,
    width: 200,
  },
];
```

## 参数

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| fetchFn | `(params?) => Promise<ApiResponse<DomainItem[]>>` | — | API 函数 |
| immediate | `boolean` | `false` | 挂载时自动加载 |
| params | `Record<string, any>` | — | 默认请求参数 |
| valueKey | `'domain' \| 'id'` | `'domain'` | options 的 value 字段 |

## 返回值

| 属性 | 类型 | 说明 |
|------|------|------|
| domainList | `Ref<DomainItem[]>` | 域名原始数据 |
| loading | `Ref<boolean>` | 加载状态 |
| options | `ComputedRef<SelectOption[]>` | Select options |
| load | `(params?) => Promise<void>` | 手动触发加载，可传入覆盖参数 |
