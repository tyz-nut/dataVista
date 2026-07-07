/** @module __tests__/unit/logger/LogService */

import { describe, it, expect, beforeEach } from 'vitest';
import { LogService } from '@/logger/LogService';
import { LogLevel } from '@/logger/LogLevel';

describe('LogService', () => {
  let service: LogService;

  beforeEach(() => {
    service = new LogService(LogLevel.DEBUG);
  });

  it('should create with default level', () => {
    expect(service.getLevel()).toBe(LogLevel.DEBUG);
  });

  it('should set and get log level', () => {
    service.setLevel(LogLevel.ERROR);
    expect(service.getLevel()).toBe(LogLevel.ERROR);
  });

  it('should filter messages below current level', () => {
    const entries: string[] = [];
    service.addHandler((entry) => entries.push(entry.message));

    service.setLevel(LogLevel.WARN);
    service.debug('Test', 'debug msg');
    service.info('Test', 'info msg');
    service.warn('Test', 'warn msg');
    service.error('Test', 'error msg');

    // Only WARN and ERROR should pass
    expect(entries).toEqual(['warn msg', 'error msg']);
  });

  it('should call registered handlers', () => {
    const entries: string[] = [];
    service.addHandler((entry) => entries.push(entry.module));

    service.info('ModuleA', 'test message');
    service.info('ModuleB', 'another message');

    expect(entries).toEqual(['ModuleA', 'ModuleB']);
  });

  it('should handle NONE level (block all logs)', () => {
    const entries: string[] = [];
    service.addHandler((entry) => entries.push(entry.message));

    service.setLevel(LogLevel.NONE);
    service.error('Test', 'should not appear');

    expect(entries).toHaveLength(0);
  });

  it('should include error details for error() calls', () => {
    const entries: { message: string; data?: unknown }[] = [];
    service.addHandler((entry) => entries.push({ message: entry.message, data: entry.data }));

    const err = new Error('Something broke');
    service.error('Module', 'Failed operation', err);

    expect(entries[0].message).toBe('Failed operation');
    expect(entries[0].data).toBeDefined();
  });
});
