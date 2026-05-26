import { useState } from 'react';
import { DefinitionsDevicesSvg } from '@/assets/icons/definitions-devices-svg';
import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import NewFormulaModal from '@/components/pages/system-administration/definitions/formulas/add-modal';
import { FormulasTable } from '@/components/pages/system-administration/definitions/formulas/table';

const Formulas = () => {
  const baseBreadcrumbs: BreadcrumbItem[] = [
    {
      label: 'SystemAdministration',
    },
    {
      label: 'Menu:Definitions',
    },
    {
      label: 'Menu:Formulas',
    },
  ];

  const title = {
    label: `${
      getTranslatedValue('Menu:Definitions') +
      ' - ' +
      getTranslatedValue('Formulas')
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
        <FormulasTable
          setNewItem={
            getPermission('WebNet.Formulas.Create') ? setNewItem : false
          }
        />
      </div>
      {getPermission('WebNet.Formulas.Create') && newItem && (
        <Modal
          isOpen={newItem}
          onClose={() => setNewItem(false)}
          modalSize="sm"
          showCloseButton={false}
        >
          <NewFormulaModal onClose={() => setNewItem(false)} />
        </Modal>
      )}
    </div>
  );
};

export default Formulas;
