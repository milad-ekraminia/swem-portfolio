import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import { Checkbox } from '@/components/ui/input/check-box/check-box';
import { Loader } from '@/components/ui/loader/loader';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import { getClassNames } from '@/helpers/get-class-names';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { handleError } from '@/helpers/handle-error';
import {
  buildPermissionTree,
  handleMainSelectAll,
  handlePermissionChange,
  handleSelectAll,
} from '@/helpers/roles/helper';
import {
  getRolePermissions,
  updateRolePermissions,
} from '@/services/system-administration/definitions/roles';
import {
  Permission,
  PermissionGroup,
  UserInfo,
} from '@/types/pages/system-administration/definitions/permissions';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { memo, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface Props {
  userInfo: UserInfo;
  setShowModal: (value: any) => void;
}

const MemoPermissions = ({ userInfo, setShowModal }: Props) => {
  const [checkboxList, setCheckboxList] = useState<PermissionGroup[]>([]);
  // const [selectAll, setSelectAll] = useState(false);
  const [mainSelectAll, setMainSelectAll] = useState(false);
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(0);

  const queryClient = useQueryClient();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['Get a User Permissions', userInfo.id],
    queryFn: () => getRolePermissions({ providerKey: userInfo.name }),
    enabled: !!userInfo.id,
    retry: false,
  });

  useEffect(() => {
    if (data?.groups) setCheckboxList(data.groups);
  }, [data]);

  // setMainSelectAll
  useEffect(() => {
    const updatedGroups = checkboxList;

    if (updatedGroups?.length > 0) {
      // if all permissions are granted, set mainSelectAll to true
      // if any permission is not granted, set mainSelectAll to false
      const allPermissions = updatedGroups.flatMap((group: PermissionGroup) =>
        group.permissions.map((permission: Permission) => permission.isGranted),
      );
      const allPermissionsGranted = allPermissions.every(
        (permission: any) => permission,
      );
      setMainSelectAll(allPermissionsGranted);
    }
  }, [checkboxList, data]);

  const selectedGroup = checkboxList[selectedGroupIndex];

  // Build hierarchical permission tree

  // Recursive rendering
  const renderPermissions = (
    permissions: (Permission & { children?: Permission[] })[],
    groupIndex: number,
    parentPadding = 0,
  ) => {
    return permissions.map((permission) => {
      // const isCurrentUser = permission.grantedProviders?.filter(elem => elem.providerName === "U")?.find(elem => elem.providerName === "U")?.providerKey === userInfo.id;
      // const isDisabled = permission?.isGranted && permission.grantedProviders?.length !== 0; // اگه کاربر یا نقش مجوزی رو نداشته باشه چک باکس مربوطه قابل ویرایش نمایش داده میشه این رو از isGranted بدست میاریم
      return (
        <div
          key={permission.name}
          style={{ marginLeft: parentPadding, marginTop: 15 }}
        >
          <Checkbox
            checked={permission.isGranted}
            onChange={() =>
              handlePermissionChange(
                groupIndex,
                permission.name,
                checkboxList,
                setCheckboxList,
              )
            }
            label={permission.displayName}
          />

          {/* Render children recursively */}
          {permission.permissions?.length > 0 &&
            renderPermissions(
              permission.permissions,
              groupIndex,
              parentPadding + 20,
            )}
        </div>
      );
    });
  };

  const mutationUpdateRolePermission = useMutation({
    mutationFn: updateRolePermissions,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['Get Roles List'],
      });
      queryClient.invalidateQueries({
        queryKey: ['application-configuration'],
      });
      toast.success(getTranslatedValue('SaveSuccess'));
      setShowModal(false);
      // window.location.reload();
    },
    onError: (e: Error) => handleError(e),
  });

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const list = checkboxList.flatMap((element) => {
      const group = element;
      return group.permissions.map((permission) => ({
        isGranted: permission.isGranted,
        name: permission.name,
      }));
    });

    mutationUpdateRolePermission.mutate({
      providerKey: userInfo.name?.replace(/ /g, '+'),
      formData: {
        permissions: list,
      },
    });
  };

  return (
    <form className="global-modal" onSubmit={submitHandler}>
      <ModalHeader
        isUnLock
        label={getTranslatedValue('Permissions', 'AbpIdentity.texts')}
        setShowModal={setShowModal}
      />

      <div className="permission-modal">
        {isLoading || isFetching ? (
          <Loader />
        ) : (
          <>
            <div className="permission-modal__select-all">
              <Checkbox
                checked={mainSelectAll}
                disabled={selectedGroup?.permissions.every(
                  (permission) =>
                    permission?.grantedProviders?.filter(
                      (elem) => elem.providerName !== 'R',
                    )?.length > 0,
                )}
                onChange={() =>
                  handleMainSelectAll(
                    checkboxList,
                    setCheckboxList,
                    setMainSelectAll,
                    mainSelectAll,
                  )
                }
                label={getTranslatedValue(
                  'SelectAllInAllTabs',
                  'AbpPermissionManagement.texts',
                )}
              />
            </div>

            <div className="permission-modal__tree">
              {/* Sidebar menu */}
              <div className="permission-modal__tree-sidebar">
                {checkboxList.map((group, index) => (
                  <button
                    type="button"
                    key={index}
                    onClick={() => setSelectedGroupIndex(index)}
                    className={getClassNames(
                      'permission-modal__tree-sidebar-item',
                      [[selectedGroupIndex === index, 'active']],
                    )}
                  >
                    {group.displayName}
                    {/* get the number of permissions have isGranted true in the group */}
                    <span
                      className={getClassNames(
                        'permission-modal__tree-sidebar-item-count',
                        [[selectedGroupIndex === index, 'active']],
                      )}
                    >
                      {
                        group.permissions.filter(
                          (permission) => permission.isGranted,
                        ).length
                      }
                    </span>
                  </button>
                ))}
              </div>

              {/* Permissions list */}
              <div className="permission-modal__tree-perissions">
                {/* Select all checkbox in the group */}
                <div className="permission-modal__tree-perissions-all">
                  <Checkbox
                    checked={selectedGroup?.permissions.every(
                      (permission) => permission.isGranted,
                    )}
                    onChange={() =>
                      handleSelectAll(
                        selectedGroup?.name,
                        checkboxList,
                        setCheckboxList,
                        selectedGroup?.permissions.every(
                          (permission) => permission.isGranted,
                        ),
                      )
                    }
                    label={getTranslatedValue(
                      'SelectAllInThisTab',
                      'AbpPermissionManagement.texts',
                    )}
                    disabled={selectedGroup?.permissions.every(
                      (permission) =>
                        permission?.grantedProviders?.filter(
                          (elem) => elem.providerName !== 'R',
                        )?.length > 0,
                    )}
                  />
                </div>

                <div className="permission-modal__tree-perissions-list">
                  {selectedGroup &&
                    renderPermissions(
                      buildPermissionTree(selectedGroup.permissions),
                      selectedGroupIndex,
                    )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <SubmitOrCancelButtons
        handleCancelForm={() => setShowModal(null)}
        isPending={mutationUpdateRolePermission.isPending}
        confirmButtonText={getTranslatedValue('Save')}
      />
    </form>
  );
};

const Permissions = memo(MemoPermissions);

export default Permissions;
