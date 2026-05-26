import { DefinitionsDevicesSvg } from '@/assets/icons/definitions-devices-svg';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import NewFirmWeatherDataLocationModal from '@/components/pages/definitions/firm-weather-data-location/new-modal';
import FirmWeatherDataLocationTable from '@/components/pages/definitions/firm-weather-data-location/table';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import { getPermission } from '@/helpers/get-permission-helper';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';
import { useState } from 'react';

export const FirmWeatherDataLocationOWMS = () => {
  const [newItem, setNewItem] = useState(false);

  const baseBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Menu:Definitions', href: '' },
    {
      label: 'Menu:FirmWeatherDataLocationOWMS',
      href: '',
    },
  ];
  const title = {
    label: 'Menu:FirmWeatherDataLocationOWMS',
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
          <FirmWeatherDataLocationTable
            setNewItem={
              getPermission('WebNet.FirmWeatherDataLocationOWMS.Create')
                ? setNewItem
                : undefined
            }
          />
        </div>
      </div>
      {getPermission('WebNet.FirmWeatherDataLocationOWMS.Create') &&
        newItem && (
          <Modal
            isOpen={newItem}
            onClose={() => setNewItem(false)}
            modalSize="sm"
            showCloseButton={false}
          >
            <NewFirmWeatherDataLocationModal setShowModal={setNewItem} />
          </Modal>
        )}
    </>
  );
};
