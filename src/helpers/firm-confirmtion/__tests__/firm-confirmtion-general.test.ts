import { describe, it, expect, vi } from 'vitest';
import { organizationBasedMonitoringList } from '@/helpers/firm-confirmtion/firm-confirmtion-general';

vi.mock('@/helpers/get-translated-value', () => ({
  getTranslatedValue: vi.fn((key: string) => key),
}));

describe('firm-confirmtion/firm-confirmtion-general', () => {
  it('organizationBasedMonitoringList returns array with correct structure', () => {
    const errors = {
      refresh_obm_org_device_communication_status: { message: 'Error 1' },
      refresh_obm_org_last_sensor_value: { message: 'Error 2' },
    };

    const result = organizationBasedMonitoringList(errors);
    
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    
    // Check first item structure
    const firstItem = result[0];
    expect(firstItem).toHaveProperty('id');
    expect(firstItem).toHaveProperty('isNumberInput');
    expect(firstItem).toHaveProperty('name');
    expect(firstItem).toHaveProperty('label');
    expect(firstItem).toHaveProperty('placeholder');
    expect(firstItem).toHaveProperty('error');
    
    // Check error mapping
    expect(firstItem.error).toBe('Error 1');
  });

  it('organizationBasedMonitoringList handles empty errors', () => {
    const result = organizationBasedMonitoringList({});
    
    expect(Array.isArray(result)).toBe(true);
    expect(result[0].error).toBeUndefined();
  });
});
