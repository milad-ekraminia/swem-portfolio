import { describe, it, expect } from 'vitest';
import {
  formatSelectOptions,
  formatSelectOptionsWithoutItems,
  formatSelectOptionsWithExtraInfo,
} from '@/helpers/format-select-options';

describe('format-select-options helpers', () => {
  it('formatSelectOptions maps items to title/value or returns []', () => {
    expect(formatSelectOptions(undefined as unknown as any)).toEqual([]);
    expect(formatSelectOptions({ items: [] })).toEqual([]);

    const res = formatSelectOptions({
      items: [
        { displayName: 'One', id: 1 },
        { displayName: 'Two', id: 2 },
      ],
    });
    expect(res).toEqual([
      { title: 'One', value: 1 },
      { title: 'Two', value: 2 },
    ]);
  });

  it('formatSelectOptionsWithoutItems maps array or returns []', () => {
    expect(formatSelectOptionsWithoutItems(undefined as unknown as any)).toEqual([]);
    expect(formatSelectOptionsWithoutItems([])).toEqual([]);

    const res = formatSelectOptionsWithoutItems([
      { displayName: 'A', id: 'x' },
      { displayName: 'B', id: 'y' },
    ]);
    expect(res).toEqual([
      { title: 'A', value: 'x' },
      { title: 'B', value: 'y' },
    ]);
  });

  it('formatSelectOptionsWithExtraInfo concatenates country and city', () => {
    expect(formatSelectOptionsWithExtraInfo(undefined as unknown as any)).toEqual([]);
    const res = formatSelectOptionsWithExtraInfo([
      { countryCode: 'TR', cityName: 'Ankara', id: 10 },
      { countryCode: 'US', cityName: 'NYC', id: 11 },
    ]);
    expect(res).toEqual([
      { title: 'TR - Ankara', value: 10 },
      { title: 'US - NYC', value: 11 },
    ]);
  });
});


