import { useState } from 'react';
import { DefinitionsDevicesSvg } from '@/assets/icons/definitions-devices-svg';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import NewLabelModal from '@/components/pages/system-administration/bys/labels/add-modal';
import { LabelsTable } from '@/components/pages/system-administration/bys/labels/table';
import { getPermission } from '@/helpers/get-permission-helper';

const Labels = () => {
  const baseBreadcrumbs: BreadcrumbItem[] = [
    {
      label: 'SystemAdministration',
    },
    {
      label: 'Menu:Definitions',
    },
    {
      label: 'Menu:Labels',
    },
  ];
  const title = {
    label: `${
      getTranslatedValue('Menu:Definitions') +
      ' - ' +
      getTranslatedValue('Label')
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
        <LabelsTable setNewItem={getPermission('WebNet.Labels.Create') ? setNewItem : undefined} />
      </div>
      {getPermission('WebNet.Labels.Create') &&  newItem && (
        <Modal
          isOpen={newItem}
          onClose={() => setNewItem(false)}
          modalSize="md"
          showCloseButton={false}
        >
          <NewLabelModal onClose={() => setNewItem(false)} />
        </Modal>
      )}
    </div>
  );
};

export default Labels;
