# @upcloudx/ui

UpCloudX 通用业务 UI 组件库 & Hooks，基于 Vue 3 + Ant Design Vue，适用于中后台管理系统。

## 安装

```bash
pnpm add @upcloudx/ui
```

**peerDependencies：**

```bash
pnpm add vue ant-design-vue dayjs
```

## 使用

```vue
<script setup lang="ts">
import { DataTable, SearchBar, StatusTag, useServerPagination } from '@upcloudx/ui';
</script>
```

样式随组件自动注入，无需手动引入 CSS 文件。

## 组件

| 组件 | 说明 |
|------|------|
| `PageHeader` | 带返回按钮的页面标题 |
| `SectionTitle` | 带左侧色块装饰的分区标题 |
| `StatusTag` | 业务状态标签，支持内置预设和自定义映射 |
| `ActionButtons` | 表格操作列按钮组，超出自动收纳到下拉菜单 |
| `CopyText` | 带一键复制功能的文本展示 |
| `EmptyState` | 统一空状态占位（默认/搜索无结果/加载失败） |
| `DataTable` | 封装分页、加载状态、空状态的业务数据表格 |
| `SearchBar` | 列表页搜索/筛选栏，支持 input/select/date-range/date-picker |
| `DetailCard` | 支持只读/编辑切换的详情信息卡片 |
| `FormModal` | 封装表单的新增/编辑弹窗 |
| `StepForm` | 多步骤向导表单 |
| `StatCard` | 统计数据卡片，支持趋势箭头和骨架屏 |
| `CurrencyDisplay` | 货币格式化展示，支持正负值着色 |
| `TabsPage` | 带 Tab 切换的页面容器，支持 sessionStorage 持久化 |

## Hooks

| Hook | 说明 |
|------|------|
| `useConfirmAction` | 二次确认弹窗（删除/停用等危险操作） |
| `useConfirm` / `confirmDelete` | 快捷确认/删除确认 |
| `useListSearch` | 列表页搜索/重置联动 |
| `useServerPagination` | 服务端分页状态管理 |
| `useModalForm` | 表单弹窗生命周期管理（打开回显/关闭重置/提交验证） |
| `useStatusMapper` | 状态码到文本/颜色的映射工具 |
| `useProviderType` | 厂商类型格式化（aws→AWS, cloudflare→Cloudflare） |
| `useDictData` | 字典数据加载 |
| `useUtcTime` | UTC 时间格式化为本地时间 |
| `useUserOptions` | 用户列表 Select options |
| `useCustomerOptions` | 客户列表 Select options + Map 查找 |
| `useDomainOptions` | 域名列表 Select options |
| `usePagination` | 前端分页 |

## 组件示例

### DataTable + SearchBar

```vue
<template>
  <SearchBar
    :fields="[
      { key: 'name', label: '名称', type: 'input', placeholder: '请输入名称' },
      { key: 'status', label: '状态', type: 'select', options: statusOptions },
    ]"
    :loading="loading"
    @search="handleSearch"
    @reset="handleReset"
  />
  <DataTable
    :columns="columns"
    :data-source="list"
    :loading="loading"
    :total="total"
    :page-num="currentPage"
    :page-size="pageSize"
    @page-change="handlePageChange"
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

### useServerPagination + useListSearch

```ts
import { useServerPagination, useListSearch, useConfirmAction } from '@upcloudx/ui';

const { currentPage, pageSize, total, paginationConfig, resetPage, setTotal } =
  useServerPagination({ loadFn: loadData });

const { handleSearch, handleReset } = useListSearch({
  formRef,
  resetPage,
  loadFn: loadData,
});

const { confirmDelete } = useConfirmAction();
```

### StatusTag 预设

```vue
<!-- 域名状态 -->
<StatusTag :status="4" preset="domain" />

<!-- 证书状态 -->
<StatusTag :status="2" preset="certificate" />

<!-- 自定义映射 -->
<StatusTag
  :status="record.status"
  :status-map="{ 0: { text: '待审核', color: 'processing' }, 1: { text: '已通过', color: 'success' } }"
/>
```

## 开发

```bash
# 安装依赖
pnpm install

# 构建
pnpm build

# 监听模式
pnpm dev
```

## 发布

推送 tag 自动触发 GitHub Actions 发布到 npm：

```bash
# 修改 package.json 中的 version
git add -A && git commit -m "release: v0.x.x"
git tag v0.x.x
git push origin main --tags
```

## License

MIT
