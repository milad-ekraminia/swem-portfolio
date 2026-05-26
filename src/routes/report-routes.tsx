import ElecProductionConsumptionReports from '@/pages/reports/production-consumptions-report';
import { lazyImport } from './helper/lazyImport';
import { withProtectedSuspense } from './suspense-helper';

const ArchiveReports = lazyImport(
  () => import('@/pages/reports/archive-reports'),
);
const EnergyConsumptionReports = lazyImport(
  () => import('@/pages/reports/energy-consumption-reports'),
);
const DemandDataReports = lazyImport(
  () => import('@/pages/reports/demand-data-reports'),
);
const EnergyIndexReports = lazyImport(
  () => import('@/pages/reports/energy-index-reports'),
);
const HarmonicReports = lazyImport(
  () => import('@/pages/reports/harmonic-reports'),
);
const ScheduledReportsIndex = lazyImport(
  () => import('@/pages/reports/scheduled-reports'),
);
const IndexValueReports = lazyImport(
  () => import('@/pages/reports/index-value-reports'),
);
const InstantValuesReportsIndex = lazyImport(
  () => import('@/pages/reports/instant-value-reports'),
);
const InverterInstantValueReports = lazyImport(
  () => import('@/pages/reports/inverter-instant-value-reports'),
);
const MonthlyDemandReports = lazyImport(
  () => import('@/pages/reports/monthly-demand-reports'),
);
const PeriodicElecProductionConsumptionReports = lazyImport(
  () => import('@/pages/reports/periodic-production-consumptions-reports'),
);
const SensorValueReports = lazyImport(
  () => import('@/pages/reports/sensor-value-reports'),
);
const SystemAlarmReports = lazyImport(
  () => import('@/pages/reports/system-alarms-reports'),
);
const TagReportsIndex = lazyImport(() => import('@/pages/reports/tag-reports'));
const ConsumptionComparisonReport = lazyImport(
  () => import('@/pages/reports/consumption-comparison-reports'),
);
const MinimumMaximumReports = lazyImport(
  () => import('@/pages/reports/minimum-maximum-reports'),
);
const WeatherReports = lazyImport(
  () => import('@/pages/reports/weather-reports'),
);
const CarbonReports = lazyImport(
  () => import('@/pages/reports/carbon-reports'),
);
const DeviceStatusReports = lazyImport(
  () => import('@/pages/reports/device-status-reports'),
);

export const reportRoutes: any[] = [
  {
    path: '/reports/index-values',
    element: withProtectedSuspense(<IndexValueReports />),
    permission: 'WebNet.Reports.IndexValues',
  },
  {
    path: '/reports/inverter-instant-values',
    element: withProtectedSuspense(<InverterInstantValueReports />),
    permission: 'WebNet.Reports.InverterInstantValues',
  },
  {
    path: '/reports/sensor-values',
    element: withProtectedSuspense(<SensorValueReports />),
    permission: 'WebNet.Reports.SensorValues',
  },
  {
    path: '/reports/min-max',
    element: withProtectedSuspense(<MinimumMaximumReports />),
    permission: 'WebNet.Reports.MinMaxValues',
  },
  {
    path: '/reports/demand-data',
    element: withProtectedSuspense(<DemandDataReports />),
    permission: 'WebNet.Reports.DemandInstants',
  },
  {
    path: '/reports/instant-values',
    element: withProtectedSuspense(<InstantValuesReportsIndex />),
    permission: 'WebNet.Reports.InstantValues',
  },
  {
    path: '/reports/scheduled-report',
    element: withProtectedSuspense(<ScheduledReportsIndex />),
    permission: 'WebNet.ScheduledReports',
  },
  {
    path: '/reports/harmonic',
    element: withProtectedSuspense(<HarmonicReports />),
    permission: 'WebNet.Reports.Harmonics',
  },
  {
    path: '/reports/archive-data',
    element: withProtectedSuspense(<ArchiveReports />),
    permission: 'WebNet.Reports.IoDeviceArchives',
  },
  {
    path: '/reports/energy-index',
    element: withProtectedSuspense(<EnergyIndexReports />),
    permission: 'WebNet.Reports.EnergyIndexValues',
  },
  {
    path: '/reports/system-alarms',
    element: withProtectedSuspense(<SystemAlarmReports />),
    permission: 'WebNet.Reports.SystemAlarms',
  },
  {
    path: '/reports/tag-reports',
    element: withProtectedSuspense(<TagReportsIndex />),
    permission: 'WebNet.Reports.TagReport',
  },
  {
    path: '/reports/monthly-demand',
    element: withProtectedSuspense(<MonthlyDemandReports />),
    permission: 'WebNet.Reports.DemandMonthlies',
  },
  {
    path: '/reports/energy-consumption',
    element: withProtectedSuspense(<EnergyConsumptionReports />),
  },
  {
    path: '/reports/periodic-production-consumptions',
    element: withProtectedSuspense(
      <PeriodicElecProductionConsumptionReports />,
    ),
    permission: 'WebNet.Reports.PeriodicElecProductionConsumptions',
  },
  {
    path: '/reports/production-consumptions',
    element: withProtectedSuspense(<ElecProductionConsumptionReports />),
    permission: 'WebNet.Reports.ElecProductionConsumptions',
  },
  {
    path: '/reports/consumption-report',
    element: withProtectedSuspense(<ConsumptionComparisonReport />),
    permission: 'WebNet.Reports.ConsumptionComparison',
  },
  {
    path: '/reports/weather',
    element: withProtectedSuspense(<WeatherReports />),
    permission: 'WebNet.Reports.Weather',
  },
  {
    path: '/reports/carbon-report',
    element: withProtectedSuspense(<CarbonReports />),
    permission: 'WebNet.Reports.TariffEnvironmentalPollutions',
  },
  {
    path: '/reports/device-status',
    element: withProtectedSuspense(<DeviceStatusReports />),
    permission: 'WebNet.Reports.StatusValues',
  },
];
