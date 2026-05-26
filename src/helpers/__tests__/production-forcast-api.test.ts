import { describe, it, expect } from 'vitest';
import { calculateSomething } from '@/helpers/production-forcast-api';

describe('production-forcast-api', () => {
  it('returns mapped numbers for period types', () => {
    expect(calculateSomething('Daily')).toBe(1);
    expect(calculateSomething('Monthly')).toBe(2);
    expect(calculateSomething('Yearly')).toBe(3);
    expect(calculateSomething('Unknown')).toBeUndefined();
  });
});


