import { describe, it, expect } from 'vitest';
import { getUniqueValues } from '@/helpers/get-unique-values';

describe('getUniqueValues', () => {
  it('extracts and dedupes values by key', () => {
    const data = [
      { id: 1, tag: 'a' },
      { id: 2, tag: 'b' },
      { id: 3, tag: 'a' },
      { id: 4, tag: 'c' },
    ];
    expect(getUniqueValues(data, 'tag')).toEqual(['a', 'b', 'c']);
  });

  it('returns empty array for empty input', () => {
    expect(getUniqueValues([], 'x')).toEqual([]);
  });
});


