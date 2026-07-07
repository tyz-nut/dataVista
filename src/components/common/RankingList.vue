<!-- @module components/common/RankingList -->
<template>
  <div class="ranking-list">
    <div class="panel__title">🏆 销售排行 Top 10</div>
    <div ref="listBody" class="ranking-list__body">
      <div
        v-for="item in items"
        :key="item.rank"
        class="ranking-list__row"
        :class="{ 'ranking-list__row--even': item.rank % 2 === 0 }"
      >
        <div class="ranking-list__rank" :class="getRankClass(item.rank)">
          <span v-if="item.rank <= 3" class="ranking-list__medal">{{ medals[item.rank - 1] }}</span>
          <span v-else class="ranking-list__rank-num">{{ item.rank }}</span>
        </div>
        <span class="ranking-list__name">{{ item.name }}</span>
        <div class="ranking-list__value">
          <span class="font-number">{{ formatCurrency(item.value) }}</span>
          <span class="ranking-list__unit">{{ item.unit }}</span>
        </div>
        <div class="ranking-list__trend" :class="item.trend >= 0 ? 'is-up' : 'is-down'">
          <Icon
            :icon="item.trend >= 0 ? 'mdi:arrow-up' : 'mdi:arrow-down'"
            class="ranking-list__trend-icon"
          />
          {{ formatPercent(item.trend) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import type { RankItem } from '@/types/dashboard';
import { formatCurrency, formatPercent } from '@/utils/format';

defineProps<{
  items: RankItem[];
}>();

const medals = ['🥇', '🥈', '🥉'];

function getRankClass(rank: number): string {
  if (rank === 1) return 'ranking-list__rank--gold';
  if (rank === 2) return 'ranking-list__rank--silver';
  if (rank === 3) return 'ranking-list__rank--bronze';
  return '';
}
</script>

<style scoped>
.ranking-list {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.ranking-list__body {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-sm);
}

.ranking-list__row {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: 8px var(--spacing-md);
  border-radius: var(--border-radius-sm);
  transition: background var(--transition-fast);
}

.ranking-list__row:hover {
  background: rgba(0, 212, 255, 0.05);
}

.ranking-list__row--even {
  background: rgba(10, 20, 50, 0.3);
}

.ranking-list__rank {
  width: 32px;
  text-align: center;
  flex-shrink: 0;
}

.ranking-list__medal {
  font-size: 18px;
}

.ranking-list__rank-num {
  color: var(--text-muted);
  font-size: var(--font-sm);
  font-weight: 600;
}

.ranking-list__rank--gold .ranking-list__rank-num {
  color: #ffc107;
}
.ranking-list__rank--silver .ranking-list__rank-num {
  color: #a8c0d4;
}
.ranking-list__rank--bronze .ranking-list__rank-num {
  color: #cd7f32;
}

.ranking-list__name {
  flex: 1;
  font-size: var(--font-sm);
  color: var(--text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ranking-list__value {
  display: flex;
  align-items: baseline;
  gap: 2px;
  font-size: var(--font-sm);
  font-weight: 600;
  color: var(--text-primary);
  flex-shrink: 0;
}

.ranking-list__unit {
  font-size: var(--font-xs);
  color: var(--text-muted);
  font-weight: 400;
}

.ranking-list__trend {
  width: 70px;
  text-align: right;
  font-size: var(--font-xs);
  font-weight: 500;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1px;
}

.ranking-list__trend.is-up {
  color: var(--color-success);
}
.ranking-list__trend.is-down {
  color: var(--color-danger);
}

.ranking-list__trend-icon {
  font-size: 12px;
}
</style>
