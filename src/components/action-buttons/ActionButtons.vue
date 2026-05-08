<script setup lang="ts">
import { computed } from 'vue';

import { Button, Dropdown, Menu, Space, Tooltip } from 'ant-design-vue';

import type { ActionItem } from './types';

interface Props {
  actions: ActionItem[];
  maxVisible?: number;
}

const props = defineProps<Props>();

const visibleActions = computed(() => {
  if (props.maxVisible === undefined) return props.actions;
  return props.actions.slice(0, props.maxVisible);
});

const hiddenActions = computed(() => {
  if (props.maxVisible === undefined) return [];
  return props.actions.slice(props.maxVisible);
});

const hasDropdown = computed(() => hiddenActions.value.length > 0);

function resolveDisabled(disabled?: boolean | (() => boolean)): boolean {
  if (disabled === undefined) return false;
  if (typeof disabled === 'function') return disabled();
  return disabled;
}
</script>

<template>
  <Space :size="4">
    <template v-for="action in visibleActions" :key="action.label">
      <Tooltip v-if="action.tooltip" :title="action.tooltip">
        <Button
          type="link"
          :disabled="resolveDisabled(action.disabled)"
          :style="action.danger && !resolveDisabled(action.disabled) ? { color: '#FA5749', padding: 0 } : { padding: 0 }"
          @click="action.onClick"
        >
          {{ action.label }}
        </Button>
      </Tooltip>
      <Button
        v-else
        type="link"
        :disabled="resolveDisabled(action.disabled)"
        :style="action.danger && !resolveDisabled(action.disabled) ? { color: '#FA5749', padding: 0 } : { padding: 0 }"
        @click="action.onClick"
      >
        {{ action.label }}
      </Button>
    </template>

    <Dropdown v-if="hasDropdown" placement="bottomRight">
      <Button type="link" :style="{ padding: 0 }">更多</Button>
      <template #overlay>
        <Menu>
          <Menu.Item
            v-for="action in hiddenActions"
            :key="action.label"
            :disabled="resolveDisabled(action.disabled)"
            @click="!resolveDisabled(action.disabled) && action.onClick()"
          >
            <span :style="action.danger && !resolveDisabled(action.disabled) ? { color: '#FA5749' } : {}">
              {{ action.label }}
            </span>
          </Menu.Item>
        </Menu>
      </template>
    </Dropdown>
  </Space>
</template>
