<script setup lang="ts">
import { computed } from 'vue';

import { certificateStatusMap, domainStatusMap, projectStatusMap } from './presets';
import type { StatusMapItem, StatusPreset } from './types';

interface Props {
  /** 状态值 */
  status?: number | string;
  /** 直接指定显示文本（优先级最高） */
  text?: string;
  /** 直接指定颜色（优先级最高） */
  color?: string;
  /** 自定义状态映射 */
  statusMap?: Record<number | string, StatusMapItem>;
  /** 内置预设 */
  preset?: StatusPreset;
  /** 标签尺寸 */
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
const tagStyle = computed(() => props.size === 'small' ? { fontSize: '12px', padding: '0 4px' } : {});
</script>

<template>
  <a-tag :color="tagColor" :style="tagStyle">{{ tagText }}</a-tag>
</template>
