# CurrencyDisplay 货币展示

使用 Intl.NumberFormat 格式化金额。

## 基础用法

<script setup>
import { CurrencyDisplay } from '../../src/index.ts';
</script>

<div style="display:flex;flex-direction:column;gap:8px;margin:16px 0;">
  <div>默认：<CurrencyDisplay :amount="1234.56" /></div>
  <div>美元：<CurrencyDisplay :amount="999.99" currency="USD" /></div>
  <div>隐藏符号：<CurrencyDisplay :amount="1234.56" :show-symbol="false" /></div>
</div>

## 正负值着色

<div style="display:flex;gap:16px;margin:16px 0;">
  <span>收入：<CurrencyDisplay :amount="500" :colorize="true" /></span>
  <span>支出：<CurrencyDisplay :amount="-99.99" :colorize="true" /></span>
</div>

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| amount | `number` | — | 金额 |
| currency | `string` | `'CNY'` | 货币代码 |
| precision | `number` | `2` | 小数位数 |
| showSymbol | `boolean` | `true` | 显示货币符号 |
| colorize | `boolean` | `false` | 正负值着色 |
| loading | `boolean` | `false` | 骨架屏 |
