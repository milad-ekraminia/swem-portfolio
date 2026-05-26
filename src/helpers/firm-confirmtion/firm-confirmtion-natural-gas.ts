import { getTranslatedValue } from '../get-translated-value';

export const naturalGasList = (errors: any) => [
  {
    isNumberInput: true,
    id: 1,
    name: 'k_factor_21_mbar',
    label: getTranslatedValue('k_factor_21_mbar'),
    placeholder: 0,
    error: errors?.k_factor_21_mbar?.message,
  },
  {
    isNumberInput: true,
    id: 2,
    name: 'k_factor_100_mbar',
    label: getTranslatedValue('k_factor_100_mbar'),
    placeholder: '0',
    error: errors?.k_factor_100_mbar?.message,
  },
  {
    isNumberInput: true,
    id: 3,
    name: 'k_factor_300_mbar',
    label: getTranslatedValue('k_factor_300_mbar'),
    placeholder: '0',
    error: errors?.k_factor_300_mbar?.message,
  },
  {
    isNumberInput: true,
    id: 4,
    name: 'monthly_average_calorific_value',
    label: getTranslatedValue('monthly_average_calorific_value'),
    placeholder: '0',
    error: errors?.monthly_average_calorific_value?.message,
  },
];
