import { Modal } from 'ant-design-vue';

export type ConfirmOptions = {
  title: string;
  content: string;
  onOk: () => Promise<void> | void;
  danger?: boolean;
};

export function useConfirm() {
  function confirm(options: ConfirmOptions): void {
    const { title, content, onOk, danger = false } = options;
    Modal.confirm({
      title,
      content,
      onOk,
      okType: 'primary',
      okButtonProps: danger ? { danger: true } : {},
    });
  }
  return { confirm };
}

export function confirmDelete(itemName: string, onOk: () => Promise<void> | void): void {
  const { confirm } = useConfirm();
  confirm({ title: '确认删除', content: `确认删除 ${itemName} 吗？`, onOk, danger: true });
}
