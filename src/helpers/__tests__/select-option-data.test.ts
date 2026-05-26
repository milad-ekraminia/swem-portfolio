import { describe, it, expect } from 'vitest';
import {
  dateModes,
  inverterInstantChartTypeValueList,
  instantChartTypeValueList,
  dateDays,
  dateMonths,
  dateYears,
} from '@/helpers/select-option-data';

describe('select-option-data constants', () => {
  it('dateModes contains Daily/Monthly/Yearly with titles', () => {
    const values = dateModes.map((d) => d.value).sort();
    expect(values).toEqual(['Daily', 'Monthly', 'Yearly']);
    dateModes.forEach((d) => expect(typeof d.title).toBe('string'));
  });

  it('inverterInstantChartTypeValueList and instantChartTypeValueList have displayName/value strings', () => {
    inverterInstantChartTypeValueList.forEach((i) => {
      expect(typeof i.displayName).toBe('string');
      expect(typeof i.value).toBe('string');
    });
    instantChartTypeValueList.forEach((i) => {
      expect(typeof i.displayName).toBe('string');
      expect(typeof i.value).toBe('string');
    });
  });

  it('dateDays lists 01..31 values and titles match day numbers', () => {
    expect(dateDays.length).toBe(31);
    expect(dateDays[0]).toEqual({ title: '1', value: '01' });
    expect(dateDays[30]).toEqual({ title: '31', value: '31' });
  });

  it('dateMonths contains 12 entries of 01..12', () => {
    expect(dateMonths.length).toBe(12);
    expect(dateMonths[0].value).toBe('01');
    expect(dateMonths[11].value).toBe('12');
  });

  it('dateYears contains expected recent years', () => {
    const values = dateYears.map((y) => y.value);
    expect(values).toEqual(['2022', '2023', '2024', '2025']);
  });
});


