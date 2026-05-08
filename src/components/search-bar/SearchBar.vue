<script setup lang="ts">
import { reactive } from 'vue';

import { Button, DatePicker, Form, Input, Select } from 'ant-design-vue';

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
  const value = typeof width === 'number' ? `${width}px` : width;
  return { width: value };
}
</script>

<template>
  <Form layout="inline" class="upx-search-bar">
    <Form.Item v-for="field in fields" :key="field.key" :label="field.label">
      <Input
        v-if="field.type === 'input'"
        v-model:value="formValues[field.key]"
        :placeholder="field.placeholder"
        :style="getWidthStyle(field.width)"
        allow-clear
        @keyup.enter="handleSearch"
      />
      <Select
        v-else-if="field.type === 'select'"
        v-model:value="formValues[field.key]"
        :placeholder="field.placeholder"
        :options="field.options"
        :loading="field.optionsLoading"
        :style="getWidthStyle(field.width)"
        allow-clear
      />
      <DatePicker.RangePicker
        v-else-if="field.type === 'date-range'"
        v-model:value="formValues[field.key]"
        :placeholder="field.placeholder ? [field.placeholder, field.placeholder] : ['开始日期', '结束日期']"
        :style="getWidthStyle(field.width)"
      />
      <DatePicker
        v-else-if="field.type === 'date-picker'"
        v-model:value="formValues[field.key]"
        :placeholder="field.placeholder"
        :style="getWidthStyle(field.width)"
      />
    </Form.Item>
    <Form.Item>
      <div class="upx-search-bar__actions">
        <Button type="primary" :loading="loading" :disabled="loading" @click="handleSearch">查询</Button>
        <Button :disabled="loading" @click="handleReset">重置</Button>
      </div>
    </Form.Item>
  </Form>
</template>

<style scoped>
.upx-search-bar {
  display: flex;
  flex-wrap: wrap;
  row-gap: 8px;
}
.upx-search-bar__actions {
  display: flex;
  gap: 8px;
}
</style>
