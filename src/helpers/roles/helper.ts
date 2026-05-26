import { Permission, PermissionGroup } from '@/types/pages/system-administration/definitions/permissions';


export const handleSelectAll = (
  name: string,
  checkboxList: PermissionGroup[],
  setCheckboxList: React.Dispatch<React.SetStateAction<PermissionGroup[]>>,
  selectAll: boolean,
) => {
  // find group and select all permissions
  const group = checkboxList.find(
    (group: PermissionGroup) => group.name === name,
  );
  if (group) {
    // const updatedPermissions = group.
    //     permissions.map(permission => (
    //         (permission?.grantedProviders?.find(elem => elem?.providerKey === userId)) ? {
    //             ...permission,
    //             isGranted: !selectAll
    //         } : permission));

    const updatedPermissions = group.permissions.map((permission) => ({
      ...permission,
      isGranted: !selectAll,
    }));
    setCheckboxList((prev) =>
      prev.map((group) =>
        group.name === name
          ? { ...group, permissions: updatedPermissions }
          : group,
      ),
    );
    // setSelectAll(!selectAll);
  }
};

export const handleMainSelectAll = (
  checkboxList: PermissionGroup[],
  setCheckboxList: React.Dispatch<React.SetStateAction<PermissionGroup[]>>,
  setMainSelectAll: React.Dispatch<React.SetStateAction<boolean>>,
  mainSelectAll: boolean,
) => {
  const updatedGroups = checkboxList.map((group) => ({
    ...group,
    permissions: group.permissions.map((permission) => ({
      ...permission,
      isGranted: !mainSelectAll,
    })),
  }));
  setCheckboxList(updatedGroups);
  setMainSelectAll(!mainSelectAll);
};

// Toggle a permission and propagate the changes recursively
export const handlePermissionChange = (
  groupIndex: number,
  name: string,
  checkboxList: PermissionGroup[],
  setCheckboxList: React.Dispatch<React.SetStateAction<PermissionGroup[]>>,
) => {
  const updatedGroups = [...checkboxList];
  let permissions = updatedGroups[groupIndex].permissions;

  // Recursive: update all children of a parent
  const updateChildren = (parentName: string, isGranted: boolean) => {
    permissions = permissions.map((p) =>
      p.parentName === parentName ? { ...p, isGranted } : p,
    );

    // for each child, also update its own children
    permissions
      .filter((p) => p.parentName === parentName)
      .forEach((child) => updateChildren(child.name, isGranted));
  };

  // Recursive: update parents based on children state
  const updateParents = (child: Permission) => {
    if (!child.parentName) return; // no parent

    const parent = permissions.find((p) => p.name === child.parentName);
    if (!parent) return;

    const siblings = permissions.filter((p) => p.parentName === parent.name);
    const allChildrenSelected = siblings.every((s) => s.isGranted);

    // if even one child is unselected => parent must be unselected
    const updatedParent = { ...parent, isGranted: allChildrenSelected };

    permissions = permissions.map((p) =>
      p.name === parent.name ? updatedParent : p,
    );

    // Recursively update upper levels
    updateParents(updatedParent);
  };

  // Find the clicked item
  const item = permissions.find((p) => p.name === name);
  if (!item) return;

  const newIsGranted = !item.isGranted;
  permissions = permissions.map((p) =>
    p.name === name ? { ...item, isGranted: newIsGranted } : p,
  );

  // If parent → cascade down to all children
  updateChildren(item.name, newIsGranted);

  // If child → cascade up to parents
  updateParents({ ...item, isGranted: newIsGranted });

  // Save back
  updatedGroups[groupIndex].permissions = permissions;
  setCheckboxList(updatedGroups);
};

export const buildPermissionTree = (permissions: Permission[]) => {
  const map = new Map<string, Permission & { permissions?: Permission[] }>();
  const roots: (Permission & { permissions?: Permission[] })[] = [];

  permissions.forEach((permission) => {
    map.set(permission.name, { ...permission, permissions: [] });
  });

  map.forEach((permission) => {
    if (permission.parentName) {
      const parent = map.get(permission.parentName);
      if (parent) {
        parent.permissions?.push(permission);
      }
    } else {
      roots.push(permission);
    }
  });

  return roots;
};