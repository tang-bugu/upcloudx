<script setup lang="ts">
interface Props {
  title: string;
  showBack?: boolean;
}

interface Emits {
  (e: 'back'): void;
}

const props = withDefaults(defineProps<Props>(), {
  showBack: true,
});
const emit = defineEmits<Emits>();

function handleBack() {
  emit('back');
}
</script>

<template>
  <div class="upx-page-header">
    <button v-if="props.showBack" type="button" class="upx-page-header__back" @click="handleBack">
      <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
        <path d="M12.5 6L8.5 10L12.5 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
    <span class="upx-page-header__title" :class="{ 'upx-page-header__title--clickable': props.showBack }" @click="props.showBack && handleBack()">{{ title }}</span>
    <slot />
  </div>
</template>

<style scoped>
.upx-page-header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  user-select: none;
}
.upx-page-header__back {
  display: flex;
  align-items: center;
  cursor: pointer;
  border: none;
  background: transparent;
  padding: 0;
  color: inherit;
  transition: color 0.2s;
}
.upx-page-header__back:hover {
  color: var(--upx-primary);
}
.upx-page-header__title {
  margin-left: 8px;
  font-size: 18px;
  font-weight: 500;
  color: var(--upx-text, inherit);
}
.upx-page-header__title--clickable {
  cursor: pointer;
  transition: color 0.2s;
}
.upx-page-header__title--clickable:hover {
  color: var(--upx-primary);
}
</style>
