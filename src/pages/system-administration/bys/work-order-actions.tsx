import { useState } from 'react';
import { DefinitionsDevicesSvg } from '@/assets/icons/definitions-devices-svg';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import NewSystemManagementWorkOrderActionModal from '@/components/pages/system-administration/bys/work-order-actions/add-modal';
import { WorkOrderActionsTable } from '@/components/pages/system-administration/bys/work-order-actions/table';
import { getPermission } from '@/helpers/get-permission-helper';

const WorkOrderActions = () => {
  const baseBreadcrumbs: BreadcrumbItem[] = [
    {
      label: 'SystemAdministration',
    },
    {
      label: 'Menu:MaintenanceAndRepair',
    },
    {
      label: 'Menu:WorkOrderActions',
    },
  ];

  const title = {
    label: `${
      getTranslatedValue('Menu:MaintenanceAndRepair') +
      ' - ' +
      getTranslatedValue('Menu:WorkOrderActions')
    }`,
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
        <WorkOrderActionsTable setNewItem={getPermission('WebNet.WorkOrderActions.Create') ? setNewItem : undefined} />
      </div>
      {getPermission('WebNet.WorkOrderActions.Create') && newItem && (
        <Modal
          isOpen={newItem}
          onClose={() => setNewItem(false)}
          modalSize="sm"
          showCloseButton={false}
        >
          <NewSystemManagementWorkOrderActionModal
            onClose={() => setNewItem(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default WorkOrderActions;
