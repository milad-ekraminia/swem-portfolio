import { describe, it, expect, vi } from 'vitest';
import { naturalGasList } from '@/helpers/firm-confirmtion/firm-confirmtion-natural-gas';

vi.mock('@/helpers/get-translated-value', () => ({
  getTranslatedValue: vi.fn((key: string) => key),
}));

describe('firm-confirmtion/firm-confirmtion-natural-gas', () => {
  it('naturalGasList returns array with correct structure', () => {
    const errors = {
      k_factor_21_mbar: { message: 'Error 1' },
      k_factor_100_mbar: { message: 'Error 2' },
    };

    const result = naturalGasList(errors);
    
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(4);
    
    // Check first item structure
    const firstItem = result[0];
    expect(firstItem).toHaveProperty('isNumberInput');
    expect(firstItem).toHaveProperty('id');
    expect(firstItem).toHaveProperty('name');
    expect(firstItem).toHaveProperty('label');
    expect(firstItem).toHaveProperty('placeholder');
    expect(firstItem).toHaveProperty('error');
    
    expect(firstItem.isNumberInput).toBe(true);
    expect(firstItem.placeholder).toBe(0);
    
    // Check error mapping
    expect(firstItem.error).toBe('Error 1');
  });

  it('naturalGasList handles empty errors', () => {
    const result = naturalGasList({});
    
    expect(Array.isArray(result)).toBe(true);
    expect(result[0].error).toBeUndefined();
  });
});
