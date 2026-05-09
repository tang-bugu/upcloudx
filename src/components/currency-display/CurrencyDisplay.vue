<script setup lang="ts">
import { computed } from 'vue';

import type { CurrencyDisplayProps } from './types';

const props = withDefaults(defineProps<CurrencyDisplayProps>(), {
  currency: 'CNY',
  precision: 6,
  showSymbol: true,
  symbol: undefined,
  colorize: false,
  loading: false,
  textSize: undefined,
  textColor: undefined,
});

const formattedAmount = computed<string>(() => {
  const options = { minimumFractionDigits: 0, maximumFractionDigits: props.precision };
  if (props.symbol) {
    return `${props.symbol}${new Intl.NumberFormat(undefined, { style: 'decimal', ...options }).format(props.amount)}`;
  }
  if (props.showSymbol) {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency: props.currency, ...options }).format(props.amount);
  }
  return new Intl.NumberFormat(undefined, { style: 'decimal', ...options }).format(props.amount);
});

const spanStyle = computed(() => {
  const style: Record<string, string> = {};
  if (props.textColor) style.color = props.textColor;
  else if (props.colorize) {
    if (props.amount > 0) style.color = '#16a34a';
    else if (props.amount < 0) style.color = '#ef4444';
  }
  if (props.textSize) style.fontSize = typeof props.textSize === 'number' ? `${props.textSize}px` : props.textSize;
  return style;
});
</script>

<template>
  <span v-if="props.loading" class="upx-skeleton-inline"></span>
  <span v-else :style="spanStyle">{{ formattedAmount }}</span>
</template>

<style scoped>
.upx-skeleton-inline { display: inline-block; width: 80px; height: 1em; border-radius: 4px; vertical-align: middle; background: var(--upx-bg-skeleton); background-size: 200% 100%; animation: upx-shimmer 1.5s infinite; }
@keyframes upx-shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
</style>
