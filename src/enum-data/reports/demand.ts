import { getTranslatedValue } from '@/helpers/get-translated-value';
import { CheckboxGroup } from '@/types/pages/reports/reports';

export const demandDataReportFields: CheckboxGroup[] = [
  {
    id: 'Faz No',
    label: getTranslatedValue('em_phase_nr'),
    values: [
      { title: 'Toplam', fieldName: 'PhaseTotal' },
      { title: '1.Faz', fieldName: 'PhaseL1' },
      { title: '2.Faz', fieldName: 'PhaseL2' },
      { title: '3.Faz', fieldName: 'PhaseL3' },
    ],
  },
  {
    id: 'Akım',
    label: getTranslatedValue('em_demand_current'),
    values: [
      { title: 'Değer', fieldName: 'DemCurrent' },
      { title: 'Zaman', fieldName: 'DemCurrentDateTime' },
    ],
  },
  {
    id: 'Aktif Güç',
    label: getTranslatedValue('em_demand_active_power'),
    values: [
      { title: 'Değer', fieldName: 'DemActivePowImp' },
      { title: 'Zaman', fieldName: 'DemActivePowImpDateTime' },
    ],
  },
  {
    id: 'Görünür Güç',
    label: getTranslatedValue('em_demand_apperant_power'),
    values: [
      { title: 'Değer', fieldName: 'DemActivePowExp' },
      { title: 'Zaman', fieldName: 'DemActivePowExpDateTime' },
    ],
  },
  {
    id: 'Reaktif Güç',
    label: getTranslatedValue('em_demand_reactive_power'),
    values: [
      { title: 'Değer', fieldName: 'DemReactivePow' },
      { title: 'Zaman', fieldName: 'DemReactivePowDateTime' },
    ],
  },
];

export const SAMPLE_TABLE_DATA = [];
