<script setup lang="ts">
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
  <div class="upx-detail-card">
    <div class="upx-detail-card__header">
      <span class="upx-detail-card__title">{{ props.title }}</span>
      <button v-if="props.editable && !props.isEditing" type="button" class="upx-detail-card__edit-btn" @click="emit('edit')">编辑</button>
    </div>
    <div class="upx-detail-card__body">
      <div v-if="props.loading" class="upx-detail-card__loading">
        <div class="upx-skeleton" style="width:60%;height:14px;margin-bottom:12px"></div>
        <div class="upx-skeleton" style="width:80%;height:14px;margin-bottom:12px"></div>
        <div class="upx-skeleton" style="width:45%;height:14px"></div>
      </div>
      <template v-else>
        <slot v-if="!props.isEditing" name="view" />
        <slot v-if="props.isEditing" name="edit" />
        <div v-if="props.isEditing" class="upx-detail-card__footer">
          <button type="button" class="upx-btn upx-btn--primary" :disabled="props.saveLoading" @click="emit('save')">
            {{ props.saveLoading ? '保存中...' : '保存' }}
          </button>
          <button type="button" class="upx-btn" :disabled="props.saveLoading" @click="emit('cancel')">取消</button>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.upx-detail-card { background: var(--upx-bg-elevated); border-radius: 8px; border: 1px solid var(--upx-border); }
.upx-detail-card__header { display: flex; align-items: center; justify-content: space-between; padding: 16px 24px; border-bottom: 1px solid var(--upx-border-light); }
.upx-detail-card__title { font-size: 15px; font-weight: 600; color: var(--upx-text); }
.upx-detail-card__edit-btn { background: none; border: none; color: var(--upx-primary); cursor: pointer; font-size: 14px; padding: 0; }
.upx-detail-card__edit-btn:hover { color: var(--upx-primary-hover); }
.upx-detail-card__body { padding: 24px; }
.upx-detail-card__footer { display: flex; gap: 8px; margin-top: 16px; }
.upx-btn { padding: 6px 16px; border-radius: 6px; font-size: 14px; cursor: pointer; border: 1px solid var(--upx-border-input); background: var(--upx-bg); color: var(--upx-text); transition: all 0.15s; }
.upx-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.upx-btn--primary { background: var(--upx-primary); color: #fff; border-color: var(--upx-primary); }
.upx-btn--primary:hover:not(:disabled) { background: var(--upx-primary-hover); }
.upx-skeleton { border-radius: 4px; background: var(--upx-bg-skeleton); background-size: 200% 100%; animation: upx-shimmer 1.5s infinite; }
@keyframes upx-shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
</style>
