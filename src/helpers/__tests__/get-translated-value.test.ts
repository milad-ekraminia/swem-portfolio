import { getTranslatedValue } from '@/helpers/get-translated-value';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('get-translated-value', () => {
  const originalGetItem = localStorage.getItem.bind(localStorage);

  beforeEach(() => {
    vi.spyOn(Storage.prototype, 'getItem');
  });

  afterEach(() => {
    (localStorage.getItem as unknown as Mock).mockRestore?.();
  });

  it('returns value from default path when dirName not provided', () => {
    const store = { WebNet: { texts: { Hello: 'Merhaba' } } };
    (localStorage.getItem as unknown as Mock).mockImplementation(
      (key: string) => {
        if (key === 'application-localization') {
          return JSON.stringify(store);
        }
        return originalGetItem(key);
      },
    );
    expect(getTranslatedValue('Hello')).toBe('Merhaba');
  });

  it('navigates with dirName dotted path', () => {
    const store = { Custom: { deep: { texts: { Bye: 'Güle güle' } } } };
    (localStorage.getItem as unknown as Mock).mockImplementation(
      (key: string) => {
        if (key === 'application-localization') {
          return JSON.stringify(store);
        }
        return originalGetItem(key);
      },
    );
    expect(getTranslatedValue('Bye', 'Custom.deep.texts')).toBe('Güle güle');
  });

  it('returns key when not found or when storage is string "undefined"', () => {
    (localStorage.getItem as unknown as Mock).mockImplementation(
      (key: string) => {
        if (key === 'application-localization') {
          return 'undefined';
        }
        return null;
      },
    );
    expect(getTranslatedValue('Missing')).toBe('Missing');
  });
});
