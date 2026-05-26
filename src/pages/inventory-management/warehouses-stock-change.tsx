import { DefinitionsDevicesSvg } from '@/assets/icons/definitions-devices-svg';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';
import { fetchWarehouseDetails } from '@/services/inventory-management/warehouses';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import { WareHousesStockChangeTable } from '@/components/pages/inventory-management/warehouses-stock-change/stock-change-table';

// import { useParams } from "react-router-dom";

function WarehouseStockChange() {
  const { id: warehouseId } = useParams();
  const { data: warehouseData } = useQuery({
    queryKey: ['warehouse info', warehouseId],
    queryFn: () =>
      fetchWarehouseDetails({
        warehouseId: Number(warehouseId),
      }),
    retry: false,
    enabled: !!warehouseId,
  });
  const baseBreadcrumbs: BreadcrumbItem[] = [
    {
      label: 'Menu:InventoryManagement',
      href: '',
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
    <div className="page-wrapper warehouses">
      <PagesHeader
        title={title}
        breadcrumbs={[
          ...baseBreadcrumbs,
          {
            label: warehouseData?.warehouse?.name,
            href: `/inventory-management/warehouses/${warehouseId}/stock-change`,
          },
        ]}
        icon={<DefinitionsDevicesSvg />}
      />
      <div className="page-wrapper__body">
        <WareHousesStockChangeTable label={warehouseData?.warehouse?.name} />
      </div>
    </div>
  );
}

export default WarehouseStockChange;
