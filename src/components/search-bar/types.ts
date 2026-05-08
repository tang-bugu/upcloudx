export type FieldType = 'input' | 'select' | 'date-range' | 'date-picker';

export type SearchField = {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: Array<{ label: string; value: string | number }>;
  optionsLoading?: boolean;
  width?: number | string;
};
