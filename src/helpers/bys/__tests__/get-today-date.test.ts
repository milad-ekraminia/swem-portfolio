import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { formatDateToCustomISO } from '@/helpers/bys/get-today-date';

describe('bys/get-today-date formatDateToCustomISO', () => {
  const base = new Date('2025-09-18T07:05:00Z');

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(base);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns YYYY-MM-DDTHH:mm for today', () => {
    const res = formatDateToCustomISO();
    expect(res).toMatch(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/);
  });

  it('applies positive day offset', () => {
    const res = formatDateToCustomISO(2);
    // base + 2 days -> 2025-09-20
    expect(res.startsWith('2025-09-20T')).toBe(true);
  });

  it('applies negative day offset', () => {
    const res = formatDateToCustomISO(-1);
    // base - 1 day -> 2025-09-17
    expect(res.startsWith('2025-09-17T')).toBe(true);
  });
});


