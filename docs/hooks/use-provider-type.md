# useProviderType

厂商类型标识格式化为标准显示名称，大小写不敏感匹配。

## 基础用法

```ts
import { useProviderType } from '@upcloudx/ui';

const { formatProviderType } = useProviderType();

formatProviderType('aws');        // 'AWS'
formatProviderType('AWS');        // 'AWS'（大小写不敏感）
formatProviderType('cloudflare'); // 'Cloudflare'
formatProviderType('gcp');        // 'GCP'
formatProviderType('unknown');    // 'UNKNOWN'（未匹配时返回全大写）
```

## 内置映射

| 标识 | 显示名称 |
|------|----------|
| `aws` | AWS |
| `cloudflare` | Cloudflare |
| `gcp` | GCP |

## 自定义映射

```ts
const { formatProviderType } = useProviderType({
  aws: 'Amazon Web Services',  // 覆盖默认值
  azure: 'Azure',              // 新增映射
  aliyun: '阿里云',
});

formatProviderType('aws');    // 'Amazon Web Services'
formatProviderType('azure');  // 'Azure'
formatProviderType('aliyun'); // '阿里云'
```

## 在表格列中使用

```vue
<script setup>
import { useProviderType } from '@upcloudx/ui';

const { formatProviderType } = useProviderType();

const columns = [
  { title: '域名', dataIndex: 'domain' },
  {
    title: '厂商',
    dataIndex: 'providerType',
    customRender: ({ text }) => formatProviderType(text),
  },
];
</script>
```

## 参数

| 参数 | 类型 | 说明 |
|------|------|------|
| customMap | `Record<string, string>` | 自定义映射，会覆盖同名默认映射 |

## 返回值

| 方法 | 参数 | 返回 | 说明 |
|------|------|------|------|
| formatProviderType | `providerType: string` | `string` | 格式化厂商类型，未匹配返回全大写 |
