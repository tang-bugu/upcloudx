import { nextTick, watch } from 'vue';

import type { ModalFormOptions, ModalFormReturn } from './types';

export function useModalForm(options: ModalFormOptions): ModalFormReturn {
  const { formRef, open, onOpen, onClose, onSubmit } = options;

  watch(open, async (newValue, oldValue) => {
    if (newValue && !oldValue) {
      await nextTick();
      await nextTick();
      onOpen?.();
    } else if (!newValue && oldValue) {
      formRef.value?.resetFields();
      onClose?.();
    }
  });

  const handleCancel = (): void => {
    open.value = false;
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      await formRef.value?.validate();
    } catch {
      return;
    }
    await onSubmit?.();
  };

  return { handleCancel, handleSubmit };
}
