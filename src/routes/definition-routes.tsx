import { lazyImport } from './helper/lazyImport';
import { withProtectedSuspense } from './suspense-helper';

const Organizations = lazyImport(
  () => import('@/pages/definitions/organizations'),
);
const AccessPoints = lazyImport(
  () => import('@/pages/definitions/accessPoints'),
  'AccessPoints',
);
const AlarmConfigurations = lazyImport(
  () => import('@/pages/definitions/alarmConfigurations'),
  'AlarmConfigurations',
);
const DeviceModelModbusTables = lazyImport(
  () => import('@/pages/definitions/DeviceModelModbusTables'),
);
const DeviceModelModbusTablesInfo = lazyImport(
  () => import('@/pages/definitions/DeviceModelModbusTablesInfo'),
);
const DeviceModels = lazyImport(
  () => import('@/pages/definitions/deviceModels'),
);
const Devices = lazyImport(
  () => import('@/pages/definitions/devices'),
  'Devices',
);
const FirmWeatherDataLocationOWMS = lazyImport(
  () => import('@/pages/definitions/firmWeatherDataLocationOWMS'),
  'FirmWeatherDataLocationOWMS',
);
const MultiConditionalStatus = lazyImport(
  () => import('@/pages/definitions/multiConditionalStatus'),
  'MultiConditionalStatus',
);

export const definitionRoutes: any[] = [
  {
    path: '/definitions/organizations',
    element: withProtectedSuspense(<Organizations />),
    permission: 'WebNet.Organizations',
  },
  {
    path: '/definitions/devices',
    element: withProtectedSuspense(<Devices />),
    permission: 'WebNet.Devices',
  },
  {
    path: '/definitions/device-models',
    element: withProtectedSuspense(<DeviceModels />),
    permission: 'WebNet.DeviceModels',
  },
  {
    path: '/definitions/device-model-modbus-tables',
    element: withProtectedSuspense(<DeviceModelModbusTables />),
    permission: 'WebNet.DeviceModelModbusTables',
  },
  {
    path: '/definitions/device-model-modbus-tables/:modbusTableId',
    element: withProtectedSuspense(<DeviceModelModbusTablesInfo />),
    permission: 'WebNet.DeviceModelModbusTables.Management',
  },
  {
    path: '/definitions/access-points',
    element: withProtectedSuspense(<AccessPoints />),
    permission: 'WebNet.AccessPoints',
  },
  {
    path: '/definitions/alarm-configurations',
    element: withProtectedSuspense(<AlarmConfigurations />),
    permission: 'WebNet.AlarmConfigurations',
  },
  {
    path: '/definitions/firm-weather-data-location',
    element: withProtectedSuspense(<FirmWeatherDataLocationOWMS />),
    permission: 'WebNet.FirmWeatherDataLocationOWMS',
  },
  {
    path: '/definitions/multi-conditional-statuses',
    element: withProtectedSuspense(<MultiConditionalStatus />),
    permission: 'WebNet.MultiConditionalStatuses',
  },
];
