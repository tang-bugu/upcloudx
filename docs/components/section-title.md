# SectionTitle 分区标题

带左侧色块装饰的分区标题。

## 基础用法

<script setup>
import { SectionTitle } from '../../src/index.ts';
</script>

<SectionTitle title="基本信息" />
<SectionTitle title="高级配置" color="#FF6B35" />
<SectionTitle title="安全设置" color="#22c55e" />

```vue
<SectionTitle title="基本信息" />
<SectionTitle title="高级配置" color="#FF6B35" />
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | `string` | — | 分区标题文字 |
| color | `string` | `#1664FF` | 左侧色块颜色 |
