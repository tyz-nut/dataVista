/** @module composables/useChart */

import { ref, onMounted, onUnmounted, watch, type Ref } from 'vue';
import type { EChartsOption } from 'echarts';
import echarts from '@/utils/echarts';
import { logger } from '@/logger';

export function useChart(chartRef: Ref<HTMLElement | null>, options: Ref<EChartsOption>) {
  const instance = ref<echarts.ECharts | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  /** 初始化 ECharts 实例 */
  function initChart() {
    if (!chartRef.value) return;
    try {
      instance.value = echarts.init(chartRef.value);
      instance.value.setOption(options.value);
    } catch (e) {
      error.value = '图表初始化失败';
      logger.error('useChart', 'Chart init failed', e instanceof Error ? e : new Error(String(e)));
    }
  }

  /** 更新图表配置 */
  function updateChart() {
    if (!instance.value) return;
    try {
      instance.value.setOption(options.value, { notMerge: true });
      error.value = null;
    } catch (e) {
      error.value = '图表更新失败';
      logger.error(
        'useChart',
        'Chart update failed',
        e instanceof Error ? e : new Error(String(e)),
      );
    }
  }

  /** 响应窗口变化 */
  function handleResize() {
    instance.value?.resize();
  }

  /** 显示加载动画 */
  function showLoading() {
    loading.value = true;
    instance.value?.showLoading({
      text: '加载中...',
      color: '#00d4ff',
      textColor: '#a8b8d4',
      maskColor: 'rgba(6, 12, 28, 0.6)',
    });
  }

  /** 隐藏加载动画 */
  function hideLoading() {
    loading.value = false;
    instance.value?.hideLoading();
  }

  /** 销毁实例 */
  function dispose() {
    instance.value?.dispose();
    instance.value = null;
  }

  onMounted(() => {
    initChart();
    window.addEventListener('resize', handleResize);
  });

  onUnmounted(() => {
    dispose();
    window.removeEventListener('resize', handleResize);
  });

  watch(options, updateChart, { deep: true });

  return { instance, loading, error, showLoading, hideLoading };
}
