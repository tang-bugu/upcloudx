<script setup lang="ts">
import { computed } from 'vue';

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

const displayDescription = computed(() => props.description ?? defaultDescriptionMap[props.type ?? 'default']);
</script>

<template>
  <div class="upx-empty-state">
    <!-- 自定义图标插槽 -->
    <slot name="image">
      <svg class="upx-empty-state__icon" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fill-rule="evenodd">
          <ellipse cx="32" cy="33" rx="32" ry="7" fill="currentColor" opacity="0.08" />
          <g stroke="currentColor" opacity="0.4" stroke-width="1.5">
            <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z" />
            <path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35H11.95C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" />
          </g>
        </g>
      </svg>
    </slot>

    <!-- 描述文字 -->
    <slot name="description">
      <p class="upx-empty-state__desc">{{ displayDescription }}</p>
    </slot>

    <!-- 操作区域 -->
    <div v-if="$slots.default" class="upx-empty-state__action">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.upx-empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 0;
}
.upx-empty-state__icon {
  width: 64px;
  height: 41px;
  color: inherit;
  margin-bottom: 8px;
}
.upx-empty-state__desc {
  margin: 0;
  font-size: 14px;
  color: inherit;
  opacity: 0.45;
}
.upx-empty-state__action {
  margin-top: 16px;
}
</style>
