# StepForm 步骤表单

多步骤向导表单组件。

## 基础用法

<script setup>
import { ref, reactive } from 'vue';
import { StepForm } from '../../src/index.ts';

const currentStep = ref(0);
const submitting = ref(false);
const submitted = ref(false);
const form = reactive({ name: '', domain: '', protocol: undefined });

const steps = [
  { title: '基本信息' },
  { title: '配置' },
  { title: '确认' },
];

async function handleSubmit() {
  submitting.value = true;
  await new Promise(r => setTimeout(r, 800));
  submitting.value = false;
  submitted.value = true;
  currentStep.value = 0;
}

function handleReset() {
  submitted.value = false;
  Object.assign(form, { name: '', domain: '', protocol: undefined });
}
</script>

<div v-if="submitted" style="text-align:center;padding:24px;">
  <a-result status="success" title="提交成功！">
    <template #extra>
      <a-button @click="handleReset">重新填写</a-button>
    </template>
  </a-result>
</div>

<StepForm
  v-else
  :steps="steps"
  :current="currentStep"
  :submit-loading="submitting"
  @next="currentStep++"
  @prev="currentStep--"
  @submit="handleSubmit"
>
  <template #step-0>
    <a-form layout="vertical" style="max-width:400px;">
      <a-form-item label="项目名称">
        <a-input v-model:value="form.name" placeholder="请输入项目名称" />
      </a-form-item>
    </a-form>
  </template>

  <template #step-1>
    <a-form layout="vertical" style="max-width:400px;">
      <a-form-item label="域名">
        <a-input v-model:value="form.domain" placeholder="请输入域名" />
      </a-form-item>
      <a-form-item label="协议">
        <a-select v-model:value="form.protocol" placeholder="请选择协议" style="width:200px;">
          <a-select-option value="http">HTTP</a-select-option>
          <a-select-option value="https">HTTPS</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </template>

  <template #step-2>
    <a-descriptions :column="1" bordered style="max-width:400px;">
      <a-descriptions-item label="项目名称">{{ form.name || '（未填写）' }}</a-descriptions-item>
      <a-descriptions-item label="域名">{{ form.domain || '（未填写）' }}</a-descriptions-item>
      <a-descriptions-item label="协议">{{ form.protocol || '（未选择）' }}</a-descriptions-item>
    </a-descriptions>
  </template>
</StepForm>

```vue
<script setup>
import { ref } from 'vue';
import { StepForm } from '@upcloudx/ui';

const currentStep = ref(0);
const submitting = ref(false);

const steps = [
  { title: '基本信息' },
  { title: '配置' },
  { title: '确认' },
];
</script>

<template>
  <StepForm
    :steps="steps"
    :current="currentStep"
    :submit-loading="submitting"
    @next="currentStep++"
    @prev="currentStep--"
    @submit="handleSubmit"
  >
    <template #step-0>基本信息表单</template>
    <template #step-1>配置表单</template>
    <template #step-2>确认信息</template>
  </StepForm>
</template>
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| steps | `StepItem[]` | — | 步骤配置 |
| current | `number` | — | 当前步骤（0-indexed） |
| submitLoading | `boolean` | `false` | 提交按钮 loading |

## Events

| 事件 | 说明 |
|------|------|
| next | 点击下一步 |
| prev | 点击上一步 |
| submit | 点击提交 |

## Slots

| 插槽 | 说明 |
|------|------|
| step-{n} | 第 n 步的内容（从 0 开始） |
