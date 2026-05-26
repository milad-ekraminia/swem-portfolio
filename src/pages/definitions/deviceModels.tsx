import { ContentEditSvg } from '@/assets/icons/content-edit-svg';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import AddDeviceModel from '@/components/pages/definitions/device-models/add-modal';
import DeviceModelsTable from '@/components/pages/definitions/device-models/table';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import { getPermission } from '@/helpers/get-permission-helper';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';
import { useState } from 'react';

const DeviceModels = () => {
  const [newItem, setNewItem] = useState(false);
  const baseBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Menu:Definitions', href: '' },
    { label: 'Menu:DeviceModels', href: '' },
  ];
  const title = {
    label: 'Menu:DeviceModels',
    href: ``,
  };
  return (
    <>
      <div className="page-wrapper">
        <PagesHeader
          title={title}
          breadcrumbs={baseBreadcrumbs}
          icon={<ContentEditSvg stroke="#344054" />}
        />
        <div className="page-wrapper__body">
          <DeviceModelsTable setNewItem={getPermission('WebNet.DeviceModels.Create') ? setNewItem : undefined} />
        </div>
      </div>
      {getPermission('WebNet.DeviceModels.Create') && newItem && (
        <Modal
          isOpen={newItem}
          onClose={() => setNewItem(false)}
          modalSize="lg"
          showCloseButton={false}
        >
          <AddDeviceModel setIsVisible={setNewItem} />
        </Modal>
      )}
    </>
  );
};

export default DeviceModels;
