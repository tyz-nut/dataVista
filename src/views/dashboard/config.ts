/** @module views/dashboard/config */

import type { EChartsOption } from 'echarts';
import type { DashboardData } from '@/types/dashboard';
import { DARK_THEME, commonTooltip } from '@/utils/echarts';
import { formatCurrency } from '@/utils/format';

/** 构建折线/面积图配置 */
export function buildLineChartOption(data: DashboardData): EChartsOption {
  const months = data.salesTrend.map((p) => p.date.replace('2024-', '') + '月');
  const values = data.salesTrend.map((p) => p.value);

  return {
    tooltip: {
      ...commonTooltip,
      trigger: 'axis',
      formatter: (params: unknown) => {
        const p = (params as { name: string; value: number }[])[0];
        return `${p.name}<br/>销售额：<b style="color:#00d4ff">${formatCurrency(p.value)}</b> 万元`;
      },
    },
    legend: {
      top: 0,
      right: 0,
      textStyle: { color: DARK_THEME.textColor, fontSize: 12 },
      data: ['销售额'],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: '15%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: months,
      boundaryGap: false,
      axisLine: { lineStyle: { color: DARK_THEME.axisLineColor } },
      axisTick: { show: false },
      axisLabel: { color: DARK_THEME.textColor, fontSize: 11 },
    },
    yAxis: {
      type: 'value',
      name: '万元',
      nameTextStyle: { color: DARK_THEME.textColor, fontSize: 11 },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: DARK_THEME.splitLineColor, type: 'dashed' } },
      axisLabel: { color: DARK_THEME.textColor, fontSize: 11 },
    },
    dataZoom: [
      {
        type: 'slider',
        start: 0,
        end: 100,
        height: 20,
        bottom: 0,
        borderColor: DARK_THEME.axisLineColor,
        backgroundColor: 'rgba(10, 20, 50, 0.5)',
        fillerColor: 'rgba(0, 212, 255, 0.1)',
        textStyle: { color: DARK_THEME.textColor, fontSize: 10 },
      },
    ],
    series: [
      {
        name: '销售额',
        type: 'line',
        data: values,
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: {
          color: DARK_THEME.colors[0],
          width: 3,
        },
        itemStyle: {
          color: DARK_THEME.colors[0],
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(0, 212, 255, 0.35)' },
              { offset: 1, color: 'rgba(0, 212, 255, 0.02)' },
            ],
          },
        },
      },
    ],
  };
}

/** 构建横向柱状图配置 */
export function buildBarChartOption(data: DashboardData): EChartsOption {
  const names = data.categorySales.map((c) => c.name).reverse();
  const values = data.categorySales.map((c) => c.value).reverse();

  return {
    tooltip: {
      ...commonTooltip,
      trigger: 'axis',
      formatter: (params: unknown) => {
        const p = (params as { name: string; value: number }[])[0];
        return `${p.name}<br/>销售额：<b style="color:#7b61ff">${formatCurrency(p.value)}</b> 万元`;
      },
    },
    grid: {
      left: '3%',
      right: '10%',
      top: '5%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: DARK_THEME.splitLineColor, type: 'dashed' } },
      axisLabel: { color: DARK_THEME.textColor, fontSize: 11 },
    },
    yAxis: {
      type: 'category',
      data: names,
      axisLine: { lineStyle: { color: DARK_THEME.axisLineColor } },
      axisTick: { show: false },
      axisLabel: { color: DARK_THEME.textColor, fontSize: 12 },
    },
    series: [
      {
        type: 'bar',
        data: values,
        barWidth: 18,
        itemStyle: {
          borderRadius: [0, 6, 6, 0],
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              { offset: 0, color: '#7b61ff' },
              { offset: 1, color: '#b388ff' },
            ],
          },
        },
        label: {
          show: true,
          position: 'right',
          color: DARK_THEME.textColor,
          fontSize: 11,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          formatter: (params: any) => formatCurrency(params.value as number),
        },
      },
    ],
  };
}

/** 构建环形饼图配置 */
export function buildPieChartOption(data: DashboardData): EChartsOption {
  const total = data.channelDistribution.reduce((sum, c) => sum + c.value, 0);

  return {
    tooltip: {
      ...commonTooltip,
      trigger: 'item',
      formatter: (params: unknown) => {
        const p = params as { name: string; value: number; percent: number };
        return `${p.name}<br/>占比：<b style="color:#00d4ff">${p.percent}%</b> (${p.value}%)`;
      },
    },
    legend: {
      orient: 'vertical',
      right: '5%',
      top: 'center',
      textStyle: { color: DARK_THEME.textColor, fontSize: 12 },
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 16,
    },
    series: [
      {
        type: 'pie',
        radius: ['60%', '80%'],
        center: ['40%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 4,
          borderColor: 'rgba(6, 12, 28, 0.8)',
          borderWidth: 3,
        },
        label: {
          show: true,
          position: 'inside',
          formatter: '{d}%',
          color: '#fff',
          fontSize: 12,
          fontWeight: 500,
        },
        emphasis: {
          label: {
            fontSize: 18,
            fontWeight: 'bold',
          },
          scaleSize: 10,
        },
        data: data.channelDistribution.map((item, i) => ({
          value: item.value,
          name: item.name,
          itemStyle: {
            color: DARK_THEME.colors[i],
          },
        })),
      },
    ],
    graphic: [
      {
        type: 'text',
        left: 'center',
        top: 'center',
        style: {
          text: `${total.toFixed(0)}%`,
          align: 'center',
          fill: DARK_THEME.textColor,
          fontSize: 24,
          fontWeight: 'bold',
        },
      },
    ],
  };
}
