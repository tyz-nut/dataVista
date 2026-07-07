/** @module services/adapters/MockAdapter */

import type { DataAdapter } from './DataAdapter';
import type { DashboardData } from '@/types/dashboard';
import { generateDashboardData } from '../mock/dashboardData';
import { logger } from '@/logger';

export class MockAdapter implements DataAdapter {
  private delay: number; // 模拟网络延迟（ms）

  constructor(delay = 300) {
    this.delay = delay;
  }

  async fetchDashboardData(): Promise<DashboardData> {
    logger.info('MockAdapter', 'Fetching mock dashboard data...');
    // 模拟网络延迟
    await new Promise((resolve) => setTimeout(resolve, this.delay));
    // 每次请求生成新的随机数据，模拟真实波动
    const data = generateDashboardData();
    logger.info('MockAdapter', 'Mock data fetched successfully', {
      statsCount: data.stats.length,
    });
    return data;
  }
}
