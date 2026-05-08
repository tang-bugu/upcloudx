# DetailCard 详情卡片

支持只读/编辑切换的详情信息卡片。

## 基础用法

<script setup>
import { ref } from 'vue';
import { DetailCard } from '../../src/index.ts';

const isEditing = ref(false);
const saveLoading = ref(false);
const domain = ref('example.com');
const editDomain = ref('example.com');

async function handleSave() {
  saveLoading.value = true;
  await new Promise(r => setTimeout(r, 800));
  domain.value = editDomain.value;
  saveLoading.value = false;
  isEditing.value = false;
}
</script>

<DetailCard
  title="基本信息"
  :editable="true"
  :is-editing="isEditing"
  :save-loading="saveLoading"
  @edit="isEditing = true"
  @save="handleSave"
  @cancel="isEditing = false"
>
  <template #view>
    <a-descriptions :column="1">
      <a-descriptions-item label="域名">{{ domain }}</a-descriptions-item>
      <a-descriptions-item label="状态">已生效</a-descriptions-item>
    </a-descriptions>
  </template>
  <template #edit>
    <a-form layout="vertical">
      <a-form-item label="域名">
        <a-input v-model:value="editDomain" />
      </a-form-item>
    </a-form>
  </template>
</DetailCard>

```vue
<script setup>
import { ref } from 'vue';
import { DetailCard } from '@upcloudx/ui';

const isEditing = ref(false);
const saveLoading = ref(false);
</script>

<template>
  <DetailCard
    title="基本信息"
    :editable="true"
    :is-editing="isEditing"
    :save-loading="saveLoading"
    @edit="isEditing = true"
    @save="handleSave"
    @cancel="isEditing = false"
  >
    <template #view>只读内容</template>
    <template #edit>编辑表单</template>
  </DetailCard>
</template>
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | `string` | — | 卡片标题 |
| editable | `boolean` | `false` | 显示编辑按钮 |
| isEditing | `boolean` | `false` | 编辑模式 |
| loading | `boolean` | `false` | 内容 loading |
| saveLoading | `boolean` | `false` | 保存 loading |

## Events

| 事件 | 说明 |
|------|------|
| edit | 点击编辑 |
| save | 点击保存 |
| cancel | 点击取消 |

## Slots

| 插槽 | 说明 |
|------|------|
| view | 只读模式内容 |
| edit | 编辑模式内容 |
