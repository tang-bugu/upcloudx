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
    <div style="display:grid;grid-template-columns:80px 1fr;gap:12px 16px;font-size:14px">
      <span style="color:var(--upx-text-secondary)">域名</span>
      <span>{{ domain }}</span>
      <span style="color:var(--upx-text-secondary)">状态</span>
      <span>已生效</span>
    </div>
  </template>
  <template #edit>
    <div style="display:flex;flex-direction:column;gap:12px">
      <label style="font-size:14px">
        <span style="display:block;margin-bottom:4px;color:var(--upx-text-secondary)">域名</span>
        <input v-model="editDomain" style="width:100%;padding:6px 10px;border:1px solid var(--upx-border-input);border-radius:6px;font-size:14px;background:var(--upx-bg);color:var(--upx-text)" />
      </label>
    </div>
  </template>
</DetailCard>

```vue
<script setup>
import { ref } from 'vue';
import { DetailCard } from '@upcloudx/ui';

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
    <template #view>
      <div>域名：{{ domain }}</div>
      <div>状态：已生效</div>
    </template>
    <template #edit>
      <label>
        域名
        <input v-model="editDomain" />
      </label>
    </template>
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
