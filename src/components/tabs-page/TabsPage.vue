<script setup lang="ts">
import { computed, watch } from 'vue';

import { useSessionStorage } from '@vueuse/core';
import { Card, Tabs } from 'ant-design-vue';

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
  const exists = props.tabs.some((tab) => tab.key === key);
  return exists ? key : (props.tabs[0]?.key ?? '');
}

const storageKey = computed(() => props.sessionStorageKey ?? '__tabs_page_no_persist__');
const storedKey = useSessionStorage<string>(storageKey.value, '');

const internalActiveKey = computed(() => {
  if (props.sessionStorageKey && storedKey.value) {
    return getValidKey(storedKey.value);
  }
  return getValidKey(props.activeKey);
});

watch(() => props.sessionStorageKey, (newKey) => {
  if (newKey) storedKey.value = getValidKey(props.activeKey);
}, { immediate: false });

function handleTabChange(key: string | number) {
  const strKey = String(key);
  if (props.sessionStorageKey) storedKey.value = strKey;
  emit('update:activeKey', strKey);
}
</script>

<template>
  <Card v-if="props.card">
    <Tabs :active-key="internalActiveKey" @change="handleTabChange">
      <Tabs.TabPane v-for="tab in props.tabs" :key="tab.key" :tab="tab.label">
        <slot :name="tab.key" />
      </Tabs.TabPane>
    </Tabs>
  </Card>
  <Tabs v-else :active-key="internalActiveKey" @change="handleTabChange">
    <Tabs.TabPane v-for="tab in props.tabs" :key="tab.key" :tab="tab.label">
      <slot :name="tab.key" />
    </Tabs.TabPane>
  </Tabs>
</template>
