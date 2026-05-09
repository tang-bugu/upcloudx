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
  success: { bg: 'rgba(34,197,94,0.1)', text: '#22c55e', border: 'rgba(34,197,94,0.3)' },
  processing: { bg: 'rgba(37,99,235,0.1)', text: '#3b82f6', border: 'rgba(37,99,235,0.3)' },
  error: { bg: 'rgba(239,68,68,0.1)', text: '#ef4444', border: 'rgba(239,68,68,0.3)' },
  warning: { bg: 'rgba(234,179,8,0.1)', text: '#eab308', border: 'rgba(234,179,8,0.3)' },
  default: { bg: 'rgba(107,114,128,0.1)', text: '#6b7280', border: 'rgba(107,114,128,0.3)' },
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
