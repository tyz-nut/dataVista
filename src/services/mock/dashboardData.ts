/** @module services/mock/dashboardData */

import type {
  DashboardData,
  StatItem,
  TimeSeriesPoint,
  CategoryItem,
  RankItem,
} from '@/types/dashboard';
import { randomFloat, randomInt } from '@/utils/format';

function generateStats(): StatItem[] {
  return [
    {
      id: 'total-sales',
      label: '总销售额',
      value: randomFloat(5800, 6200, 2),
      unit: '万元',
      icon: 'mdi:currency-usd',
      trend: randomFloat(0.05, 0.18, 4),
    },
    {
      id: 'order-count',
      label: '订单量',
      value: randomInt(38000, 42000),
      unit: '单',
      icon: 'mdi:cart-outline',
      trend: randomFloat(0.02, 0.12, 4),
    },
    {
      id: 'active-users',
      label: '活跃用户',
      value: randomInt(8500, 9500),
      unit: '人',
      icon: 'mdi:account-group-outline',
      trend: randomFloat(-0.05, 0.08, 4),
    },
    {
      id: 'conversion-rate',
      label: '转化率',
      value: randomFloat(0.028, 0.045, 4),
      unit: '%',
      icon: 'mdi:trending-up',
      trend: randomFloat(-0.03, 0.06, 4),
    },
  ];
}

function generateSalesTrend(): TimeSeriesPoint[] {
  const months = [
    '2024-01',
    '2024-02',
    '2024-03',
    '2024-04',
    '2024-05',
    '2024-06',
    '2024-07',
    '2024-08',
    '2024-09',
    '2024-10',
    '2024-11',
    '2024-12',
  ];

  // 模拟有起伏但总体上升的趋势
  const baseValues = [320, 280, 380, 420, 390, 460, 510, 480, 530, 570, 620, 680];

  return months.map((date, i) => ({
    date,
    value: baseValues[i] + randomFloat(-25, 25, 1),
  }));
}

function generateCategorySales(): CategoryItem[] {
  const categories = ['服装', '电子', '食品', '家居', '美妆', '运动'];
  const baseValues = [1250, 2100, 850, 720, 560, 480];

  return categories.map((name, i) => ({
    name,
    value: baseValues[i] + randomFloat(-80, 80, 1),
  }));
}

function generateChannelDistribution(): CategoryItem[] {
  return [
    { name: '小程序', value: randomFloat(32, 38, 1) },
    { name: 'App', value: randomFloat(26, 32, 1) },
    { name: 'PC网页', value: randomFloat(18, 24, 1) },
    { name: '线下', value: randomFloat(12, 18, 1) },
  ];
}

function generateSalesRanking(): RankItem[] {
  const products = [
    'iPhone 16 Pro Max',
    'MacBook Air M4',
    'AirPods Pro 3',
    'Apple Watch Ultra 3',
    'iPad Pro M4',
    '索尼 WH-1000XM6',
    '戴森 V16 无线吸尘器',
    '任天堂 Switch 2',
    '大疆 Mavic 4 Pro',
    '三星 Galaxy S25 Ultra',
  ];

  const baseValues = [1280, 1150, 980, 860, 750, 680, 590, 520, 460, 390];

  return products.map((name, i) => ({
    rank: i + 1,
    name,
    value: baseValues[i] + randomFloat(-60, 60, 1),
    unit: '万',
    trend: randomFloat(-0.15, 0.25, 4),
  }));
}

/** 生成高质量 Mock 大屏数据（每次调用数据有微小随机波动） */
export function generateDashboardData(): DashboardData {
  return {
    stats: generateStats(),
    salesTrend: generateSalesTrend(),
    categorySales: generateCategorySales(),
    channelDistribution: generateChannelDistribution(),
    salesRanking: generateSalesRanking(),
    lastUpdated: new Date(Date.now() - randomInt(0, 600) * 1000).toISOString(),
  };
}
