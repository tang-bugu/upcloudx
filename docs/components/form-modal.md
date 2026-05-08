# FormModal 表单弹窗

封装 Modal，适用于新增/编辑表单弹窗。

## 用法

```vue
<FormModal v-model:open="visible" title="新增用户" :loading="submitting" @confirm="handleSubmit">
  <a-form :model="form" layout="vertical">
    <a-form-item label="姓名"><a-input v-model:value="form.name" /></a-form-item>
  </a-form>
</FormModal>
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| open | `boolean` | — | 是否可见（v-model） |
| title | `string` | — | 弹窗标题 |
| loading | `boolean` | `false` | 确定按钮 loading |
| width | `number \| string` | `520` | 弹窗宽度 |
| destroyOnClose | `boolean` | `true` | 关闭时销毁 |

## Events

| 事件 | 说明 |
|------|------|
| confirm | 点击确定 |
| cancel | 点击取消 |
