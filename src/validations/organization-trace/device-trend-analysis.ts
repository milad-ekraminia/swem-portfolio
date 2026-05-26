import { getTranslatedValue } from '@/helpers/get-translated-value';
import * as yup from 'yup';

// Helper to generate "Field Required" messages
const requiredMsg = (fieldKey: string) =>
  `${getTranslatedValue(fieldKey)} ${getTranslatedValue('Required', 'AbpIdentity.texts')}`;

// Filter profile validation
export const filterProfileValidation = yup.object({
  profileName: yup.string().required(requiredMsg('ProfileName')),
});

// Default values for measurement details
export const measurementDetailDefaultValues = {
  DeviceId: '',
  LabelId: '',
  AggregationType: '',
  Serial: '',
  Color: '',
  YAxis: '',
  Description: '',
};

// Measurement detail validation
export const measurementDetailValidation = yup.object({
  DeviceId: yup
    .number()
    .typeError(requiredMsg('Device'))
    .required(requiredMsg('Device')),
  LabelId: yup
    .number()
    .typeError(requiredMsg('Label'))
    .required(requiredMsg('Label')),
  AggregationType: yup.string().required(requiredMsg('em_calculation')),
  Serial: yup.string().required(requiredMsg('em_graphic_serie_type')),
  Color: yup.string().required(requiredMsg('em_graphic_serie_color')),
  YAxis: yup
    .number()
    .typeError(requiredMsg('em_y_axis_nr'))
    .required(requiredMsg('em_y_axis_nr')),
  Description: yup.string().required(requiredMsg('firm_description')),
});

// Cons information detail validation
export const consInformationDetailValidation = yup.object({
  DeviceId: yup
    .number()
    .typeError(requiredMsg('Device'))
    .required(requiredMsg('Device')),
  LabelId: yup
    .number()
    .typeError(requiredMsg('Label'))
    .required(requiredMsg('Label')),
  TimePeriodId: yup
    .number()
    .typeError(requiredMsg('Period'))
    .required(requiredMsg('Period')),
  Serial: yup.string().required(requiredMsg('em_graphic_serie_type')),
  Color: yup.string().required(requiredMsg('em_graphic_serie_color')),
  YAxis: yup
    .number()
    .typeError(requiredMsg('em_y_axis_nr'))
    .required(requiredMsg('em_y_axis_nr')),
  Description: yup.string().required(requiredMsg('firm_description')),
});

// Weather info detail validation
export const weatherInfoDetailValidation = yup.object({
  CityId: yup
    .number()
    .typeError(requiredMsg('em_weather_location'))
    .required(requiredMsg('em_weather_location')),
  AggregationType: yup
    .number()
    .typeError(requiredMsg('Label'))
    .required(requiredMsg('Label')),
  LabelId: yup
    .number()
    .typeError(requiredMsg('em_calculation'))
    .required(requiredMsg('em_calculation')),
  Serial: yup.string().required(requiredMsg('em_graphic_serie_type')),
  color: yup.string().required(requiredMsg('em_graphic_serie_color')),
  YAxis: yup
    .number()
    .typeError(requiredMsg('em_y_axis_nr'))
    .required(requiredMsg('em_y_axis_nr')),
  Description: yup.string().required(requiredMsg('firm_description')),
});

// Default values for weather info
export const weatherInfoDetailDefaultValues = {
  CityId: '',
  AggregationType: '',
  LabelId: '',
  Serial: '',
  color: '#000000',
  YAxis: '',
  Description: '',
};

export const addPlantTrendAnalysisProfileInitialValues = {
  profileName: '',
  reportType: 'plants-trend-analysis',
  filterProfileFields: [
    {
      fieldName: 'Date',
      fieldType: 3,
      fieldValue: '',
      filterProfileId: 0,
    },
    {
      fieldName: 'PeriodType',
      fieldType: 4,
      fieldValue: 'Daily',
      filterProfileId: 0,
    },
    {
      fieldName: 'Label',
      fieldType: 2,
      fieldValue: '0',
      filterProfileId: 0,
    },
    {
      fieldName: 'SelectedGraphs', // 1;2;3
      fieldType: 4,
      fieldValue: [],
      filterProfileId: 0,
    },
    {
      fieldName: 'SelectedDevices', // "ProductionComparison;HeatMap;ProductionForecast;InstantValue;SensorData"
      fieldType: 4,
      fieldValue: [],
      filterProfileId: 0,
    },
  ],
};
