# CurrencyDisplay 货币展示

使用 Intl.NumberFormat 格式化金额，默认最多 6 位小数（不补零）。

## 基础用法

<script setup>
import { CurrencyDisplay } from '../../src/index.ts';
</script>

<div style="display:flex;flex-direction:column;gap:8px;margin:16px 0;">
  <div>默认（CNY）：<CurrencyDisplay :amount="1234.56" /></div>
  <div>美元：<CurrencyDisplay :amount="999.99" currency="USD" /></div>
  <div>隐藏符号：<CurrencyDisplay :amount="1234.56" :show-symbol="false" /></div>
  <div>多位小数：<CurrencyDisplay :amount="0.123456" /></div>
  <div>整数不补零：<CurrencyDisplay :amount="100" /></div>
</div>

```vue
<div>默认（CNY）：<CurrencyDisplay :amount="1234.56" /></div>
<div>美元：<CurrencyDisplay :amount="999.99" currency="USD" /></div>
<div>隐藏符号：<CurrencyDisplay :amount="1234.56" :show-symbol="false" /></div>
<div>多位小数：<CurrencyDisplay :amount="0.123456" /></div>
<div>整数不补零：<CurrencyDisplay :amount="100" /></div>
```

## 自定义大小和颜色

<div style="display:flex;gap:16px;align-items:baseline;margin:16px 0;">
  <CurrencyDisplay :amount="12345.67" :font-size="24" color="#1664FF" />
  <CurrencyDisplay :amount="999" :font-size="18" color="#22c55e" />
  <CurrencyDisplay :amount="-50.5" :font-size="14" color="#ef4444" />
</div>

```vue
<CurrencyDisplay :amount="12345.67" :font-size="24" color="#1664FF" />
<CurrencyDisplay :amount="999" :font-size="18" color="#22c55e" />
<CurrencyDisplay :amount="-50.5" :font-size="14" color="#ef4444" />
```

## 正负值着色

<div style="display:flex;gap:16px;margin:16px 0;">
  <span>收入：<CurrencyDisplay :amount="500" :colorize="true" /></span>
  <span>支出：<CurrencyDisplay :amount="-99.99" :colorize="true" /></span>
  <span>零值：<CurrencyDisplay :amount="0" :colorize="true" /></span>
</div>

```vue
<span>收入：<CurrencyDisplay :amount="500" :colorize="true" /></span>
<span>支出：<CurrencyDisplay :amount="-99.99" :colorize="true" /></span>
<span>零值：<CurrencyDisplay :amount="0" :colorize="true" /></span>
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| amount | `number` | — | 金额数值 |
| currency | `string` | `'CNY'` | ISO 4217 货币代码 |
| precision | `number` | `6` | 最多小数位数（不补零） |
| showSymbol | `boolean` | `true` | 是否显示货币符号 |
| colorize | `boolean` | `false` | 正负值着色 |
| color | `string` | — | 自定义文本颜色（优先级高于 colorize） |
| fontSize | `number \| string` | — | 文本大小（数字为 px） |
| loading | `boolean` | `false` | 骨架屏占位 |
