<script setup lang="ts">
import { computed } from 'vue';

import EmptyState from '../empty-state/EmptyState.vue';

interface Column {
  key?: string;
  dataIndex?: string;
  title?: string;
  width?: number | string;
  fixed?: 'left' | 'right';
  align?: 'left' | 'center' | 'right';
  ellipsis?: boolean;
  customRender?: (opt: { text: any; record: any; index: number }) => any;
}

interface DataTableProps {
  columns: Column[];
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
const totalPages = computed(() => Math.ceil(props.total / props.pageSize));

const pageSizeOptions = [10, 20, 50, 100];

function getCellValue(record: any, col: Column) {
  const key = col.dataIndex || col.key;
  return key ? record[key] : undefined;
}

function handlePageChange(page: number) {
  if (page < 1 || page > totalPages.value) return;
  emit('page-change', { pageNum: page, pageSize: props.pageSize });
}

function handleSizeChange(event: Event) {
  const size = Number((event.target as HTMLSelectElement).value);
  emit('page-change', { pageNum: 1, pageSize: size });
}
</script>

<template>
  <div class="upx-table-wrapper">
    <!-- Loading overlay -->
    <div v-if="loading" class="upx-table-loading">
      <div class="upx-table-spinner"></div>
    </div>

    <!-- Table -->
    <div class="upx-table-scroll" :style="scroll?.y ? { maxHeight: typeof scroll.y === 'number' ? `${scroll.y}px` : scroll.y, overflow: 'auto' } : {}">
      <table class="upx-table" :class="{ 'upx-table--bordered': bordered }" :style="scroll?.x ? { minWidth: typeof scroll.x === 'number' ? `${scroll.x}px` : scroll.x } : {}">
        <thead>
          <tr>
            <th
              v-for="col in columns"
              :key="(col.dataIndex || col.key) as string"
              :style="{ width: col.width ? (typeof col.width === 'number' ? `${col.width}px` : col.width) : undefined, textAlign: col.align || 'left' }"
            >
              <slot name="headerCell" :column="col" :title="col.title">
                {{ col.title }}
              </slot>
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-if="!showEmpty">
            <tr v-for="(record, rowIndex) in dataSource" :key="record.id ?? rowIndex">
              <td
                v-for="col in columns"
                :key="(col.dataIndex || col.key) as string"
                :style="{ textAlign: col.align || 'left' }"
                :class="{ 'upx-table-cell--ellipsis': col.ellipsis }"
              >
                <slot name="bodyCell" :column="col" :record="record" :index="rowIndex" :text="getCellValue(record, col)">
                  {{ getCellValue(record, col) }}
                </slot>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <!-- Empty -->
    <EmptyState v-if="showEmpty" />

    <!-- Pagination -->
    <div v-if="total > 0" class="upx-pagination">
      <span class="upx-pagination__total">共 {{ total }} 条</span>
      <div class="upx-pagination__controls">
        <button type="button" class="upx-pagination__btn" :disabled="pageNum <= 1" @click="handlePageChange(pageNum - 1)">‹</button>
        <template v-for="p in totalPages" :key="p">
          <button
            v-if="p === 1 || p === totalPages || (p >= pageNum - 2 && p <= pageNum + 2)"
            type="button"
            class="upx-pagination__btn"
            :class="{ 'upx-pagination__btn--active': p === pageNum }"
            @click="handlePageChange(p)"
          >{{ p }}</button>
          <span v-else-if="p === pageNum - 3 || p === pageNum + 3" class="upx-pagination__ellipsis">…</span>
        </template>
        <button type="button" class="upx-pagination__btn" :disabled="pageNum >= totalPages" @click="handlePageChange(pageNum + 1)">›</button>
        <select class="upx-pagination__size" :value="pageSize" @change="handleSizeChange">
          <option v-for="s in pageSizeOptions" :key="s" :value="s">{{ s }}条/页</option>
        </select>
      </div>
    </div>
  </div>
</template>

<style scoped>
.upx-table-wrapper { position: relative; }
.upx-table-loading { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.6); z-index: 10; border-radius: 8px; }
.upx-table-spinner { width: 24px; height: 24px; border: 2px solid #e5e7eb; border-top-color: #1664ff; border-radius: 50%; animation: upx-spin 0.6s linear infinite; }
@keyframes upx-spin { to { transform: rotate(360deg); } }
.upx-table-scroll { overflow-x: auto; }
.upx-table { width: 100%; border-collapse: collapse; font-size: 14px; }
.upx-table--bordered { border: 1px solid #e5e7eb; }
.upx-table--bordered th, .upx-table--bordered td { border: 1px solid #e5e7eb; }
.upx-table th { padding: 10px 12px; background: #fafafa; font-weight: 500; color: #374151; white-space: nowrap; border-bottom: 1px solid #e5e7eb; }
.upx-table td { padding: 10px 12px; border-bottom: 1px solid #f3f4f6; color: #1f2937; }
.upx-table tbody tr:hover { background: #f9fafb; }
.upx-table-cell--ellipsis { max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.upx-pagination { display: flex; align-items: center; justify-content: space-between; margin-top: 16px; font-size: 14px; }
.upx-pagination__total { color: #6b7280; }
.upx-pagination__controls { display: flex; align-items: center; gap: 4px; }
.upx-pagination__btn { min-width: 28px; height: 28px; padding: 0 6px; border: 1px solid #d1d5db; border-radius: 4px; background: #fff; cursor: pointer; font-size: 14px; transition: all 0.15s; }
.upx-pagination__btn:hover:not(:disabled):not(.upx-pagination__btn--active) { border-color: #1664ff; color: #1664ff; }
.upx-pagination__btn--active { background: #1664ff; color: #fff; border-color: #1664ff; }
.upx-pagination__btn:disabled { opacity: 0.4; cursor: not-allowed; }
.upx-pagination__ellipsis { padding: 0 4px; color: #9ca3af; }
.upx-pagination__size { padding: 4px 8px; border: 1px solid #d1d5db; border-radius: 4px; font-size: 13px; margin-left: 8px; cursor: pointer; }
</style>
