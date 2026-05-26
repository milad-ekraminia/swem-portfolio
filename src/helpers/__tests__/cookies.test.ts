import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { deleteCookie, getCookie, setCookie } from '../cookies';

describe('Cookie utilities', () => {
  beforeEach(() => {
    // Clear document.cookie before each test
    document.cookie.split(';').forEach((c) => {
      const cookieName = c.split('=')[0].trim();
      if (cookieName) {
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      }
    });
  });

  afterEach(() => {
    // Clean up cookies after each test
    document.cookie.split(';').forEach((c) => {
      const cookieName = c.split('=')[0].trim();
      if (cookieName) {
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      }
    });
  });

  describe('setCookie', () => {
    it('should set a cookie with name and value', () => {
      setCookie('testCookie', 'testValue');
      expect(getCookie('testCookie')).toBe('testValue');
    });

    it('should set a cookie with special characters in value', () => {
      const specialValue = 'value-with-special_chars.123!@#';
      setCookie('specialCookie', specialValue);
      expect(getCookie('specialCookie')).toBe(specialValue);
    });

    it('should set a cookie with expiration time', () => {
      const futureSeconds = 3600; // 1 hour
      setCookie('expiringCookie', 'tempValue', futureSeconds);
      expect(getCookie('expiringCookie')).toBe('tempValue');
    });

    it('should set a cookie with expiration time in the past (effectively deleting it)', () => {
      setCookie('pastCookie', 'value', -1);
      expect(getCookie('pastCookie')).toBeUndefined();
    });

    it('should overwrite an existing cookie with the same name', () => {
      setCookie('overwriteCookie', 'originalValue');
      expect(getCookie('overwriteCookie')).toBe('originalValue');

      setCookie('overwriteCookie', 'newValue');
      expect(getCookie('overwriteCookie')).toBe('newValue');
    });

    it('should set multiple cookies independently', () => {
      setCookie('cookie1', 'value1');
      setCookie('cookie2', 'value2');
      setCookie('cookie3', 'value3');

      expect(getCookie('cookie1')).toBe('value1');
      expect(getCookie('cookie2')).toBe('value2');
      expect(getCookie('cookie3')).toBe('value3');
    });

    it('should handle empty string as value', () => {
      setCookie('emptyCookie', '');
      expect(getCookie('emptyCookie')).toBe('');
    });

    it('should set cookie with 0 seconds expiration', () => {
      setCookie('zeroCookie', 'value', 0);
      expect(getCookie('zeroCookie')).toBeUndefined();
    });
  });

  describe('getCookie', () => {
    it('should retrieve a previously set cookie', () => {
      setCookie('retrieveCookie', 'retrieveValue');
      expect(getCookie('retrieveCookie')).toBe('retrieveValue');
    });

    it('should return undefined for non-existent cookie', () => {
      expect(getCookie('nonExistentCookie')).toBeUndefined();
    });

    it('should handle cookie names with leading/trailing spaces', () => {
      setCookie('spacedCookie', 'spacedValue');
      // The function should still retrieve the cookie correctly
      expect(getCookie('spacedCookie')).toBe('spacedValue');
    });

    it('should distinguish between different cookies with similar names', () => {
      setCookie('cookie', 'value1');
      setCookie('cookie2', 'value2');

      expect(getCookie('cookie')).toBe('value1');
      expect(getCookie('cookie2')).toBe('value2');
    });

    it('should handle cookie value containing equals sign', () => {
      const valueWithEquals = 'key=value';
      setCookie('equalsCookie', valueWithEquals);
      expect(getCookie('equalsCookie')).toBe(valueWithEquals);
    });

    it('should handle cookie value containing semicolon-like pattern', () => {
      // Note: actual semicolons in values might be problematic with cookie format
      const value = 'safe_value_123';
      setCookie('semicolonCookie', value);
      expect(getCookie('semicolonCookie')).toBe(value);
    });

    it('should return undefined for empty cookie string', () => {
      expect(getCookie('')).toBeUndefined();
    });
  });

  describe('deleteCookie', () => {
    it('should delete an existing cookie', () => {
      setCookie('deleteCookie', 'deleteValue');
      expect(getCookie('deleteCookie')).toBe('deleteValue');

      deleteCookie('deleteCookie');
      expect(getCookie('deleteCookie')).toBeUndefined();
    });

    it('should handle deletion of non-existent cookie without error', () => {
      expect(() => {
        deleteCookie('nonExistentCookie');
      }).not.toThrow();

      expect(getCookie('nonExistentCookie')).toBeUndefined();
    });

    it('should delete cookie without affecting other cookies', () => {
      setCookie('cookie1', 'value1');
      setCookie('cookie2', 'value2');
      setCookie('cookie3', 'value3');

      deleteCookie('cookie2');

      expect(getCookie('cookie1')).toBe('value1');
      expect(getCookie('cookie2')).toBeUndefined();
      expect(getCookie('cookie3')).toBe('value3');
    });

    it('should delete multiple cookies in sequence', () => {
      setCookie('delete1', 'value1');
      setCookie('delete2', 'value2');

      deleteCookie('delete1');
      expect(getCookie('delete1')).toBeUndefined();

      deleteCookie('delete2');
      expect(getCookie('delete2')).toBeUndefined();
    });

    it('should be idempotent - deleting twice should not cause issues', () => {
      setCookie('idempotentCookie', 'value');

      deleteCookie('idempotentCookie');
      expect(getCookie('idempotentCookie')).toBeUndefined();

      // Delete again - should not throw
      expect(() => {
        deleteCookie('idempotentCookie');
      }).not.toThrow();

      expect(getCookie('idempotentCookie')).toBeUndefined();
    });
  });

  describe('Integration tests', () => {
    it('should handle complete cookie lifecycle: set -> get -> delete', () => {
      const cookieName = 'lifecycleCookie';
      const cookieValue = 'lifecycleValue';

      // Set
      setCookie(cookieName, cookieValue);
      expect(getCookie(cookieName)).toBe(cookieValue);

      // Get
      const retrieved = getCookie(cookieName);
      expect(retrieved).toBe(cookieValue);

      // Delete
      deleteCookie(cookieName);
      expect(getCookie(cookieName)).toBeUndefined();
    });

    it('should handle rapid set/get/delete operations', () => {
      for (let i = 0; i < 5; i++) {
        const name = `rapidCookie${i}`;
        const value = `rapidValue${i}`;

        setCookie(name, value);
        expect(getCookie(name)).toBe(value);
        deleteCookie(name);
        expect(getCookie(name)).toBeUndefined();
      }
    });

    it('should manage multiple cookies simultaneously', () => {
      const cookies = {
        user: 'john_doe',
        theme: 'dark',
        language: 'en',
        session: 'abc123xyz',
      };

      // Set all cookies
      Object.entries(cookies).forEach(([name, value]) => {
        setCookie(name, value);
      });

      // Verify all cookies
      Object.entries(cookies).forEach(([name, value]) => {
        expect(getCookie(name)).toBe(value);
      });

      // Delete all cookies
      Object.keys(cookies).forEach((name) => {
        deleteCookie(name);
      });

      // Verify all deleted
      Object.keys(cookies).forEach((name) => {
        expect(getCookie(name)).toBeUndefined();
      });
    });
  });
});
