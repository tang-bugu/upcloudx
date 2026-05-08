<script setup lang="ts">
import { computed } from 'vue';

import { Skeleton } from 'ant-design-vue';

import type { CurrencyDisplayProps } from './types';

const props = withDefaults(defineProps<CurrencyDisplayProps>(), {
  currency: 'CNY',
  precision: 2,
  showSymbol: true,
  colorize: false,
  loading: false,
});

const formattedAmount = computed<string>(() => {
  if (props.showSymbol) {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: props.currency,
      minimumFractionDigits: props.precision,
      maximumFractionDigits: props.precision,
    }).format(props.amount);
  }
  return new Intl.NumberFormat(undefined, {
    style: 'decimal',
    minimumFractionDigits: props.precision,
    maximumFractionDigits: props.precision,
  }).format(props.amount);
});

const colorStyle = computed(() => {
  if (!props.colorize) return {};
  if (props.amount > 0) return { color: '#16a34a' };
  if (props.amount < 0) return { color: '#ef4444' };
  return {};
});
</script>

<template>
  <Skeleton.Input v-if="props.loading" size="small" :active="true" />
  <span v-else :style="colorStyle">{{ formattedAmount }}</span>
</template>
