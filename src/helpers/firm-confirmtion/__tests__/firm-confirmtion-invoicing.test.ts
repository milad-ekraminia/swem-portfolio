import { invoicingList } from '@/helpers/firm-confirmtion/firm-confirmtion-invoicing';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/helpers/get-translated-value', () => ({
  getTranslatedValue: vi.fn((key: string) => key),
}));

describe('firm-confirmtion/firm-confirmtion-invoicing', () => {
  it('invoicingList returns array with correct structure', () => {
    const errors = {
      electricity_invoice_method: { message: 'Error 1' },
      index_finding_day_treshold: { message: 'Error 2' },
    };

    const result = invoicingList(errors);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(5);

    // Check first item structure
    const firstItem = result[0];
    expect(firstItem).toHaveProperty('id');
    expect(firstItem).toHaveProperty('name');
    expect(firstItem).toHaveProperty('label');
    expect(firstItem).toHaveProperty('placeholder');
    expect(firstItem).toHaveProperty('options');
    expect(firstItem).toHaveProperty('error');

    // Check options structure
    expect(Array.isArray(firstItem.options)).toBe(true);
    expect(firstItem.options?.[0]).toHaveProperty('title');
    expect(firstItem.options?.[0]).toHaveProperty('value');

    // Check error mapping
    expect(firstItem.error).toBe('Error 1');
  });

  it('invoicingList handles empty errors', () => {
    const result = invoicingList({});

    expect(Array.isArray(result)).toBe(true);
    expect(result[0].error).toBeUndefined();
  });
});
