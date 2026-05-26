import { ContentEditSvg } from '@/assets/icons/content-edit-svg';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import DevicesModelModbusTable from '@/components/pages/definitions/device-model-modbus-tables/table';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';

const DeviceModelModbusTables = () => {
  const baseBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Menu:Definitions', href: '' },
    {
      label: 'Menu:DeviceModelModbusTables',
      href: '',
    },
  ];
  const title = {
    label: 'Menu:DeviceModelModbusTables',
    href: ``,
  };
  return (
    <div className="page-wrapper">
      <PagesHeader
        title={title}
        breadcrumbs={baseBreadcrumbs}
        icon={<ContentEditSvg stroke="#344054" />}
      />
      <div className="page-wrapper__body">
        <DevicesModelModbusTable />
      </div>
    </div>
  );
};

export default DeviceModelModbusTables;
