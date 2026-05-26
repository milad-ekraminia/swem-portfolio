import { BuildingSvg } from '@/assets/icons/building-svg';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import InventoriesDetailedTable from '@/components/pages/inventory-management/inventories/detailed-table';
import NewInventoryModal from '@/components/pages/inventory-management/inventories/new-modal';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import { getPermission } from '@/helpers/get-permission-helper';
import { fetchWarehouseLookup } from '@/services/inventory-management/warehouses';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

export const InventoryDetail = () => {
  const { warehouseId, inventoryId } = useParams();

  const [newItem, setNewItem] = useState(false);

  //warehouses list
  const { data: warehouseData } = useQuery({
    queryKey: ['Warehouse Lookup'],
    queryFn: () => fetchWarehouseLookup(),
    retry: false,
    enabled: !!warehouseId,
  });

  const [searchParams] = useSearchParams();

  const productName = searchParams.get('name') ?? '';

  // find the warehouse name
  const activeWarehouse = useMemo(() => {
    return warehouseData?.items.find((warehouse: any) => {
      return warehouse.id == warehouseId;
    })?.displayName;
  }, [warehouseId, warehouseData?.items]);

  const baseBreadcrumbs: BreadcrumbItem[] = [
    {
      label: 'Menu:InventoryManagement',
    },
    {
      label: activeWarehouse,
      href: `/inventory-management/warehouses/${warehouseId}/inventories`,
    },
    {
      label: 'Menu:Inventories',
      href: `/inventory-management/warehouses/${warehouseId}/inventories`,
    },
    {
      label: productName,
      href: `/inventory-management/warehouses/${warehouseId}/inventories/${inventoryId}`,
    },
  ];

  const title = {
    label: 'Menu:Inventories',
    href: `/inventory-management/warehouses/${warehouseId}/inventories`,
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
          icon={<BuildingSvg />}
        />
        <div className="page-wrapper__body">
          <InventoriesDetailedTable
            warehouseId={warehouseId ?? ''}
            activeWarehouse={activeWarehouse}
            productId={inventoryId}
            setNewItem={
              getPermission('WebNet.Inventories.Create') && setNewItem
            }
            handleBack={handleBack}
          />
        </div>
      </div>
      {getPermission('WebNet.Inventories.Create') && newItem && (
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
