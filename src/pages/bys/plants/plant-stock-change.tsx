import { KeyRepairCircleSvg } from '@/assets/icons/key-repair-circle-svg';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';
import { fetchWarehouseDetails } from '@/services/inventory-management/warehouses';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import { WareHousesStockChangeTable } from '@/components/pages/inventory-management/warehouses-stock-change/stock-change-table';

function PlantStockChange() {
  const { warehouseId } = useParams();
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
      label: 'Menu:MaintenanceAndRepair',
    },
    { label: 'Menu:Plants', href: '/bys/plants' },
    {
      label: warehouseData?.warehouse?.name,
      href: `/bys/plants/${warehouseId}/stock-changes`,
    },
    {
      label: 'Menu:StockChanges',
      href: `/bys/plants/${warehouseId}/stock-changes`,
    },
  ];
  const title = {
    label: 'Menu:StockChanges',
    href: `/bys/plants/${warehouseId}/stock-changes`,
  };
  return (
    <div className="page-wrapper warehouses">
      <PagesHeader
        title={title}
        breadcrumbs={baseBreadcrumbs}
        icon={<KeyRepairCircleSvg stroke="#344054" />}
      />
      <div className="page-wrapper__body">
        <WareHousesStockChangeTable label={warehouseData?.warehouse?.name} />
      </div>
    </div>
  );
}

export default PlantStockChange;
