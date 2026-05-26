import { describe, it, expect, vi } from 'vitest';
import { tableDescriptionHelper } from '@/helpers/table-description-helper';

vi.mock('@/helpers/get-translated-value', () => ({
  getTranslatedValue: vi.fn((k: string) => k),
}));

vi.mock('@/helpers/format-data', () => ({
  dateFormatter: vi.fn((d: string) => `FMT(${d})`),
}));

describe('tableDescriptionHelper', () => {
  it('returns combined string when both provided', () => {
    const res = tableDescriptionHelper({
      timetoReadtheLatestData: '2025-09-18',
      theTimeoftheLastConfirmedData: '2025-09-17',
    });
    expect(res).toBe(
      'TheTimeoftheLastConfirmedData FMT(2025-09-17) - TimetoReadtheLatestData FMT(2025-09-18)',
    );
  });

  it('returns only latest time formatted when first provided', () => {
    const res = tableDescriptionHelper({
      timetoReadtheLatestData: '2025-09-18',
      theTimeoftheLastConfirmedData: '',
    });
    expect(res).toBe('FMT(2025-09-18)');
  });

  it('returns empty string when none provided', () => {
    const res = tableDescriptionHelper({
      timetoReadtheLatestData: '',
      theTimeoftheLastConfirmedData: '',
    });
    expect(res).toBe('');
  });
});


