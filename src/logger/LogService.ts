/** @module logger/LogService */

import { LogLevel } from './LogLevel';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  module: string;
  message: string;
  data?: unknown;
}

type LogHandler = (entry: LogEntry) => void;

export class LogService {
  private currentLevel: LogLevel;
  private handlers: LogHandler[] = [];

  constructor(level?: LogLevel) {
    this.currentLevel =
      level ??
      (typeof import.meta !== 'undefined' && import.meta.env?.DEV ? LogLevel.DEBUG : LogLevel.WARN);
  }

  /** 注册日志处理器（如本地存储、远程上报） */
  addHandler(handler: LogHandler): void {
    this.handlers.push(handler);
  }

  /** 设置当前日志等级 */
  setLevel(level: LogLevel): void {
    this.currentLevel = level;
  }

  /** 获取当前日志等级（供测试用） */
  getLevel(): LogLevel {
    return this.currentLevel;
  }

  debug(module: string, message: string, data?: unknown): void {
    this.log(LogLevel.DEBUG, module, message, data);
  }

  info(module: string, message: string, data?: unknown): void {
    this.log(LogLevel.INFO, module, message, data);
  }

  warn(module: string, message: string, data?: unknown): void {
    this.log(LogLevel.WARN, module, message, data);
  }

  error(module: string, message: string, error?: Error): void {
    const data = error ? { errorMessage: error.message, stack: error.stack } : undefined;
    this.log(LogLevel.ERROR, module, message, data);
  }

  private log(level: LogLevel, module: string, message: string, data?: unknown): void {
    // 等级过滤：低于当前等级的日志不输出
    if (level < this.currentLevel) return;

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      module,
      message,
      data,
    };

    // 控制台输出
    const prefix = `[${entry.timestamp}] [${LogLevel[level]}] [${module}]`;
    switch (level) {
      case LogLevel.DEBUG:
        console.debug(prefix, message, data ?? '');
        break;
      case LogLevel.INFO:
        console.info(prefix, message, data ?? '');
        break;
      case LogLevel.WARN:
        console.warn(prefix, message, data ?? '');
        break;
      case LogLevel.ERROR:
        console.error(prefix, message, data ?? '');
        break;
    }

    // 遍历所有已注册的处理器
    for (const handler of this.handlers) {
      try {
        handler(entry);
      } catch {
        // 处理器自己的错误不应影响日志系统
      }
    }
  }
}
