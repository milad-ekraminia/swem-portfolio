import { SingleUserSettingSvg } from '@/assets/icons/single-user-setting-svg';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import NewUserModal from '@/components/pages/system-administration/definitions/users/new-modal';
import UsersTable from '@/components/pages/system-administration/definitions/users/table';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { fetchApplicationConfigurationApi } from '@/services/general/application-localization-api';
import {
  getAssignableRolesList,
  getAvailableOrganizationUnits,
  getMimicProfilesLookup,
  getOrganizationLookup,
  getUserOrganizationProfileLookup,
} from '@/services/system-administration/definitions/users';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';
import { useQueries } from '@tanstack/react-query';
import { useState } from 'react';

const Users = () => {
  const [newItem, setNewItem] = useState(false);

  const baseBreadcrumbs: BreadcrumbItem[] = [
    {
      label: 'SystemAdministration',
    },
    {
      label: `${getTranslatedValue(
        'Menu:Definitions',
      )} - ${getTranslatedValue('Users', 'AbpIdentity.texts')}`,
    },
  ];

  const title = {
    label: `${getTranslatedValue(
      'Menu:Definitions',
    )} - ${getTranslatedValue('Users', 'AbpIdentity.texts')}`,
    href: ``,
  };

  const results = useQueries({
    queries: [
      {
        queryKey: ['Get Assignable Roles List'],
        queryFn: () => getAssignableRolesList(),
        retry: false,
      },
      {
        queryKey: ['Get Available Organization Units'],
        queryFn: () => getAvailableOrganizationUnits(),
        retry: false,
      },
      {
        queryKey: ['User Organization Profile Lookup'],
        queryFn: () => getUserOrganizationProfileLookup(),
        retry: false,
      },
      {
        queryKey: ['Mimic Profiles Lookup'],
        queryFn: () => getMimicProfilesLookup(),
        retry: false,
      },
      {
        queryKey: ['Organization Lookup'],
        queryFn: () => getOrganizationLookup(),
        retry: false,
      },
      {
        queryKey: ['userInfo'],
        queryFn: fetchApplicationConfigurationApi,
      },
      // {
      //     queryKey: ["Get All Claim Types"],
      //     queryFn: getAllClaimTypes,
      // },
    ],
  });

  const [
    getAssignableRolesListResponse,
    getAvailableOrganizationUnitsResponse,
    getUserOrganizationProfileLookupResponse,
    getMimicProfilesLookupResponse,
    getOrganizationLookupResponse,
    getUserResponse,
  ] = results;

  const assignableRolesList = getAssignableRolesListResponse?.data?.items ?? [];
  const availableOrganizationUnits =
    getAvailableOrganizationUnitsResponse?.data?.items ?? [];
  const userOrganizationProfileLookup =
    getUserOrganizationProfileLookupResponse?.data?.items ?? [];
  const mimicProfilesLookup = getMimicProfilesLookupResponse?.data?.items ?? [];
  const organizationLookup = getOrganizationLookupResponse?.data?.items ?? [];
  const currentUser = getUserResponse?.data?.currentUser ?? [];

  return (
    <>
      <div className="page-wrapper">
        <PagesHeader
          title={title}
          breadcrumbs={baseBreadcrumbs}
          icon={<SingleUserSettingSvg stroke="#323232" />}
        />
        <div className="page-wrapper__body">
          <UsersTable
            setNewItem={getPermission('AbpIdentity.Users.Create') ? setNewItem : undefined}
            userOrganizationProfileLookup={userOrganizationProfileLookup}
            mimicProfilesLookup={mimicProfilesLookup}
            organizationLookup={organizationLookup}
            assignableRolesList={assignableRolesList}
            availableOrganizationUnits={availableOrganizationUnits}
            currentUser={currentUser}
          />
        </div>
      </div>

      {getPermission('AbpIdentity.Users.Create') && newItem && (
        <Modal
          isOpen={newItem}
          onClose={() => setNewItem(false)}
          modalSize="md"
          showCloseButton={false}
        >
          <NewUserModal
            setShowModal={setNewItem}
            userOrganizationProfileLookup={userOrganizationProfileLookup}
            mimicProfilesLookup={mimicProfilesLookup}
            organizationLookup={organizationLookup}
            assignableRolesList={assignableRolesList}
          // availableOrganizationUnits={availableOrganizationUnits}
          />
        </Modal>
      )}
    </>
  );
};

export default Users;
