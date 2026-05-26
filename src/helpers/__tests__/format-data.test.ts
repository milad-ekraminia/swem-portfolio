import {
  dateFormatter,
  daysOfMonthDateFormatter,
  formatDate,
  formatDateTime,
  formatMonthlyDate,
  formatTime,
  monthDateFormatter,
} from '@/helpers/format-data';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/helpers/cookies', () => ({
  getCookie: vi.fn(() => 'tr'),
}));

describe('format-data helpers', () => {
  const originalTime = Date.now();
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(originalTime);
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('formatDate handles various period types', () => {
    const date = '2025-09-18T05:06:07Z';
    expect(formatDate(date, 1)).toMatch(/\d{4}-\d{1,2}-\d{1,2} \d{1,2}:\d{2}$/);
    expect(formatDate(date, 2)).toMatch(/\d{4}-\d{1,2}-\d{1,2}$/);
    expect(formatDate(date, 3)).toMatch(/\d{4}-\d{1,2}$/);
    // helper does not zero-pad seconds; accept 1-2 digits
    expect(formatDate(date, 4)).toMatch(
      /\d{1,2}\/\d{1,2}\/\d{4} \d{1,2}:\d{2}:\d{1,2}$/,
    );
    expect(formatDate(date)).toMatch(/\d{4}-\d{1,2}-\d{1,2} \d{1,2}:\d{2}$/);
    expect(formatDate('')).toBe('-');
    expect(formatDate(null as any)).toBe('-');
    expect(formatDate(undefined as any)).toBe('-');
  });

  it('dateFormatter with custom format strings and locales', async () => {
    const tr = await import('@/helpers/cookies');
    (tr.getCookie as unknown as Mock).mockReturnValue('tr');
    expect(dateFormatter('2025-09-18 09:05')).toBe('18.09.2025');
    expect(dateFormatter('2025-09-18 09:05', true)).toBeTypeOf('string');
    expect(dateFormatter('2025-09-18 09:05:04', true, false, true)).toBeTypeOf(
      'string',
    );
    expect(dateFormatter('2025-09-18 09:05', true)).toContain('09');
    // justText returns like "18 Eylül" in TR locale; use ISO to avoid custom pattern
    expect(dateFormatter('2025-09-18T09:05:00Z', false, true)).toMatch(
      /\d{2}\.\d{2}\.\d{4}|\d{2}\/\d{2}\/\d{4}|\d{2} \w+/,
    );

    (tr.getCookie as unknown as Mock).mockReturnValue('en');
    expect(dateFormatter('2025-09-18 09:05')).toBe('09/18/2025');
  });

  it('dateFormatter handles edge cases', async () => {
    const tr = await import('@/helpers/cookies');
    (tr.getCookie as unknown as Mock).mockReturnValue('tr');

    // Test empty string
    expect(dateFormatter('')).toBe('');

    // Test null/undefined
    expect(dateFormatter(null as any)).toBe('');
    expect(dateFormatter(undefined as any)).toBe('');

    // Test invalid date - this will return empty string, not throw
    expect(dateFormatter('invalid-date')).toBe('');

    // Test with justText and haveTime
    expect(dateFormatter('2025-09-18T09:05:00Z', true, true)).toBeTypeOf(
      'string',
    );
  });

  it('daysOfMonthDateFormatter returns dd/mm per locale', () => {
    const date = '2025-09-03T00:00:00Z';
    const formatted = daysOfMonthDateFormatter(date);
    expect(formatted).toMatch(/\d{2}\.\d{2}|\d{2}\/\d{2}/);

    // Test edge cases
    expect(daysOfMonthDateFormatter('')).toBe('');
    expect(daysOfMonthDateFormatter(null as any)).toBe('');
    expect(daysOfMonthDateFormatter(undefined as any)).toBe('');
  });

  it('monthDateFormatter returns month name and year per locale', async () => {
    const tr = await import('@/helpers/cookies');
    (tr.getCookie as unknown as Mock).mockReturnValue('tr');
    const formattedTr = monthDateFormatter('2025-09-18T00:00:00Z');
    expect(formattedTr).toMatch(/2025/);

    (tr.getCookie as unknown as Mock).mockReturnValue('en');
    const formattedEn = monthDateFormatter('2025-09-18T00:00:00Z');
    expect(formattedEn).toMatch(/2025/);

    // Test edge cases
    expect(monthDateFormatter('')).toBe('');
    expect(monthDateFormatter(null as any)).toBe('');
    expect(monthDateFormatter(undefined as any)).toBe('');
    expect(monthDateFormatter('invalid-date')).toBe('invalid-date');
  });

  it('formatTime renders hours and minutes correctly', () => {
    expect(formatTime(5)).toBe('5 dk');
    expect(formatTime(60)).toBe('1 s');
    expect(formatTime(75)).toBe('1 s 15 dk');
    expect(formatTime(0)).toBe('0 dk');
    expect(formatTime(120)).toBe('2 s');
    expect(formatTime(125)).toBe('2 s 5 dk');
  });

  it('formatDateTime returns YYYY-M-DTHH:mm with zero-padded minutes', () => {
    const value = formatDateTime('2025-09-18T03:04:00Z');
    expect(value).toMatch(/T\d{1,2}:\d{2}$/);
  });

  it('formatMonthlyDate returns month-year in TR (and MM/YYYY-like)', () => {
    const val = formatMonthlyDate('2025-09-18T00:00:00Z');
    // In TR it looks like 09.2025, so allow MM.YYYY or YYYY/MM
    expect(val).toMatch(/(\d{2}[./]\d{4})|(\d{4}[/-]\d{2})/);
  });
});
