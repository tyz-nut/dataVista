<!-- @module components/charts/StatCard -->
<template>
  <div class="stat-card panel fade-in-up" :style="{ animationDelay: `${delay}ms` }">
    <div class="stat-card__inner">
      <div class="stat-card__icon-wrap">
        <Icon :icon="stat.icon" class="stat-card__icon" />
      </div>
      <div class="stat-card__info">
        <span class="stat-card__label">{{ stat.label }}</span>
        <div class="stat-card__value font-number">
          <NumberFlip
            v-if="stat.id !== 'conversion-rate'"
            :value="stat.value"
            :decimals="0"
            :show-comma="true"
          />
          <NumberFlip v-else :value="stat.value" :decimals="2" :show-comma="false" />
          <span class="stat-card__unit">{{ stat.unit }}</span>
        </div>
        <div class="stat-card__trend" :class="stat.trend >= 0 ? 'is-up' : 'is-down'">
          <Icon
            :icon="stat.trend >= 0 ? 'mdi:arrow-up' : 'mdi:arrow-down'"
            class="stat-card__trend-icon"
          />
          <span>{{ formatTrendValue(stat.trend) }}</span>
          <span class="stat-card__trend-label">同比</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import type { StatItem } from '@/types/dashboard';
import NumberFlip from '@/components/common/NumberFlip.vue';
import { formatPercent } from '@/utils/format';

defineProps<{
  stat: StatItem;
  delay?: number;
}>();

function formatTrendValue(trend: number): string {
  if (trend > 0.01 || trend < -0.01) {
    return formatPercent(trend);
  }
  // 转化率这类小数值直接用百分比显示
  return formatPercent(trend);
}
</script>

<style scoped>
.stat-card {
  padding: var(--spacing-lg);
  cursor: pointer;
  transition:
    transform 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  border-color: rgba(0, 180, 255, 0.4);
  box-shadow: 0 8px 32px rgba(0, 180, 255, 0.1);
}

.stat-card__inner {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
}

.stat-card__icon-wrap {
  width: 56px;
  height: 56px;
  border-radius: var(--border-radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.15), rgba(0, 144, 255, 0.05));
  flex-shrink: 0;
}

.stat-card__icon {
  font-size: 28px;
  color: var(--text-accent);
}

.stat-card__info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.stat-card__label {
  font-size: var(--font-sm);
  color: var(--text-secondary);
}

.stat-card__value {
  font-size: var(--font-xxl);
  font-weight: 700;
  color: var(--text-primary);
  display: flex;
  align-items: baseline;
  gap: var(--spacing-xs);
  line-height: 1.2;
}

.stat-card__unit {
  font-size: var(--font-sm);
  color: var(--text-secondary);
  font-weight: 400;
}

.stat-card__trend {
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: var(--font-xs);
  font-weight: 500;
}

.stat-card__trend.is-up {
  color: var(--color-success);
}

.stat-card__trend.is-down {
  color: var(--color-danger);
}

.stat-card__trend-icon {
  font-size: 14px;
}

.stat-card__trend-label {
  color: var(--text-muted);
  margin-left: 2px;
}
</style>
