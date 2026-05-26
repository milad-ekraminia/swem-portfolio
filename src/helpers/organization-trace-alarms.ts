export const handleSelectedTab = (organizationType: number) => {
  switch (organizationType) {
    // ATOLLA
    case 0:
      return [
        {
          title: 're_plant_summary',
        },
        {
          title: 're_summary',
        },
        {
          title: 'firm_communication_info',
        },
        {
          title: 'authExtraReporting',
        },
        {
          title: 'organization_alarm',
        },
      ];
    // CITY
    case 1:
      return [
        {
          title: 're_plant_summary',
        },

        {
          title: 'organization_alarm',
        },
      ];
    // POWER PLANT & PLOT
    case 3:
      return [
        {
          title: 're_plant_production_comparison',
        },
        // {
        //   title: "em_multi_conditional",
        // },
        {
          title: 'em_org_plant_detail',
        },
        {
          title: 're_plant_forecast',
        },
        {
          title: 'TrendAnalysis',
        },
        // {
        //   title: "gallery",
        // },
        {
          title: 'organization_alarm',
        },
      ];
    case 5:
      return [
        {
          title: 'em_obm_instant_values',
        },
        {
          title: 'em_obm_index_values',
        },
        {
          title: 'organization_alarm',
        },
        {
          title: 'DeviceDetails',
        },
      ];
    case 6:
      return [
        {
          title: 'em_obm_index_values',
        },
        {
          title: 'em_elec_inverter_instant_value',
        },
        {
          title: 'DeviceInverterString',
        },
        {
          title: 'em_device_inverter_status',
        },
        {
          title: 'em_device_inverter_calculated_data',
        },
        {
          title: 'organization_alarm',
        },
        {
          title: 'DeviceDetails',
        },
      ];
    case 7:
      return [
        {
          title: 'em_obm_io_sensor_value',
        },
        {
          title: 'organization_alarm',
        },
        {
          title: 'DeviceDetails',
        },
      ];
    default:
      return [];
  }
};
