<script setup lang="ts">
interface Props {
  title: string;
}

interface Emits {
  (e: 'back'): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();

function handleBack() {
  emit('back');
}
</script>

<template>
  <div class="upx-page-header">
    <button type="button" class="upx-page-header__back" @click="handleBack">
      <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
        <path d="M12.5 6L8.5 10L12.5 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
    <span class="upx-page-header__title" @click="handleBack">{{ title }}</span>
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
  color: #222;
  transition: color 0.2s;
}
.upx-page-header__back:hover {
  color: #1664ff;
}
.upx-page-header__title {
  margin-left: 8px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 500;
  transition: color 0.2s;
}
.upx-page-header__title:hover {
  color: #1664ff;
}
</style>
