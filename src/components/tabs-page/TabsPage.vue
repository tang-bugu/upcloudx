<script setup lang="ts">
import { computed, watch } from 'vue';

import { useSessionStorage } from '@vueuse/core';
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from 'radix-vue';

import type { TabItem } from './types';

interface TabsPageProps {
  tabs: TabItem[];
  activeKey: string;
  card?: boolean;
  sessionStorageKey?: string;
}

const props = withDefaults(defineProps<TabsPageProps>(), {
  card: false,
  sessionStorageKey: undefined,
});

const emit = defineEmits<{
  'update:activeKey': [key: string];
}>();

function getValidKey(key: string | null | undefined): string {
  if (!key) return props.tabs[0]?.key ?? '';
  return props.tabs.some((t) => t.key === key) ? key : (props.tabs[0]?.key ?? '');
}

const storageKey = computed(() => props.sessionStorageKey ?? '__tabs_page_no_persist__');
const storedKey = useSessionStorage<string>(storageKey.value, '');

const internalActiveKey = computed(() => {
  if (props.sessionStorageKey && storedKey.value) return getValidKey(storedKey.value);
  return getValidKey(props.activeKey);
});

watch(() => props.sessionStorageKey, (newKey) => {
  if (newKey) storedKey.value = getValidKey(props.activeKey);
}, { immediate: false });

function handleTabChange(key: string) {
  if (props.sessionStorageKey) storedKey.value = key;
  emit('update:activeKey', key);
}
</script>

<template>
  <div :class="props.card ? 'upx-tabs-card' : ''">
    <TabsRoot :model-value="internalActiveKey" @update:model-value="handleTabChange">
      <TabsList class="upx-tabs-list">
        <TabsTrigger v-for="tab in props.tabs" :key="tab.key" :value="tab.key" class="upx-tabs-trigger">
          {{ tab.label }}
        </TabsTrigger>
      </TabsList>
      <TabsContent v-for="tab in props.tabs" :key="tab.key" :value="tab.key" class="upx-tabs-content">
        <slot :name="tab.key" />
      </TabsContent>
    </TabsRoot>
  </div>
</template>

<style scoped>
.upx-tabs-card { background: #fff; border-radius: 8px; border: 1px solid #e5e7eb; padding: 24px; }
.upx-tabs-list { display: flex; border-bottom: 1px solid #e5e7eb; margin-bottom: 16px; }
.upx-tabs-trigger { padding: 8px 16px; font-size: 14px; border: none; background: none; cursor: pointer; color: #6b7280; border-bottom: 2px solid transparent; transition: all 0.15s; margin-bottom: -1px; }
.upx-tabs-trigger:hover { color: #1664ff; }
.upx-tabs-trigger[data-state="active"] { color: #1664ff; border-bottom-color: #1664ff; }
.upx-tabs-content { outline: none; }
</style>
