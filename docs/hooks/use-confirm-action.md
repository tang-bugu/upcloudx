# useConfirmAction

二次确认弹窗，用于删除/停用等危险操作。

## 用法

```ts
import { useConfirmAction } from '@upcloudx/ui';

const { confirmDelete, confirmAction } = useConfirmAction();

// 删除确认
confirmDelete({
  title: '删除确认',
  content: '确定要删除该记录吗？',
  onOk: async () => {
    await deleteRecord(id);
  },
});

// 通用确认
confirmAction({
  title: '停用确认',
  content: '确定要停用该账号吗？',
  okText: '确认停用',
  onOk: async () => {
    await disableAccount(id);
  },
});
```

## 返回值

| 方法 | 说明 |
|------|------|
| confirmDelete | 删除确认（语义化） |
| confirmAction | 通用确认 |

## ConfirmOptions

| 属性 | 类型 | 说明 |
|------|------|------|
| title | `string` | 弹窗标题 |
| content | `string` | 弹窗内容 |
| okText | `string` | 确认按钮文本 |
| cancelText | `string` | 取消按钮文本 |
| onOk | `() => Promise<void>` | 确认回调 |
