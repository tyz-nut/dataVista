/** @module utils/format */

/**
 * 格式化大数字 — 万/亿/万亿
 * 1234567 → "123.46万"
 * 123456789 → "1.23亿"
 */
export function formatNumber(value: number): string {
  const abs = Math.abs(value);
  const sign = value < 0 ? '-' : '';

  if (abs >= 1e12) {
    return `${sign}${(abs / 1e12).toFixed(2)}万亿`;
  }
  if (abs >= 1e8) {
    return `${sign}${(abs / 1e8).toFixed(2)}亿`;
  }
  if (abs >= 1e4) {
    return `${sign}${(abs / 1e4).toFixed(2)}万`;
  }
  return `${sign}${abs.toFixed(2)}`;
}

/**
 * 格式化金额，保留2位小数，千分位分隔
 * 1234567.8 → "1,234,567.80"
 */
export function formatCurrency(value: number): string {
  const parts = value.toFixed(2).split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

/**
 * 格式化百分比
 * 0.1234 → "+12.34%"（正数带加号）
 * -0.0567 → "-5.67%"
 */
export function formatPercent(value: number): string {
  const pct = (value * 100).toFixed(2);
  const num = parseFloat(pct);
  if (num > 0) {
    return `+${pct}%`;
  }
  return `${pct}%`;
}

/**
 * 生成指定范围内的随机整数 [min, max]
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 生成指定范围内的随机浮点数 [min, max)，保留 decimals 位小数
 */
export function randomFloat(min: number, max: number, decimals = 2): number {
  const raw = Math.random() * (max - min) + min;
  const factor = Math.pow(10, decimals);
  return Math.round(raw * factor) / factor;
}
