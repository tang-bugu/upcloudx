<script setup lang="ts">
import { computed } from 'vue';

import { Empty } from 'ant-design-vue';

type EmptyType = 'default' | 'error' | 'search';

interface Props {
  description?: string;
  type?: EmptyType;
}

const props = withDefaults(defineProps<Props>(), {
  description: undefined,
  type: 'default',
});

const defaultDescriptionMap: Record<EmptyType, string> = {
  default: '暂无数据',
  search: '未找到匹配结果，请调整搜索条件',
  error: '加载失败，请稍后重试',
};

const imageMap: Record<EmptyType, string> = {
  default: Empty.PRESENTED_IMAGE_SIMPLE,
  search: Empty.PRESENTED_IMAGE_SIMPLE,
  error: Empty.PRESENTED_IMAGE_DEFAULT,
};

const displayDescription = computed(() => props.description ?? defaultDescriptionMap[props.type ?? 'default']);
const displayImage = computed(() => imageMap[props.type ?? 'default']);
</script>

<template>
  <div class="upx-empty-state">
    <Empty :description="displayDescription" :image="displayImage">
      <template v-if="$slots.action" #default>
        <div style="margin-top: 16px;">
          <slot name="action" />
        </div>
      </template>
    </Empty>
  </div>
</template>

<style scoped>
.upx-empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 0;
  color: inherit;
}
.upx-empty-state :deep(.ant-empty-description) {
  color: inherit;
  opacity: 0.65;
}
</style>
