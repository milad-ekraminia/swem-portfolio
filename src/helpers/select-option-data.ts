export const dateModes = [
  {
    title: 'daily',
    value: 'Daily',
  },
  {
    title: 'monthly',
    value: 'Monthly',
  },
  {
    title: 'yearly',
    value: 'Yearly',
  },
];

export const inverterInstantChartTypeValueList = [
  { displayName: 'em_instant_voltage', value: 'em_instant_voltage' },
  {
    displayName: 'em_instant_voltage_line_line',
    value: 'em_instant_voltage_line_line',
  },
  { displayName: 'em_instant_current', value: 'em_instant_current' },
  { displayName: 'em_instant_active_power', value: 'em_instant_active_power' },
  {
    displayName: 'em_instant_reactive_power',
    value: 'em_instant_reactive_power',
  },
  {
    displayName: 'em_instant_apperant_power',
    value: 'em_instant_apperant_power',
  },
  { displayName: 'em_instant_cos', value: 'em_instant_cos' },
  {
    displayName: 'em_instant_power_factor',
    value: 'em_instant_power_factor',
  },
  { displayName: 'em_instant_frequency', value: 'em_instant_frequency' },
  { displayName: 'em_instant_dc_voltage', value: 'em_instant_dc_voltage' },
  { displayName: 'em_instant_dc_current', value: 'em_instant_dc_current' },
  {
    displayName: 'em_instant_dc_active_power',
    value: 'em_instant_dc_active_power',
  },
];

export const instantChartTypeValueList = [
  { displayName: 'em_instant_current', value: 'em_instant_current' },
  { displayName: 'em_instant_active_power', value: 'em_instant_active_power' },
  { displayName: 'em_instant_cos', value: 'em_instant_cos' },
  { displayName: 'em_instant_frequency', value: 'em_instant_frequency' },
  { displayName: 'em_instant_voltage', value: 'em_instant_voltage' },
  {
    displayName: 'em_instant_voltage_line_line',
    value: 'em_instant_voltage_line_line',
  },
  {
    displayName: 'em_instant_apperant_power',
    value: 'em_instant_apperant_power',
  },
  { displayName: 'em_instant_power_factor', value: 'em_instant_power_factor' },
  {
    displayName: 'em_instant_reactive_power',
    value: 'em_instant_reactive_power',
  },
  { displayName: 'em_instant_thd_current', value: 'em_instant_thd_current' },
  { displayName: 'em_instant_thd_voltage', value: 'em_instant_thd_voltage' },
];

export const dateDays = Array.from({ length: 31 }, (_, i) => i + 1).map(
  (day) => ({ title: day.toString(), value: day.toString().padStart(2, '0') }),
);

export const dateMonths = [
  { title: 'month_1', value: '01' },
  { title: 'month_2', value: '02' },
  { title: 'month_3', value: '03' },
  { title: 'month_4', value: '04' },
  { title: 'month_5', value: '05' },
  { title: 'month_6', value: '06' },
  { title: 'month_7', value: '07' },
  { title: 'month_8', value: '08' },
  { title: 'month_9', value: '09' },
  { title: 'month_10', value: '10' },
  { title: 'month_11', value: '11' },
  { title: 'month_12', value: '12' },
];

export const dateYears = [
  { title: '2022', value: '2022' },
  { title: '2023', value: '2023' },
  { title: '2024', value: '2024' },
  { title: '2025', value: '2025' },
];
