import { getPermission } from '@/helpers/get-permission-helper';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('get-permission-helper', () => {
  const originalGetItem = localStorage.getItem.bind(localStorage);

  beforeEach(() => {
    vi.spyOn(Storage.prototype, 'getItem');
  });

  afterEach(() => {
    (localStorage.getItem as unknown as Mock).mockRestore?.();
  });

  it('returns stored boolean value when present', () => {
    const config = { canExport: true, canDelete: false };
    (localStorage.getItem as unknown as Mock).mockImplementation(
      (key: string) => {
        if (key === 'application-configuration') {
          return JSON.stringify(config);
        }
        return originalGetItem(key);
      },
    );
    expect(getPermission('canExport')).toBe(true);
    expect(getPermission('canDelete')).toBe(false);
  });

  it('returns false when not present or when storage contains string "undefined"', () => {
    (localStorage.getItem as unknown as Mock).mockImplementation(
      (key: string) => {
        if (key === 'application-configuration') {
          return 'undefined';
        }
        return null;
      },
    );
    expect(getPermission('missing')).toBe(false);
  });
});
