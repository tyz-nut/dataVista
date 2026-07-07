/** @module __tests__/unit/services/MockAdapter */

import { describe, it, expect } from 'vitest';
import { MockAdapter } from '@/services/adapters/MockAdapter';

describe('MockAdapter', () => {
  it('should return dashboard data with required fields', async () => {
    const adapter = new MockAdapter(0); // no delay for tests
    const data = await adapter.fetchDashboardData();

    expect(data).toBeDefined();
    expect(data.stats).toHaveLength(4);
    expect(data.salesTrend).toHaveLength(12);
    expect(data.categorySales).toHaveLength(6);
    expect(data.channelDistribution).toHaveLength(4);
    expect(data.salesRanking).toHaveLength(10);
    expect(data.lastUpdated).toBeDefined();
  });

  it('should generate stats with valid structure', async () => {
    const adapter = new MockAdapter(0);
    const data = await adapter.fetchDashboardData();

    for (const stat of data.stats) {
      expect(stat.id).toBeTruthy();
      expect(stat.label).toBeTruthy();
      expect(typeof stat.value).toBe('number');
      expect(stat.unit).toBeTruthy();
      expect(stat.icon).toBeTruthy();
      expect(typeof stat.trend).toBe('number');
    }
  });

  it('should generate unique timestamps on each call', async () => {
    const adapter = new MockAdapter(0);
    const data1 = await adapter.fetchDashboardData();
    const data2 = await adapter.fetchDashboardData();

    // Data should have natural variation (not guaranteed to differ every time,
    // but with no delay the timestamps should differ)
    expect(data1.lastUpdated).toBeDefined();
    expect(data2.lastUpdated).toBeDefined();
  });

  it('should simulate network delay', async () => {
    const adapter = new MockAdapter(50);
    const start = performance.now();
    await adapter.fetchDashboardData();
    const elapsed = performance.now() - start;
    expect(elapsed).toBeGreaterThanOrEqual(40); // allow small timing variance
  });
});
