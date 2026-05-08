import { onMounted, ref } from 'vue';

import type { DictDataItem, DictDataOptions, DictDataReturn, DictFetchFn } from './types';

export function useDictData<T = DictDataItem>(fetchFn: DictFetchFn<T>, options?: DictDataOptions): DictDataReturn<T> {
  const { immediate = false } = options ?? {};

  const list = ref<T[]>([]) as DictDataReturn<T>['list'];
  const loading = ref(false);

  const load = async (): Promise<void> => {
    try {
      loading.value = true;
      const result = await fetchFn();
      if (result.code === 0) {
        const data = result.data ?? result.dataList ?? result.rows ?? [];
        list.value = data as T[];
      } else {
        console.error('字典数据加载失败:', result.msg);
      }
    } catch (error) {
      console.error('字典数据请求失败:', error);
    } finally {
      loading.value = false;
    }
  };

  if (immediate) {
    onMounted(() => { load(); });
  }

  return { list, loading, load };
}
