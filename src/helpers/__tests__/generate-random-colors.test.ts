import { describe, it, expect, vi, afterEach } from 'vitest';
import { generateRandomColors, getRandomColorWithExclude } from '@/helpers/generate-random-colors';

describe('generate-random-colors helpers', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('generateRandomColors returns array of given length with colors', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0); // pick first shade deterministically
    const arr = generateRandomColors(3);
    expect(arr.length).toBe(3);
    arr.forEach((c) => expect(typeof c).toBe('string'));
    expect(new Set(arr).size).toBe(1); // all same due to mocked random
  });

  it('getRandomColorWithExclude respects exclude list and returns a color', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0); // pick first available after filtering
    const color = getRandomColorWithExclude(['#35AB88']); // exclude first item from exported colors list
    expect(typeof color).toBe('string');
    expect(color).not.toBe('#35AB88');
  });
});


