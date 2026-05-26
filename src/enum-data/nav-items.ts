import React from 'react';
import { BuildingSvg } from '@/assets/icons/building-svg';
import { ContentEditSvg } from '@/assets/icons/content-edit-svg';
import { FilesSvg } from '@/assets/icons/files-svg';
import { InterfaceSvg } from '@/assets/icons/interface-svg';
import { OrgTraceHeaderSvg } from '@/assets/icons/org-trace-header-svg';
import { programingSvg } from '@/assets/icons/programing-svg';
import { ServersSvg } from '@/assets/icons/servers-svg';
import { ServicePartsSvg } from '@/assets/icons/service-parts-svg';
import { SingleUserSettingSvg } from '@/assets/icons/single-user-setting-svg';
import { SvgProps } from '@/types/icons';
import { NavItem } from '@/types/layout';
import { getTranslatedValue } from '../helpers/get-translated-value';
import { getCookie } from '@/helpers/cookies';


export interface ItemsProps {
  title: string;
  Icon: (props: SvgProps) => React.JSX.Element;
  route: string;
  id: number;
  children: any[];
  permission: string;
}
// Build nav items using provided resources to make titles reactive to language changes
export const getNavItems = (resources?: any): NavItem[] => [
  {
    title: getTranslatedValue('Dashboard', undefined, resources),
    Icon: InterfaceSvg,
    route: '/',
    id: 1,
    children: [],
  },
  {
    title: getTranslatedValue('Monitoring Measurement', undefined, resources),
    Icon: OrgTraceHeaderSvg,
    route: '/organization-trace',
    id: 2,
    children: [
      {
        title: getTranslatedValue(
          'Organization Trace',
          undefined,
          resources,
        ),
        route: '/organization-trace',
        id: 20,
      },
      {
        title: getTranslatedValue('Map', undefined, resources),
        route: '/organization-trace/map',
        id: 21,
        permission: 'WebNet.OrganizationTabs.PlantGeoMap',
      },
      {
        title: getTranslatedValue('ChartsTrendAnalysis', undefined, resources),
        route: '/organization-trace/graphic',
        permission: 'WebNet.OrganizationTabs.Graphics',
        id: 22,
      },

      {
        title: getTranslatedValue('Menu:Alarms', undefined, resources),
        route: '/organization-trace/alarms',
        permission: 'WebNet.Alarms',
        id: 23,
      },
    ],
  },
  {
    title: getTranslatedValue(
      'SupervisoryControlDataAcquisition',
      undefined,
      resources,
    ),
    Icon: ServersSvg,
    route: '/scada',
    permission: 'WebNet.MimicDiagrams',
    id: 3,
    children: [
      // {
      //   title: getTranslatedValue('MimicDiagram', undefined, resources),
      //   route: `${import.meta.env.VITE_MIMIC_ADDRESS}`,
      //   permission: 'WebNet.MimicDiagrams',
      //   id: 30,
      // },
      {
        title: getTranslatedValue(
          'Menu:MimicDiagramEditor',
          undefined,
          resources,
        ),

        route: `${import.meta.env.VITE_MIMIC_ADDRESS}?lang=${getCookie('CultureName') ?? (import.meta.env.VITE_CULTURE_NAME as string)}`,
        permission: 'WebNet.MimicDiagrams',
        target: '_blank',
        id: 31,
      },
    ],
  },

  {
    title: getTranslatedValue('Menu:Reports', undefined, resources),
    Icon: FilesSvg,
    route: '/reports',
    permission: 'WebNet.Reports',
    id: 4,
    children: [
      {
        title: getTranslatedValue('PowerBIReports', undefined, resources),
        route: 'http://49.13.126.0:8088/',
        permission: 'WebNet.Reports.PowerBIReports',
        target: '_blank',
        id: 40,
      },
      {
        title: getTranslatedValue(
          'Menu:PeriodicElecProductionConsumptionReports',
          undefined,
          resources,
        ),
        route: '/reports/periodic-production-consumptions',
        permission: 'WebNet.Reports.PeriodicElecProductionConsumptions',
        id: 41,
      },
      {
        title: getTranslatedValue('InverterIndexValue', undefined, resources),
        route: '/reports/index-values',
        id: 42,
      },
      {
        title: getTranslatedValue(
          'Menu:InverterInstantValueReports',
          undefined,
          resources,
        ),
        route: '/reports/inverter-instant-values',
        permission: 'WebNet.Reports.InverterInstantValues',
        id: 43,
      },
      {
        title: getTranslatedValue(
          'Menu:SensorValueReports',
          undefined,
          resources,
        ),
        route: '/reports/sensor-values',
        permission: 'WebNet.Reports.SensorValues',
        id: 44,
      },
      {
        title: getTranslatedValue(
          'Menu:InstantValueReports',
          undefined,
          resources,
        ),
        route: '/reports/instant-values',
        permission: 'WebNet.Reports.InstantValues',
        id: 45,
      },
      {
        title: getTranslatedValue(
          'Menu:ElecProductionConsumptionReports',
          undefined,
          resources,
        ),
        route: '/reports/production-consumptions',
        permission: 'WebNet.Reports.ElecProductionConsumptions',
        id: 46,
      },
      {
        title: getTranslatedValue('Menu:WeatherReports', undefined, resources),
        route: '/reports/weather',
        permission: 'WebNet.Reports.Weather',
        id: 47,
      },
      {
        title: getTranslatedValue(
          'Menu:SystemAlarmReports',
          undefined,
          resources,
        ),
        route: '/reports/system-alarms',
        permission: 'WebNet.Reports.SystemAlarms',
        id: 48,
      },
      {
        title: getTranslatedValue('Menu:TagReports', undefined, resources),
        route: '/reports/tag-reports',
        permission: 'WebNet.Reports.TagReport',
        id: 49,
      },
      {
        title: getTranslatedValue(
          'em_report_energy_consumption_no_period',
          undefined,
          resources,
        ),
        route: '/reports/energy-consumption',
        id: 115,
      },
      {
        title: getTranslatedValue(
          'mnuEMReportElecDemand',
          undefined,
          resources,
        ),
        route: '/reports/demand-data',
        permission: 'WebNet.Reports.DemandInstants',
        id: 50,
      },
      {
        title: getTranslatedValue(
          'em_report_elec_demand_monthly_bread_crumb_header',
          undefined,
          resources,
        ),
        route: '/reports/monthly-demand',
        permission: 'WebNet.Reports.DemandMonthlies',
        id: 51,
      },
      {
        title: getTranslatedValue('mnuEMScheduledReport', undefined, resources),
        route: '/reports/scheduled-report',
        permission: 'WebNet.ScheduledReports',
        id: 52,
      },
      {
        title: getTranslatedValue(
          'em_report_elec_harmonic',
          undefined,
          resources,
        ),
        route: '/reports/harmonic',
        permission: 'WebNet.Reports.Harmonics',
        id: 53,
      },
      {
        title: getTranslatedValue('MinMaxValueReport', undefined, resources),
        route: '/reports/min-max',
        id: 54,
        permission: 'WebNet.Reports.MinMaxValues',
      },
      {
        title: getTranslatedValue(
          'em_report_elec_archive_bread_crumb_header',
          undefined,
          resources,
        ),
        route: '/reports/archive-data',
        id: 55,
        permission: 'WebNet.Reports.IoDeviceArchives',
      },
      {
        title: getTranslatedValue('DeviceStatusInfo', undefined, resources),
        route: '/reports/device-status',
        permission: 'WebNet.Reports.StatusValues',
        id: 56,
      },
      {
        title: getTranslatedValue(
          'consumption_comparison',
          undefined,
          resources,
        ),
        route: '/reports/consumption-report',
        permission: 'WebNet.Reports.ConsumptionComparison',
        id: 57,
      },
      {
        title: getTranslatedValue(
          'CarbonEmissionsPeriodReport',
          undefined,
          resources,
        ),
        route: '/reports/carbon-report',
        id: 58,
        permission: 'WebNet.Reports.TariffEnvironmentalPollutions',
      },
      {
        title: getTranslatedValue(
          'em_report_energy_index_value',
          undefined,
          resources,
        ),
        route: '/reports/energy-index',
        permission: 'WebNet.Reports.EnergyIndexValues',
        id: 59,
      },
    ],
  },
  {
    title: getTranslatedValue('Menu:InventoryManagement', undefined, resources),
    Icon: BuildingSvg,
    route: '/inventory-management',
    id: 5,
    children: [
      {
        title: getTranslatedValue('Warehouses', undefined, resources),
        route: '/inventory-management/warehouses',
        permission: 'WebNet.Warehouses',
        id: 51,
      },
      {
        title: getTranslatedValue('Products', undefined, resources),
        route: '/inventory-management/products',
        permission: 'WebNet.Products',
        id: 57,
      },
    ],
  },
  {
    title: getTranslatedValue(
      'Menu:MaintenanceAndRepair',
      undefined,
      resources,
    ),
    Icon: ServicePartsSvg,
    route: '/bys',
    id: 6,
    children: [
      {
        title: getTranslatedValue('WorkOrderAssetTree', undefined, resources),
        route: '/bys/asset-tree',
        permission: 'WebNet.AssetTree',
        id: 64,
      },
      {
        title: getTranslatedValue('Plants', undefined, resources),
        route: '/bys/plants',
        permission: 'WebNet.Plants.Managament',
        id: 61,
      },
      {
        title: getTranslatedValue(
          'Menu:WorkNotifications',
          undefined,
          resources,
        ),
        route: '/bys/work-notifications',
        permission: 'WebNet.WorkNotifications',
        id: 62,
      },
      {
        title: getTranslatedValue('Menu:WorkOrders', undefined, resources),
        route: '/bys/work-orders',
        permission: 'WebNet.WorkOrders',
        id: 63,
      },
    ],
  },
  {
    title: getTranslatedValue('Menu:Definitions', undefined, resources),
    Icon: ContentEditSvg,
    route: '/definitions',
    id: 7,
    children: [
      {
        title: getTranslatedValue('Organizations', undefined, resources),
        route: '/definitions/organizations',
        permission: 'WebNet.Organizations',
        id: 71,
      },
      {
        permission: 'WebNet.Devices',
        title: getTranslatedValue('Devices', undefined, resources),
        route: '/definitions/devices',
        id: 72,
      },
      {
        title: getTranslatedValue('DeviceModels', undefined, resources),
        route: '/definitions/device-models',
        permission: 'WebNet.DeviceModels',
        id: 73,
      },
      {
        title: getTranslatedValue(
          'Menu:DeviceModelModbusTables',
          undefined,
          resources,
        ),
        route: '/definitions/device-model-modbus-tables',
        permission: 'WebNet.DeviceModelModbusTables',
        id: 74,
      },
      {
        title: getTranslatedValue('mnuEMAccessPoint', undefined, resources),
        route: '/definitions/access-points',
        permission: 'WebNet.AccessPoints',
        id: 75,
      },
      {
        title: getTranslatedValue(
          'FirmWeatherDataLocations',
          undefined,
          resources,
        ),
        route: '/definitions/firm-weather-data-location',
        permission: 'WebNet.FirmWeatherDataLocationOWMS',
        id: 76,
      },
      {
        title: getTranslatedValue('AlarmConfigurations', undefined, resources),
        route: '/definitions/alarm-configurations',
        permission: 'WebNet.AlarmConfigurations',
        id: 77,
      },
      {
        title: getTranslatedValue('MCS', undefined, resources),
        route: '/definitions/multi-conditional-statuses',
        permission: 'WebNet.MultiConditionalStatuses',
        id: 78,
      },
    ],
  },
  {
    title: getTranslatedValue('SystemAdministration', undefined, resources),
    Icon: SingleUserSettingSvg,
    route: '/system-administration',
    permission: 'WebNet.SystemManagement',
    id: 8,
    children: [
      {
        isMain: true,
        title: getTranslatedValue(
          'Menu:InventoryManagement',
          undefined,
          resources,
        ),

        children: [
          {
            title: getTranslatedValue(
              'Menu:ProductUnits',
              undefined,
              resources,
            ),
            route: '/system-administration/product-units',
            id: 106,
            permission: 'WebNet.ProductUnits',
          },
          {
            title: getTranslatedValue(
              'Menu:ProductTypes',
              undefined,
              resources,
            ),
            route: '/system-administration/product-types',
            permission: 'WebNet.ProductTypes',
            id: 107,
          },
          {
            title: getTranslatedValue(
              'Menu:ProductManufacturers',
              undefined,
              resources,
            ),
            route: '/system-administration/product-manufacturers',
            permission: 'WebNet.ProductManufacturers',
            id: 108,
          },
          {
            title: getTranslatedValue(
              'Menu:ProductBrands',
              undefined,
              resources,
            ),
            route: '/system-administration/product-brands',
            permission: 'WebNet.ProductBrands',
            id: 109,
          },
          {
            title: getTranslatedValue(
              'Menu:ProductBrandModels',
              undefined,
              resources,
            ),
            route: '/system-administration/product-brand-models',
            permission: 'WebNet.ProductBrandModels',
            id: 110,
          },
        ],
        id: 80,
      },
      {
        isMain: true,
        title: getTranslatedValue(
          'Menu:MaintenanceAndRepair',
          undefined,
          resources,
        ),
        children: [
          {
            title: getTranslatedValue(
              'WorkNotificationTypes',
              undefined,
              resources,
            ),
            route: '/system-administration/bys/work-notification-types',
            permission: 'WebNet.WorkNotificationTypes',
            id: 86,
          },

          {
            title: getTranslatedValue(
              'WorkOrderCostTypes',
              undefined,
              resources,
            ),
            route: '/system-administration/bys/work-order-cost-types',
            permission: 'WebNet.WorkOrderCostTypes',
            id: 88,
          },
          {
            title: getTranslatedValue(
              'Permission:WorkOrderActions',
              undefined,
              resources,
            ),
            route: '/system-administration/bys/work-order-actions',
            permission: 'WebNet.WorkOrderActions',
            id: 89,
          },
          {
            title: getTranslatedValue('WorkOrderTypes', undefined, resources),
            route: '/system-administration/bys/work-order-types',
            permission: 'WebNet.WorkOrderTypes',
            id: 90,
          },
        ],
        id: 83,
      },
      {
        isMain: true,
        title: getTranslatedValue('Menu:Definitions', undefined, resources),
        children: [
          {
            title: getTranslatedValue('Label', undefined, resources),
            route: '/system-administration/definitions/labels',
            permission: 'WebNet.Labels',
            id: 91,
          },
          {
            title: getTranslatedValue('Formulas', undefined, resources),
            route: '/system-administration/definitions/formulas',
            permission: 'WebNet.Formulas',
            id: 910,
          },
          {
            title: getTranslatedValue(
              'tbl_EM_DeviceCategory',
              undefined,
              resources,
            ),
            route: '/system-administration/definitions/device-categories',
            permission: 'WebNet.DeviceCategories',
            id: 92,
          },
          {
            title: getTranslatedValue('Menu:TimePeriods', undefined, resources),
            route: '/system-administration/definitions/time-periods',
            permission: 'WebNet.TimePeriods',
            id: 93,
          },
          {
            title: getTranslatedValue('Users', 'AbpIdentity.texts', resources),
            route: '/system-administration/definitions/users',
            permission: 'AbpIdentity.Users',
            id: 95,
          },
          {
            title: getTranslatedValue(
              'UserPermissionProfiles',
              undefined,
              resources,
            ),
            route: '/system-administration/definitions/user-profiles',
            permission: 'AbpIdentity.Roles',
            id: 96,
          },
          {
            title: getTranslatedValue(
              'Menu:DerivedValues',
              undefined,
              resources,
            ),
            route: '/system-administration/definitions/derived-values',
            permission: 'WebNet.DerivedValues',
            id: 97,
          },
          {
            title: getTranslatedValue(
              'Permission:UserOrganizationProfiles',
              undefined,
              resources,
            ),
            route:
              '/system-administration/definitions/user-organization-profiles',
            permission: 'WebNet.UserOrganizationProfiles',
            id: 104,
          },
          {
            title: getTranslatedValue('PlantImages', undefined, resources),
            route: '/system-administration/definitions/plant-images',
            permission: 'WebNet.PlantImages',
            id: 102,
          },
          {
            title: getTranslatedValue('PlantVideos', undefined, resources),
            route: '/system-administration/definitions/plant-videos',
            permission: 'WebNet.PlantVideos',
            id: 103,
          },
          {
            title: getTranslatedValue(
              'firm_configuration_bread_crumb_header',
              undefined,
              resources,
            ),
            route: '/system-administration/definitions/firm-configuration',
            permission: 'WebNet.SystemConfigurations',
            id: 111,
          },
          // {
          //   title: getTranslatedValue('em_hourly_data_management'),
          //   route: '/system-administration/definitions/hourly-data',
          //   id: 98,
          // },
          // {
          //   title: getTranslatedValue('amr_firm_operation'),
          //   route: '/system-administration/definitions/company-operations',
          //   id: 94,
          // },
        ],
        id: 84,
      },
      {
        isMain: true,
        title: getTranslatedValue(
          'SupervisoryControlDataAcquisition',
          undefined,
          resources,
        ),
        children: [
          {
            title: getTranslatedValue(
              'Menu:MimicElements',
              undefined,
              resources,
            ),
            route: '/system-administration/definitions/mimic-elements',
            permission: 'WebNet.MimicElements',
            id: 105,
          },
          {
            title: getTranslatedValue(
              'Menu:MimicProfiles',
              undefined,
              resources,
            ),
            route: '/system-administration/scada/mimic-profiles',
            permission: 'WebNet.MimicProfiles',
            id: 99,
          },
        ],
        id: 84,
      },
      {
        isMain: true,
        title: getTranslatedValue('Logs', undefined, resources),
        children: [
          {
            title: getTranslatedValue(
              'SecurityLogs',
              'AbpIdentity.texts',
              resources,
            ),
            route: '/system-administration/security-logs',
            permission: 'AbpIdentity.SecurityLogs',
            id: 85,
          },
          {
            title: getTranslatedValue(
              'Menu:AuditLogging',
              'AbpAuditLogging.texts',
              resources,
            ),
            route: '/system-administration/audit-logs',
            permission: 'AuditLogging.AuditLogs',
            id: 86,
          },
        ],
        id: 84,
      },

      {
        title: getTranslatedValue('DashboardMap', undefined, resources),
        route: '/system-administration/dashboard-map',
        permission: 'WebNet.SystemManagement.DashboardMap',
        id: 100,
      },
      {
        title: getTranslatedValue('DeviceStartupData', undefined, resources),
        route: '/system-administration/definitions/device-startup-data',
        permission: 'WebNet.SystemManagement.DeviceStartupData',
        id: 112,
      },
    ],
  },
  {
    title: getTranslatedValue('SoftwareVersions', undefined, resources),
    Icon: programingSvg,
    route: '/software-versions',
    permission: 'WebNet.ECentralVersions',
    id: 9,
    children: [],
  },
];

// Backward export for existing imports. Note: this will be static at import time.
export const NAV_ITEMS: NavItem[] = getNavItems();