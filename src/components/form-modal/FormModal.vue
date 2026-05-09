<script setup lang="ts">
import { DialogClose, DialogContent, DialogOverlay, DialogPortal, DialogRoot, DialogTitle } from 'radix-vue';

interface FormModalProps {
  open: boolean;
  title: string;
  loading?: boolean;
  width?: number | string;
  destroyOnClose?: boolean;
}

const props = withDefaults(defineProps<FormModalProps>(), {
  loading: false,
  width: 520,
  destroyOnClose: true,
});

const emit = defineEmits<{
  confirm: [];
  cancel: [];
  'update:open': [value: boolean];
}>();

function handleOk() {
  emit('confirm');
}

function handleCancel() {
  emit('cancel');
  emit('update:open', false);
}

function onOpenChange(val: boolean) {
  if (!val) handleCancel();
}
</script>

<template>
  <DialogRoot :open="props.open" @update:open="onOpenChange">
    <DialogPortal>
      <DialogOverlay class="upx-modal-overlay" />
      <DialogContent class="upx-modal-content" :style="{ width: typeof props.width === 'number' ? `${props.width}px` : props.width }">
        <DialogTitle class="upx-modal-title">{{ props.title }}</DialogTitle>
        <div v-if="!props.destroyOnClose || props.open" class="upx-modal-body">
          <slot />
        </div>
        <div class="upx-modal-footer">
          <DialogClose as-child>
            <button type="button" class="upx-modal-btn" :disabled="props.loading">取消</button>
          </DialogClose>
          <button type="button" class="upx-modal-btn upx-modal-btn--primary" :disabled="props.loading" @click="handleOk">
            {{ props.loading ? '提交中...' : '确定' }}
          </button>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<style scoped>
.upx-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.45); z-index: 10000; animation: upx-fade-in 0.15s ease; }
.upx-modal-content { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: #fff; border-radius: 8px; padding: 24px; z-index: 10001; box-shadow: 0 8px 32px rgba(0,0,0,0.12); animation: upx-scale-in 0.15s ease; max-height: 85vh; display: flex; flex-direction: column; }
.upx-modal-title { font-size: 16px; font-weight: 600; margin: 0 0 16px; }
.upx-modal-body { flex: 1; overflow-y: auto; }
.upx-modal-footer { display: flex; justify-content: flex-end; gap: 8px; margin-top: 24px; }
.upx-modal-btn { padding: 6px 16px; border-radius: 6px; font-size: 14px; cursor: pointer; border: 1px solid #d1d5db; background: #fff; transition: all 0.15s; }
.upx-modal-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.upx-modal-btn:hover:not(:disabled) { border-color: #9ca3af; }
.upx-modal-btn--primary { background: #1664ff; color: #fff; border-color: #1664ff; }
.upx-modal-btn--primary:hover:not(:disabled) { background: #1250d4; }
@keyframes upx-fade-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes upx-scale-in { from { opacity: 0; transform: translate(-50%,-50%) scale(0.95); } to { opacity: 1; transform: translate(-50%,-50%) scale(1); } }
</style>
