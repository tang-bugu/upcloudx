<script setup lang="ts">
interface Props {
  title: string;
  color?: string;
}

const props = withDefaults(defineProps<Props>(), {
  color: '#1664FF',
});
</script>

<template>
  <div class="upx-section-title">
    <div class="upx-section-title__bar" :style="{ backgroundColor: props.color }"></div>
    <h3 class="upx-section-title__text">{{ props.title }}</h3>
  </div>
</template>

<style scoped>
.upx-section-title {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}
.upx-section-title__bar {
  width: 4px;
  height: 14px;
  border-radius: 2px;
  margin-right: 12px;
}
.upx-section-title__text {
  font-size: 14px;
  font-weight: 500;
  color: #111824;
  margin: 0;
}
</style>
