import { describe, it, expect, vi } from 'vitest';
import { electricFormListUnitPrice, naturalGasFormListUnitPrice } from '@/helpers/firm-confirmtion/firm-confirmtion-unit-price';

vi.mock('@/helpers/get-translated-value', () => ({
  getTranslatedValue: vi.fn((key: string) => key),
}));

describe('firm-confirmtion/firm-confirmtion-unit-price', () => {
  it('electricFormListUnitPrice returns array with correct structure', () => {
    const errors = {
      electricity_unit_price: { message: 'Error 1' },
      electricity_money_unit: { message: 'Error 2' },
    };

    const result = electricFormListUnitPrice(errors);
    
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(2);
    
    // Check first item (number input)
    const firstItem = result[0];
    expect(firstItem).toHaveProperty('isNumberInput');
    expect(firstItem).toHaveProperty('id');
    expect(firstItem).toHaveProperty('name');
    expect(firstItem).toHaveProperty('label');
    expect(firstItem).toHaveProperty('placeholder');
    expect(firstItem).toHaveProperty('error');
    
    expect(firstItem.isNumberInput).toBe(true);
    expect(firstItem.placeholder).toBe(0);
    
    // Check second item (text input)
    const secondItem = result[1];
    expect(secondItem).toHaveProperty('isTextInput');
    expect(secondItem.isTextInput).toBe(true);
    expect(secondItem.placeholder).toBe('TL');
    
    // Check error mapping
    expect(firstItem.error).toBe('Error 1');
  });

  it('naturalGasFormListUnitPrice returns array with correct structure', () => {
    const errors = {
      natural_gas_unit_price: { message: 'Error 1' },
      natural_gas_money_unit: { message: 'Error 2' },
    };

    const result = naturalGasFormListUnitPrice(errors);
    
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(2);
    
    // Check first item (number input)
    const firstItem = result[0];
    expect(firstItem).toHaveProperty('isNumberInput');
    expect(firstItem.isNumberInput).toBe(true);
    expect(firstItem.placeholder).toBe(0);
    
    // Check second item (text input)
    const secondItem = result[1];
    expect(secondItem).toHaveProperty('isTextInput');
    expect(secondItem.isTextInput).toBe(true);
    expect(secondItem.placeholder).toBe('TL');
    
    // Check error mapping
    expect(firstItem.error).toBe('Error 1');
  });

  it('both lists handle empty errors', () => {
    const electricResult = electricFormListUnitPrice({});
    const naturalGasResult = naturalGasFormListUnitPrice({});
    
    expect(Array.isArray(electricResult)).toBe(true);
    expect(Array.isArray(naturalGasResult)).toBe(true);
    expect(electricResult[0].error).toBeUndefined();
    expect(naturalGasResult[0].error).toBeUndefined();
  });
});
