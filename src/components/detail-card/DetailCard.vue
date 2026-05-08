<script setup lang="ts">
import { Button, Card, Spin } from 'ant-design-vue';

interface DetailCardProps {
  title: string;
  editable?: boolean;
  isEditing?: boolean;
  loading?: boolean;
  saveLoading?: boolean;
}

const props = withDefaults(defineProps<DetailCardProps>(), {
  editable: false,
  isEditing: false,
  loading: false,
  saveLoading: false,
});

const emit = defineEmits<{
  edit: [];
  save: [];
  cancel: [];
}>();
</script>

<template>
  <Card :title="props.title">
    <template v-if="props.editable && !props.isEditing" #extra>
      <Button type="link" :style="{ padding: 0 }" @click="emit('edit')">编辑</Button>
    </template>
    <Spin :spinning="props.loading">
      <slot v-if="!props.isEditing" name="view" />
      <slot v-if="props.isEditing" name="edit" />
      <div v-if="props.isEditing" class="upx-detail-card__footer">
        <Button type="primary" :loading="props.saveLoading" @click="emit('save')">保存</Button>
        <Button :disabled="props.saveLoading" @click="emit('cancel')">取消</Button>
      </div>
    </Spin>
  </Card>
</template>

<style scoped>
.upx-detail-card__footer {
  display: flex;
  gap: 8px;
  margin-top: 16px;
}
</style>
