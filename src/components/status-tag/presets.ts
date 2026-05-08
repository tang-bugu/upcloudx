import type { StatusMapItem } from './types';

export const domainStatusMap: Record<number, StatusMapItem> = {
  0: { text: '配置中', color: 'processing' },
  1: { text: '配置中', color: 'processing' },
  2: { text: '部署中', color: 'processing' },
  4: { text: '已生效', color: 'success' },
  5: { text: '部署失败', color: 'error' },
  6: { text: '删除中', color: 'warning' },
  7: { text: '删除成功', color: 'success' },
  8: { text: '删除失败', color: 'error' },
};

export const certificateStatusMap: Record<number, StatusMapItem> = {
  0: { text: '待申请', color: 'default' },
  1: { text: '申请中', color: 'processing' },
  2: { text: '已签发', color: 'success' },
  3: { text: '申请失败', color: 'error' },
  4: { text: '已过期', color: 'warning' },
};

export const projectStatusMap: Record<number, StatusMapItem> = {
  0: { text: '申请中', color: 'processing' },
  1: { text: '启动', color: 'success' },
  2: { text: '停用', color: 'default' },
};
