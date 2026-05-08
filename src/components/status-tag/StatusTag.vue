<script setup lang="ts">
import { computed } from 'vue';

import { certificateStatusMap, domainStatusMap, projectStatusMap } from './presets';
import type { StatusMapItem, StatusPreset } from './types';

interface Props {
  status: number | string;
  statusMap?: Record<number | string, StatusMapItem>;
  preset?: StatusPreset;
  size?: 'default' | 'small';
}

const props = withDefaults(defineProps<Props>(), {
  statusMap: undefined,
  preset: undefined,
  size: 'default',
});

const presetMap = computed<Record<number | string, StatusMapItem>>(() => {
  switch (props.preset) {
    case 'domain': return domainStatusMap;
    case 'certificate': return certificateStatusMap;
    case 'project': return projectStatusMap;
    default: return {};
  }
});

const mergedMap = computed(() => ({ ...presetMap.value, ...(props.statusMap ?? {}) }));
const currentItem = computed(() => mergedMap.value[props.status]);
const tagText = computed(() => currentItem.value?.text ?? '未知');
const tagColor = computed(() => currentItem.value?.color ?? 'default');
const tagStyle = computed(() => props.size === 'small' ? { fontSize: '12px', padding: '0 4px' } : {});
</script>

<template>
  <a-tag :color="tagColor" :style="tagStyle">{{ tagText }}</a-tag>
</template>
