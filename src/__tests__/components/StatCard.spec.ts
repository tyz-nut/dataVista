/** @module __tests__/components/StatCard */

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import StatCard from '@/components/charts/StatCard.vue';
import type { StatItem } from '@/types/dashboard';

const mockStat: StatItem = {
  id: 'total-sales',
  label: '总销售额',
  value: 6123.45,
  unit: '万元',
  icon: 'mdi:currency-usd',
  trend: 0.1234,
};

describe('StatCard', () => {
  it('should render stat label', () => {
    const wrapper = mount(StatCard, {
      props: { stat: mockStat },
    });
    expect(wrapper.text()).toContain('总销售额');
  });

  it('should render stat unit', () => {
    const wrapper = mount(StatCard, {
      props: { stat: mockStat },
    });
    expect(wrapper.text()).toContain('万元');
  });

  it('should render trend indicator', () => {
    const wrapper = mount(StatCard, {
      props: { stat: mockStat },
    });
    expect(wrapper.text()).toContain('同比');
  });

  it('should apply is-up class for positive trend', () => {
    const wrapper = mount(StatCard, {
      props: { stat: mockStat },
    });
    const trend = wrapper.find('.stat-card__trend');
    expect(trend.classes()).toContain('is-up');
  });

  it('should apply is-down class for negative trend', () => {
    const wrapper = mount(StatCard, {
      props: { stat: { ...mockStat, trend: -0.05 } },
    });
    const trend = wrapper.find('.stat-card__trend');
    expect(trend.classes()).toContain('is-down');
  });
});
