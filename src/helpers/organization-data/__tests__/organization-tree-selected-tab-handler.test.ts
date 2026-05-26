import { describe, it, expect } from 'vitest';
import { getCustomTypeNumber } from '@/helpers/organization-data/organization-tree-selected-tab-handler';

describe('organization-data/organization-tree-selected-tab-handler', () => {
  it('returns 0 for orgType 0, orgTreeType 1, deviceType 0', () => {
    expect(getCustomTypeNumber(0, 1, 0)).toBe(0);
  });

  it('returns 5 for orgType 0, orgTreeType 2, deviceType 1', () => {
    expect(getCustomTypeNumber(0, 2, 1)).toBe(5);
  });

  it('returns 5 for orgType 0, orgTreeType 2, deviceType 11', () => {
    expect(getCustomTypeNumber(0, 2, 11)).toBe(5);
  });

  it('returns 6 for orgType 0, orgTreeType 2, deviceType 26', () => {
    expect(getCustomTypeNumber(0, 2, 26)).toBe(6);
  });

  it('returns 7 for orgType 0, orgTreeType 2, deviceType 51', () => {
    expect(getCustomTypeNumber(0, 2, 51)).toBe(7);
  });

  it('returns 1 for orgType 1, orgTreeType 1, deviceType 0', () => {
    expect(getCustomTypeNumber(1, 1, 0)).toBe(1);
  });

  it('returns 3 for orgType 3, orgTreeType 1, deviceType 0', () => {
    expect(getCustomTypeNumber(3, 1, 0)).toBe(3);
  });

  it('returns 3 for orgType 4, orgTreeType 1, deviceType 0', () => {
    expect(getCustomTypeNumber(4, 1, 0)).toBe(3);
  });

  it('returns undefined for unmatched combinations', () => {
    expect(getCustomTypeNumber(0, 1, 1)).toBeUndefined();
    expect(getCustomTypeNumber(1, 2, 0)).toBeUndefined();
    expect(getCustomTypeNumber(2, 1, 0)).toBeUndefined();
    expect(getCustomTypeNumber(0, 2, 2)).toBeUndefined();
  });
});
