# CopyText 复制文本

带一键复制功能的文本展示组件。

## 基础用法

<script setup>
import { CopyText } from '../../src/index.ts';
</script>

<CopyText text="example.com" />

## 限制宽度

<CopyText text="this-is-a-very-long-domain-name.example.com" max-width="200px" />

```vue
<CopyText text="example.com" />
<CopyText text="long-text..." max-width="200px" />
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| text | `string` | — | 要展示和复制的文本 |
| maxWidth | `string` | — | 文本最大宽度 |
| successMessage | `string` | `'已复制到剪贴板'` | 复制成功提示 |
