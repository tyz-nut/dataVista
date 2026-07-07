<!-- @module components/charts/PieChart -->
<template>
  <div class="chart-wrapper panel fade-in-up" :style="{ animationDelay: `${delay}ms` }">
    <div class="panel__title">📡 渠道分布</div>
    <div class="panel__body chart-body">
      <div v-if="error" class="error-state">
        <span class="error-state__icon">⚠</span>
        <span class="error-state__message">{{ error }}</span>
      </div>
      <div v-show="!error" ref="chartRef" class="chart-container" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRef } from 'vue';
import type { EChartsOption } from 'echarts';
import { useChart } from '@/composables/useChart';

const props = withDefaults(
  defineProps<{
    option: EChartsOption;
    delay?: number;
    loading?: boolean;
    error?: string;
  }>(),
  {
    delay: 0,
    loading: false,
    error: '',
  },
);

const chartRef = ref<HTMLElement | null>(null);
useChart(chartRef, toRef(props, 'option'));
</script>

<style scoped>
.chart-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.chart-body {
  flex: 1;
  min-height: 0;
  position: relative;
}

.chart-container {
  width: 100%;
  height: 100%;
}
</style>
