# DetailCard 详情卡片

支持只读/编辑切换的详情信息卡片。

## 用法

```vue
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
