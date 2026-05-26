import { useState } from 'react';
import { DefinitionsDevicesSvg } from '@/assets/icons/definitions-devices-svg';
import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import NewDeviceCategoryModal from '@/components/pages/system-administration/definitions/device-categories/add-modal';
import { DeviceCategoriesTable } from '@/components/pages/system-administration/definitions/device-categories/table';

const DeviceCategories = () => {
  const baseBreadcrumbs: BreadcrumbItem[] = [
    {
      label: 'SystemAdministration',
    },
    {
      label: 'Menu:Definitions',
    },
    {
      label: 'Menu:DeviceCategories',
    },
  ];
  const title = {
    label: `${getTranslatedValue('Menu:Definitions')}  -  ${getTranslatedValue('Menu:DeviceCategories')}`,
    href: ``,
  };
  const [newItem, setNewItem] = useState(false);

  return (
    <div className="page-wrapper ">
      <PagesHeader
        title={title}
        breadcrumbs={baseBreadcrumbs}
        icon={<DefinitionsDevicesSvg />}
      />
      <div className="page-wrapper__body">
        <DeviceCategoriesTable
          setNewItem={
            getPermission('WebNet.DeviceCategories.Create')
              ? setNewItem
              : undefined
          }
        />
      </div>
      {getPermission('WebNet.DeviceCategories.Create') && newItem && (
        <Modal
          isOpen={newItem}
          onClose={() => setNewItem(false)}
          modalSize="sm"
          showCloseButton={false}
        >
          <NewDeviceCategoryModal onClose={() => setNewItem(false)} />
        </Modal>
      )}
    </div>
  );
};

export default DeviceCategories;
