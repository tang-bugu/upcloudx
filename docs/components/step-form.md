# StepForm 步骤表单

多步骤向导表单组件。

## 基础用法

<script setup>
import { ref, reactive } from 'vue';
import { StepForm } from '../../src/index.ts';

const currentStep = ref(0);
const submitting = ref(false);
const submitted = ref(false);
const form = reactive({ name: '', domain: '', protocol: '' });

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
  Object.assign(form, { name: '', domain: '', protocol: '' });
}
</script>

<div v-if="submitted" style="text-align:center;padding:24px;">
  <p style="font-size:18px;color:#22c55e">✓ 提交成功！</p>
  <button style="padding:6px 16px;border:1px solid var(--upx-border-input,#d1d5db);border-radius:6px;cursor:pointer;background:var(--upx-bg,#fff);color:var(--upx-text,#1f2937)" @click="handleReset">重新填写</button>
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
    <div style="max-width:400px;display:flex;flex-direction:column;gap:12px">
      <label style="font-size:14px">
        <span style="display:block;margin-bottom:4px;color:var(--upx-text-secondary,#6b7280)">项目名称</span>
        <input v-model="form.name" placeholder="请输入项目名称" style="width:100%;padding:6px 10px;border:1px solid var(--upx-border-input,#d1d5db);border-radius:6px;font-size:14px;background:var(--upx-bg,#fff);color:var(--upx-text,#1f2937)" />
      </label>
    </div>
  </template>

  <template #step-1>
    <div style="max-width:400px;display:flex;flex-direction:column;gap:12px">
      <label style="font-size:14px">
        <span style="display:block;margin-bottom:4px;color:var(--upx-text-secondary,#6b7280)">域名</span>
        <input v-model="form.domain" placeholder="请输入域名" style="width:100%;padding:6px 10px;border:1px solid var(--upx-border-input,#d1d5db);border-radius:6px;font-size:14px;background:var(--upx-bg,#fff);color:var(--upx-text,#1f2937)" />
      </label>
      <label style="font-size:14px">
        <span style="display:block;margin-bottom:4px;color:var(--upx-text-secondary,#6b7280)">协议</span>
        <select v-model="form.protocol" style="width:200px;padding:6px 10px;border:1px solid var(--upx-border-input,#d1d5db);border-radius:6px;font-size:14px;background:var(--upx-bg,#fff);color:var(--upx-text,#1f2937)">
          <option value="" disabled>请选择协议</option>
          <option value="http">HTTP</option>
          <option value="https">HTTPS</option>
        </select>
      </label>
    </div>
  </template>

  <template #step-2>
    <div style="max-width:400px;display:grid;grid-template-columns:80px 1fr;gap:8px 16px;font-size:14px;border:1px solid var(--upx-border,#e5e7eb);border-radius:6px;padding:16px">
      <span style="color:var(--upx-text-secondary,#6b7280)">项目名称</span><span>{{ form.name || '（未填写）' }}</span>
      <span style="color:var(--upx-text-secondary,#6b7280)">域名</span><span>{{ form.domain || '（未填写）' }}</span>
      <span style="color:var(--upx-text-secondary,#6b7280)">协议</span><span>{{ form.protocol || '（未选择）' }}</span>
    </div>
  </template>
</StepForm>

```vue
<script setup>
import { ref, reactive } from 'vue';
import { StepForm } from '@upcloudx/ui';

const currentStep = ref(0);
const submitting = ref(false);
const form = reactive({ name: '', domain: '', protocol: '' });

const steps = [
  { title: '基本信息' },
  { title: '配置' },
  { title: '确认' },
];

async function handleSubmit() {
  submitting.value = true;
  await saveData(form);
  submitting.value = false;
}
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
    <template #step-0>
      <label>项目名称 <input v-model="form.name" /></label>
    </template>
    <template #step-1>
      <label>域名 <input v-model="form.domain" /></label>
      <label>协议
        <select v-model="form.protocol">
          <option value="http">HTTP</option>
          <option value="https">HTTPS</option>
        </select>
      </label>
    </template>
    <template #step-2>
      <p>项目名称：{{ form.name }}</p>
      <p>域名：{{ form.domain }}</p>
      <p>协议：{{ form.protocol }}</p>
    </template>
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
