import type { Ref } from 'vue';

import { computed, ref, unref } from 'vue';

function pagination<T = any>(list: T[], pageNo: number, pageSize: number): T[] {
  const offset = (pageNo - 1) * pageSize;
  return offset + pageSize >= list.length ? list.slice(offset) : list.slice(offset, offset + pageSize);
}

export function usePagination<T = any>(list: Ref<T[]>, pageSize: number) {
  const currentPage = ref(1);
  const pageSizeRef = ref(pageSize);

  const totalPages = computed(() => Math.ceil(unref(list).length / unref(pageSizeRef)));
  const paginationList = computed(() => pagination(unref(list), unref(currentPage), unref(pageSizeRef)));
  const total = computed(() => unref(list).length);

  function setCurrentPage(page: number) {
    currentPage.value = page;
  }

  function setPageSize(size: number) {
    pageSizeRef.value = size;
    currentPage.value = 1;
  }

  return { setCurrentPage, total, setPageSize, paginationList };
}
