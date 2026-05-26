import { describe, it, expect } from 'vitest';
import { handleSelectedTab as handleSelectedTabAlarms } from '@/helpers/organization-trace-alarms';
import { handleSelectedTab as handleSelectedTabTree } from '@/helpers/organization-tree-selected-tab-handler';

describe('organization selected tab handlers', () => {
  const cases = [0, 1, 3, 5, 6, 7, 999];
  it('returns arrays for known types and empty array for default (alarms)', () => {
    expect(Array.isArray(handleSelectedTabAlarms(0))).toBe(true);
    expect(Array.isArray(handleSelectedTabAlarms(1))).toBe(true);
    expect(Array.isArray(handleSelectedTabAlarms(3))).toBe(true);
    expect(Array.isArray(handleSelectedTabAlarms(5))).toBe(true);
    expect(Array.isArray(handleSelectedTabAlarms(6))).toBe(true);
    expect(Array.isArray(handleSelectedTabAlarms(7))).toBe(true);
    expect(handleSelectedTabAlarms(999)).toEqual([]);
  });

  it('tree handler mirrors similar behavior', () => {
    cases.forEach((c) => {
      const res = handleSelectedTabTree(c);
      expect(Array.isArray(res)).toBe(true);
      if (c === 999) {
        expect(res).toEqual([]);
      } else {
        expect(res.length).toBeGreaterThan(0);
        expect(res[0]).toHaveProperty('title');
      }
    });
  });
});


