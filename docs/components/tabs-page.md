# TabsPage 标签页

带 Tab 切换的页面容器，支持 sessionStorage 持久化。

## 用法

```vue
<TabsPage
  :tabs="[{ key: 'log', label: '日志下载' }, { key: 'prefetch', label: '刷新预取' }]"
  v-model:activeKey="activeTab"
  :card="true"
  session-storage-key="cdn-ops-tab"
>
  <template #log>日志内容</template>
  <template #prefetch>预取内容</template>
</TabsPage>
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| tabs | `TabItem[]` | — | Tab 配置 |
| activeKey | `string` | — | 激活 Tab（v-model） |
| card | `boolean` | `false` | Card 包裹 |
| sessionStorageKey | `string` | — | 持久化 key |
