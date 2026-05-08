import type { ListSearchOptions, ListSearchReturn } from './types';

export function useListSearch(options: ListSearchOptions): ListSearchReturn {
  const { formRef, resetPage, loadFn, extraResetFn } = options;

  function handleSearch(): void {
    resetPage();
    loadFn();
  }

  function handleReset(): void {
    formRef.value?.resetFields();
    extraResetFn?.();
    resetPage();
    loadFn();
  }

  return { handleSearch, handleReset };
}
