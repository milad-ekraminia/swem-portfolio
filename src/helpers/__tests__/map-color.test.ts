import { describe, it, expect } from 'vitest';
import { getColorByValue } from '@/helpers/map-color';

describe('getColorByValue', () => {
  it('returns mapped colors for 3, 2, 1', () => {
    expect(getColorByValue(3)).toBe('#f04438');
    expect(getColorByValue(2)).toBe('#ef6820');
    expect(getColorByValue(1)).toBe('#f79009');
  });

  it('returns default color for others', () => {
    expect(getColorByValue(0)).toBe('#F2F4F7');
    expect(getColorByValue(999)).toBe('#F2F4F7');
  });
});


