import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { convertDateToCustomFormat } from '@/helpers/definitions/convert-date-to-custom-format';

describe('definitions/convert-date-to-custom-format', () => {
  const base = new Date('2025-09-18T10:00:00.123Z');

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(base);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns ISO string with +03:00 timezone and milliseconds', () => {
    const result = convertDateToCustomFormat();
    // Should match YYYY-MM-DDTHH:mm:ss.sss+03:00 format
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}\+03:00$/);
  });

  it('applies +03:00 timezone offset correctly', () => {
    const result = convertDateToCustomFormat();
    // Base time 10:00:00.123Z + 3 hours = 13:00:00.123+03:00
    expect(result).toContain('T13:00:00.123+03:00');
  });

  it('pads all components correctly', () => {
    const result = convertDateToCustomFormat();
    const parts = result.split('T');
    const datePart = parts[0];
    const timePart = parts[1];
    
    // Date part should be YYYY-MM-DD
    expect(datePart).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    // Time part should be HH:mm:ss.sss+03:00
    expect(timePart).toMatch(/^\d{2}:\d{2}:\d{2}\.\d{3}\+03:00$/);
  });
});
