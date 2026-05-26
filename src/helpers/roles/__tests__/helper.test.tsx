import { describe, it, expect } from 'vitest';
import { handleSelectAll, handleMainSelectAll, handlePermissionChange, buildPermissionTree } from '@/helpers/roles/helper';
import type { Permission, PermissionGroup } from '@/types/pages/system-administration/definitions/permissions';

describe('roles/helper', () => {
  it('handleSelectAll toggles all permissions in a group', () => {
    const group: PermissionGroup = {
      name: 'G1',
      displayName: 'Group 1',
      permissions: [
        { name: 'p1', displayName: 'P1', isGranted: false },
        { name: 'p2', displayName: 'P2', isGranted: true },
      ],
    } as PermissionGroup;

    const state: PermissionGroup[] = [group];
    let updated: PermissionGroup[] = state;
    handleSelectAll('G1', state, (fn) => { updated = (typeof fn === 'function' ? fn(state) : fn) as PermissionGroup[]; }, false);
    expect(updated[0].permissions.every((p) => p.isGranted)).toBe(true);
  });

  it('handleMainSelectAll toggles all groups and flips mainSelectAll', () => {
    const groups: PermissionGroup[] = [
      { name: 'A', displayName: 'A', permissions: [{ name: 'p', displayName: 'p', isGranted: false }] } as PermissionGroup,
    ];
    let updatedGroups: PermissionGroup[] = groups;
    let main = false;
    handleMainSelectAll(
      groups,
      (g) => { updatedGroups = g as PermissionGroup[]; },
      (m) => { main = m as boolean; },
      false,
    );
    expect(updatedGroups[0].permissions[0].isGranted).toBe(true);
    expect(main).toBe(true);
  });

  it('handlePermissionChange toggles item, cascades children, and updates parents', () => {
    const group: PermissionGroup = {
      name: 'G',
      displayName: 'G',
      permissions: [
        { name: 'parent', displayName: 'Parent', isGranted: false },
        { name: 'child1', parentName: 'parent', displayName: 'C1', isGranted: false },
        { name: 'child2', parentName: 'child1', displayName: 'C2', isGranted: false },
      ],
    } as PermissionGroup;
    const state: PermissionGroup[] = [group];
    let updated: PermissionGroup[] = state;

    handlePermissionChange(0, 'child1', state, (g) => { updated = g as PermissionGroup[]; });
    const perms = updated[0].permissions;
    const parent = perms.find((p) => p.name === 'parent');
    const child1 = perms.find((p) => p.name === 'child1');
    const child2 = perms.find((p) => p.name === 'child2');
    expect(child1?.isGranted).toBe(true);
    expect(child2?.isGranted).toBe(true);
    expect(parent?.isGranted).toBe(true);
  });

  it('buildPermissionTree constructs nested tree by parentName', () => {
    const perms: Permission[] = [
      { name: 'root', displayName: 'root', isGranted: false },
      { name: 'a', parentName: 'root', displayName: 'a', isGranted: false },
      { name: 'b', parentName: 'a', displayName: 'b', isGranted: false },
    ] as Permission[];

    const roots = buildPermissionTree(perms);
    expect(roots.length).toBe(1);
    expect(roots[0].permissions?.[0].name).toBe('a');
    expect(roots[0].permissions?.[0].permissions?.[0].name).toBe('b');
  });
});
