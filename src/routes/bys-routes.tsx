import { lazyImport } from './helper/lazyImport';
import { withProtectedSuspense } from './suspense-helper';

const AssetTreeIndex = lazyImport(
  () => import('@/pages/bys/asset-tree/asset-tree-index'),
);

const PlantInventories = lazyImport(
  () => import('@/pages/bys/plants/plant-inventories'),
  'PlantInventories',
);
const PlantInventoryDetail = lazyImport(
  () => import('@/pages/bys/plants/plant-inventory-detail'),
  'PlantInventoryDetail',
);
const PlantStockChange = lazyImport(
  () => import('@/pages/bys/plants/plant-stock-change'),
);
const Plants = lazyImport(() => import('@/pages/bys/plants/plants'), 'Plants');
const PlantsEdit = lazyImport(
  () => import('@/pages/bys/plants/plants-edit'),
  'PlantsEdit',
);

const WorkNotificationsIndex = lazyImport(
  () => import('@/pages/bys/work-notifications/work-notification-index'),
);
const WorkOrders = lazyImport(
  () => import('@/pages/bys/work-orders'),
  'WorkOrders',
);
const WorkOrdersEdit = lazyImport(
  () => import('@/pages/bys/work-orders-edit'),
  'WorkOrdersEdit',
);

export const bysRoutes: any[] = [
  {
    path: '/bys/plants',
    element: withProtectedSuspense(<Plants />),
    permission: 'WebNet.Plants.Management',
  },
  {
    path: '/bys/plants/:warehouseId/stock-changes',
    permission: 'WebNet.Plants.Management',
    element: withProtectedSuspense(<PlantStockChange />),
  },
  {
    path: '/bys/plants/:warehouseId/inventories',
    element: withProtectedSuspense(<PlantInventories />),
    permission: 'WebNet.Plants.Management',
  },
  {
    path: '/bys/plants/:warehouseId/inventories/:inventoryId',
    permission: 'WebNet.Plants.Management',
    element: withProtectedSuspense(<PlantInventoryDetail />),
  },
  {
    path: '/bys/plants/edit/:id',
    element: withProtectedSuspense(<PlantsEdit />),
    permission: 'WebNet.Plants.Management',
  },
  {
    path: '/bys/work-orders',
    element: withProtectedSuspense(<WorkOrders />),
    permission: 'WebNet.WorkOrders',
  },
  {
    path: '/bys/work-orders/:deviceId',
    element: withProtectedSuspense(<WorkOrders />),
    permission: 'WebNet.WorkOrders.Management',
  },
  {
    path: '/bys/work-orders/:workOrderId/edit',
    element: withProtectedSuspense(<WorkOrdersEdit />),
    permission: 'WebNet.WorkOrders.Edit',
  },
  {
    path: '/bys/work-notifications',
    element: withProtectedSuspense(<WorkNotificationsIndex />),
    permission: 'WebNet.WorkNotificationTypes',
  },
  {
    path: '/bys/work-notifications/:deviceId',
    element: withProtectedSuspense(<WorkNotificationsIndex />),
    permission: 'WebNet.WorkNotificationTypes.Management',
  },
  {
    path: '/bys/asset-tree',
    element: withProtectedSuspense(<AssetTreeIndex />),
    permission: 'WebNet.AssetTree',
  },
];
