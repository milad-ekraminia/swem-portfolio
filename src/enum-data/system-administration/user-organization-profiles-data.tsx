import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import ActionButtons from '@/components/ui/action/action-buttons';

export const userOrganizationProfilesColumns = ({
  onEdit,
  setDetailAddModal,
  setDetailEditModal,
  expandedId,
}: {
  onEdit: any;
  setDetailAddModal: any;
  setDetailEditModal: any;
  expandedId: any;
}) => [
  {
    header: getTranslatedValue('ProfileName'),
    accessorKey: 'profileName',
    sort: 'ProfileName',
    size: 600,
    cell: ({ row }: any) => {
      const info = row.original;
      if (info?.profileName) return <>{info?.profileName}</>;
      return <p className="sub-item">{info?.organization?.organizationName}</p>;
    },
  },

  {
    header: getTranslatedValue('Actions'),
    accessorKey: '',
    sort: '',
    cell: ({ row }: any) => {
      const info = row?.original;
      const isMainRow = info?.profileName;
      return (
        <ActionButtons
          deleteUrl={
            isMainRow
              ? `app/user-organization-profiles?userorganizationprofileIds[0]=${info?.id?.toString()}&api-version=${import.meta.env.VITE_API_VERSION}`
              : `app/user-organization-profile-details/${info?.userOrganizationProfileDetail?.id?.toString()}?api-version=${import.meta.env.VITE_API_VERSION}`
          }
          queryKey={'Get User Organization Profiles List'}
          multiQueryKey={['Get User Organization Profile Details', expandedId]}
          disabledDelete={
            !getPermission('WebNet.UserOrganizationProfiles.Delete')
          }
          disabledEdit={!getPermission('WebNet.UserOrganizationProfiles.Edit')}
          updateHandler={() => {
            if (isMainRow) {
              if (getPermission('WebNet.UserOrganizationProfiles.Edit')) {
                onEdit?.(info);
              }
            } else {
              if (getPermission('WebNet.UserOrganizationProfiles.Edit')) {
                setDetailEditModal(info);
              }
            }
          }}
          {...(isMainRow && {
            disabledAdd: !getPermission(
              'WebNet.UserOrganizationProfiles.Create',
            ),
            addButtonHandler: () => {
              if (getPermission('WebNet.UserOrganizationProfiles.Create')) {
                setDetailAddModal(info);
              }
            },
          })}
        />
      );
    },
  },
];
