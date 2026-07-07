<!-- @module components/common/NumberFlip -->
<template>
  <span class="number-flip font-number">
    <span
      v-for="(char, idx) in displayChars"
      :key="idx"
      class="number-flip__char"
      :class="{ 'number-flip__char--comma': char === ',', 'number-flip__char--dot': char === '.' }"
    >
      <span v-if="char === ',' || char === '.'" class="number-flip__static">{{ char }}</span>
      <span v-else class="number-flip__digit">{{ char }}</span>
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  value: number;
  decimals?: number;
  showComma?: boolean;
}>();

const displayChars = computed(() => {
  const str = props.value.toFixed(props.decimals ?? 0);
  if (!props.showComma) return str.split('');

  const parts = str.split('.');
  const intStr = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const full = intStr + (parts[1] !== undefined ? '.' + parts[1] : '');
  return full.split('');
});
</script>

<style scoped>
.number-flip {
  display: inline-flex;
  align-items: center;
}

.number-flip__char {
  display: inline-block;
  min-width: 0.6em;
  text-align: center;
}

.number-flip__char--comma,
.number-flip__char--dot {
  min-width: 0.3em;
}

.number-flip__digit {
  display: inline-block;
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}

.number-flip__static {
  display: inline-block;
  opacity: 0.7;
}
</style>
