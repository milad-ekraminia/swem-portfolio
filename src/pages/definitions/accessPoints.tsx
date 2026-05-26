import { DefinitionsDevicesSvg } from '@/assets/icons/definitions-devices-svg';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import NewAccessPointModal from '@/components/pages/definitions/access-points/new-modal';
import AccessPointsTable from '@/components/pages/definitions/access-points/table';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import { getPermission } from '@/helpers/get-permission-helper';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';
import { useState } from 'react';

export const AccessPoints = () => {
  const [newItem, setNewItem] = useState(false);

  const baseBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Menu:Definitions', href: '' },
    { label: 'Menu:AccessPoints', href: '' },
  ];
  const title = {
    label: 'Menu:AccessPoints',
    href: ``,
  };

  return (
    <>
      <div className="page-wrapper">
        <PagesHeader
          title={title}
          breadcrumbs={baseBreadcrumbs}
          icon={<DefinitionsDevicesSvg />}
        />
        <div className="page-wrapper__body">
          <AccessPointsTable setNewItem={getPermission('WebNet.AccessPoints.Create') ? setNewItem : undefined} />
        </div>
      </div>
      {getPermission('WebNet.AccessPoints.Create') && newItem && (
        <Modal
          isOpen={newItem}
          onClose={() => setNewItem(false)}
          modalSize="lg"
          showCloseButton={false}
        >
          <NewAccessPointModal setShowEditModal={setNewItem} />
        </Modal>
      )}
    </>
  );
};
