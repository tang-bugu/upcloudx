# StatusTag 状态标签

根据状态值渲染对应颜色和文案的标签，支持直接指定、内置预设和自定义映射三种模式。

## 直接指定文本和颜色

<script setup>
import { StatusTag } from '../../src/index.ts';
</script>

<div style="display:flex;gap:8px;margin:12px 0;">
  <StatusTag text="已上线" color="success" />
  <StatusTag text="维护中" color="warning" />
  <StatusTag text="已下线" color="error" />
  <StatusTag text="自定义色" color="#ff8c00" />
</div>

```vue
<StatusTag text="已上线" color="success" />
<StatusTag text="维护中" color="warning" />
<StatusTag text="自定义色" color="#ff8c00" />
```

## 内置预设

**域名状态 (preset="domain")**
<div style="display:flex;gap:8px;margin:12px 0;">
  <StatusTag :status="0" preset="domain" />
  <StatusTag :status="2" preset="domain" />
  <StatusTag :status="4" preset="domain" />
  <StatusTag :status="5" preset="domain" />
</div>

**证书状态 (preset="certificate")**
<div style="display:flex;gap:8px;margin:12px 0;">
  <StatusTag :status="0" preset="certificate" />
  <StatusTag :status="1" preset="certificate" />
  <StatusTag :status="2" preset="certificate" />
  <StatusTag :status="3" preset="certificate" />
</div>

**项目状态 (preset="project")**
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
| text | `string` | — | 直接指定显示文本（优先级最高） |
| color | `string` | — | 直接指定颜色（优先级最高） |
| preset | `'domain' \| 'certificate' \| 'project'` | — | 内置预设 |
| statusMap | `Record<string, { text, color }>` | — | 自定义映射 |
| size | `'default' \| 'small'` | `'default'` | 标签尺寸 |

## 优先级

`text`/`color` > `statusMap` > `preset` > 默认值（'未知'/'default'）
