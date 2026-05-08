# CopyText 复制文本

带一键复制功能的文本展示组件，支持 Clipboard API，自动降级到 execCommand。

## 基础用法

<script setup>
import { CopyText } from '../../src/index.ts';
</script>

<CopyText text="example.com" />

```vue
<CopyText text="example.com" />
```

## 限制宽度

超出宽度显示省略号，悬停显示完整文本。

<CopyText text="this-is-a-very-long-domain-name.example.com" max-width="200px" />

```vue
<CopyText text="this-is-a-very-long-domain-name.example.com" max-width="200px" />
```

## 自定义成功提示

```vue
<CopyText text="abc-123-xyz" success-message="证书 ID 已复制" />
```

## 在表格中使用

```vue
<template #bodyCell="{ column, record }">
  <CopyText v-if="column.key === 'domain'" :text="record.domain" max-width="160px" />
  <CopyText v-if="column.key === 'certId'" :text="record.certId" success-message="证书 ID 已复制" />
</template>
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| text | `string` | — | 要展示和复制的文本 |
| maxWidth | `string` | — | 文本最大宽度，超出省略 |
| successMessage | `string` | `'已复制到剪贴板'` | 复制成功提示文案 |
