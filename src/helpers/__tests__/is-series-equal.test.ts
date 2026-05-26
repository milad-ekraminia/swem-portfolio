import { describe, it, expect } from 'vitest';
import { isSeriesEqual } from '@/helpers/is-series-equal';

describe('isSeriesEqual', () => {
  it('returns true for identical series', () => {
    const a = [
      { name: 's1', data: [1, 2, 3] },
      { name: 's2', data: [4, 5] },
    ];
    const b = [
      { name: 's1', data: [1, 2, 3] },
      { name: 's2', data: [4, 5] },
    ];
    expect(isSeriesEqual(a as any, b as any)).toBe(true);
  });

  it('returns false for length mismatch or different names or data', () => {
    const base = [
      { name: 's1', data: [1, 2, 3] },
      { name: 's2', data: [4, 5] },
    ];
    expect(isSeriesEqual(base as any, base.slice(0, 1) as any)).toBe(false);
    expect(
      isSeriesEqual(base as any, [{ name: 'sX', data: [1, 2, 3] }, { name: 's2', data: [4, 5] }] as any),
    ).toBe(false);
    expect(
      isSeriesEqual(base as any, [{ name: 's1', data: [1, 2, 9] }, { name: 's2', data: [4, 5] }] as any),
    ).toBe(false);
  });
});


