/** @module stores/dashboard */

import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { DashboardData } from '@/types/dashboard';
import type { DataAdapter } from '@/services/adapters/DataAdapter';
import { MockAdapter } from '@/services/adapters/MockAdapter';
import { logger } from '@/logger';

export const useDashboardStore = defineStore('dashboard', () => {
  // ===== 状态 =====
  const data = ref<DashboardData | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const adapter = ref<DataAdapter>(new MockAdapter(500));

  // ===== 计算属性 =====
  const stats = computed(() => data.value?.stats ?? []);
  const salesTrend = computed(() => data.value?.salesTrend ?? []);
  const categorySales = computed(() => data.value?.categorySales ?? []);
  const channelDistribution = computed(() => data.value?.channelDistribution ?? []);
  const salesRanking = computed(() => data.value?.salesRanking ?? []);
  const lastUpdated = computed(() => data.value?.lastUpdated ?? '');

  // ===== 方法 =====
  async function fetchData() {
    loading.value = true;
    error.value = null;
    try {
      data.value = await adapter.value.fetchDashboardData();
      logger.debug('DashboardStore', 'Data loaded', {
        statsCount: data.value?.stats.length,
      });
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      error.value = msg;
      logger.error(
        'DashboardStore',
        'Failed to fetch data',
        e instanceof Error ? e : new Error(msg),
      );
    } finally {
      loading.value = false;
    }
  }

  /** 切换数据源（未来切换到 API 时只需调用此方法） */
  function setAdapter(newAdapter: DataAdapter) {
    adapter.value = newAdapter;
    logger.info('DashboardStore', 'Data adapter switched', {
      adapter: newAdapter.constructor.name,
    });
  }

  return {
    data,
    loading,
    error,
    adapter,
    stats,
    salesTrend,
    categorySales,
    channelDistribution,
    salesRanking,
    lastUpdated,
    fetchData,
    setAdapter,
  };
});
