/** @module services/mock */

export { generateDashboardData } from './dashboardData';
import { generateDashboardData } from './dashboardData';

/** 预生成一份 Mock 数据（单例），页面首次加载使用 */
export const mockDashboardData = generateDashboardData();
