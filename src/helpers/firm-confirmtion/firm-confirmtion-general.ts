import { getTranslatedValue } from '../get-translated-value';

const activePassiveOptions = [
  { title: getTranslatedValue('Passive'), value: 0 },
  { title: getTranslatedValue('Active'), value: 1 },
];

const formatUserRoleOptions = (userRolesLookup: any) => {
  const roles = Array.isArray(userRolesLookup?.items)
    ? userRolesLookup.items
    : Array.isArray(userRolesLookup)
      ? userRolesLookup
      : [];

  return roles.map((role: any) => ({
    title: role?.displayName ?? '',
    value: role?.id,
  }));
};
export const organizationBasedMonitoringList = (errors: any) => [
  {
    id: 1,
    isNumberInput: true,
    name: 'refresh_obm_org_device_communication_status',
    label: getTranslatedValue('refresh_obm_org_device_communication_status'),
    placeholder: 0,
    error: errors?.refresh_obm_org_device_communication_status?.message,
  },
  {
    id: 2,
    isNumberInput: true,
    name: 'refresh_obm_org_last_sensor_value',
    label: getTranslatedValue('refresh_obm_org_last_sensor_value'),
    placeholder: 0,
    error: errors?.refresh_obm_org_last_sensor_value?.message,
  },
  {
    id: 3,
    isNumberInput: true,
    name: 'refresh_obm_org_alarm',
    label: getTranslatedValue('refresh_obm_org_alarm'),
    placeholder: 0,
    error: errors?.refresh_obm_org_alarm?.message,
  },
  {
    id: 4,
    isNumberInput: true,
    name: 'refresh_obm_org_multi_conditional_status',
    label: getTranslatedValue('refresh_obm_org_multi_conditional_status'),
    placeholder: 0,
    error: errors?.refresh_obm_org_multi_conditional_status?.message,
  },
  {
    id: 5,
    isNumberInput: true,
    name: 'refresh_obm_org_alarm_2',
    label: getTranslatedValue('refresh_obm_org_alarm_2'),
    placeholder: 0,
    error: errors?.refresh_obm_org_alarm_2?.message,
  },
  {
    id: 6,
    isNumberInput: true,
    name: 'refresh_obm_device_data',
    label: getTranslatedValue('refresh_obm_device_data'),
    placeholder: 0,
    error: errors?.refresh_obm_device_data?.message,
  },
  {
    id: 7,
    isNumberInput: true,
    name: 'refresh_obm_org_last_alarm_flag',
    label: getTranslatedValue('refresh_obm_org_last_alarm_flag'),
    placeholder: 0,
    error: errors?.refresh_obm_org_last_alarm_flag?.message,
  },
  {
    id: 8,
    isNumberInput: true,
    name: 'refresh_obm_device_alarm_device',
    label: getTranslatedValue('refresh_obm_device_alarm_device'),
    placeholder: 0,
    error: errors?.refresh_obm_device_alarm_device?.message,
  },
  {
    id: 9,
    isNumberInput: true,
    name: 'refresh_obm_org_device_communication_status_pc',
    label: getTranslatedValue('refresh_obm_org_device_communication_status_pc'),
    placeholder: 0,
    error: errors?.refresh_obm_org_device_communication_status_pc?.message,
  },
  {
    id: 10,
    isNumberInput: true,
    name: 'refresh_obm_device_alarm_device_2_',
    label: getTranslatedValue('refresh_obm_device_alarm_device_2_'),
    placeholder: 0,
    error: errors?.refresh_obm_device_alarm_device_2_?.message,
  },
  {
    id: 11,
    isNumberInput: true,
    name: 'refresh_obm_org_device_model_comm_status',
    label: getTranslatedValue('refresh_obm_org_device_model_comm_status'),
    placeholder: 0,
    error: errors?.refresh_obm_org_device_model_comm_status?.message,
  },
  {
    id: 12,
    isNumberInput: true,
    name: 'refresh_obm_device_device_compensation_rate',
    label: getTranslatedValue('refresh_obm_device_device_compensation_rate'),
    placeholder: 0,
    error: errors?.refresh_obm_device_device_compensation_rate?.message,
  },
  {
    id: 13,
    isNumberInput: true,
    name: 'refresh_obm_org_organization_consumptions',
    label: getTranslatedValue('refresh_obm_org_organization_consumptions'),
    placeholder: 0,
    error: errors?.refresh_obm_org_organization_consumptions?.message,
  },
  {
    id: 14,
    isNumberInput: true,
    name: 'refresh_obm_device_energy_index_value',
    label: getTranslatedValue('refresh_obm_device_energy_index_value'),
    placeholder: 0,
    error: errors?.refresh_obm_device_energy_index_value?.message,
  },
  {
    id: 15,
    isNumberInput: true,
    name: 'refresh_obm_org_last_instant_value',
    label: getTranslatedValue('refresh_obm_org_last_instant_value'),
    placeholder: 0,
    error: errors?.refresh_obm_org_last_instant_value?.message,
  },
  {
    id: 16,
    name: 'IndexDataMultiplierDisplay',
    label: getTranslatedValue('IndexDataMultiplierDisplay'),
    placeholder: getTranslatedValue('IndexDataMultiplierDisplay'),
    options: [],
    error: errors?.IndexDataMultiplierDisplay?.message,
  },
];

export const panelMonitoringList = (errors: any) => [
  {
    id: 1,
    isNumberInput: true,
    name: 'refresh_dashboard_device_monitoring_data',
    label: getTranslatedValue('refresh_dashboard_device_monitoring_data'),
    placeholder: 0,
    error: errors?.refresh_dashboard_device_monitoring_data?.message,
  },
];

export const mapList = (errors: any) => [
  {
    id: 1,
    isNumberInput: true,
    name: 'refresh_mbm_device_data',
    label: getTranslatedValue('refresh_mbm_device_data'),
    placeholder: 0,
    error: errors?.refresh_mbm_device_data?.message,
  },
];

export const mimicDiagramList = (errors: any, mimicDiagramsLookup: any) => [
  {
    id: 1,
    name: 'default_mimic_diagram',
    options: mimicDiagramsLookup?.map((item: any) => ({
      title: item?.displayName,
      value: item?.id,
    })),
    label: getTranslatedValue('default_mimic_diagram'),
    placeholder: getTranslatedValue('default_mimic_diagram'),
    error: errors?.default_mimic_diagram?.message,
  },
  {
    id: 2,
    isNumberInput: true,
    name: 'refresh_mimic_monitor_page_data',
    label: getTranslatedValue('refresh_mimic_monitor_page_data'),
    placeholder: 0,
    error: errors?.refresh_mimic_monitor_page_data?.message,
  },
  {
    id: 3,
    isNumberInput: true,
    name: 'refresh_mimic_monitor_page_alarm_data',
    label: getTranslatedValue('refresh_mimic_monitor_page_alarm_data'),
    placeholder: 0,
    error: errors?.refresh_mimic_monitor_page_alarm_data?.message,
  },
  {
    id: 4,
    isNumberInput: true,
    name: 'refresh_mimic_monitor_page_compensation_rate',
    label: getTranslatedValue('refresh_mimic_monitor_page_compensation_rate'),
    placeholder: 0,
    error: errors?.refresh_mimic_monitor_page_compensation_rate?.message,
  },
  {
    id: 5,
    isNumberInput: true,
    name: 'refresh_mimic_monitor_page_categorial_chart',
    label: getTranslatedValue('refresh_mimic_monitor_page_categorial_chart'),
    placeholder: 0,
    error: errors?.refresh_mimic_monitor_page_categorial_chart?.message,
  },
  {
    id: 6,
    isNumberInput: true,
    name: 'refresh_mimic_monitor_page_weather_data',
    label: getTranslatedValue('refresh_mimic_monitor_page_weather_data'),
    placeholder: 0,
    error: errors?.refresh_mimic_monitor_page_weather_data?.message,
  },
];
export const isoList = (errors: any) => [
  {
    id: 1,
    name: 'default_co2_relase_unit',
    label: getTranslatedValue('default_co2_relase_unit'),
    placeholder: 0,
    options: [
      { title: getTranslatedValue('Kg/CO2'), value: 'Kg/CO2' },
      {
        title: getTranslatedValue('Ton/CO2'),
        value: 'Ton/CO2',
      },
    ],
    error: errors?.default_co2_relase_unit?.message,
  },
];

export const communicationList = (errors: any) => [
  {
    id: 1,
    name: 'datetime_synchronization',
    label: getTranslatedValue('datetime_synchronization'),
    placeholder: 0,
    options: [
      { title: getTranslatedValue('DateTimeSyncronizationDisabled'), value: 0 },
      {
        title: getTranslatedValue('DateTimeSyncronizationEnabled'),
        value: 1,
      },
    ],
    error: errors?.datetime_synchronization?.message,
  },
];

export const emList = (errors: any) => [
  {
    id: 1,
    isNumberInput: true,
    name: 'hdd_threshold',
    label: getTranslatedValue('hdd_threshold'),
    placeholder: 0,
    error: errors?.hdd_threshold?.message,
  },
  {
    id: 2,
    isNumberInput: true,
    name: 'cdd_threshold',
    label: getTranslatedValue('cdd_threshold'),
    placeholder: 0,
    error: errors?.cdd_threshold?.message,
  },
];

export const generalList = (errors: any) => [
  {
    id: 1,
    name: 'ng_ms_using',
    label: getTranslatedValue('ng_ms_using'),
    placeholder: 0,
    options: [],

    error: errors?.ng_ms_using?.message,
  },
  {
    id: 2,
    name: 're_ms_using',
    label: getTranslatedValue('re_ms_using'),
    placeholder: getTranslatedValue('re_ms_using'),
    options: [
      { title: getTranslatedValue('Passive'), value: 0 },
      { title: getTranslatedValue('Active'), value: 1 },
    ],
    error: errors?.re_ms_using?.message,
  },
];

export const specialReportsList = (errors: any) => [
  {
    id: 1,
    name: 'DailyConsumptionList',
    label: getTranslatedValue('DailyConsumptionList'),
    placeholder: getTranslatedValue('DailyConsumptionList'),
    options: activePassiveOptions,
    error: errors?.ng_ms_using?.message,
  },
  {
    id: 2,
    name: 'HourlyEnergyProdConsReport',
    label: getTranslatedValue('HourlyEnergyProdConsReport'),
    placeholder: getTranslatedValue('HourlyEnergyProdConsReport'),
    options: activePassiveOptions,
    error: errors?.re_ms_using?.message,
  },
  {
    id: 3,
    name: 'IndoorUnitWorkingHoursList',
    label: getTranslatedValue('IndoorUnitWorkingHoursList'),
    placeholder: getTranslatedValue('IndoorUnitWorkingHoursList'),
    options: activePassiveOptions,
    error: errors?.re_ms_using?.message,
  },
  {
    id: 4,
    name: 'DeviceProductionStatusReport',
    label: getTranslatedValue('DeviceProductionStatusReport'),
    placeholder: getTranslatedValue('DeviceProductionStatusReport'),
    options: activePassiveOptions,
    error: errors?.re_ms_using?.message,
  },
  {
    id: 5,
    name: 'YatasMonthlyAnalysisReport',
    label: getTranslatedValue('YatasMonthlyAnalysisReport'),
    placeholder: getTranslatedValue('YatasMonthlyAnalysisReport'),
    options: activePassiveOptions,
    error: errors?.re_ms_using?.message,
  },
  {
    id: 6,
    name: 'DailyConsumptionReport',
    label: getTranslatedValue('DailyConsumptionReport'),
    placeholder: getTranslatedValue('DailyConsumptionReport'),
    options: activePassiveOptions,
    error: errors?.re_ms_using?.message,
  },
];

export const endUserReportsList = (errors: any, userRolesLookup?: any) => {
  const userRoleOptions = formatUserRoleOptions(userRolesLookup);

  return [
    {
      id: 1,
      name: 'authorization_profile_1',
      label: getTranslatedValue('permissionProfile1'),
      placeholder: getTranslatedValue('authorization_profile_1'),
      options: userRoleOptions,
      error: errors?.authorization_profile_1?.message,
    },
    {
      id: 2,
      name: 'authorization_profile_2',
      label: getTranslatedValue('permissionProfile2'),
      placeholder: getTranslatedValue('authorization_profile_2'),
      options: userRoleOptions,
      error: errors?.authorization_profile_2?.message,
    },
    {
      id: 3,
      name: 'authorization_profile_3',
      label: getTranslatedValue('permissionProfile3'),
      placeholder: getTranslatedValue('authorization_profile_3'),
      options: userRoleOptions,
      error: errors?.authorization_profile_3?.message,
    },
    {
      id: 4,
      name: 'authorization_profile_4',
      label: getTranslatedValue('permissionProfile4'),
      placeholder: getTranslatedValue('authorization_profile_4'),
      options: userRoleOptions,
      error: errors?.authorization_profile_4?.message,
    },
  ];
};
