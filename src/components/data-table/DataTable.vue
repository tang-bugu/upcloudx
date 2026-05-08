<script setup lang="ts">
import { computed } from 'vue';

import { Table } from 'ant-design-vue';
import type { ColumnType } from 'ant-design-vue/es/table/interface';

import EmptyState from '../empty-state/EmptyState.vue';

interface DataTableProps {
  columns: ColumnType[];
  dataSource: any[];
  loading?: boolean;
  total?: number;
  pageNum?: number;
  pageSize?: number;
  scroll?: { x?: number | string; y?: number | string };
  bordered?: boolean;
}

interface PageChangePayload {
  pageNum: number;
  pageSize: number;
}

const props = withDefaults(defineProps<DataTableProps>(), {
  loading: false,
  total: 0,
  pageNum: 1,
  pageSize: 10,
  scroll: () => ({ x: 'max-content' }),
  bordered: true,
});

const emit = defineEmits<{
  'page-change': [payload: PageChangePayload];
}>();

const showEmpty = computed(() => props.dataSource.length === 0 && !props.loading);

const pagination = computed(() => ({
  current: props.pageNum,
  pageSize: props.pageSize,
  total: props.total,
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total: number) => `共 ${total} 条`,
  pageSizeOptions: ['10', '20', '50', '100'],
  onChange: (page: number, size: number) => {
    emit('page-change', { pageNum: page, pageSize: size });
  },
  onShowSizeChange: (current: number, size: number) => {
    emit('page-change', { pageNum: current, pageSize: size });
  },
}));
</script>

<template>
  <Table
    :columns="columns"
    :data-source="dataSource"
    :loading="loading"
    :pagination="pagination"
    :scroll="scroll"
    :bordered="bordered"
    row-key="id"
  >
    <template v-if="showEmpty" #emptyText>
      <EmptyState />
    </template>
    <template v-if="$slots.bodyCell" #bodyCell="slotProps">
      <slot name="bodyCell" v-bind="slotProps" />
    </template>
    <template v-if="$slots.headerCell" #headerCell="slotProps">
      <slot name="headerCell" v-bind="slotProps" />
    </template>
  </Table>
</template>
