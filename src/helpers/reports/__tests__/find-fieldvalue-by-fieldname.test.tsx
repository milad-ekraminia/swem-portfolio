import { describe, it, expect } from 'vitest';
import { useFormDataValueChangeByFieldName } from '@/helpers/reports/find-fieldvalue-by-fieldname';

// Mock React hooks
vi.mock('react', () => ({
  useCallback: vi.fn((fn) => fn),
}));

describe('reports/find-fieldvalue-by-fieldname', () => {
  it('returns correct path for exact fieldName match', () => {
    const fields = [
      { fieldName: 'testField' },
      { fieldName: 'anotherField' },
    ];
    
    const hook = useFormDataValueChangeByFieldName(fields);
    const result = hook('testField');
    
    expect(result).toBe('filterProfileFields.0.fieldValue');
  });

  it('returns correct path for capitalized fieldName match', () => {
    const fields = [
      { fieldName: 'TestField' },
      { fieldName: 'AnotherField' },
    ];
    
    const hook = useFormDataValueChangeByFieldName(fields);
    const result = hook('testField');
    
    expect(result).toBe('filterProfileFields.0.fieldValue');
  });

  it('returns correct path for different field', () => {
    const fields = [
      { fieldName: 'firstField' },
      { fieldName: 'secondField' },
    ];
    
    const hook = useFormDataValueChangeByFieldName(fields);
    const result = hook('secondField');
    
    expect(result).toBe('filterProfileFields.1.fieldValue');
  });

  it('returns correct path for capitalized second field', () => {
    const fields = [
      { fieldName: 'firstField' },
      { fieldName: 'SecondField' },
    ];
    
    const hook = useFormDataValueChangeByFieldName(fields);
    const result = hook('secondField');
    
    expect(result).toBe('filterProfileFields.1.fieldValue');
  });

  it('returns path for non-existent field (finds nothing, returns index -1)', () => {
    const fields = [
      { fieldName: 'firstField' },
      { fieldName: 'secondField' },
    ];
    
    const hook = useFormDataValueChangeByFieldName(fields);
    const result = hook('nonExistentField');
    
    expect(result).toBe('filterProfileFields.-1.fieldValue');
  });
});
