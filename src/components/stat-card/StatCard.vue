<script setup lang="ts">
import type { TrendInfo } from './types';

interface StatCardProps {
  label: string;
  value: number | string;
  unit?: string;
  icon?: string;
  color?: string;
  loading?: boolean;
  trend?: TrendInfo;
}

const props = withDefaults(defineProps<StatCardProps>(), {
  loading: false,
});
</script>

<template>
  <div class="upx-stat-card">
    <template v-if="props.loading">
      <div class="upx-skeleton upx-skeleton--short"></div>
      <div class="upx-skeleton upx-skeleton--long"></div>
    </template>
    <template v-else>
      <div class="upx-stat-card__label">{{ props.label }}</div>
      <div class="upx-stat-card__value">
        <slot name="value">
          <span class="upx-stat-card__number" :style="props.color ? { color: props.color } : {}">{{ props.value }}</span>
          <span v-if="props.unit" class="upx-stat-card__unit">{{ props.unit }}</span>
        </slot>
      </div>
      <div v-if="props.trend" class="upx-stat-card__trend">
        <span :class="props.trend.direction === 'up' ? 'upx-stat-card__trend--up' : 'upx-stat-card__trend--down'">
          {{ props.trend.direction === 'up' ? '↑' : '↓' }} {{ props.trend.value }}%
        </span>
      </div>
    </template>
  </div>
</template>

<style scoped>
.upx-stat-card { background: var(--upx-bg-elevated); border-radius: 8px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
.upx-stat-card__label { font-size: 14px; color: var(--upx-text-secondary); margin-bottom: 8px; }
.upx-stat-card__value { display: flex; align-items: baseline; gap: 4px; }
.upx-stat-card__number { font-size: 24px; font-weight: 600; color: var(--upx-text); }
.upx-stat-card__unit { font-size: 14px; color: var(--upx-text-muted); }
.upx-stat-card__trend { margin-top: 8px; font-size: 14px; }
.upx-stat-card__trend--up { color: #ef4444; }
.upx-stat-card__trend--down { color: #22c55e; }
.upx-skeleton { height: 16px; border-radius: 4px; background: var(--upx-bg-skeleton); background-size: 200% 100%; animation: upx-shimmer 1.5s infinite; }
.upx-skeleton--short { width: 40%; margin-bottom: 12px; }
.upx-skeleton--long { width: 70%; height: 24px; }
@keyframes upx-shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
</style>
