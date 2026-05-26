import {
  buildPermissionTree,
  handleMainSelectAll,
  handlePermissionChange,
  handleSelectAll,
} from '@/helpers/users-helper';
import { describe, expect, it, vi } from 'vitest';
import {
  Permission,
  PermissionGroup,
} from '@/types/pages/system-administration/definitions/permissions';

describe('users-helper', () => {
  const mockPermission: Permission = {
    name: 'test-permission',
    displayName: 'Test Permission',
    isGranted: false,
    parentName: '',
    grantedProviders: [],
    permissions: [],
  };

  const mockPermissionGroup: PermissionGroup = {
    name: 'test-group',
    displayName: 'Test Group',
    permissions: [mockPermission],
  };

  describe('handleSelectAll', () => {
    it('should toggle all permissions in a group', () => {
      const setCheckboxList = vi.fn();
      const checkboxList = [mockPermissionGroup];

      handleSelectAll('test-group', checkboxList, setCheckboxList, false);

      expect(setCheckboxList).toHaveBeenCalledWith(expect.any(Function));

      // Test the function that was passed
      const updateFunction = setCheckboxList.mock.calls[0][0];
      const result = updateFunction(checkboxList);

      expect(result).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: 'test-group',
            permissions: expect.arrayContaining([
              expect.objectContaining({ isGranted: true }),
            ]),
          }),
        ]),
      );
    });

    it('should not update if group not found', () => {
      const setCheckboxList = vi.fn();
      const checkboxList = [mockPermissionGroup];

      handleSelectAll(
        'non-existent-group',
        checkboxList,
        setCheckboxList,
        false,
      );

      expect(setCheckboxList).not.toHaveBeenCalled();
    });
  });

  describe('handleMainSelectAll', () => {
    it('should toggle all permissions in all groups', () => {
      const setCheckboxList = vi.fn();
      const setMainSelectAll = vi.fn();
      const checkboxList = [mockPermissionGroup];

      handleMainSelectAll(
        checkboxList,
        setCheckboxList,
        setMainSelectAll,
        false,
      );

      expect(setCheckboxList).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            permissions: expect.arrayContaining([
              expect.objectContaining({ isGranted: true }),
            ]),
          }),
        ]),
      );
      expect(setMainSelectAll).toHaveBeenCalledWith(true);
    });
  });

  describe('handlePermissionChange', () => {
    it('should toggle a permission and update children', () => {
      const setCheckboxList = vi.fn();
      const parentPermission: Permission = {
        name: 'parent',
        displayName: 'Parent',
        isGranted: false,
        parentName: '',
        grantedProviders: [],
        permissions: [],
      };
      const childPermission: Permission = {
        name: 'child',
        displayName: 'Child',
        isGranted: false,
        parentName: 'parent',
        grantedProviders: [],
        permissions: [],
      };

      const checkboxList: PermissionGroup[] = [
        {
          name: 'test-group',
          displayName: 'Test Group',
          permissions: [parentPermission, childPermission],
        },
      ];

      handlePermissionChange(0, 'parent', checkboxList, setCheckboxList);

      expect(setCheckboxList).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            permissions: expect.arrayContaining([
              expect.objectContaining({ name: 'parent', isGranted: true }),
              expect.objectContaining({ name: 'child', isGranted: true }),
            ]),
          }),
        ]),
      );
    });

    it('should not update if permission not found', () => {
      const setCheckboxList = vi.fn();
      const checkboxList = [mockPermissionGroup];

      handlePermissionChange(0, 'non-existent', checkboxList, setCheckboxList);

      expect(setCheckboxList).not.toHaveBeenCalled();
    });
  });

  describe('buildPermissionTree', () => {
    it('should build a tree structure from flat permissions', () => {
      const permissions: Permission[] = [
        {
          name: 'parent',
          displayName: 'Parent',
          isGranted: false,
          parentName: '',
          grantedProviders: [],
          permissions: [],
        },
        {
          name: 'child',
          displayName: 'Child',
          isGranted: false,
          parentName: 'parent',
          grantedProviders: [],
          permissions: [],
        },
      ];

      const result = buildPermissionTree(permissions);

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('parent');
      expect(result[0].permissions).toHaveLength(1);
      expect(result[0].permissions?.[0].name).toBe('child');
    });

    it('should handle permissions with no parent', () => {
      const permissions: Permission[] = [
        {
          name: 'root1',
          displayName: 'Root 1',
          isGranted: false,
          parentName: '',
          grantedProviders: [],
          permissions: [],
        },
        {
          name: 'root2',
          displayName: 'Root 2',
          isGranted: false,
          parentName: '',
          grantedProviders: [],
          permissions: [],
        },
      ];

      const result = buildPermissionTree(permissions);

      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('root1');
      expect(result[1].name).toBe('root2');
    });

    it('should handle empty permissions array', () => {
      const result = buildPermissionTree([]);
      expect(result).toHaveLength(0);
    });
  });
});
