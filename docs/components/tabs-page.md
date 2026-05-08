# TabsPage 标签页

带 Tab 切换的页面容器，支持 sessionStorage 持久化。

## 基础用法

<script setup>
import { ref } from 'vue';
import { TabsPage } from '../../src/index.ts';

const activeTab = ref('log');
const tabs = [
  { key: 'log', label: '日志下载' },
  { key: 'prefetch', label: '刷新预取' },
  { key: 'config', label: '配置管理' },
];
</script>

<TabsPage :tabs="tabs" v-model:activeKey="activeTab">
  <template #log>
    <div style="padding:16px;">
      <p>当前标签：日志下载</p>
      <a-button type="primary" size="small">下载日志</a-button>
    </div>
  </template>
  <template #prefetch>
    <div style="padding:16px;">
      <p>当前标签：刷新预取</p>
      <a-button size="small">提交刷新任务</a-button>
    </div>
  </template>
  <template #config>
    <div style="padding:16px;">
      <p>当前标签：配置管理</p>
      <a-button size="small">编辑配置</a-button>
    </div>
  </template>
</TabsPage>

```vue
<script setup>
import { ref } from 'vue';
import { TabsPage } from '@upcloudx/ui';

const activeTab = ref('log');
const tabs = [
  { key: 'log', label: '日志下载' },
  { key: 'prefetch', label: '刷新预取' },
  { key: 'config', label: '配置管理' },
];
</script>

<template>
  <TabsPage :tabs="tabs" v-model:activeKey="activeTab">
    <template #log>日志下载内容</template>
    <template #prefetch>刷新预取内容</template>
    <template #config>配置管理内容</template>
  </TabsPage>
</template>
```

## Card 模式

<TabsPage :tabs="[{ key: 'a', label: '概览' }, { key: 'b', label: '详情' }]" :card="true" active-key="a">
  <template #a><div style="padding:16px;">概览内容</div></template>
  <template #b><div style="padding:16px;">详情内容</div></template>
</TabsPage>

```vue
<TabsPage :tabs="tabs" :card="true" v-model:activeKey="activeTab">
  ...
</TabsPage>
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| tabs | `TabItem[]` | — | Tab 配置数组 |
| activeKey | `string` | — | 激活 Tab（v-model） |
| card | `boolean` | `false` | 是否用 Card 包裹 |
| sessionStorageKey | `string` | — | 持久化 key，刷新后恢复上次 Tab |

## Slots

| 插槽 | 说明 |
|------|------|
| [tab.key] | 以 Tab 的 key 命名的具名插槽 |
