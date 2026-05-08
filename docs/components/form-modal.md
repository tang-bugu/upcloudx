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

<a-button type="primary" @click="visible = true">新增域名</a-button>

<FormModal
  v-model:open="visible"
  title="新增域名"
  :loading="submitting"
  @confirm="handleSubmit"
>
  <a-form :model="form" layout="vertical">
    <a-form-item label="名称">
      <a-input v-model:value="form.name" placeholder="请输入名称" />
    </a-form-item>
    <a-form-item label="域名">
      <a-input v-model:value="form.domain" placeholder="请输入域名" />
    </a-form-item>
  </a-form>
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
  <Button type="primary" @click="visible = true">新增</Button>

  <FormModal
    v-model:open="visible"
    title="新增域名"
    :loading="submitting"
    @confirm="handleSubmit"
  >
    <a-form :model="form" layout="vertical">
      <a-form-item label="名称">
        <a-input v-model:value="form.name" />
      </a-form-item>
    </a-form>
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
