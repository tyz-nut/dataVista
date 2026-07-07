<!-- @module components/layout/DashboardGrid -->
<template>
  <div class="dashboard-grid" :style="gridStyle">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useResize } from '@/composables/useResize';

const { scale } = useResize(1920, 1080);

const gridStyle = computed(() => ({
  transform: `scale(${scale.value})`,
  width: '1920px',
  height: '1080px',
  transformOrigin: 'top left',
}));
</script>

<style scoped>
.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 72px auto auto auto;
  gap: 12px;
  padding: 12px;
  background: var(--bg-primary);
  box-sizing: border-box;
}

/* 覆盖外层缩放后的尺寸补偿 */
</style>
