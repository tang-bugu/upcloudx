# useModalForm

表单弹窗生命周期管理（打开回显/关闭重置/提交验证）。

## 用法

```ts
import { ref } from 'vue';
import { useModalForm } from '@upcloudx/ui';

const formRef = ref(null);
const open = ref(false);

const { handleCancel, handleSubmit } = useModalForm({
  formRef,
  open,
  onOpen: () => {
    // 数据回显
  },
  onClose: () => {
    // 清理
  },
  onSubmit: async () => {
    await saveData();
    open.value = false;
  },
});
```

## 参数

| 属性 | 类型 | 说明 |
|------|------|------|
| formRef | `Ref<FormInstance>` | 表单引用 |
| open | `Ref<boolean>` | 弹窗状态 |
| onOpen | `() => void` | 打开回调 |
| onClose | `() => void` | 关闭回调 |
| onSubmit | `() => Promise<void>` | 提交回调 |

## 返回值

| 方法 | 说明 |
|------|------|
| handleCancel | 关闭弹窗 |
| handleSubmit | 验证并提交 |
