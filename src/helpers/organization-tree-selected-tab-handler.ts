export const handleSelectedTab = (organizationType: number) => {
  switch (organizationType) {
    // ATOLLA
    case 0:
      return [
        {
          title: 're_plant_summary',
          permission: 'WebNet.OrganizationTabs.PlantDetailSummary',
        },
        {
          title: 're_summary',
          permission: 'WebNet.OrganizationTabs.PlantSummary',
        },
        {
          title: 'firm_communication_info',
          permission: 'WebNet.OrganizationTabs.CommunicationInfo',
        },
        // {
        //   title: 'authExtraReporting',
        //   permission: 'WebNet.OrganizationTabs.ExtraReporting',
        // },
        {
          title: 'organization_alarm',
          permission: 'WebNet.OrganizationTabs.Alarm',
        },
      ];
    // CITY
    case 1:
      return [
        {
          title: 're_plant_summary',
          permission: 'WebNet.OrganizationTabs.PlantDetailSummary',
        },

        {
          title: 'organization_alarm',
          permission: 'WebNet.OrganizationTabs.Alarm',
        },
      ];
    // POWER PLANT & PLOT
    case 3:
      return [
        {
          title: 're_plant_production_comparison',
          permission: 'WebNet.OrganizationTabs.ProductionComparison',
        },
        // {
        //   title: "em_multi_conditional",
        // },
        {
          title: 'em_org_plant_detail',
          permission: 'WebNet.OrganizationTabs.PlantDetailSummary',
        },
        // {
        //   title: 're_plant_forecast',
        //   permission: 'WebNet.OrganizationTabs.PlantForecast',
        // },
        // {
        //   title: 'TrendAnalysis',
        //   permission: 'WebNet.OrganizationTabs.TrendAnalysis',
        // },
        {
          title: 'organization_alarm',
          permission: 'WebNet.OrganizationTabs.Alarm',
        },
        {
          title: 'MimicDiagramPreview',
          // permission: 'WebNet.OrganizationTabs.MimicDiagramPreview',
        },
      ];
    case 5:
      return [
        {
          title: 'em_obm_instant_values',
          permission: 'WebNet.OrganizationTabs.DeviceInstantValue',
        },
        {
          title: 'em_obm_index_values',
          permission: 'WebNet.OrganizationTabs.IndexValues',
        },
        {
          title: 'organization_alarm',
          permission: 'WebNet.OrganizationTabs.Alarm',
        },
        {
          title: 'DeviceDetails',
          permission: 'WebNet.OrganizationTabs.DeviceDetails',
        },
      ];
    case 6:
      return [
        {
          title: 'em_obm_index_values',
          permission: 'WebNet.OrganizationTabs.IndexValues',
        },
        {
          title: 'em_elec_inverter_instant_value',
          permission: 'WebNet.OrganizationTabs.DeviceInverterInstantValue',
        },
        {
          title: 'DeviceInverterString',
          permission: 'WebNet.OrganizationTabs.DeviceInverterString',
        },
        {
          title: 'em_device_inverter_status',
          permission: 'WebNet.OrganizationTabs.DeviceInverterStatus',
        },
        {
          title: 'em_device_inverter_calculated_data',
          permission: 'WebNet.OrganizationTabs.DeviceInverterCalculated',
        },
        {
          title: 'organization_alarm',
          permission: 'WebNet.OrganizationTabs.Alarm',
        },
        {
          title: 'DeviceDetails',
          permission: 'WebNet.OrganizationTabs.DeviceDetails',
        },
      ];
    case 7:
      return [
        {
          title: 'em_obm_io_sensor_value',
          permission: 'WebNet.OrganizationTabs.DeviceIoSensorValue',
        },
        {
          title: 'organization_alarm',
          permission: 'WebNet.OrganizationTabs.Alarm',
        },
        {
          title: 'DeviceDetails',
          permission: 'WebNet.OrganizationTabs.DeviceDetails',
        },
      ];
    default:
      return [];
  }
};
