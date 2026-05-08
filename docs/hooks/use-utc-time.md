# useUtcTime

UTC 时间格式化为本地时间。

## 用法

```ts
import { useUtcTime } from '@upcloudx/ui';

const { formatUtcTime } = useUtcTime();

formatUtcTime('2024-01-15T10:30:00Z'); // '2024-01-15 18:30:00'
formatUtcTime(null);      // '-'
formatUtcTime(undefined); // '-'
formatUtcTime('');        // '-'
```

## 返回值

| 方法 | 参数 | 返回 | 说明 |
|------|------|------|------|
| formatUtcTime | `string \| null \| undefined` | `string` | 格式化为 YYYY-MM-DD HH:mm:ss |
