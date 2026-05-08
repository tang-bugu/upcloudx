# useServerPagination

服务端分页状态管理。

## 用法

```ts
import { useServerPagination } from '@upcloudx/ui';

const { currentPage, pageSize, total, paginationConfig, resetPage, setTotal } =
  useServerPagination({ loadFn: loadData });

// 在 Table 中使用
// <a-table :pagination="paginationConfig" />

// 数据加载后更新总条数
setTotal(response.total);
```

## 参数

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| defaultPageSize | `number` | `10` | 默认每页条数 |
| loadFn | `() => void` | — | 数据加载回调 |

## 返回值

| 属性 | 类型 | 说明 |
|------|------|------|
| currentPage | `Ref<number>` | 当前页码 |
| pageSize | `Ref<number>` | 每页条数 |
| total | `Ref<number>` | 总条数 |
| paginationConfig | `ComputedRef` | Table pagination 配置 |
| resetPage | `() => void` | 重置到第一页 |
| setTotal | `(n) => void` | 更新总条数 |
