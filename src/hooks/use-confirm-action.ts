import type { ConfirmOptions } from './types';

import { useConfirm } from '../composables/use-confirm';

function showToast(msg: string) {
  const el = document.createElement('div');
  el.textContent = msg;
  Object.assign(el.style, {
    position: 'fixed', top: '24px', left: '50%', transform: 'translateX(-50%)',
    padding: '8px 16px', background: 'var(--upx-toast-bg, #1a1a1a)', color: 'var(--upx-toast-text, #fff)',
    borderRadius: '6px', fontSize: '13px', zIndex: '9999', pointerEvents: 'none', transition: 'opacity 0.2s',
  });
  document.body.appendChild(el);
  setTimeout(() => { el.style.opacity = '0'; setTimeout(() => el.remove(), 200); }, 2000);
}

export function useConfirmAction() {
  const { confirm } = useConfirm();

  const showConfirm = (options: ConfirmOptions): void => {
    confirm({
      title: options.title,
      content: options.content,
      onOk: async () => {
        try {
          await options.onOk();
        } catch (error) {
          showToast(error instanceof Error ? error.message : '操作失败，请稍后重试');
        }
      },
    });
  };

  return { confirmDelete: showConfirm, confirmAction: showConfirm };
}
