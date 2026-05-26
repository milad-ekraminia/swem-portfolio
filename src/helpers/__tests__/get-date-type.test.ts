import { describe, it, expect } from 'vitest';
import {
  getDateTypeWithAllOptions,
  formatDateForPeriodTypeWithAllOptions,
  formatDateForPeriodTypeWithoutAllOptions,
} from '@/helpers/get-date-type';

describe('get-date-type helpers', () => {
  it('getDateTypeWithAllOptions returns correct format strings', () => {
    expect(getDateTypeWithAllOptions('1')).toBe('DD/MM/YYYY HH:mm');
    expect(getDateTypeWithAllOptions('2')).toBe('DD/MM/YYYY');
    expect(getDateTypeWithAllOptions('3')).toBe('MMMM YYYY');
    expect(getDateTypeWithAllOptions('999')).toBe('DD/MM/YYYY HH:mm');
  });

  it('formatDateForPeriodTypeWithAllOptions formats per periodType or returns value', () => {
    const v = '2025-09-18T08:07:00Z';
    const res1 = formatDateForPeriodTypeWithAllOptions(v, '1');
    expect(res1).toMatch(/^2025-\d{2}-\d{2}, \d{2}:\d{2}$/);
    const res2 = formatDateForPeriodTypeWithAllOptions(v, '2');
    expect(res2).toMatch(/^2025-\d{2}-\d{2}$/);
    const res3 = formatDateForPeriodTypeWithAllOptions(v, '3');
    expect(res3).toMatch(/^2025-\d{2}$/);
    const res4 = formatDateForPeriodTypeWithAllOptions(v, 'x');
    expect(res4).toBe(v);
  });

  it('formatDateForPeriodTypeWithoutAllOptions formats per periodType or returns value', () => {
    const v = '2025-09-18T08:07:00Z';
    const res0 = formatDateForPeriodTypeWithoutAllOptions(v, '0');
    expect(res0).toMatch(/^2025-\d{2}-\d{2}, \d{2}:\d{2}$/);
    const res1 = formatDateForPeriodTypeWithoutAllOptions(v, '1');
    expect(res1).toMatch(/^2025-\d{2}-\d{2}$/);
    const res2 = formatDateForPeriodTypeWithoutAllOptions(v, '2');
    expect(res2).toMatch(/^2025-\d{2}$/);
    const resX = formatDateForPeriodTypeWithoutAllOptions(v, 'x');
    expect(resX).toBe(v);
  });
});


