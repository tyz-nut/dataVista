/** @module logger */

import { LogService } from './LogService';

// 全局单例
export const logger = new LogService();

// 也导出类供测试用
export { LogService } from './LogService';
export { LogLevel } from './LogLevel';
