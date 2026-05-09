<script setup lang="ts">
import { reactive } from 'vue';

import type { SearchField } from './types';

interface Props {
  fields: SearchField[];
  loading?: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  search: [values: Record<string, any>];
  reset: [];
}>();

const formValues = reactive<Record<string, any>>({});

function handleSearch() {
  emit('search', { ...formValues });
}

function handleReset() {
  for (const field of props.fields) {
    formValues[field.key] = undefined;
  }
  emit('reset');
}

function getWidthStyle(width?: number | string): Record<string, string> {
  if (width === undefined) return {};
  return { width: typeof width === 'number' ? `${width}px` : width };
}
</script>

<template>
  <div class="upx-search-bar">
    <div v-for="field in fields" :key="field.key" class="upx-search-bar__field">
      <label class="upx-search-bar__label">{{ field.label }}</label>
      <input
        v-if="field.type === 'input'"
        v-model="formValues[field.key]"
        type="text"
        class="upx-search-bar__input"
        :placeholder="field.placeholder"
        :style="getWidthStyle(field.width)"
        @keyup.enter="handleSearch"
      />
      <select
        v-else-if="field.type === 'select'"
        v-model="formValues[field.key]"
        class="upx-search-bar__select"
        :style="getWidthStyle(field.width)"
      >
        <option value="" disabled selected hidden>{{ field.placeholder || '请选择' }}</option>
        <option v-for="opt in field.options" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
      </select>
      <div v-else-if="field.type === 'date-range'" class="upx-search-bar__date-range" :style="getWidthStyle(field.width)">
        <input
          v-model="formValues[`${field.key}_start`]"
          type="date"
          class="upx-search-bar__input upx-search-bar__input--date"
        />
        <span class="upx-search-bar__separator">~</span>
        <input
          v-model="formValues[`${field.key}_end`]"
          type="date"
          class="upx-search-bar__input upx-search-bar__input--date"
        />
      </div>
      <input
        v-else-if="field.type === 'date-picker'"
        v-model="formValues[field.key]"
        type="date"
        class="upx-search-bar__input"
        :style="getWidthStyle(field.width)"
      />
    </div>
    <div class="upx-search-bar__actions">
      <button type="button" class="upx-btn upx-btn--primary" :disabled="loading" @click="handleSearch">查询</button>
      <button type="button" class="upx-btn" :disabled="loading" @click="handleReset">重置</button>
    </div>
  </div>
</template>

<style scoped>
.upx-search-bar { display: flex; flex-wrap: wrap; align-items: flex-end; gap: 12px; }
.upx-search-bar__field { display: flex; flex-direction: column; gap: 4px; }
.upx-search-bar__label { font-size: 13px; color: #6b7280; }
.upx-search-bar__input { padding: 6px 10px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; outline: none; transition: border-color 0.15s; min-width: 160px; }
.upx-search-bar__input:focus { border-color: #1664ff; }
.upx-search-bar__input--date { min-width: 130px; }
.upx-search-bar__select { padding: 6px 10px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; outline: none; min-width: 160px; background: #fff; cursor: pointer; transition: border-color 0.15s; }
.upx-search-bar__select:focus { border-color: #1664ff; }
.upx-search-bar__date-range { display: flex; align-items: center; gap: 6px; }
.upx-search-bar__separator { color: #9ca3af; }
.upx-search-bar__actions { display: flex; gap: 8px; align-items: flex-end; }
.upx-btn { padding: 6px 16px; border-radius: 6px; font-size: 14px; cursor: pointer; border: 1px solid #d1d5db; background: #fff; transition: all 0.15s; }
.upx-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.upx-btn:hover:not(:disabled) { border-color: #9ca3af; }
.upx-btn--primary { background: #1664ff; color: #fff; border-color: #1664ff; }
.upx-btn--primary:hover:not(:disabled) { background: #1250d4; }
</style>
