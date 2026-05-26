import { useState } from 'react';
import { DefinitionsDevicesSvg } from '@/assets/icons/definitions-devices-svg';
import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import { NewUserOrganizationProfilesModal } from '@/components/pages/system-administration/definitions/user-organization-profiles/add-modal';
import { UserOrganizationProfilesTable } from '@/components/pages/system-administration/definitions/user-organization-profiles/table';

const UserOrganizationProfiles = () => {
  const baseBreadcrumbs: BreadcrumbItem[] = [
    {
      label: 'SystemAdministration',
    },
    {
      label: 'Menu:Definitions',
    },
    {
      label: 'Menu:UserOrganizationProfiles',
    },
  ];
  const title = {
    label: `${getTranslatedValue('Menu:Definitions')}  -  ${getTranslatedValue('Menu:UserOrganizationProfiles')}`,
    href: `device-categories`,
  };
  const [newItem, setNewItem] = useState(false);

  return (
    <div className="page-wrapper user-organization-profiles">
      <PagesHeader
        title={title}
        breadcrumbs={baseBreadcrumbs}
        icon={<DefinitionsDevicesSvg />}
      />
      <div className="page-wrapper__body">
        <UserOrganizationProfilesTable
          setNewItem={
            getPermission('WebNet.UserOrganizationProfiles.Create')
              ? setNewItem
              : undefined
          }
        />
      </div>
      {getPermission('WebNet.UserOrganizationProfiles.Create') && newItem && (
        <Modal
          isOpen={newItem}
          onClose={() => setNewItem(false)}
          modalSize="sm"
          showCloseButton={false}
        >
          <NewUserOrganizationProfilesModal onClose={() => setNewItem(false)} />
        </Modal>
      )}
    </div>
  );
};

export default UserOrganizationProfiles;
