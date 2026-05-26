import { KeyRepairCircleSvg } from '@/assets/icons/key-repair-circle-svg';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import InventoriesGeneralTable from '@/components/pages/inventory-management/inventories/general-table';
import NewInventoryModal from '@/components/pages/inventory-management/inventories/new-modal';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import { fetchWarehouseLookup } from '@/services/inventory-management/warehouses';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

export const PlantInventories = () => {
  const { warehouseId } = useParams();

  const [newItem, setNewItem] = useState(false);

  //warehouses list
  const { data: warehouseData } = useQuery({
    queryKey: ['Warehouse Lookup'],
    queryFn: () => fetchWarehouseLookup(),
    retry: false,
    enabled: !!warehouseId,
  });
  // const [searchParams] = useSearchParams();

  // Example: read "productId" and "tab" from query params
  // const productName = searchParams.get('name') ?? '';

  // find the warehouse name
  const activeWarehouse = useMemo(() => {
    return warehouseData?.items.find((warehouse: any) => {
      return warehouse.id == warehouseId;
    })?.displayName;
  }, [warehouseId, warehouseData?.items]);

  const baseBreadcrumbs: BreadcrumbItem[] = [
    {
      label: 'Menu:MaintenanceAndRepair',
      href: '',
    },
    { label: 'Menu:Plants', href: '/bys/plants' },
    { label: activeWarehouse, href: `/bys/plants/${warehouseId}/inventories` },
    {
      label: 'Menu:Inventories',
      href: `/bys/plants/${warehouseId}/inventories`,
    },
    // {
    //   label: productName,
    //   href: `/bys/plants/${warehouseId}/inventories/${inventoryId}`,
    // },
  ];

  const title = {
    label: 'Menu:Inventories',
    href: `/bys/plants/${warehouseId}/inventories`,
  };

  return (
    <>
      <div className="page-wrapper">
        <PagesHeader
          title={title}
          breadcrumbs={baseBreadcrumbs}
          icon={<KeyRepairCircleSvg stroke="#344054" />}
        />
        <div className="page-wrapper__body">
          <InventoriesGeneralTable
            warehouseId={warehouseId ?? ''}
            activeWarehouse={activeWarehouse ?? ''}
            productId={''}
            setNewItem={setNewItem}
          />
        </div>
      </div>
      {newItem && (
        <Modal
          isOpen={newItem}
          onClose={() => setNewItem(false)}
          modalSize="md"
          showCloseButton={false}
        >
          <NewInventoryModal
            warehouseId={warehouseId ?? ''}
            setShowModal={setNewItem}
            productId={''}
          />
        </Modal>
      )}
    </>
  );
};
