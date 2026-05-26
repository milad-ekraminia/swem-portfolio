type OrganizationNode = {
  active: boolean;
  caption: string;
  title: string;
  brand: string;
  organizationParentId: number | null;
  organizationStationEBTIntegration: boolean;
  organizationType: number;
  organizationStationType: number;
  organizationStationType2: number;
  childs?: OrganizationNode[];
  hasActiveAlarm?: number | null;
};

// Your filter state type:
type TreeFilterState = {
  treeFilterLevels: (string | undefined)[] | null | undefined;
  deviceStatus: string | null | undefined;
};

// Recursive filter function:
export function filterOrganizationTree(
  nodes: OrganizationNode[],
  filters: TreeFilterState,
): OrganizationNode[] {
  if (!nodes) return [];

  return nodes
    .map((node) => {
      // deviceStatus filter
      const deviceStatusMatch =
        filters.deviceStatus === null ||
        filters.deviceStatus === undefined ||
        filters.deviceStatus === 'all' ||
        (filters.deviceStatus === 'active' && node.active) ||
        (filters.deviceStatus === 'disabled' && !node.active);

      // alarm level filter against node.hasActiveAlarm
      const levelMatch =
        !filters.treeFilterLevels ||
        filters.treeFilterLevels.length === 0 ||
        (node.hasActiveAlarm !== null &&
          node.hasActiveAlarm !== undefined &&
          filters.treeFilterLevels.includes(node.hasActiveAlarm.toString()));

      // Recursively filter children
      const filteredChildren = node.childs
        ? filterOrganizationTree(node.childs, filters)
        : [];

      // Keep node if it matches filters OR if it has filtered children
      if ((deviceStatusMatch && levelMatch) || filteredChildren.length > 0) {
        return {
          ...node,
          childs: filteredChildren,
        };
      }

      return null;
    })
    .filter(Boolean) as OrganizationNode[];
}
