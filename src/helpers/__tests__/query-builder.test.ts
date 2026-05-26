import { describe, it, expect } from 'vitest';
import { buildArrayParams } from '@/helpers/query-builder';

describe('query-builder', () => {
  it('buildArrayParams indexes values correctly', () => {
    const res = buildArrayParams('ids', [10, 20, '30']);
    expect(res).toEqual({ 'ids[0]': 10, 'ids[1]': 20, 'ids[2]': '30' });
  });
});


