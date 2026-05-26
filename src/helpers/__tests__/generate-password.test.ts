import { describe, it, expect, vi, afterEach } from 'vitest';
import { generatePassword } from '@/helpers/generate-password';

describe('generatePassword', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns empty string when no character sets selected', () => {
    const pwd = generatePassword(10, {
      lowercase: false,
      uppercase: false,
      numbers: false,
      symbols: false,
    });
    expect(pwd).toBe('');
  });

  it('produces a password of requested length containing required categories', () => {
    // Make Math.random deterministic
    const seq = [0.1, 0.9, 0.3, 0.7, 0.2, 0.8, 0.4, 0.6, 0.5, 0.05];
    let idx = 0;
    vi.spyOn(Math, 'random').mockImplementation(() => seq[(idx++) % seq.length]);

    const length = 12;
    const options = { lowercase: true, uppercase: true, numbers: true, symbols: true };
    const pwd = generatePassword(length, options);

    expect(pwd.length).toBe(length);
    // At least one from each category
    expect(/[a-z]/.test(pwd)).toBe(true);
    expect(/[A-Z]/.test(pwd)).toBe(true);
    expect(/[0-9]/.test(pwd)).toBe(true);
    expect(/[!@#$%^&*()_+[\]{}|;:,.<>?]/.test(pwd)).toBe(true);
  });

  it('works with a subset of categories', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.42);
    const pwd = generatePassword(8, { lowercase: true, uppercase: false, numbers: true, symbols: false });
    expect(pwd.length).toBe(8);
    expect(/^[a-z0-9]+$/.test(pwd)).toBe(true);
  });
});


