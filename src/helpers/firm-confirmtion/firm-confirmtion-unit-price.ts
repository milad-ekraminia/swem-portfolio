import { getTranslatedValue } from '../get-translated-value';

export const electricFormListUnitPrice = (errors: any) => [
  {
    isNumberInput: true,
    id: 1,
    name: 'electricity_unit_price',
    label: getTranslatedValue('electricity_unit_price'),
    placeholder: 0,
    error: errors?.electricity_unit_price?.message,
  },
  {
    isTextInput: true,
    id: 2,
    name: 'electricity_money_unit',
    label: getTranslatedValue('electricity_money_unit'),
    placeholder: 'TL',
    error: errors?.electricity_unit_price?.message,
  },
];

export const naturalGasFormListUnitPrice = (errors: any) => [
  {
    isNumberInput: true,
    id: 1,
    name: 'natural_gas_unit_price',
    label: getTranslatedValue('natural_gas_unit_price'),
    placeholder: 0,
    error: errors?.natural_gas_unit_price?.message,
  },
  {
    isTextInput: true,
    id: 2,
    name: 'natural_gas_money_unit',
    label: getTranslatedValue('natural_gas_money_unit'),
    placeholder: 'TL',
    error: errors?.natural_gas_money_unit?.message,
  },
];

export const waterFormListUnitPrice = (errors: any) => [
  {
    isNumberInput: true,
    id: 1,
    name: 'water_unit_price',
    label: getTranslatedValue('water_unit_price'),
    placeholder: 0,
    error: errors?.water_unit_price?.message,
  },
  {
    isTextInput: true,
    id: 2,
    name: 'water_money_unit',
    label: getTranslatedValue('water_money_unit'),
    placeholder: 'TL',
    error: errors?.water_money_unit?.message,
  },
];

export const heatFormListUnitPrice = (errors: any) => [
  {
    isNumberInput: true,
    id: 1,
    name: 'heat_unit_price',
    label: getTranslatedValue('heat_unit_price'),
    placeholder: 0,
    error: errors?.heat_unit_price?.message,
  },
  {
    isTextInput: true,
    id: 2,
    name: 'heat_money_unit',
    label: getTranslatedValue('heat_money_unit'),
    placeholder: 'TL',
    error: errors?.heat_money_unit?.message,
  },
];

export const energyFormListUnitPrice = (errors: any) => [
  {
    isNumberInput: true,
    id: 1,
    name: 'flow_meter_unit_price',
    label: getTranslatedValue('flow_meter_unit_price'),
    placeholder: 0,
    error: errors?.flow_meter_unit_price?.message,
  },
  {
    isTextInput: true,
    id: 2,
    name: 'flow_meter_money_unit',
    label: getTranslatedValue('flow_meter_money_unit'),
    placeholder: 'TL',
    error: errors?.flow_meter_money_unit?.message,
  },
];
