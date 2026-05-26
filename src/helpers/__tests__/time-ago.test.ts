import { timeAgoFrom } from '@/helpers/time-ago';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/helpers/get-translated-value', () => ({
  getTranslatedValue: vi.fn((key: string) => {
    const translations: Record<string, string> = {
      Now: 'Now',
      Second: 'second',
      Minute: 'minute',
      Hour: 'hour',
      Day: 'day',
      Week: 'week',
      Month: 'month',
      Year: 'year',
      Ago: 'ago',
    };
    return translations[key] || key;
  }),
}));

describe('time-ago', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-01-15T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('handles immediate time (less than 10 seconds)', () => {
    const fiveSecondsAgo = new Date('2025-01-15T11:59:55Z');

    expect(timeAgoFrom(fiveSecondsAgo)).toBe('Now');
    expect(timeAgoFrom(fiveSecondsAgo, { immediate: true })).toBe('Now');
    expect(timeAgoFrom(fiveSecondsAgo, { immediate: false })).toContain(
      'second',
    );
  });

  it('handles seconds', () => {
    const thirtySecondsAgo = new Date('2025-01-15T11:59:30Z');
    expect(timeAgoFrom(thirtySecondsAgo)).toContain('30 second ago');
    expect(timeAgoFrom(thirtySecondsAgo, { maxUnit: 'second' })).toContain(
      '30 second ago',
    );
  });

  it('handles minutes', () => {
    const fiveMinutesAgo = new Date('2025-01-15T11:55:00Z');
    expect(timeAgoFrom(fiveMinutesAgo)).toContain('5 minute ago');
    expect(timeAgoFrom(fiveMinutesAgo, { maxUnit: 'minute' })).toContain(
      '5 minute ago',
    );
  });

  it('handles hours', () => {
    const twoHoursAgo = new Date('2025-01-15T10:00:00Z');
    expect(timeAgoFrom(twoHoursAgo)).toContain('2 hour ago');
    expect(timeAgoFrom(twoHoursAgo, { maxUnit: 'hour' })).toContain(
      '2 hour ago',
    );
  });

  it('handles days', () => {
    const threeDaysAgo = new Date('2025-01-12T12:00:00Z');
    expect(timeAgoFrom(threeDaysAgo)).toContain('3 day ago');
    expect(timeAgoFrom(threeDaysAgo, { maxUnit: 'day' })).toContain(
      '3 day ago',
    );
  });

  it('handles weeks', () => {
    const twoWeeksAgo = new Date('2025-01-01T12:00:00Z');
    expect(timeAgoFrom(twoWeeksAgo)).toContain('2 week ago');
  });

  it('handles months', () => {
    const sixMonthsAgo = new Date('2024-07-15T12:00:00Z');
    expect(timeAgoFrom(sixMonthsAgo)).toContain('6 month ago');
    expect(timeAgoFrom(sixMonthsAgo, { maxUnit: 'month' })).toContain(
      '6 month ago',
    );
  });

  it('handles years', () => {
    const twoYearsAgo = new Date('2023-01-15T12:00:00Z');
    expect(timeAgoFrom(twoYearsAgo)).toContain('2 year ago');
    expect(timeAgoFrom(twoYearsAgo, { maxUnit: 'year' })).toContain(
      '2 year ago',
    );
  });

  it('handles future dates', () => {
    const futureDate = new Date('2025-01-15T13:00:00Z');
    expect(timeAgoFrom(futureDate)).toContain('in ');
  });

  it('handles different input types', () => {
    const date = new Date('2025-01-15T11:00:00Z');
    const dateString = '2025-01-15T11:00:00Z';
    const timestamp = date.getTime();

    expect(timeAgoFrom(date)).toContain('1 hour ago');
    expect(timeAgoFrom(dateString)).toContain('1 hour ago');
    expect(timeAgoFrom(timestamp)).toContain('1 hour ago');
  });

  it('handles invalid dates', () => {
    expect(timeAgoFrom('invalid-date')).toBe('');
    expect(timeAgoFrom(new Date('invalid'))).toBe('');
  });

  it('handles edge cases', () => {
    // Test with 0 values
    const now = new Date('2025-01-15T12:00:00Z');
    expect(timeAgoFrom(now, { immediate: false })).toContain('1 second ago');

    // Test with very old date
    const veryOldDate = new Date('1900-01-01T12:00:00Z');
    expect(timeAgoFrom(veryOldDate)).toContain('year ago');
  });
});
