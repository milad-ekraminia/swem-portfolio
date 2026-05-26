import { describe, it, expect } from 'vitest';
import { getClassNames } from '@/helpers/get-class-names';

describe('getClassNames', () => {
  it('returns base class and conditional suffixes when true', () => {
    const res = getClassNames('btn', [
      [true, 'primary'],
      [false, 'disabled'],
      [true, 'lg'],
    ]);
    expect(res).toBe('btn btn-primary btn-lg');
  });

  it('returns only base class when no conditions true', () => {
    const res = getClassNames('card', [
      [false, 'hover'],
      [false, 'active'],
    ]);
    expect(res).toBe('card ');
  });
});


