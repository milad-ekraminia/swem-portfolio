import { formatNumberWithCommas } from '@/helpers/format-number-with-commas';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/helpers/cookies', () => ({
  getCookie: vi.fn(() => 'tr'),
}));

describe('formatNumberWithCommas', () => {
  it('returns default string for null/undefined', () => {
    expect(formatNumberWithCommas(null, 3)).toBe('0,000');
    expect(formatNumberWithCommas(undefined, 2)).toBe('0,000');
  });

  it('formats number according to TR locale by default', async () => {
    const cookies = await import('@/helpers/cookies');
    (cookies.getCookie as unknown as Mock).mockReturnValue('tr');
    expect(formatNumberWithCommas(1234.5, 2)).toBe('1.234,50');
    expect(formatNumberWithCommas(1000, 0)).toBe('1.000');
  });

  it('formats number according to EN locale when CultureName is en', async () => {
    const cookies = await import('@/helpers/cookies');
    (cookies.getCookie as unknown as Mock).mockReturnValue('en');
    expect(formatNumberWithCommas(1234.5, 2)).toBe('1,234.50');
    expect(formatNumberWithCommas(1000, 0)).toBe('1,000');
  });
});
