<script setup lang="ts">
import { computed } from 'vue';

import { Skeleton } from 'ant-design-vue';

import type { CurrencyDisplayProps } from './types';

const props = withDefaults(defineProps<CurrencyDisplayProps>(), {
  currency: 'CNY',
  precision: 6,
  showSymbol: true,
  colorize: false,
  loading: false,
  fontSize: undefined,
  color: undefined,
});

const formattedAmount = computed<string>(() => {
  const options = {
    minimumFractionDigits: 0,
    maximumFractionDigits: props.precision,
  };
  if (props.showSymbol) {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: props.currency,
      ...options,
    }).format(props.amount);
  }
  return new Intl.NumberFormat(undefined, {
    style: 'decimal',
    ...options,
  }).format(props.amount);
});

const spanStyle = computed(() => {
  const style: Record<string, string> = {};
  if (props.color) {
    style.color = props.color;
  } else if (props.colorize) {
    if (props.amount > 0) style.color = '#16a34a';
    else if (props.amount < 0) style.color = '#ef4444';
  }
  if (props.fontSize) {
    style.fontSize = typeof props.fontSize === 'number' ? `${props.fontSize}px` : props.fontSize;
  }
  return style;
});
</script>

<template>
  <Skeleton.Input v-if="props.loading" size="small" :active="true" />
  <span v-else :style="spanStyle">{{ formattedAmount }}</span>
</template>
