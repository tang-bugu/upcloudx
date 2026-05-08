<script setup lang="ts">
import { computed } from 'vue';

import { useClipboard } from '@vueuse/core';
import { message } from 'ant-design-vue';

interface Props {
  text: string;
  maxWidth?: string;
  successMessage?: string;
}

const props = withDefaults(defineProps<Props>(), {
  maxWidth: undefined,
  successMessage: '已复制到剪贴板',
});

const textStyle = computed(() => {
  if (!props.maxWidth) return {};
  return {
    maxWidth: props.maxWidth,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
    display: 'inline-block',
    verticalAlign: 'bottom',
  };
});

const { copy, isSupported } = useClipboard({ legacy: true });

function execCommandCopy(text: string): boolean {
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textarea);
    return success;
  } catch {
    return false;
  }
}

async function handleCopy() {
  try {
    if (isSupported.value) {
      await copy(props.text);
      message.success(props.successMessage);
    } else {
      const success = execCommandCopy(props.text);
      success ? message.success(props.successMessage) : message.error('复制失败，请手动复制');
    }
  } catch {
    const success = execCommandCopy(props.text);
    success ? message.success(props.successMessage) : message.error('复制失败，请手动复制');
  }
}
</script>

<template>
  <span class="upx-copy-text">
    <span :style="textStyle" :title="maxWidth ? text : undefined">{{ text }}</span>
    <svg
      class="upx-copy-text__icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      @click="handleCopy"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  </span>
</template>

<style scoped>
.upx-copy-text {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.upx-copy-text__icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  cursor: pointer;
  color: #1664ff;
  transition: color 0.2s;
}
.upx-copy-text__icon:hover {
  color: #0d47a1;
}
</style>
