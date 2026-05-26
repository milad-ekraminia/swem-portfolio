import { getTranslatedValue } from '@/helpers/get-translated-value';

export enum AggregationType {
  Average = 0,
  Minimum = 1,
  Maximum = 2,
  Total = 3,
}
export const aggregationTypeNames = {
  0: getTranslatedValue('Average'),
  1: getTranslatedValue('AlarmConfMinimum'),
  2: getTranslatedValue('AlarmConfMaximum'),
  3: getTranslatedValue('Total'),
};

export const aggregationTypeOptions = [
  { value: 0, title: getTranslatedValue('Average') },
  { value: 1, title: getTranslatedValue('AlarmConfMinimum') },
  { value: 2, title: getTranslatedValue('AlarmConfMaximum') },
  { value: 3, title: getTranslatedValue('Total') },
];

export const seriesOptions = [
  { value: 'bar', title: getTranslatedValue('column') },
  { value: 'line', title: getTranslatedValue('spline') },
  { value: 'dot', title: getTranslatedValue('AssetNode') },
];

export const seriesOptionsName = {
  bar: getTranslatedValue('column'),
  line: getTranslatedValue('spline'),
  dot: getTranslatedValue('AssetNode'),
};

export enum WeatherDataType {
  Temperature = 1,
  HumidityRatio = 2,
  Pressure = 3,
  CloudsRatio = 4,
  WindSpeed = 5,
  Visibility = 6,
}

export const weatherDataTypeOptions = [
  { value: 1, title: getTranslatedValue('Temperature') },
  { value: 2, title: getTranslatedValue('HumidityRatioWUnit') },
  { value: 3, title: getTranslatedValue('PressureWUnit') },
  { value: 4, title: getTranslatedValue('CloudsRatioWUnit') },
  { value: 5, title: getTranslatedValue('WindSpeedWUnit') },
  { value: 6, title: getTranslatedValue('VisibilityWUnit') },
];
export const weatherDataTypeNames = {
  1: getTranslatedValue('Temperature'),
  2: getTranslatedValue('HumidityRatioWUnit'),
  3: getTranslatedValue('PressureWUnit'),
  4: getTranslatedValue('CloudsRatioWUnit'),
  5: getTranslatedValue('WindSpeedWUnit'),
  6: getTranslatedValue('VisibilityWUnit'),
};
