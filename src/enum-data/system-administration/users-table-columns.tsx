import { PortalDropdownWrapper } from '@/components/ui/dropdown/portal-dropdown-wrapper/portal-dropdown-wrapper';
import { StatusIcon } from '@/components/ui/status-icon';
import { dateFormatter } from '@/helpers/format-data';
import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { Lock } from 'lucide-react';

export const UsersTableColumns = ({
  currentUser,
  onEdit,
  onTwoFactor,
  onPasswordChange,
  onLock,
  onUnLock,
  onPermission,
  onDelete,
}: {
  currentUser?: any;
  onEdit: (row: any) => void;
  onTwoFactor: (row: any) => void;
  onPasswordChange: (row: any) => void;
  onLock: (row: any) => void;
  onUnLock: (row: any) => void;
  onPermission: (row: any) => void;
  onDelete: (row: any) => void;
}) => [
    {
      header: getTranslatedValue('DisplayName:UserName', 'AbpAccount.texts'),
      accessorKey: 'userName',
      sort: 'UserName',
      cell: ({ row }: any) => {
        const info = row?.original;
        return (
          <>
            {info?.lockoutEnd && <Lock size={14} />} {info?.userName}
          </>
        );
      },
    },
    {
      header: getTranslatedValue('Email'),
      accessorKey: 'email',
      sort: 'Email',
    },
    {
      header: getTranslatedValue('Roles'),
      accessorKey: 'roleNames',
      sort: '',
      cell: ({ row }: any) => {
        const info = row?.original;
        return <>{info?.roleNames?.join(', ') ?? '-'}</>;
      },
    },
    {
      header: getTranslatedValue('PhoneNumber', 'AbpIdentity.texts'),
      accessorKey: 'phoneNumber',
      sort: 'PhoneNumber',
    },
    {
      header: getTranslatedValue('Name'),
      accessorKey: 'name',
      sort: 'Name',
    },
    {
      header: getTranslatedValue('DisplayName:Surname', 'AbpAccount.texts'),
      accessorKey: 'surname',
      sort: 'Surname',
    },
    {
      header: getTranslatedValue('DisplayName:IsActive', 'AbpIdentity.texts'),
      accessorKey: 'isActive',
      sort: 'IsActive',
      cell: ({ row }: any) => {
        return <>{<StatusIcon status={row?.original?.isActive} />}</>;
      },
    },
    {
      header: getTranslatedValue(
        'DisplayName:LockoutEnabled',
        'AbpIdentity.texts',
      ),
      accessorKey: 'lockoutEnabled',
      sort: 'LockoutEnabled',
      size: 300,
      cell: ({ row }: any) => {
        return <>{<StatusIcon status={row?.original?.lockoutEnabled} />}</>;
      },
    },
    {
      header: getTranslatedValue(
        'DisplayName:EmailConfirmed',
        'AbpIdentity.texts',
      ),
      accessorKey: 'emailConfirmed',
      sort: 'EmailConfirmed',
      cell: ({ row }: any) => {
        return <>{<StatusIcon status={row?.original?.emailConfirmed} />}</>;
      },
    },
    {
      header: getTranslatedValue(
        'DisplayName:TwoFactorEnabled',
        'AbpAccount.texts',
      ),
      accessorKey: 'twoFactorEnabled',
      sort: 'TwoFactorEnabled',
      cell: ({ row }: any) => {
        return <>{<StatusIcon status={row?.original?.twoFactorEnabled} />}</>;
      },
    },
    {
      header: getTranslatedValue(
        'DisplayName:AccessFailedCount',
        'AbpIdentity.texts',
      ),
      accessorKey: 'accessFailedCount',
      sort: 'AccessFailedCount',
    },
    {
      header: getTranslatedValue('DisplayName:CreationTime', 'Payment.texts'),
      accessorKey: 'creationTime',
      sort: 'CreationTime',
      cell: ({ row }: any) => {
        const info = row?.original;
        return <>{dateFormatter(info?.creationTime, true)}</>;
      },
    },
    {
      header: getTranslatedValue('LastModificationTime', 'AbpIdentity.texts'),
      accessorKey: 'lastModificationTime',
      sort: 'LastModificationTime',
      cell: ({ row }: any) => {
        const info = row?.original;
        return <>{dateFormatter(info?.lastModificationTime, true)}</>;
      },
    },
    {
      header: getTranslatedValue('AppUserOrganizationId'),
      accessorKey: 'extraProperties.AppUserOrganizationId_Text',
      sort: '',
    },
    {
      header: getTranslatedValue('AppUserMimicProfileId'),
      accessorKey: 'extraProperties.AppUserMimicProfileId_Text',
      sort: '',
    },
    {
      header: getTranslatedValue('AppUserOrganizationProfileId'),
      accessorKey: 'extraProperties.AppUserOrganizationProfileId_Text',
      sort: '',
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
              className="detailed-users-actions"
              closeButton={false}
              closeOnClick
            >
              {getPermission('AbpIdentity.Users.Update') &&
                <div
                  className="li"
                  onClick={() => {
                    onEdit(row);
                  }}
                >
                  {getTranslatedValue('Edit')}
                </div>
              }
              {getPermission('AbpIdentity.Users.Delete') &&
                currentUser?.id !== row?.original?.id && (
                  <div
                    className="li"
                    onClick={() => {
                      onDelete(row);
                    }}
                  >
                    {getTranslatedValue('Delete')}
                  </div>
                )}
              {getPermission('AbpIdentity.Users.ManagePermissions') && (
                <div
                  className="li"
                  onClick={() => {
                    onPermission(row);
                  }}
                >
                  {getTranslatedValue('Permissions', 'AbpIdentity.texts')}
                </div>
              )}
              {getPermission('AbpIdentity.Users.Update') && (
                <div
                  className="li"
                  onClick={() => {
                    onPasswordChange(row);
                  }}
                >
                  {getTranslatedValue('SetPassword', 'AbpIdentity.texts')}
                </div>
              )}
              {
                <div
                  className="li"
                  onClick={() => {
                    onTwoFactor(row);
                  }}
                >
                  {getTranslatedValue('TwoFactor', 'AbpIdentity.texts')}
                </div>
              }
              {
                <div
                  className="li"
                  onClick={() => {
                    if (row?.original?.lockoutEnd) {
                      onUnLock(row);
                    } else {
                      onLock(row);
                    }
                  }}
                >
                  {getTranslatedValue(
                    row?.original?.lockoutEnd ? 'UnLock' : 'Lock',
                    'AbpIdentity.texts',
                  )}
                </div>
              }
            </PortalDropdownWrapper>
          </div>
        );
      },
    },
  ];
