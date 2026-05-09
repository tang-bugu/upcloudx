<script setup lang="ts">
import { computed, ref } from 'vue';

import { DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuRoot, DropdownMenuTrigger } from 'radix-vue';

import type { ActionItem } from './types';

interface Props {
  actions: ActionItem[];
  maxVisible?: number;
}

const props = defineProps<Props>();

const visibleActions = computed(() => props.maxVisible === undefined ? props.actions : props.actions.slice(0, props.maxVisible));
const hiddenActions = computed(() => props.maxVisible === undefined ? [] : props.actions.slice(props.maxVisible));
const hasDropdown = computed(() => hiddenActions.value.length > 0);
const dropdownOpen = ref(false);

function resolveDisabled(disabled?: boolean | (() => boolean)): boolean {
  return typeof disabled === 'function' ? disabled() : !!disabled;
}
</script>

<template>
  <div class="upx-action-buttons">
    <template v-for="action in visibleActions" :key="action.label">
      <button
        type="button"
        class="upx-action-btn"
        :class="{ 'upx-action-btn--danger': action.danger && !resolveDisabled(action.disabled) }"
        :disabled="resolveDisabled(action.disabled)"
        :title="action.tooltip"
        @click="action.onClick"
      >
        {{ action.label }}
      </button>
    </template>

    <DropdownMenuRoot v-if="hasDropdown" v-model:open="dropdownOpen">
      <DropdownMenuTrigger as-child>
        <button type="button" class="upx-action-btn">更多</button>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent class="upx-dropdown-content" :side-offset="4" align="end">
          <DropdownMenuItem
            v-for="action in hiddenActions"
            :key="action.label"
            class="upx-dropdown-item"
            :class="{ 'upx-dropdown-item--danger': action.danger }"
            :disabled="resolveDisabled(action.disabled)"
            @select="action.onClick"
          >
            {{ action.label }}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenuRoot>
  </div>
</template>

<style scoped>
.upx-action-buttons { display: inline-flex; align-items: center; gap: 4px; }
.upx-action-btn { background: none; border: none; color: #1664ff; cursor: pointer; font-size: 14px; padding: 2px 4px; transition: color 0.15s; }
.upx-action-btn:hover:not(:disabled) { color: #1250d4; }
.upx-action-btn:disabled { color: #9ca3af; cursor: not-allowed; }
.upx-action-btn--danger { color: #FA5749; }
.upx-action-btn--danger:hover:not(:disabled) { color: #dc2626; }
</style>

<style>
.upx-dropdown-content { background: #fff; border-radius: 8px; padding: 4px; box-shadow: 0 4px 16px rgba(0,0,0,0.12); z-index: 10000; min-width: 100px; animation: upx-scale-in 0.1s ease; }
.upx-dropdown-item { padding: 6px 12px; font-size: 14px; border-radius: 4px; cursor: pointer; outline: none; transition: background 0.1s; }
.upx-dropdown-item:hover, .upx-dropdown-item[data-highlighted] { background: #f3f4f6; }
.upx-dropdown-item[data-disabled] { color: #9ca3af; cursor: not-allowed; }
.upx-dropdown-item--danger { color: #FA5749; }
@keyframes upx-scale-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
</style>
