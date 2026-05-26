import { DefinitionsDevicesSvg } from '@/assets/icons/definitions-devices-svg';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import WareHouseEditWrapper from '@/components/pages/inventory-management/warehouses-edit/warehouse-edit-wrapper';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';

export const WareHousesEdit = () => {
  const baseBreadcrumbs: BreadcrumbItem[] = [
    {
      label: 'Menu:InventoryManagement',
      href: '/inventory-management/warehouses',
    },
    {
      label: 'Warehouses',
      href: '/inventory-management/warehouses',
    },
  ];
  const title = {
    label: 'Warehouses',
    href: `/inventory-management/warehouses`,
  };

  return (
    <div className="page-wrapper warehouses-edit">
      <PagesHeader
        title={title}
        breadcrumbs={baseBreadcrumbs}
        icon={<DefinitionsDevicesSvg />}
      />
      <div className="page-wrapper__body">
        <WareHouseEditWrapper />
      </div>
    </div>
  );
};
