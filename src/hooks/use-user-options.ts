import { computed, onMounted, ref } from 'vue';

import type { ApiResponse, SelectOption, UserItem, UserOptionsConfig, UserOptionsReturn } from './types';

export function useUserOptions(config?: UserOptionsConfig): UserOptionsReturn {
  const { immediate = false, fetchFn } = config || {};

  const userList = ref<UserItem[]>([]);
  const loading = ref(false);

  async function load(): Promise<void> {
    if (!fetchFn) {
      console.warn('useUserOptions: fetchFn is required');
      return;
    }
    try {
      loading.value = true;
      const result: ApiResponse<UserItem[]> = await fetchFn();
      if (result.code === 0 && result.data) {
        userList.value = result.data;
      }
    } catch (error) {
      console.warn('useUserOptions: Request failed', error);
    } finally {
      loading.value = false;
    }
  }

  const options = computed<SelectOption<number>[]>(() =>
    userList.value.map((user) => ({ label: user.nickName || user.userName, value: user.userId })),
  );

  if (immediate) {
    onMounted(() => { load(); });
  }

  return { userList, loading, options, load };
}
