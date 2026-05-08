<script setup lang="ts">
import { Skeleton } from 'ant-design-vue';

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
    <Skeleton v-if="props.loading" :active="true" :paragraph="{ rows: 2 }" />
    <template v-else>
      <div class="upx-stat-card__label">{{ props.label }}</div>
      <div class="upx-stat-card__value">
        <span class="upx-stat-card__number" :style="props.color ? { color: props.color } : {}">{{ props.value }}</span>
        <span v-if="props.unit" class="upx-stat-card__unit">{{ props.unit }}</span>
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
.upx-stat-card {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}
.upx-stat-card__label {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 8px;
}
.upx-stat-card__value {
  display: flex;
  align-items: baseline;
  gap: 4px;
}
.upx-stat-card__number {
  font-size: 24px;
  font-weight: 600;
}
.upx-stat-card__unit {
  font-size: 14px;
  color: #9ca3af;
}
.upx-stat-card__trend {
  margin-top: 8px;
  font-size: 14px;
}
.upx-stat-card__trend--up {
  color: #ef4444;
}
.upx-stat-card__trend--down {
  color: #22c55e;
}
</style>
