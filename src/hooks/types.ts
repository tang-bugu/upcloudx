import type { ComputedRef, Ref } from 'vue';

export type ApiResponse<T = any> = {
  code: number;
  data?: T;
  dataList?: T;
  rows?: T;
  msg: string;
  total?: number;
};

export type SelectOption<T = string | number> = {
  label: string;
  value: T;
};

export type DictDataItem = {
  dictCode: number;
  dictLabel: string;
  dictValue: string;
  dictType: string;
  dictSort: number;
  cssClass?: null | string;
  listClass?: null | string;
  isDefault?: string;
  status?: string;
  [key: string]: any;
};

export type TablePaginationConfig = {
  current?: number;
  pageSize?: number;
  total?: number;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  showTotal?: (total: number, range: [number, number]) => string;
  pageSizeOptions?: string[];
  onChange?: (page: number, pageSize: number) => void;
  onShowSizeChange?: (current: number, size: number) => void;
};

export type UserItem = {
  userId: number;
  userName: string;
  nickName: string;
};

export type CustomerItem = {
  customId: number;
  companyName: string;
};

export type DomainItem = {
  id: number;
  domain: string;
};

export type StatusMapItem = {
  label: string;
  color: string;
};

export type StatusMap = Record<number, StatusMapItem>;

export type ProviderTypeMap = Record<string, string>;

export type ConfirmOptions = {
  title: string;
  content: string;
  okText?: string;
  cancelText?: string;
  onOk: () => Promise<void>;
};

export type UtcTimeInput = null | string | undefined;

export type ServerPaginationOptions = {
  defaultPageSize?: number;
  loadFn: () => void;
};

export type ServerPaginationReturn = {
  currentPage: Ref<number>;
  pageSize: Ref<number>;
  total: Ref<number>;
  paginationConfig: ComputedRef<TablePaginationConfig>;
  resetPage: () => void;
  setTotal: (value: number) => void;
};

export type DictFetchFn<T = DictDataItem> = () => Promise<ApiResponse<T[]>>;

export type DictDataOptions = {
  immediate?: boolean;
};

export type DictDataReturn<T = DictDataItem> = {
  list: Ref<T[]>;
  loading: Ref<boolean>;
  load: () => Promise<void>;
};

export type StatusMapperReturn = {
  getStatusLabel: (status: number) => string;
  getStatusColor: (status: number) => string;
  fromDictList: (list: DictDataItem[], colorMap?: Record<string, string>) => void;
};

export type ProviderTypeReturn = {
  formatProviderType: (providerType: string) => string;
};

export type ModalFormOptions = {
  formRef: Ref<any>;
  open: Ref<boolean>;
  onOpen?: () => void;
  onClose?: () => void;
  onSubmit?: () => Promise<void> | void;
};

export type ModalFormReturn = {
  handleCancel: () => void;
  handleSubmit: () => Promise<void>;
};

export type ListSearchOptions = {
  formRef: Ref<any>;
  resetPage: () => void;
  loadFn: () => void;
  extraResetFn?: () => void;
};

export type ListSearchReturn = {
  handleSearch: () => void;
  handleReset: () => void;
};

export type UserOptionsConfig = {
  immediate?: boolean;
  fetchFn?: () => Promise<ApiResponse<UserItem[]>>;
};

export type UserOptionsReturn = {
  userList: Ref<UserItem[]>;
  loading: Ref<boolean>;
  options: ComputedRef<SelectOption<number>[]>;
  load: () => Promise<void>;
};

export type CustomerOptionsConfig = {
  immediate?: boolean;
  fetchFn?: () => Promise<ApiResponse<CustomerItem[]>>;
};

export type CustomerOptionsReturn = {
  customerList: Ref<CustomerItem[]>;
  loading: Ref<boolean>;
  options: ComputedRef<SelectOption<number>[]>;
  customerMap: ComputedRef<Map<number, CustomerItem>>;
  getCustomerName: (customId: number) => string;
  load: () => Promise<void>;
};

export type DomainOptionsConfig = {
  immediate?: boolean;
  fetchFn?: (params?: Record<string, any>) => Promise<ApiResponse<DomainItem[]>>;
  params?: Record<string, any>;
  valueKey?: 'domain' | 'id';
};

export type DomainOptionsReturn = {
  domainList: Ref<DomainItem[]>;
  loading: Ref<boolean>;
  options: ComputedRef<SelectOption<string | number>[]>;
  load: (params?: Record<string, any>) => Promise<void>;
};
