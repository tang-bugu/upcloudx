# StatusTag 状态标签

根据状态值渲染对应颜色和文案的标签。

## 内置预设

<script setup>
import { StatusTag } from '../../src/index.ts';
</script>

**域名状态**
<div style="display:flex;gap:8px;margin:12px 0;">
  <StatusTag :status="0" preset="domain" />
  <StatusTag :status="2" preset="domain" />
  <StatusTag :status="4" preset="domain" />
  <StatusTag :status="5" preset="domain" />
</div>

**证书状态**
<div style="display:flex;gap:8px;margin:12px 0;">
  <StatusTag :status="0" preset="certificate" />
  <StatusTag :status="1" preset="certificate" />
  <StatusTag :status="2" preset="certificate" />
  <StatusTag :status="3" preset="certificate" />
</div>

**项目状态**
<div style="display:flex;gap:8px;margin:12px 0;">
  <StatusTag :status="0" preset="project" />
  <StatusTag :status="1" preset="project" />
  <StatusTag :status="2" preset="project" />
</div>

```vue
<StatusTag :status="4" preset="domain" />
```

## 自定义映射

<div style="display:flex;gap:8px;margin:12px 0;">
  <StatusTag :status="0" :status-map="{ 0: { text: '待审核', color: 'processing' }, 1: { text: '已通过', color: 'success' } }" />
  <StatusTag :status="1" :status-map="{ 0: { text: '待审核', color: 'processing' }, 1: { text: '已通过', color: 'success' } }" />
</div>

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| status | `number \| string` | — | 状态值 |
| preset | `'domain' \| 'certificate' \| 'project'` | — | 内置预设 |
| statusMap | `Record<string, { text, color }>` | — | 自定义映射 |
| size | `'default' \| 'small'` | `'default'` | 标签尺寸 |
