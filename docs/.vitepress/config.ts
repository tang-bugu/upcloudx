import { defineConfig } from 'vitepress';

export default defineConfig({
  title: '@upcloudx/ui',
  description: '通用业务 UI 组件库 & Hooks',
  themeConfig: {
    nav: [{ text: '组件', link: '/components/page-header' }],
    sidebar: [
      {
        text: '通用组件',
        items: [
          { text: 'PageHeader 页面标题', link: '/components/page-header' },
          { text: 'SectionTitle 分区标题', link: '/components/section-title' },
          { text: 'StatusTag 状态标签', link: '/components/status-tag' },
          { text: 'ActionButtons 操作按钮', link: '/components/action-buttons' },
          { text: 'CopyText 复制文本', link: '/components/copy-text' },
          { text: 'EmptyState 空状态', link: '/components/empty-state' },
        ],
      },
      {
        text: '数据展示',
        items: [
          { text: 'DataTable 数据表格', link: '/components/data-table' },
          { text: 'StatCard 统计卡片', link: '/components/stat-card' },
          { text: 'CurrencyDisplay 货币展示', link: '/components/currency-display' },
          { text: 'DetailCard 详情卡片', link: '/components/detail-card' },
        ],
      },
      {
        text: '表单交互',
        items: [
          { text: 'SearchBar 搜索栏', link: '/components/search-bar' },
          { text: 'FormModal 表单弹窗', link: '/components/form-modal' },
          { text: 'StepForm 步骤表单', link: '/components/step-form' },
          { text: 'TabsPage 标签页', link: '/components/tabs-page' },
        ],
      },
      {
        text: 'Hooks',
        items: [
          { text: 'useServerPagination', link: '/hooks/use-server-pagination' },
          { text: 'useConfirmAction', link: '/hooks/use-confirm-action' },
          { text: 'useModalForm', link: '/hooks/use-modal-form' },
          { text: 'useUtcTime', link: '/hooks/use-utc-time' },
        ],
      },
    ],
  },
});
