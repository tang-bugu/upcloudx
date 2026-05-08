import type { DictDataItem, StatusMap, StatusMapperReturn } from './types';

export function useStatusMapper(statusMap: StatusMap): StatusMapperReturn {
  let internalMap: StatusMap = { ...statusMap };

  const getStatusLabel = (status: number): string => internalMap[status]?.label ?? '未知';
  const getStatusColor = (status: number): string => internalMap[status]?.color ?? 'default';

  const fromDictList = (list: DictDataItem[], colorMap?: Record<string, string>): void => {
    const newMap: StatusMap = {};
    for (const item of list) {
      const status = Number.parseInt(item.dictValue, 10);
      if (Number.isNaN(status)) continue;
      newMap[status] = {
        label: item.dictLabel,
        color: colorMap?.[item.dictValue] ?? 'default',
      };
    }
    internalMap = newMap;
  };

  return { getStatusLabel, getStatusColor, fromDictList };
}
