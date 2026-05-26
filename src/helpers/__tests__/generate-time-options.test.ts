import { describe, it, expect, vi } from 'vitest';
import { generateTimeOptions } from '@/helpers/generate-time-options';

vi.mock('@/helpers/get-translated-value', () => ({
  getTranslatedValue: vi.fn((key: string) => key),
}));

describe('generateTimeOptions', () => {
  it('generates 15-minute step options with translated titles', () => {
    const options = generateTimeOptions();
    expect(options.length).toBe(95);
    expect(options[0]).toEqual({ value: 15, title: '15 Minute' });
    // 60 minutes
    const sixty = options.find((o) => o.value === 60);
    expect(sixty).toEqual({ value: 60, title: '1 Hour' });
    // 75 minutes
    const seventyFive = options.find((o) => o.value === 75);
    expect(seventyFive).toEqual({ value: 75, title: '1 Hour : 15 Minute' });
    // 23:45
    const last = options[options.length - 1];
    expect(last).toEqual({ value: 1425, title: '23 Hour : 45 Minute' });
  });
});


