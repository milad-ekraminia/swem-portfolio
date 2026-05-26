import { lazyImport } from './helper/lazyImport';
import { withProtectedSuspense } from './suspense-helper';

const Inventories = lazyImport(
  () => import('@/pages/inventory-management/inventories'),
  'Inventories',
);
const InventoryDetail = lazyImport(
  () => import('@/pages/inventory-management/inventory-detail'),
  'InventoryDetail',
);
const Products = lazyImport(
  () => import('@/pages/inventory-management/products'),
  'Products',
);
const WareHouses = lazyImport(
  () => import('@/pages/inventory-management/warehouses'),
  'WareHouses',
);
const WareHousesEdit = lazyImport(
  () => import('@/pages/inventory-management/warehouses-edit'),
  'WareHousesEdit',
);
const WarehouseStockChange = lazyImport(
  () => import('@/pages/inventory-management/warehouses-stock-change'),
);

export const inventoryRoutes: any[] = [
  {
    path: '/inventory-management/warehouses',
    element: withProtectedSuspense(<WareHouses />),
    permission: 'WebNet.Warehouses',
  },
  {
    path: '/inventory-management/warehouses/edit/:id',
    element: withProtectedSuspense(<WareHousesEdit />),
    permission: 'WebNet.Warehouses.Edit',
  },
  {
    path: '/inventory-management/warehouses/:id/stock-change',
    element: withProtectedSuspense(<WarehouseStockChange />),
    permission: 'WebNet.Warehouses.Management',
  },
  {
    path: '/inventory-management/products',
    element: withProtectedSuspense(<Products />),
    permission: 'WebNet.Products',
  },
  {
    path: '/inventory-management/warehouses/:warehouseId/inventories',
    permission: 'WebNet.Warehouses.Management',
    element: withProtectedSuspense(<Inventories />),
  },
  {
    path: '/inventory-management/warehouses/:warehouseId/inventories/:inventoryId',
    element: withProtectedSuspense(<InventoryDetail />),
    permission: 'WebNet.Warehouses.Management',
  },
];
