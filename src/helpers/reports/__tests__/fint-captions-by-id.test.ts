import { describe, it, expect } from 'vitest';
import { findCaptionsByIds } from '@/helpers/reports/fint-captions-by-id';

describe('reports/fint-captions-by-id', () => {
  const treeData = [
    {
      id: 1,
      caption: 'Root 1',
      organizationTreeNodeType: 1,
      childs: [
        {
          id: 2,
          caption: 'Child 1',
          organizationTreeNodeType: 2,
          childs: [
            {
              id: 3,
              caption: 'Grandchild 1',
              organizationTreeNodeType: 3,
            },
          ],
        },
      ],
    },
    {
      id: 4,
      caption: 'Root 2',
      organizationTreeNodeType: 1,
    },
  ];

  it('finds captions for existing IDs', () => {
    const result = findCaptionsByIds(treeData, [1, 2, 4]);
    
    expect(result).toEqual([
      { id: 1, caption: 'Root 1', organizationTreeNodeType: 1 },
      { id: 2, caption: 'Child 1', organizationTreeNodeType: 2 },
      { id: 4, caption: 'Root 2', organizationTreeNodeType: 1 },
    ]);
  });

  it('finds nested captions', () => {
    const result = findCaptionsByIds(treeData, [3]);
    
    expect(result).toEqual([
      { id: 3, caption: 'Grandchild 1', organizationTreeNodeType: 3 },
    ]);
  });

  it('returns empty array for non-existent IDs', () => {
    const result = findCaptionsByIds(treeData, [99, 100]);
    
    expect(result).toEqual([]);
  });

  it('handles empty tree data', () => {
    const result = findCaptionsByIds([], [1, 2]);
    
    expect(result).toEqual([]);
  });

  it('handles empty IDs array', () => {
    const result = findCaptionsByIds(treeData, []);
    
    expect(result).toEqual([]);
  });

  it('finds mixed existing and non-existing IDs', () => {
    const result = findCaptionsByIds(treeData, [1, 99, 2, 100]);
    
    expect(result).toEqual([
      { id: 1, caption: 'Root 1', organizationTreeNodeType: 1 },
      { id: 2, caption: 'Child 1', organizationTreeNodeType: 2 },
    ]);
  });
});
