import { useState } from 'react';
import { DefinitionsDevicesSvg } from '@/assets/icons/definitions-devices-svg';
import { getPermission } from '@/helpers/get-permission-helper';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import NewWorkOrdreTypeModal from '@/components/pages/system-administration/bys/work-order-types/add-modal';
import { WorkOrderTypesTable } from '@/components/pages/system-administration/bys/work-order-types/table';

const WorkOrderTypes = () => {
  const baseBreadcrumbs: BreadcrumbItem[] = [
    {
      label: 'SystemAdministration',
    },
    {
      label: 'Menu:MaintenanceAndRepair',
    },
    {
      label: 'Menu:WorkOrderTypes',
    },
  ];
  const title = {
    label: 'Menu:WorkOrderTypes',
    href: ``,
  };
  const [newItem, setNewItem] = useState(false);

  return (
    <div className="page-wrapper bys-work-notifications">
      <PagesHeader
        title={title}
        breadcrumbs={baseBreadcrumbs}
        icon={<DefinitionsDevicesSvg />}
      />
      <div className="page-wrapper__body">
        <WorkOrderTypesTable
          setNewItem={
            getPermission('WebNet.WorkOrderTypes.Create')
              ? setNewItem
              : undefined
          }
        />
      </div>
      {getPermission('WebNet.WorkOrderTypes.Create') && newItem && (
        <Modal
          isOpen={newItem}
          onClose={() => setNewItem(false)}
          modalSize="sm"
          showCloseButton={false}
        >
          <NewWorkOrdreTypeModal
            onClose={
              getPermission('WebNet.WorkOrderTypes.Create')
                ? () => setNewItem(false)
                : undefined
            }
          />
        </Modal>
      )}
    </div>
  );
};

export default WorkOrderTypes;
