<script setup lang="ts">
import { computed } from 'vue';

import type { StepItem } from './types';

interface StepFormProps {
  steps: StepItem[];
  current: number;
  submitLoading?: boolean;
}

const props = withDefaults(defineProps<StepFormProps>(), {
  submitLoading: false,
});

const emit = defineEmits<{
  next: [];
  prev: [];
  submit: [];
}>();

const isLastStep = computed(() => props.current === props.steps.length - 1);
const isFirstStep = computed(() => props.current === 0);
</script>

<template>
  <div>
    <div class="upx-steps">
      <template v-for="(step, index) in props.steps" :key="index">
        <div class="upx-steps__item" :class="{ 'upx-steps__item--active': index === props.current, 'upx-steps__item--done': index < props.current }">
          <div class="upx-steps__indicator">
            <span v-if="index < props.current">✓</span>
            <span v-else>{{ index + 1 }}</span>
          </div>
          <div class="upx-steps__info">
            <div class="upx-steps__title">{{ step.title }}</div>
            <div v-if="step.description" class="upx-steps__desc">{{ step.description }}</div>
          </div>
        </div>
        <div v-if="index < props.steps.length - 1" class="upx-steps__connector" :class="{ 'upx-steps__connector--done': index < props.current }"></div>
      </template>
    </div>
    <div style="margin-bottom: 24px;">
      <slot :name="`step-${props.current}`" />
    </div>
    <div class="upx-step-form__footer">
      <button v-if="!isFirstStep" type="button" class="upx-btn" @click="emit('prev')">上一步</button>
      <button v-if="!isLastStep" type="button" class="upx-btn upx-btn--primary" @click="emit('next')">下一步</button>
      <button v-if="isLastStep" type="button" class="upx-btn upx-btn--primary" :disabled="props.submitLoading" @click="emit('submit')">
        {{ props.submitLoading ? '提交中...' : '提交' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.upx-steps { display: flex; align-items: center; margin-bottom: 32px; }
.upx-steps__item { display: flex; align-items: center; }
.upx-steps__indicator { width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 500; border: 2px solid #d1d5db; color: #6b7280; background: #fff; flex-shrink: 0; }
.upx-steps__item--active .upx-steps__indicator { border-color: #1664ff; color: #1664ff; }
.upx-steps__item--done .upx-steps__indicator { border-color: #1664ff; background: #1664ff; color: #fff; }
.upx-steps__info { margin-left: 8px; }
.upx-steps__title { font-size: 14px; font-weight: 500; color: #374151; }
.upx-steps__item--active .upx-steps__title { color: #1664ff; }
.upx-steps__desc { font-size: 12px; color: #9ca3af; margin-top: 2px; }
.upx-steps__connector { flex: 1; height: 1px; background: #e5e7eb; margin: 0 12px; min-width: 32px; }
.upx-steps__connector--done { background: #1664ff; }
.upx-step-form__footer { display: flex; gap: 8px; }
.upx-btn { padding: 6px 16px; border-radius: 6px; font-size: 14px; cursor: pointer; border: 1px solid #d1d5db; background: #fff; transition: all 0.15s; }
.upx-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.upx-btn--primary { background: #1664ff; color: #fff; border-color: #1664ff; }
.upx-btn--primary:hover:not(:disabled) { background: #1250d4; }
</style>
