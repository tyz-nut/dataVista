/** @module services/adapters/DataAdapter */

import type { DashboardData } from '@/types/dashboard';

/**
 * 数据适配器接口
 * 所有数据源（Mock、API、WebSocket）必须实现此接口
 * 这样切换数据源只需改一行注入代码，业务代码零改动
 */
export interface DataAdapter {
  /** 获取大屏全量数据 */
  fetchDashboardData(): Promise<DashboardData>;

  /** 按时间范围刷新数据（未来支持增量更新） */
  refreshData?(startTime: string, endTime: string): Promise<Partial<DashboardData>>;
}
