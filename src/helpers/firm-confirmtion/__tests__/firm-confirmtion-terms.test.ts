import { describe, it, expect, vi } from 'vitest';
import { electricFormList, naturalGasFormList } from '@/helpers/firm-confirmtion/firm-confirmtion-terms';

vi.mock('@/helpers/get-translated-value', () => ({
  getTranslatedValue: vi.fn((key: string) => key),
}));

describe('firm-confirmtion/firm-confirmtion-terms', () => {
  it('electricFormList returns array with correct structure', () => {
    const errors = {
      monthly_term_start_1: { message: 'Error 1' },
      weekly_term_start_1: { message: 'Error 2' },
    };

    const result = electricFormList(errors);
    
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(3);
    
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
    expect(firstItem.options[0]).toHaveProperty('title');
    expect(firstItem.options[0]).toHaveProperty('value');
    
    // Check error mapping
    expect(firstItem.error).toBe('Error 1');
  });

  it('naturalGasFormList returns array with correct structure', () => {
    const errors = {
      monthly_term_start_1: { message: 'Error 1' },
      assignedUserId: { message: 'Error 2' },
    };

    const result = naturalGasFormList(errors);
    
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(3);
    
    // Check first item structure
    const firstItem = result[0];
    expect(firstItem).toHaveProperty('id');
    expect(firstItem).toHaveProperty('name');
    expect(firstItem).toHaveProperty('label');
    expect(firstItem).toHaveProperty('placeholder');
    expect(firstItem).toHaveProperty('options');
    expect(firstItem).toHaveProperty('error');
    
    // Check error mapping (uses monthly_term_start_1, not monthly_term_start_2)
    expect(firstItem.error).toBe('Error 1');
  });

  it('both lists handle empty errors', () => {
    const electricResult = electricFormList({});
    const naturalGasResult = naturalGasFormList({});
    
    expect(Array.isArray(electricResult)).toBe(true);
    expect(Array.isArray(naturalGasResult)).toBe(true);
    expect(electricResult[0].error).toBeUndefined();
    expect(naturalGasResult[0].error).toBeUndefined();
  });
});
