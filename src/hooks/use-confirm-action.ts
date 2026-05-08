import { message, Modal } from 'ant-design-vue';

import type { ConfirmOptions } from './types';

export function useConfirmAction() {
  const showConfirm = (options: ConfirmOptions): void => {
    const { title, content, okText = '确定', cancelText = '取消', onOk } = options;
    Modal.confirm({
      title,
      content,
      okText,
      cancelText,
      onOk: async () => {
        try {
          await onOk();
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : '操作失败，请稍后重试';
          message.error(errorMessage);
        }
      },
    });
  };

  return { confirmDelete: showConfirm, confirmAction: showConfirm };
}
