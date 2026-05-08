# StatCard 统计卡片

统计数据卡片，支持趋势箭头和骨架屏。

## 基础用法

<script setup>
import { StatCard, CurrencyDisplay } from '../../src/index.ts';
</script>

<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin:16px 0;">
  <StatCard label="总域名数" :value="1024" unit="个" color="#1664FF" />
  <StatCard label="今日流量" :value="256" unit="GB" color="#22c55e" :trend="{ value: 12.5, direction: 'up' }" />
  <StatCard label="异常告警" :value="3" unit="条" color="#ef4444" :trend="{ value: 8.2, direction: 'down' }" />
</div>

```vue
<StatCard label="总域名数" :value="1024" unit="个" color="#1664FF" />
<StatCard
  label="今日流量"
  :value="256"
  unit="GB"
  color="#22c55e"
  :trend="{ value: 12.5, direction: 'up' }"
/>
<StatCard
  label="异常告警"
  :value="3"
  unit="条"
  color="#ef4444"
  :trend="{ value: 8.2, direction: 'down' }"
/>
```

## 加载状态

<div style="max-width:300px;margin:16px 0;">
  <StatCard label="加载中" :value="0" :loading="true" />
</div>

```vue
<StatCard label="加载中" :value="0" :loading="true" />
```

## 自定义 value 插槽

<div style="max-width:300px;margin:16px 0;">
  <StatCard label="账户余额">
    <template #value>
      <CurrencyDisplay :amount="12345.67" :colorize="true" />
    </template>
  </StatCard>
</div>

```vue
<StatCard label="账户余额">
  <template #value>
    <CurrencyDisplay :amount="12345.67" :colorize="true" />
  </template>
</StatCard>
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| label | `string` | — | 指标名称 |
| value | `number \| string` | — | 统计数值 |
| unit | `string` | — | 数值单位 |
| color | `string` | — | 主题颜色 |
| loading | `boolean` | `false` | 骨架屏 |
| trend | `{ value: number; direction: 'up' \| 'down' }` | — | 趋势信息 |

## Slots

| 插槽 | 说明 |
|------|------|
| value | 自定义数值区域内容 |
