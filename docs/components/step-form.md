# StepForm 步骤表单

多步骤向导表单组件。

## 用法

```vue
<StepForm
  :steps="[{ title: '基本信息' }, { title: '配置' }, { title: '确认' }]"
  :current="currentStep"
  :submit-loading="submitting"
  @next="currentStep++"
  @prev="currentStep--"
  @submit="handleSubmit"
>
  <template #step-0>基本信息表单</template>
  <template #step-1>配置表单</template>
  <template #step-2>确认信息</template>
</StepForm>
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| steps | `StepItem[]` | — | 步骤配置 |
| current | `number` | — | 当前步骤 |
| submitLoading | `boolean` | `false` | 提交 loading |

## Events

| 事件 | 说明 |
|------|------|
| next | 下一步 |
| prev | 上一步 |
| submit | 提交 |
