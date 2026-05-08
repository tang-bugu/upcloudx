<script setup lang="ts">
import { Modal } from 'ant-design-vue';

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
</script>

<template>
  <Modal
    :open="props.open"
    :title="props.title"
    :width="props.width"
    :destroy-on-close="props.destroyOnClose"
    :ok-button-props="{ loading: props.loading }"
    :cancel-button-props="{ disabled: props.loading }"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <slot />
  </Modal>
</template>
