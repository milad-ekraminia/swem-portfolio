import { useState } from 'react';
import { DefinitionsDevicesSvg } from '@/assets/icons/definitions-devices-svg';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import NewWorkOrderCostTypeModal from '@/components/pages/system-administration/bys/work-order-cost-types/add-modal';
import { WorkOrderCostTypesTable } from '@/components/pages/system-administration/bys/work-order-cost-types/table';
import { getPermission } from '@/helpers/get-permission-helper';

const WorkOrderCostTypes = () => {
  const baseBreadcrumbs: BreadcrumbItem[] = [
    {
      label: 'SystemAdministration',
    },
    {
      label: 'Menu:MaintenanceAndRepair',
    },
    {
      label: 'Menu:WorkOrderCostTypes',
    },
  ];

  const title = {
    label: 'Menu:WorkOrderCostTypes',
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
        <WorkOrderCostTypesTable setNewItem={getPermission('WebNet.WorkOrderCostTypes.Create') ? setNewItem : undefined} />
      </div>
      {getPermission('WebNet.WorkOrderCostTypes.Create') && newItem && (
        <Modal
          isOpen={newItem}
          onClose={() => setNewItem(false)}
          modalSize="sm"
          showCloseButton={false}
        >
          <NewWorkOrderCostTypeModal onClose={() => setNewItem(false)} />
        </Modal>
      )}
    </div>
  );
};

export default WorkOrderCostTypes;
