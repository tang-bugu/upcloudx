<script setup lang="ts">
import { computed } from 'vue';

import { certificateStatusMap, domainStatusMap, projectStatusMap } from './presets';
import type { StatusMapItem, StatusPreset } from './types';

interface Props {
  status?: number | string;
  text?: string;
  color?: string;
  statusMap?: Record<number | string, StatusMapItem>;
  preset?: StatusPreset;
  size?: 'default' | 'small';
}

const props = withDefaults(defineProps<Props>(), {
  status: undefined,
  text: undefined,
  color: undefined,
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
const currentItem = computed(() => props.status !== undefined ? mergedMap.value[props.status] : undefined);

const tagText = computed(() => props.text ?? currentItem.value?.text ?? '未知');
const tagColor = computed(() => props.color ?? currentItem.value?.color ?? 'default');

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  success: { bg: '#f0fdf4', text: '#16a34a', border: '#bbf7d0' },
  processing: { bg: '#eff6ff', text: '#2563eb', border: '#bfdbfe' },
  error: { bg: '#fef2f2', text: '#dc2626', border: '#fecaca' },
  warning: { bg: '#fffbeb', text: '#d97706', border: '#fde68a' },
  default: { bg: '#f3f4f6', text: '#6b7280', border: '#e5e7eb' },
};

const tagStyle = computed(() => {
  const c = colorMap[tagColor.value] ?? colorMap.default;
  const base: Record<string, string> = {
    backgroundColor: c.bg,
    color: c.text,
    border: `1px solid ${c.border}`,
  };
  if (props.size === 'small') {
    base.fontSize = '12px';
    base.padding = '0 4px';
  }
  return base;
});
</script>

<template>
  <span class="upx-tag" :style="tagStyle">{{ tagText }}</span>
</template>

<style scoped>
.upx-tag {
  display: inline-block;
  padding: 1px 8px;
  font-size: 12px;
  line-height: 20px;
  border-radius: 4px;
  white-space: nowrap;
}
</style>
