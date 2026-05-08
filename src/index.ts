import './styles/index.css';

// ─── Components ──────────────────────────────────────────────────────────────
export { default as PageHeader } from './components/page-header/PageHeader.vue';
export { default as SectionTitle } from './components/section-title/SectionTitle.vue';
export { default as StatusTag } from './components/status-tag/StatusTag.vue';
export { default as ActionButtons } from './components/action-buttons/ActionButtons.vue';
export { default as CopyText } from './components/copy-text/CopyText.vue';
export { default as EmptyState } from './components/empty-state/EmptyState.vue';
export { default as DataTable } from './components/data-table/DataTable.vue';
export { default as SearchBar } from './components/search-bar/SearchBar.vue';
export { default as DetailCard } from './components/detail-card/DetailCard.vue';
export { default as FormModal } from './components/form-modal/FormModal.vue';
export { default as StepForm } from './components/step-form/StepForm.vue';
export { default as StatCard } from './components/stat-card/StatCard.vue';
export { default as CurrencyDisplay } from './components/currency-display/CurrencyDisplay.vue';
export { default as TabsPage } from './components/tabs-page/TabsPage.vue';

// ─── Composables ─────────────────────────────────────────────────────────────
export { confirmDelete, useConfirm } from './composables/use-confirm';
export { useConfirmAction } from './hooks/use-confirm-action';
export { useListSearch } from './hooks/use-list-search';
export { useServerPagination } from './hooks/use-server-pagination';
export { useModalForm } from './hooks/use-modal-form';
export { useStatusMapper } from './hooks/use-status-mapper';
export { useProviderType } from './hooks/use-provider-type';
export { useDictData } from './hooks/use-dict-data';
export { useUtcTime } from './hooks/use-utc-time';
export { useUserOptions } from './hooks/use-user-options';
export { useCustomerOptions } from './hooks/use-customer-options';
export { useDomainOptions } from './hooks/use-domain-options';
export { usePagination } from './hooks/use-pagination';

// ─── Types ───────────────────────────────────────────────────────────────────
export type { ActionItem } from './components/action-buttons/types';
export type { CurrencyDisplayProps } from './components/currency-display/types';
export type { SearchField, FieldType } from './components/search-bar/types';
export type { TrendInfo } from './components/stat-card/types';
export type { StatusMapItem, StatusPreset } from './components/status-tag/types';
export type { StepItem } from './components/step-form/types';
export type { TabItem } from './components/tabs-page/types';
export type { ConfirmOptions } from './composables/use-confirm';
export type * from './hooks/types';
