import { createApp, h, ref } from 'vue';

import { DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogRoot, DialogTitle } from 'radix-vue';

export type ConfirmOptions = {
  title: string;
  content: string;
  onOk: () => Promise<void> | void;
  danger?: boolean;
};

function mountConfirmDialog(options: ConfirmOptions) {
  const { title, content, onOk, danger = false } = options;
  const container = document.createElement('div');
  document.body.appendChild(container);

  const app = createApp({
    setup() {
      const open = ref(true);
      const loading = ref(false);

      async function handleOk() {
        loading.value = true;
        try {
          await onOk();
          open.value = false;
        } catch (e) {
          console.error(e);
        } finally {
          loading.value = false;
        }
      }

      function handleClose() {
        open.value = false;
      }

      function onAfterLeave() {
        app.unmount();
        container.remove();
      }

      return () =>
        h(DialogRoot, { open: open.value, 'onUpdate:open': (v: boolean) => { if (!v) handleClose(); } }, () => [
          h(DialogPortal, null, () => [
            h(DialogOverlay, { class: 'upx-confirm-overlay', onAnimationend: () => { if (!open.value) onAfterLeave(); } }),
            h(DialogContent, { class: 'upx-confirm-content' }, () => [
              h(DialogTitle, { class: 'upx-confirm-title' }, () => title),
              h(DialogDescription, { class: 'upx-confirm-desc' }, () => content),
              h('div', { class: 'upx-confirm-footer' }, [
                h(DialogClose, { asChild: true }, () =>
                  h('button', { type: 'button', class: 'upx-confirm-btn upx-confirm-btn--cancel', disabled: loading.value }, '取消'),
                ),
                h('button', {
                  type: 'button',
                  class: ['upx-confirm-btn', danger ? 'upx-confirm-btn--danger' : 'upx-confirm-btn--primary'],
                  disabled: loading.value,
                  onClick: handleOk,
                }, loading.value ? '处理中...' : '确定'),
              ]),
            ]),
          ]),
        ]);
    },
  });

  app.mount(container);
}

export function useConfirm() {
  function confirm(options: ConfirmOptions): void {
    mountConfirmDialog(options);
  }
  return { confirm };
}

export function confirmDelete(itemName: string, onOk: () => Promise<void> | void): void {
  mountConfirmDialog({ title: '确认删除', content: `确认删除 ${itemName} 吗？`, onOk, danger: true });
}
