<!-- @module components/layout/DashboardHeader -->
<template>
  <header class="dashboard-header">
    <div class="dashboard-header__left">
      <span class="dashboard-header__update">
        <Icon icon="mdi:clock-outline" class="dashboard-header__icon" />
        数据更新：{{ formatTime(lastUpdated) }}
      </span>
    </div>
    <div class="dashboard-header__center">
      <h1 class="dashboard-header__title">数据视界 · 电商运营数据大屏</h1>
      <div class="dashboard-header__deco-line" />
    </div>
    <div class="dashboard-header__right">
      <span class="dashboard-header__time">
        <Icon icon="mdi:calendar-clock" class="dashboard-header__icon" />
        {{ currentTime }}
      </span>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Icon } from '@iconify/vue';

defineProps<{
  lastUpdated: string;
}>();

const currentTime = ref('');

let timer: ReturnType<typeof setInterval> | null = null;

function updateTime() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const h = String(now.getHours()).padStart(2, '0');
  const min = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  currentTime.value = `${y}-${m}-${d} ${h}:${min}:${s}`;
}

function formatTime(isoStr: string): string {
  if (!isoStr) return '--';
  try {
    const date = new Date(isoStr);
    const h = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const s = String(date.getSeconds()).padStart(2, '0');
    return `${h}:${min}:${s}`;
  } catch {
    return '--';
  }
}

onMounted(() => {
  updateTime();
  timer = setInterval(updateTime, 1000);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

<style scoped>
.dashboard-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md) var(--spacing-xl);
  background: var(--gradient-header);
  border-bottom: 1px solid var(--border-color);
  height: 72px;
  flex-shrink: 0;
}

.dashboard-header__left,
.dashboard-header__right {
  flex-shrink: 0;
  font-size: var(--font-sm);
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.dashboard-header__icon {
  font-size: 16px;
  color: var(--text-accent);
}

.dashboard-header__center {
  text-align: center;
}

.dashboard-header__title {
  font-size: var(--font-xl);
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: 4px;
  background: linear-gradient(90deg, #00d4ff, #7b61ff, #ff6b9d, #00d4ff);
  background-size: 300% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient-shift 6s ease infinite;
}

@keyframes gradient-shift {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.dashboard-header__deco-line {
  height: 2px;
  margin-top: var(--spacing-xs);
  background: linear-gradient(90deg, transparent, #00d4ff, #7b61ff, #00d4ff, transparent);
  border-radius: 1px;
}

.dashboard-header__update {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.dashboard-header__time {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}
</style>
