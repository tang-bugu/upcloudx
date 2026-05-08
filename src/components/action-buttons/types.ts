export type ActionItem = {
  label: string;
  onClick: () => void;
  disabled?: boolean | (() => boolean);
  danger?: boolean;
  tooltip?: string;
};
