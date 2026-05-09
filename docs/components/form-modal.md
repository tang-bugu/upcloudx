# FormModal 表单弹窗

封装 Modal，适用于新增/编辑表单弹窗。

## 基础用法

<script setup>
import { ref, reactive } from 'vue';
import { FormModal } from '../../src/index.ts';

const visible = ref(false);
const submitting = ref(false);
const form = reactive({ name: '', domain: '' });

async function handleSubmit() {
  submitting.value = true;
  await new Promise(r => setTimeout(r, 800));
  submitting.value = false;
  visible.value = false;
}
</script>

<button style="padding:6px 16px;background:var(--upx-primary,#1664ff);color:#fff;border:none;border-radius:6px;cursor:pointer" @click="visible = true">新增域名</button>

<FormModal
  v-model:open="visible"
  title="新增域名"
  :loading="submitting"
  @confirm="handleSubmit"
>
  <div style="display:flex;flex-direction:column;gap:12px">
    <label style="font-size:14px">
      <span style="display:block;margin-bottom:4px">名称</span>
      <input v-model="form.name" placeholder="请输入名称" style="width:100%;padding:6px 10px;border:1px solid var(--upx-border-input,#d1d5db);border-radius:6px;font-size:14px;background:var(--upx-bg,#fff);color:var(--upx-text,#1f2937)" />
    </label>
    <label style="font-size:14px">
      <span style="display:block;margin-bottom:4px">域名</span>
      <input v-model="form.domain" placeholder="请输入域名" style="width:100%;padding:6px 10px;border:1px solid var(--upx-border-input,#d1d5db);border-radius:6px;font-size:14px;background:var(--upx-bg,#fff);color:var(--upx-text,#1f2937)" />
    </label>
  </div>
</FormModal>

```vue
<script setup>
import { ref, reactive } from 'vue';
import { FormModal } from '@upcloudx/ui';

const visible = ref(false);
const submitting = ref(false);
const form = reactive({ name: '', domain: '' });

async function handleSubmit() {
  submitting.value = true;
  await saveData(form);
  submitting.value = false;
  visible.value = false;
}
</script>

<template>
  <button @click="visible = true">新增</button>

  <FormModal
    v-model:open="visible"
    title="新增域名"
    :loading="submitting"
    @confirm="handleSubmit"
  >
    <form>
      <label>名称 <input v-model="form.name" /></label>
      <label>域名 <input v-model="form.domain" /></label>
    </form>
  </FormModal>
</template>
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| open | `boolean` | — | 是否可见（v-model） |
| title | `string` | — | 弹窗标题 |
| loading | `boolean` | `false` | 确定按钮 loading，loading 时取消按钮禁用 |
| width | `number \| string` | `520` | 弹窗宽度 |
| destroyOnClose | `boolean` | `true` | 关闭时销毁内部状态 |

## Events

| 事件 | 说明 |
|------|------|
| confirm | 点击确定 |
| cancel | 点击取消/关闭 |
| update:open | 状态变化（v-model） |
