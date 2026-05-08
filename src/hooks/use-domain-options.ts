import { computed, onMounted, ref } from 'vue';

import type { ApiResponse, DomainItem, DomainOptionsConfig, DomainOptionsReturn, SelectOption } from './types';

export function useDomainOptions(config?: DomainOptionsConfig): DomainOptionsReturn {
  const { immediate = false, fetchFn, params, valueKey = 'domain' } = config || {};

  const domainList = ref<DomainItem[]>([]);
  const loading = ref(false);

  async function load(overrideParams?: Record<string, any>): Promise<void> {
    if (!fetchFn) {
      console.warn('useDomainOptions: fetchFn is required');
      return;
    }
    try {
      loading.value = true;
      const result: ApiResponse<DomainItem[]> = await fetchFn(overrideParams || params);
      const data = result.data ?? result.dataList ?? result.rows;
      if (data && Array.isArray(data)) {
        domainList.value = data;
      }
    } catch (error) {
      console.error('useDomainOptions: Request failed', error);
    } finally {
      loading.value = false;
    }
  }

  const options = computed<SelectOption<string | number>[]>(() =>
    domainList.value.map((d) => ({ label: d.domain, value: valueKey === 'id' ? d.id : d.domain })),
  );

  if (immediate) {
    onMounted(() => { load(); });
  }

  return { domainList, loading, options, load };
}
