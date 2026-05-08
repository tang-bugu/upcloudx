# useDictData

封装字典数据加载的通用模式，统一管理请求状态和数据存储，消除重复的 `ref([])` + `ref(false)` + `try/finally` 样板代码。

## 基础用法

```ts
import { useDictData } from '@upcloudx/ui';
import { getProviderTypeDictApi } from '#/api';

const { list, loading, load } = useDictData(getProviderTypeDictApi);

// 手动触发加载
onMounted(() => load());
```

## 挂载时自动加载

```ts
const { list, loading } = useDictData(getProviderTypeDictApi, { immediate: true });
```

## 转换为 Select options

```ts
import { computed } from 'vue';
import { useDictData } from '@upcloudx/ui';
import { getProviderTypeDictApi } from '#/api';

const { list: providerTypeList, loading } = useDictData(getProviderTypeDictApi, { immediate: true });

const providerTypeOptions = computed(() =>
  providerTypeList.value.map(item => ({
    label: item.dictLabel,
    value: item.dictValue,
  }))
);
```

## 替换重复代码

**替换前（每个组件重复写）：**

```ts
const providerTypeList = ref<DictDataItem[]>([]);
const loadingProviderTypeList = ref(false);

const loadProviderTypeList = async () => {
  try {
    loadingProviderTypeList.value = true;
    const result = await getProviderTypeDictApi();
    if (result.code === 0 && result.data) {
      providerTypeList.value = result.data;
    }
  } catch (error) {
    console.error('获取厂商类型字典失败:', error);
  } finally {
    loadingProviderTypeList.value = false;
  }
};

onMounted(() => loadProviderTypeList());
```

**替换后：**

```ts
const { list: providerTypeList, loading: loadingProviderTypeList } =
  useDictData(getProviderTypeDictApi, { immediate: true });
```

## 多个字典同时加载

```ts
// customer-list.vue / project-list.vue
const { list: providerTypeList } = useDictData(getProviderTypeDictApi, { immediate: true });
const { list: projectStatusList } = useDictData(getProjectStatusDictApi, { immediate: true });
const { list: industryList } = useDictData(getIndustryApi, { immediate: true });
```

## 自定义数据类型

```ts
type IndustryItem = {
  dictCode: number;
  dictLabel: string;
  dictValue: string;
};

const { list } = useDictData<IndustryItem>(getIndustryApi, { immediate: true });
// list 类型为 Ref<IndustryItem[]>
```

## API 响应格式兼容

`useDictData` 自动兼容三种响应结构：

```ts
// 以下三种格式均可正确解析
{ code: 0, data: [...] }
{ code: 0, dataList: [...] }
{ code: 0, rows: [...] }
```

## 参数

| 参数 | 类型 | 说明 |
|------|------|------|
| fetchFn | `() => Promise<ApiResponse<T[]>>` | 异步 API 函数 |
| options.immediate | `boolean` | 是否在 `onMounted` 时自动加载，默认 `false` |

## 返回值

| 属性 | 类型 | 说明 |
|------|------|------|
| list | `Ref<T[]>` | 字典数据列表 |
| loading | `Ref<boolean>` | 加载状态 |
| load | `() => Promise<void>` | 手动触发加载 |
