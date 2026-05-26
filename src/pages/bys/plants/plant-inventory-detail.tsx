import { KeyRepairCircleSvg } from '@/assets/icons/key-repair-circle-svg';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import InventoriesDetailedTable from '@/components/pages/inventory-management/inventories/detailed-table';
import NewInventoryModal from '@/components/pages/inventory-management/inventories/new-modal';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import { fetchWarehouseLookup } from '@/services/inventory-management/warehouses';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

export const PlantInventoryDetail = () => {
  const { warehouseId, inventoryId } = useParams();

  const [newItem, setNewItem] = useState(false);

  //warehouses list
  const { data: warehouseData } = useQuery({
    queryKey: ['Warehouse Lookup'],
    queryFn: () => fetchWarehouseLookup(),
    retry: false,
    enabled: !!warehouseId,
  });

  // find the warehouse name
  const activeWarehouse = useMemo(() => {
    return warehouseData?.items.find((warehouse: any) => {
      return warehouse.id == warehouseId;
    })?.displayName;
  }, [warehouseId, warehouseData?.items]);

  const [searchParams] = useSearchParams();

  const productName = searchParams.get('name') ?? '';

  const baseBreadcrumbs: BreadcrumbItem[] = [
    {
      label: 'Menu:MaintenanceAndRepair',
    },
    { label: 'Menu:Plants', href: '/bys/plants' },
    { label: activeWarehouse, href: `/bys/plants/${warehouseId}/inventories` },
    {
      label: 'Menu:Inventories',
      href: `/bys/plants/${warehouseId}/inventories`,
    },
    {
      label: productName,
      href: `/bys/plants/${warehouseId}/inventories/${inventoryId}`,
    },
  ];
  const title = {
    label: 'Menu:Inventories',
    href: `/bys/plants/${warehouseId}/inventories`,
  };
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
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
          <InventoriesDetailedTable
            warehouseId={warehouseId ?? ''}
            activeWarehouse={activeWarehouse}
            productId={inventoryId}
            setNewItem={setNewItem}
            handleBack={handleBack}
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
            productId={inventoryId ?? ''}
          />
        </Modal>
      )}
    </>
  );
};
