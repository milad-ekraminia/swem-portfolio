import { describe, it, expect } from 'vitest';
import { formatDateForInput } from '@/helpers/format-date-for-input';

describe('formatDateForInput', () => {
  it('returns YYYY-MM-DD in local timezone', () => {
    const iso = '2025-09-18T15:45:00Z';
    const result = formatDateForInput(iso);
    expect(result).toMatch(/\d{4}-\d{2}-\d{2}/);
  });
});


