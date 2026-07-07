/** @module types/chart */

import type { EChartsOption } from 'echarts';

/** 图表组件通用 Props */
export interface BaseChartProps {
  option: EChartsOption;
  height?: string; // 图表容器高度，默认 '100%'
  loading?: boolean; // 是否显示加载状态
  error?: string; // 错误信息，有则展示错误占位
}

/** 主题色配置 */
export interface ChartTheme {
  textColor: string;
  axisLineColor: string;
  splitLineColor: string;
  colors: string[]; // 系列色板
}
