import { getTranslatedValue } from '../get-translated-value';

export const invoicingList = (errors: any) => [
  {
    id: 1,
    name: 'electricity_invoice_method',
    label: getTranslatedValue('electricity_invoice_method'),
    placeholder: getTranslatedValue('electricity_invoice_method'),
    options: [
      { title: getTranslatedValue('InvoicingMethod1'), value: 1 },
      { title: getTranslatedValue('InvoicingMethod2'), value: 2 },
      { title: getTranslatedValue('InvoicingMethod3'), value: 3 },
    ],
    error: errors?.electricity_invoice_method?.message,
  },
  {
    id: 2,
    isNumberInput: true,
    name: 'index_finding_day_treshold',
    label: getTranslatedValue('index_finding_day_treshold'),
    placeholder: getTranslatedValue('index_finding_day_treshold'),
    error: errors?.index_finding_day_treshold?.message,
  },
  {
    id: 3,
    isNumberInput: true,
    name: 'device_energy_off_password',
    label: getTranslatedValue('device_energy_off_password'),
    placeholder: getTranslatedValue('device_energy_off_password'),
    error: errors?.device_energy_off_password?.message,
  },
  {
    id: 4,
    isNumberInput: true,
    name: 'device_energy_on_password',
    label: getTranslatedValue('device_energy_on_password'),
    placeholder: getTranslatedValue('device_energy_on_password'),
    error: errors?.device_energy_on_password?.message,
  },
  {
    id: 5,
    isNumberInput: true,
    name: 'cancel_invoice_charge_password',
    label: getTranslatedValue('cancel_invoice_charge_password'),
    placeholder: getTranslatedValue('cancel_invoice_charge_password'),
    error: errors?.cancel_invoice_charge_password?.message,
  },
];
