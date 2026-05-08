# useConfirmAction

二次确认弹窗，用于删除、停用等危险操作，封装 `Modal.confirm` 标准调用模式。

## 基础用法

```ts
import { useConfirmAction } from '@upcloudx/ui';

const { confirmDelete, confirmAction } = useConfirmAction();
```

## 删除确认

```ts
function handleDelete(record) {
  confirmDelete({
    title: '删除确认',
    content: `确定删除域名 ${record.domain} 吗？删除后无法恢复。`,
    onOk: async () => {
      await deleteDomainApi(record.id);
      message.success('删除成功');
      loadData();
    },
  });
}
```

## 通用确认（停用/启用等）

```ts
function handleDisable(record) {
  confirmAction({
    title: '停用确认',
    content: `确定停用项目 ${record.name} 吗？停用后用户将无法访问。`,
    okText: '确认停用',
    onOk: async () => {
      await disableProjectApi(record.id);
      message.success('停用成功');
      loadData();
    },
  });
}
```

## 在 ActionButtons 中使用

```vue
<script setup>
import { useConfirmAction } from '@upcloudx/ui';

const { confirmDelete } = useConfirmAction();

const getActions = (record) => [
  { label: '编辑', onClick: () => handleEdit(record) },
  {
    label: '删除',
    danger: true,
    onClick: () => confirmDelete({
      title: '删除确认',
      content: `确定删除 ${record.name} 吗？`,
      onOk: async () => {
        await deleteApi(record.id);
        loadData();
      },
    }),
  },
];
</script>

<template>
  <ActionButtons :actions="getActions(record)" />
</template>
```

## 错误处理

`onOk` 抛出异常时自动通过 `message.error` 展示错误信息，不会导致未处理的 Promise rejection：

```ts
confirmDelete({
  title: '删除确认',
  content: '确定删除吗？',
  onOk: async () => {
    // 如果接口报错，会自动显示 message.error(error.message)
    await deleteApi(id);
  },
});
```

## 返回值

| 方法 | 说明 |
|------|------|
| confirmDelete | 删除确认（语义化封装，功能同 confirmAction） |
| confirmAction | 通用确认操作 |

## ConfirmOptions

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | `string` | — | 弹窗标题 |
| content | `string` | — | 弹窗内容 |
| okText | `string` | `'确定'` | 确认按钮文本 |
| cancelText | `string` | `'取消'` | 取消按钮文本 |
| onOk | `() => Promise<void>` | — | 确认回调 |
