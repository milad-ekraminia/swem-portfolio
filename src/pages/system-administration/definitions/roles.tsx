import { SingleUserSettingSvg } from '@/assets/icons/single-user-setting-svg';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import NewRoleModal from '@/components/pages/system-administration/definitions/roles/new-modal';
import RolesTable from '@/components/pages/system-administration/definitions/roles/table';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { fetchApplicationConfigurationApi } from '@/services/general/application-localization-api';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const Roles = () => {
  const [newItem, setNewItem] = useState(false);

  const baseBreadcrumbs: BreadcrumbItem[] = [
    {
      label: 'SystemAdministration',
      href: '/system-administration/definitions/',
    },
    {
      label: `${getTranslatedValue(
        'Menu:Definitions',
      )} - ${getTranslatedValue('UserPermissionProfiles')}`,
      href: '/system-administration/definitions/user-profiles',
    },
  ];

  const title = {
    label: `${getTranslatedValue(
      'Menu:Definitions',
    )} - ${getTranslatedValue('UserPermissionProfiles')}`,
    href: `/system-administration/definitions/user-profiles`,
  };

  const { data } = useQuery({
    queryKey: ['application-configuration'],
    queryFn: () => fetchApplicationConfigurationApi(),
    // retry: false,
  });

  useEffect(() => {
    if (data?.auth?.grantedPolicies) {
      localStorage.setItem(
        'application-configuration',
        JSON.stringify(data?.auth?.grantedPolicies),
      );
    }
  }, [data]);

  return (
    <>
      <div className="page-wrapper">
        <PagesHeader
          title={title}
          breadcrumbs={baseBreadcrumbs}
          icon={<SingleUserSettingSvg stroke="#323232" />}
        />
        <div className="page-wrapper__body">
          <RolesTable
            setNewItem={
              getPermission('AbpIdentity.Roles.Create') ? setNewItem : undefined
            }
          />
        </div>
      </div>

      {getPermission('AbpIdentity.Roles.Create') && newItem && (
        <Modal
          isOpen={newItem}
          onClose={() => setNewItem(false)}
          modalSize="sm"
          showCloseButton={false}
        >
          <NewRoleModal setShowModal={setNewItem} />
        </Modal>
      )}
    </>
  );
};

export default Roles;
