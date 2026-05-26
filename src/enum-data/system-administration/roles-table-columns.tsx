import { PortalDropdownWrapper } from '@/components/ui/dropdown/portal-dropdown-wrapper/portal-dropdown-wrapper';
import StatusTag from '@/components/ui/status-tag/status-tag';
import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';

export const RolesTableColumns = ({
  onEdit,
  onPermission,
  onDelete,
  onMoveAll,
}: {
  onEdit: (row: any) => void;
  onPermission: (row: any) => void;
  onDelete: (row: any) => void;
  onMoveAll: (row: any) => void;
}) => [
    {
      header: getTranslatedValue('DisplayName:RoleName', 'AbpIdentity.texts'),
      accessorKey: 'name',
      sort: 'RoleName',
      size: 150,
    },
    {
      header: '',
      accessorKey: 'isPublic',
      sort: '',
      size: 400,
      cell: ({ row }: any) => {
        const isPublic = row?.original?.isPublic;
        return (
          <>
            {isPublic ? (
              <StatusTag
                color={row?.original?.isPublic ? 'success' : 'danger'}
                label={getTranslatedValue(
                  'DisplayName:IsPublic',
                  'AbpIdentity.texts',
                )}
              />
            ) : (
              <></>
            )}
          </>
        );
      },
    },
    // {
    //   header: getTranslatedValue("DisplayName:IsDefault", "AbpIdentity.texts"),
    //   accessorKey: 'isDefault',
    //   sort: '',
    // },
    {
      header: getTranslatedValue('UserCount', 'AbpIdentity.texts'),
      accessorKey: 'userCount',
      sort: 'UserCount',
      size: 800,
    },

    {
      header: getTranslatedValue('Actions'),
      accessorKey: '',
      sort: '',
      size: 100,
      cell: ({ row }: any) => {
        return (
          <div className="actions">
            <PortalDropdownWrapper
              toggleBtn={
                <div className="detail">{getTranslatedValue('Actions')}</div>
              }
              className="detailed-roles-actions"
              closeButton={false}
              closeOnClick
            >
              {getPermission('AbpIdentity.Roles.Update') && (
                <div
                  className="li"
                  onClick={() => {
                    onEdit(row);
                  }}
                >
                  {getTranslatedValue('Edit')}
                </div>
              )}

              {getPermission('AbpIdentity.Roles.ManagePermissions') && (
                <div
                  className="li"
                  onClick={() => {
                    onPermission(row);
                  }}
                >
                  {getTranslatedValue('Permissions', 'AbpIdentity.texts')}
                </div>
              )}

              {getPermission('AbpIdentity.Roles.Delete') && (
                <div
                  className="li"
                  onClick={() => {
                    onDelete(row);
                  }}
                >
                  {getTranslatedValue('Delete')}
                </div>
              )}

              <div
                className="li"
                onClick={() => {
                  onMoveAll(row);
                }}
              >
                {getTranslatedValue('MoveAllUsers', 'AbpIdentity.texts')}
              </div>
            </PortalDropdownWrapper>
          </div>
        );
      },
    },
  ];
