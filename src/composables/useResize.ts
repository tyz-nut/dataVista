/** @module composables/useResize */

import { ref, onMounted, onUnmounted } from 'vue';

/**
 * 大屏整体等比缩放 composable
 * 保证在任何分辨率下大屏都完整显示
 */
export function useResize(designWidth = 1920, designHeight = 1080) {
  const scale = ref(1);
  const screenWidth = ref(window.innerWidth);
  const screenHeight = ref(window.innerHeight);

  function calcScale() {
    screenWidth.value = window.innerWidth;
    screenHeight.value = window.innerHeight;
    const scaleX = screenWidth.value / designWidth;
    const scaleY = screenHeight.value / designHeight;
    scale.value = Math.min(scaleX, scaleY);
  }

  onMounted(() => {
    calcScale();
    window.addEventListener('resize', calcScale);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', calcScale);
  });

  return { scale, screenWidth, screenHeight };
}
