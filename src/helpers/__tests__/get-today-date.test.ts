import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getTodayDate, getTodayDateRaw } from '@/helpers/get-today-date';

describe('get-today-date helpers', () => {
  const fixed = new Date('2025-09-18T10:11:12Z');
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(fixed);
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('getTodayDate formats YYYY/separator/MM/DD with padding', () => {
    expect(getTodayDate('/')).toBe('2025/09/18');
    expect(getTodayDate('-')).toBe('2025-09-18');
  });

  it('getTodayDateRaw returns structured parts', () => {
    const raw = getTodayDateRaw();
    expect(raw.year).toBe('2025');
    expect(raw.day).toBe('18');
    expect(raw.monthNumber).toBe('09');
    expect(raw.dayNumber).toBe('18');
  });
});


