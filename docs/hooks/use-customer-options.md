# useCustomerOptions

客户列表查询，提供 Select options 和 Map 快速查找。

## 基础用法

```ts
import { useCustomerOptions } from '@upcloudx/ui';
import { getCustomerListApi } from '#/api';

const { options, loading, customerMap, getCustomerName, load } = useCustomerOptions({
  fetchFn: getCustomerListApi,
  immediate: true,
});
```

## 在 Select 中使用

```vue
<a-select
  v-model:value="form.customerId"
  :options="options"
  :loading="loading"
  placeholder="请选择客户"
  allow-clear
  show-search
  :filter-option="(input, option) => option.label.includes(input)"
/>
```

## 通过 ID 获取客户名称

```ts
// 在表格列中显示客户名称
const { getCustomerName } = useCustomerOptions({
  fetchFn: getCustomerListApi,
  immediate: true,
});

const columns = [
  {
    title: '客户',
    dataIndex: 'customerId',
    customRender: ({ text }) => getCustomerName(text),
  },
];
```

## 通过 Map 批量查找

```ts
const { customerMap } = useCustomerOptions({ fetchFn: getCustomerListApi, immediate: true });

// 快速查找
const customer = customerMap.value.get(customerId);
console.log(customer?.companyName);
```

## 参数

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| fetchFn | `() => Promise<ApiResponse<CustomerItem[]>>` | — | API 函数 |
| immediate | `boolean` | `false` | 挂载时自动加载 |

## 返回值

| 属性 | 类型 | 说明 |
|------|------|------|
| customerList | `Ref<CustomerItem[]>` | 客户原始数据 |
| loading | `Ref<boolean>` | 加载状态 |
| options | `ComputedRef<SelectOption[]>` | Select options（label=companyName, value=customId） |
| customerMap | `ComputedRef<Map<number, CustomerItem>>` | 以 customId 为 key 的 Map |
| getCustomerName | `(customId: number) => string` | 根据 ID 获取客户名称，未找到返回 `'-'` |
| load | `() => Promise<void>` | 手动触发加载 |
