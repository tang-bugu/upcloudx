<script setup lang="ts">
import { computed } from 'vue';

import { Button, Steps } from 'ant-design-vue';

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
    <Steps :current="props.current" style="margin-bottom: 32px;">
      <Steps.Step v-for="(step, index) in props.steps" :key="index" :title="step.title" :description="step.description" />
    </Steps>
    <div style="margin-bottom: 24px;">
      <slot :name="`step-${props.current}`" />
    </div>
    <div class="upx-step-form__footer">
      <Button v-if="!isFirstStep" @click="emit('prev')">上一步</Button>
      <Button v-if="!isLastStep" type="primary" @click="emit('next')">下一步</Button>
      <Button v-if="isLastStep" type="primary" :loading="props.submitLoading" @click="emit('submit')">提交</Button>
    </div>
  </div>
</template>

<style scoped>
.upx-step-form__footer {
  display: flex;
  gap: 8px;
}
</style>
