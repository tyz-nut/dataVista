/** @module types/dashboard */

/** 单个指标数据 */
export interface StatItem {
  id: string;
  label: string; // 指标名称，如 "总销售额"
  value: number; // 指标数值
  unit: string; // 单位，如 "万元"
  icon: string; // @iconify/vue 图标名，如 "mdi:currency-usd"
  trend: number; // 同比变化百分比，正数为增长，负数为下降
}

/** 时序数据点 */
export interface TimeSeriesPoint {
  date: string; // 日期，格式 YYYY-MM
  value: number;
}

/** 分类数据项 */
export interface CategoryItem {
  name: string; // 分类名称
  value: number;
}

/** 排行项 */
export interface RankItem {
  rank: number;
  name: string;
  value: number;
  unit: string;
  trend: number; // 环比变化
}

/** 大屏完整数据 */
export interface DashboardData {
  stats: StatItem[];
  salesTrend: TimeSeriesPoint[];
  categorySales: CategoryItem[];
  channelDistribution: CategoryItem[];
  salesRanking: RankItem[];
  lastUpdated: string; // ISO 时间戳
}
