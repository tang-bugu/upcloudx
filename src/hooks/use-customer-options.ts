import { computed, onMounted, ref } from 'vue';

import type { ApiResponse, CustomerItem, CustomerOptionsConfig, CustomerOptionsReturn, SelectOption } from './types';

export function useCustomerOptions(config?: CustomerOptionsConfig): CustomerOptionsReturn {
  const { immediate = false, fetchFn } = config || {};

  const customerList = ref<CustomerItem[]>([]);
  const loading = ref(false);

  async function load(): Promise<void> {
    if (!fetchFn) {
      console.warn('useCustomerOptions: fetchFn is required');
      return;
    }
    try {
      loading.value = true;
      const result: ApiResponse<CustomerItem[]> = await fetchFn();
      if (result.code === 0 && result.data) {
        customerList.value = result.data;
      }
    } catch (error) {
      console.error('useCustomerOptions: Request failed', error);
    } finally {
      loading.value = false;
    }
  }

  const options = computed<SelectOption<number>[]>(() =>
    customerList.value.map((c) => ({ label: c.companyName, value: c.customId })),
  );

  const customerMap = computed(() => {
    const map = new Map<number, CustomerItem>();
    customerList.value.forEach((c) => map.set(c.customId, c));
    return map;
  });

  function getCustomerName(customId: number): string {
    return customerMap.value.get(customId)?.companyName || '-';
  }

  if (immediate) {
    onMounted(() => { load(); });
  }

  return { customerList, loading, options, customerMap, getCustomerName, load };
}
