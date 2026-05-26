import { describe, it, expect } from 'vitest';
import {
  getEnumOptions,
  getEnumStringOptions,
  getOrgTypeEnumOptionsByCondition,
  getStationTypeEnumOptionsByCondition,
} from '@/helpers/get-enum-options';

describe('get-enum-options helpers', () => {
  const sampleEnum = {
    A: 0,
    B: 1,
    C: 'x',
    0: 'A',
    1: 'B',
  } as const;

  it('getEnumOptions maps numeric enum entries', () => {
    const res = getEnumOptions(sampleEnum as any);
    expect(res).toEqual(
      expect.arrayContaining([
        { value: 0, title: 'A' },
        { value: 1, title: 'B' },
      ]),
    );
  });

  it('getEnumStringOptions maps numeric entries but keeps values as strings', () => {
    const res = getEnumStringOptions(sampleEnum as any);
    expect(res).toEqual(
      expect.arrayContaining([
        { value: '0', title: 'A' },
        { value: '1', title: 'B' },
      ]),
    );
  });

  it('getOrgTypeEnumOptionsByCondition filters based on ng/re flags and transforms titles', () => {
    const OrgType = {
      Company: 0,
      System: 1,
      BusinessTownDistrict: 2,
      Station: 3,
      RenewablePowerPlant: 4,
      RenewablePowerPlantPartialPlanthole: 5,
      Other: 6,
      0: 'Company',
      1: 'System',
      2: 'BusinessTownDistrict',
      3: 'Station',
      4: 'RenewablePowerPlant',
      5: 'RenewablePowerPlantPartialPlanthole',
      6: 'Other',
    } as const;

    // ng=0, re=0 -> exclude BTD (2), Station (3), RPP (4), RPPPP (5), and also Company/System
    const none = getOrgTypeEnumOptionsByCondition(OrgType as any, 0, 0);
    expect(none).toEqual([{ value: 6, title: 'Enum:OrganizationType.Other' }]);

    // ng=1, re=0 -> Station allowed, BTD allowed, RPP disallowed
    const ngOnly = getOrgTypeEnumOptionsByCondition(OrgType as any, 1, 0);
    expect(ngOnly.map((o) => o.value).sort()).toEqual([2, 3, 6]);

    // ng=0, re=1 -> RPP allowed, BTD allowed, Station disallowed
    const reOnly = getOrgTypeEnumOptionsByCondition(OrgType as any, 0, 1);
    expect(reOnly.map((o) => o.value).sort()).toEqual([2, 4, 5, 6]);

    // ng=1, re=1 -> everything except Company/System
    const both = getOrgTypeEnumOptionsByCondition(OrgType as any, 1, 1);
    expect(both.map((o) => o.value).sort()).toEqual([2, 3, 4, 5, 6]);
  });

  it('getStationTypeEnumOptionsByCondition removes CustomerStation and VirtualStation', () => {
    const StationType = {
      NormalStation: 0,
      CustomerStation: 1,
      VirtualStation: 2,
      0: 'NormalStation',
      1: 'CustomerStation',
      2: 'VirtualStation',
    } as const;

    const res = getStationTypeEnumOptionsByCondition(StationType as any);
    expect(res).toEqual([{ value: 0, title: 'Normal Station' }]);
  });
});


