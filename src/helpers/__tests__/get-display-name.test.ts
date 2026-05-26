import { describe, it, expect } from 'vitest';
import { getDisplayName } from '@/helpers/get-display-name';

describe('getDisplayName', () => {
  const list = [
    { id: 1, displayName: 'Alpha' },
    { id: 2, displayName: 'Beta' },
  ];

  it('returns displayName when id found', () => {
    expect(getDisplayName(1, list as any)).toBe('Alpha');
    expect(getDisplayName(2, list as any)).toBe('Beta');
  });

  it('returns dash when not found', () => {
    expect(getDisplayName(99, list as any)).toBe('-');
  });
});


