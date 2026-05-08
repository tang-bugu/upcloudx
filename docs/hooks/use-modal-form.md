# useModalForm

表单弹窗生命周期管理：打开时数据回显、关闭时自动重置表单、提交时先验证再调用回调。

## 基础用法

```vue
<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useModalForm } from '@upcloudx/ui';
import type { FormInstance } from 'ant-design-vue';

const formRef = ref<FormInstance | null>(null);
const open = ref(false);
const form = reactive({ name: '', domain: '' });
const editingRecord = ref(null);

const { handleCancel, handleSubmit } = useModalForm({
  formRef,
  open,
  onOpen: () => {
    // 编辑时回显数据
    if (editingRecord.value) {
      Object.assign(form, editingRecord.value);
    }
  },
  onClose: () => {
    // 关闭时清理
    editingRecord.value = null;
  },
  onSubmit: async () => {
    await saveApi(form);
    message.success('保存成功');
    open.value = false;
    loadData();
  },
});

function handleEdit(record) {
  editingRecord.value = record;
  open.value = true;
}
</script>

<template>
  <FormModal
    v-model:open="open"
    title="编辑域名"
    @confirm="handleSubmit"
    @cancel="handleCancel"
  >
    <a-form ref="formRef" :model="form" layout="vertical">
      <a-form-item label="名称" name="name" :rules="[{ required: true }]">
        <a-input v-model:value="form.name" />
      </a-form-item>
    </a-form>
  </FormModal>
</template>
```

## 生命周期说明

```
open: false → true  ──→  等待两次 nextTick（确保表单 DOM 渲染）──→  onOpen()（数据回显）
open: true  → false ──→  formRef.resetFields()（自动重置）──→  onClose()（清理）
handleSubmit()      ──→  formRef.validate()（验证失败则中止）──→  onSubmit()
```

## 与 useServerPagination 配合

```ts
const { resetPage, setTotal } = useServerPagination({ loadFn: loadData });

const { handleSubmit } = useModalForm({
  formRef,
  open,
  onSubmit: async () => {
    await saveApi(form);
    open.value = false;
    resetPage();   // 保存后重置到第一页
    loadData();
  },
});
```

## 参数

| 属性 | 类型 | 说明 |
|------|------|------|
| formRef | `Ref<FormInstance>` | 表单组件引用 |
| open | `Ref<boolean>` | 弹窗显示状态 |
| onOpen | `() => void` | 弹窗打开后回调（用于数据回显） |
| onClose | `() => void` | 弹窗关闭后回调（用于清理状态） |
| onSubmit | `() => Promise<void>` | 验证通过后的提交回调 |

## 返回值

| 方法 | 说明 |
|------|------|
| handleCancel | 关闭弹窗（触发 onClose） |
| handleSubmit | 验证表单后执行 onSubmit |
