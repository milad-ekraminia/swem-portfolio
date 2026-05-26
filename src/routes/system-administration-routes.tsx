import DashboardMap from '@/pages/system-administration/dashboard-map';
import { lazyImport } from './helper/lazyImport';
import { withProtectedSuspense } from './suspense-helper';

const TimePeriodsIndex = lazyImport(
  () => import('@/pages/definitions/time-periods/time-periods-index'),
);
const AuditLogsIndex = lazyImport(
  () => import('@/pages/system-administration/definitions/audit-logs'),
);
const DerivedValuesIndex = lazyImport(
  () =>
    import('@/pages/system-administration/definitions/derived-values-index'),
);

const DeviceIinitalDataIndex = lazyImport(
  () => import('@/pages/system-administration/definitions/device-startup-data'),
);
const DeviceCategories = lazyImport(
  () => import('@/pages/system-administration/definitions/device-categories'),
);
const Formulas = lazyImport(
  () => import('@/pages/system-administration/definitions/formulas'),
);
const Labels = lazyImport(
  () => import('@/pages/system-administration/definitions/labels'),
);
const MimicElementsIndex = lazyImport(
  () =>
    import('@/pages/system-administration/definitions/mimic-elements-index'),
);
const PlantImagesIndex = lazyImport(
  () => import('@/pages/system-administration/definitions/plant-images-index'),
);
const PlantVideosIndex = lazyImport(
  () => import('@/pages/system-administration/definitions/plant-videos-index'),
);
const UserOrganizationProfiles = lazyImport(
  () =>
    import(
      '@/pages/system-administration/definitions/user-organization-profiles'
    ),
);
const Users = lazyImport(
  () => import('@/pages/system-administration/definitions/users'),
);
const Roles = lazyImport(
  () => import('@/pages/system-administration/definitions/roles'),
);

const ProductBrandModelsIndex = lazyImport(
  () => import('@/pages/inventory-management/product-brand-models-index'),
);
const ProductBrandsIndex = lazyImport(
  () => import('@/pages/inventory-management/product-brands-index'),
);
const ProductManufacturersIndex = lazyImport(
  () => import('@/pages/inventory-management/product-manufacturers-index'),
);
const ProductTypesIndex = lazyImport(
  () => import('@/pages/inventory-management/product-types-index'),
);
const ProductUnitsIndex = lazyImport(
  () => import('@/pages/inventory-management/product-units-index'),
);

const WorkNotificationTypes = lazyImport(
  () => import('@/pages/system-administration/bys/work-notification-types'),
);
const WorkOrderActions = lazyImport(
  () => import('@/pages/system-administration/bys/work-order-actions'),
);
const WorkOrderCostTypes = lazyImport(
  () => import('@/pages/system-administration/bys/work-order-cost-types'),
);
const WorkOrderTypes = lazyImport(
  () => import('@/pages/system-administration/bys/work-order-types'),
);

const MimicProfilesIndex = lazyImport(
  () => import('@/pages/system-administration/scada/mimic-profiles-index'),
);
const SecurityLogsIndex = lazyImport(
  () => import('@/pages/system-administration/security-logs-index'),
);
const FirmConfiguration = lazyImport(
  () => import('@/pages/system-administration/definitions/firm-configuration'),
);

export const systemAdministrationRoutes: any[] = [
  //definitions
  {
    path: '/system-administration/definitions/time-periods',
    element: withProtectedSuspense(<TimePeriodsIndex />),
    permission: 'WebNet.TimePeriods',
  },
  {
    path: '/system-administration/definitions/mimic-elements',
    element: withProtectedSuspense(<MimicElementsIndex />),
    permission: 'WebNet.MimicElements',
  },
  {
    path: '/system-administration/definitions/plant-images',
    element: withProtectedSuspense(<PlantImagesIndex />),
    permission: 'WebNet.PlantImages',
  },
  {
    path: '/system-administration/definitions/plant-videos',
    element: withProtectedSuspense(<PlantVideosIndex />),
    permission: 'WebNet.PlantVideos',
  },
  {
    path: '/system-administration/definitions/device-startup-data',
    element: withProtectedSuspense(<DeviceIinitalDataIndex />),
    permission: 'WebNet.SystemManagement.DeviceStartupData',
  },
  {
    path: '/system-administration/definitions/users',
    element: withProtectedSuspense(<Users />),
    permission: 'AbpIdentity.Users',
  },
  {
    path: '/system-administration/definitions/user-profiles',
    element: withProtectedSuspense(<Roles />),
    permission: 'AbpIdentity.Roles',
  },
  {
    path: '/system-administration/definitions/labels',
    element: withProtectedSuspense(<Labels />),
    permission: 'WebNet.Labels',
  },
  {
    path: '/system-administration/audit-logs',
    element: withProtectedSuspense(<AuditLogsIndex />),
    permission: 'AuditLogging.AuditLogs',
  },
  {
    path: '/system-administration/definitions/formulas',
    element: withProtectedSuspense(<Formulas />),
    permission: 'WebNet.Formulas',
  },
  {
    path: '/system-administration/definitions/derived-values',
    element: withProtectedSuspense(<DerivedValuesIndex />),
    permission: 'WebNet.DerivedValues',
  },
  {
    path: '/system-administration/definitions/device-categories',
    element: withProtectedSuspense(<DeviceCategories />),
    permission: 'WebNet.DeviceCategories',
  },
  {
    path: '/system-administration/definitions/user-organization-profiles',
    element: withProtectedSuspense(<UserOrganizationProfiles />),
    permission: 'WebNet.UserOrganizationProfiles',
  },

  //scada
  {
    path: '/system-administration/scada/mimic-profiles',
    element: withProtectedSuspense(<MimicProfilesIndex />),
    permission: 'WebNet.MimicProfiles',
  },
  // {
  //   path: '/system-administration/dashboard-map',
  //   element: (
  //     <ProtectedRoute>
  //       <DashboardMapIndex />
  //     </ProtectedRoute>
  //   ),
  // },
  {
    path: '/system-administration/product-units',
    element: withProtectedSuspense(<ProductUnitsIndex />),
    permission: 'WebNet.ProductUnits',
  },
  {
    path: '/system-administration/product-types',
    element: withProtectedSuspense(<ProductTypesIndex />),
    permission: 'WebNet.ProductTypes',
  },
  {
    path: '/system-administration/product-manufacturers',
    element: withProtectedSuspense(<ProductManufacturersIndex />),
    permission: 'WebNet.ProductManufacturers',
  },
  {
    path: '/system-administration/product-brands',
    element: withProtectedSuspense(<ProductBrandsIndex />),
    permission: 'WebNet.ProductBrands',
  },
  {
    path: '/system-administration/product-brand-models',
    element: withProtectedSuspense(<ProductBrandModelsIndex />),
    permission: 'WebNet.ProductBrandModels',
  },
  {
    path: '/system-administration/security-logs',
    element: withProtectedSuspense(<SecurityLogsIndex />),
    permission: 'AbpIdentity.SecurityLogs',
  },

  //bys
  {
    path: '/system-administration/bys/work-notification-types',
    element: withProtectedSuspense(<WorkNotificationTypes />),
    permission: 'WebNet.WorkNotificationTypes',
  },
  {
    path: '/system-administration/bys/work-order-cost-types',
    element: withProtectedSuspense(<WorkOrderCostTypes />),
    permission: 'WebNet.WorkOrderCostTypes',
  },
  {
    path: '/system-administration/bys/work-order-actions',
    element: withProtectedSuspense(<WorkOrderActions />),
    permission: 'WebNet.WorkOrderActions',
  },
  {
    path: '/system-administration/bys/work-order-types',
    element: withProtectedSuspense(<WorkOrderTypes />),
    permission: 'WebNet.WorkOrderTypes',
  },
  {
    path: '/system-administration/definitions/firm-configuration',
    element: withProtectedSuspense(<FirmConfiguration />),
  },
  {
    path: '/system-administration/dashboard-map',
    element: withProtectedSuspense(<DashboardMap />),
    permission: 'WebNet.SystemManagement.DashboardMap',
  },
];
