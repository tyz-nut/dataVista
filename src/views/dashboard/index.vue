<!-- @module views/dashboard -->
<template>
  <DashboardGrid>
    <!-- 顶部标题栏 — 占满整行 -->
    <DashboardHeader :last-updated="store.lastUpdated" style="grid-column: 1 / -1" />

    <!-- KPI 指标卡 — 4 列 -->
    <template v-if="!store.loading && !store.error && store.stats.length">
      <StatCard
        v-for="(stat, idx) in store.stats"
        :key="stat.id"
        :stat="stat"
        :delay="idx * 100"
        style="grid-column: span 1"
      />
    </template>
    <template v-else-if="store.loading">
      <div v-for="i in 4" :key="'sk-' + i" class="panel skeleton-card" style="grid-column: span 1">
        <div class="loading-spinner">
          <div class="loading-spinner__ring" />
        </div>
      </div>
    </template>

    <!-- 第二行：折线图 60% + 柱状图 40% -->
    <template v-if="!store.loading && !store.error && store.data">
      <LineChart :option="lineOption" :delay="400" style="grid-column: span 2.4" />
      <BarChart :option="barOption" :delay="500" style="grid-column: span 1.6" />
    </template>
    <template v-else-if="store.loading">
      <div class="panel skeleton-panel" style="grid-column: span 2.4">
        <div class="loading-spinner">
          <div class="loading-spinner__ring" />
          <span class="loading-spinner__text">数据加载中...</span>
        </div>
      </div>
      <div class="panel skeleton-panel" style="grid-column: span 1.6">
        <div class="loading-spinner">
          <div class="loading-spinner__ring" />
          <span class="loading-spinner__text">数据加载中...</span>
        </div>
      </div>
    </template>

    <!-- 第三行：饼图 40% + 排行榜 60% -->
    <template v-if="!store.loading && !store.error && store.data">
      <PieChart :option="pieOption" :delay="600" style="grid-column: span 1.6" />
      <div
        class="panel fade-in-up ranking-panel"
        style="grid-column: span 2.4; animation-delay: 700ms"
      >
        <RankingList :items="store.salesRanking" />
      </div>
    </template>
    <template v-else-if="store.loading">
      <div class="panel skeleton-panel" style="grid-column: span 1.6">
        <div class="loading-spinner">
          <div class="loading-spinner__ring" />
          <span class="loading-spinner__text">数据加载中...</span>
        </div>
      </div>
      <div class="panel skeleton-panel" style="grid-column: span 2.4">
        <div class="loading-spinner">
          <div class="loading-spinner__ring" />
          <span class="loading-spinner__text">数据加载中...</span>
        </div>
      </div>
    </template>

    <!-- 错误状态 -->
    <template v-if="store.error">
      <div class="panel" style="grid-column: 1 / -1">
        <div class="error-state">
          <span class="error-state__icon">⚠️</span>
          <span class="error-state__message">{{ store.error }}</span>
          <button class="error-state__retry" @click="store.fetchData()">重新加载</button>
        </div>
      </div>
    </template>
  </DashboardGrid>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useDashboardStore } from '@/stores/dashboard';
import DashboardGrid from '@/components/layout/DashboardGrid.vue';
import DashboardHeader from '@/components/layout/DashboardHeader.vue';
import StatCard from '@/components/charts/StatCard.vue';
import LineChart from '@/components/charts/LineChart.vue';
import BarChart from '@/components/charts/BarChart.vue';
import PieChart from '@/components/charts/PieChart.vue';
import RankingList from '@/components/common/RankingList.vue';
import { buildLineChartOption, buildBarChartOption, buildPieChartOption } from './config';

const store = useDashboardStore();

// 构建各图表配置（仅在数据存在时计算）
const lineOption = computed(() => buildLineChartOption(store.data!));
const barOption = computed(() => buildBarChartOption(store.data!));
const pieOption = computed(() => buildPieChartOption(store.data!));

onMounted(() => {
  store.fetchData();
});
</script>

<style scoped>
.skeleton-card {
  padding: var(--spacing-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100px;
}

.skeleton-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}

.ranking-panel {
  overflow: hidden;
}
</style>
