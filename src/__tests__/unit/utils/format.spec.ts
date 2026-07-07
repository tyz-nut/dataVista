/** @module __tests__/unit/utils/format */

import { describe, it, expect } from 'vitest';
import {
  formatNumber,
  formatCurrency,
  formatPercent,
  randomInt,
  randomFloat,
} from '@/utils/format';

describe('formatNumber', () => {
  it('should format number below 10,000', () => {
    expect(formatNumber(9999)).toBe('9999.00');
  });

  it('should format number in 万', () => {
    const result = formatNumber(1234567);
    expect(result).toBe('123.46万');
  });

  it('should format number in 亿', () => {
    const result = formatNumber(123456789);
    expect(result).toBe('1.23亿');
  });

  it('should format negative number', () => {
    const result = formatNumber(-50000);
    expect(result).toBe('-5.00万');
  });

  it('should format zero', () => {
    expect(formatNumber(0)).toBe('0.00');
  });
});

describe('formatCurrency', () => {
  it('should format with thousand separators', () => {
    expect(formatCurrency(1234567.8)).toBe('1,234,567.80');
  });

  it('should handle small numbers', () => {
    expect(formatCurrency(123.4)).toBe('123.40');
  });

  it('should handle zero', () => {
    expect(formatCurrency(0)).toBe('0.00');
  });

  it('should handle negative values', () => {
    expect(formatCurrency(-1000.5)).toBe('-1,000.50');
  });
});

describe('formatPercent', () => {
  it('should format positive percentage with plus sign', () => {
    expect(formatPercent(0.1234)).toBe('+12.34%');
  });

  it('should format negative percentage', () => {
    expect(formatPercent(-0.0567)).toBe('-5.67%');
  });

  it('should format zero', () => {
    expect(formatPercent(0)).toBe('0.00%');
  });
});

describe('randomInt', () => {
  it('should return number within range', () => {
    for (let i = 0; i < 100; i++) {
      const val = randomInt(5, 10);
      expect(val).toBeGreaterThanOrEqual(5);
      expect(val).toBeLessThanOrEqual(10);
      expect(Number.isInteger(val)).toBe(true);
    }
  });
});

describe('randomFloat', () => {
  it('should return number within range with decimals', () => {
    for (let i = 0; i < 100; i++) {
      const val = randomFloat(1, 2, 2);
      expect(val).toBeGreaterThanOrEqual(1);
      expect(val).toBeLessThan(2);
    }
  });
});
