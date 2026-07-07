/** @module utils/echarts */

import * as echarts from 'echarts/core';
import { LineChart, BarChart, PieChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DataZoomComponent,
  ToolboxComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import type { ChartTheme } from '@/types/chart';

// 按需注册（减小打包体积）
echarts.use([
  LineChart,
  BarChart,
  PieChart,
  CanvasRenderer,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DataZoomComponent,
  ToolboxComponent,
]);

/** 深色主题色板 */
export const DARK_THEME: ChartTheme = {
  textColor: '#a8b8d4',
  axisLineColor: '#2a3a5c',
  splitLineColor: 'rgba(42, 58, 92, 0.6)',
  colors: ['#00d4ff', '#7b61ff', '#ff6b9d', '#ffc107', '#00e676', '#ff7043', '#40c4ff', '#b388ff'],
};

/** 通用 tooltip 样式 */
export const commonTooltip = {
  backgroundColor: 'rgba(6, 12, 28, 0.9)',
  borderColor: '#2a3a5c',
  textStyle: { color: '#a8b8d4', fontSize: 12 },
};

export default echarts;
