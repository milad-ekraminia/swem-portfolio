import { describe, it, expect } from 'vitest';
import { filterOrganizationTree } from '@/helpers/filter-organization-tree';

describe('filterOrganizationTree', () => {
  const tree = [
    {
      active: true,
      caption: 'Root A',
      title: 'A',
      brand: 'X',
      organizationParentId: null,
      organizationStationEBTIntegration: false,
      organizationType: 1,
      organizationStationType: 1,
      organizationStationType2: 1,
      hasActiveAlarm: 1,
      childs: [
        {
          active: false,
          caption: 'Child A1',
          title: 'A1',
          brand: 'X',
          organizationParentId: 1,
          organizationStationEBTIntegration: false,
          organizationType: 1,
          organizationStationType: 1,
          organizationStationType2: 1,
          hasActiveAlarm: 2,
        },
      ],
    },
    {
      active: false,
      caption: 'Root B',
      title: 'B',
      brand: 'Y',
      organizationParentId: null,
      organizationStationEBTIntegration: false,
      organizationType: 1,
      organizationStationType: 1,
      organizationStationType2: 1,
      hasActiveAlarm: null,
    },
  ];

  it('returns all when filters are broad (all, no levels)', () => {
    const result = filterOrganizationTree(tree as any, {
      deviceStatus: 'all',
      treeFilterLevels: [],
    });
    expect(result.length).toBe(2);
  });

  it('filters by deviceStatus active', () => {
    const result = filterOrganizationTree(tree as any, {
      deviceStatus: 'active',
      treeFilterLevels: [],
    });
    expect(result.length).toBe(1);
    expect(result[0].title).toBe('A');
  });

  it('filters by deviceStatus disabled', () => {
    const result = filterOrganizationTree(tree as any, {
      deviceStatus: 'disabled',
      treeFilterLevels: [],
    });
    // Parent A is kept because it has a disabled child that matches
    expect(result.length).toBe(2);
    const titles = result.map((n) => n.title).sort();
    expect(titles).toEqual(['A', 'B']);
  });

  it('filters by alarm levels, keeping parent if child matches', () => {
    const result = filterOrganizationTree(tree as any, {
      deviceStatus: 'all',
      treeFilterLevels: ['2'],
    });
    expect(result.length).toBe(1);
    expect(result[0].title).toBe('A');
    expect(result[0].childs?.length).toBe(1);
    expect(result[0].childs?.[0].title).toBe('A1');
  });
});


