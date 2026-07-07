/** @module services/adapters/ApiAdapter */

import type { DataAdapter } from './DataAdapter';
import type { DashboardData } from '@/types/dashboard';
import { logger } from '@/logger';

/**
 * API 适配器（骨架代码）
 * 未来切换到真实 API 时，只需在 store 中将 MockAdapter 替换为此类即可
 */
export class ApiAdapter implements DataAdapter {
  private baseURL: string;

  constructor(baseURL = '/api/v1') {
    this.baseURL = baseURL;
  }

  async fetchDashboardData(): Promise<DashboardData> {
    logger.info('ApiAdapter', 'Fetching data from API...');
    const response = await fetch(`${this.baseURL}/dashboard`);
    if (!response.ok) {
      logger.error('ApiAdapter', 'API request failed', new Error(`HTTP ${response.status}`));
      throw new Error(`Failed to fetch dashboard data: ${response.statusText}`);
    }
    return response.json() as Promise<DashboardData>;
  }
}
