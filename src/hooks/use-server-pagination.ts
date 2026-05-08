import { computed, ref } from 'vue';

import type { ServerPaginationOptions, ServerPaginationReturn, TablePaginationConfig } from './types';

export function useServerPagination(options: ServerPaginationOptions): ServerPaginationReturn {
  const { defaultPageSize = 10, loadFn } = options;

  const currentPage = ref(1);
  const pageSize = ref(defaultPageSize);
  const total = ref(0);

  function resetPage(): void {
    currentPage.value = 1;
  }

  function setTotal(value: number): void {
    total.value = value;
  }

  const paginationConfig = computed<TablePaginationConfig>(() => ({
    current: currentPage.value,
    pageSize: pageSize.value,
    total: total.value,
    showSizeChanger: true,
    showQuickJumper: true,
    pageSizeOptions: ['10', '20', '50', '100'],
    showTotal: (totalCount: number, range: [number, number]): string =>
      `显示 ${range[0]} 到 ${range[1]} 条，共 ${totalCount} 条`,
    onChange: (page: number, size: number): void => {
      currentPage.value = page;
      pageSize.value = size;
      loadFn();
    },
    onShowSizeChange: (_current: number, size: number): void => {
      currentPage.value = 1;
      pageSize.value = size;
      loadFn();
    },
  }));

  return { currentPage, pageSize, total, paginationConfig, resetPage, setTotal };
}
