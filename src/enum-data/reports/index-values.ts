import { getTranslatedValue } from '@/helpers/get-translated-value';
import { CheckboxGroup } from '@/types/pages/reports/reports';

export const reportsIndexValuesCheckBoxOptions: CheckboxGroup[] = [
  {
    id: 'ActiveCons',
    label: getTranslatedValue('ActiveCons'),
    values: [
      { title: 'T1', fieldName: 'indActive1Imp' },
      { title: 'T1-1', fieldName: 'indActive1T1Imp' },
      { title: 'T1-2', fieldName: 'indActive1T2Imp' },
      { title: 'T1-3', fieldName: 'indActive1T3Imp' },
      // { title: "T1-4", fieldName: "indActive1T4Imp" },
      { title: 'T2', fieldName: 'indActive2Imp' },
    ],
  },
  {
    id: 'ActiveProd',
    label: getTranslatedValue('ActiveProd'),
    values: [
      { title: 'T1', fieldName: 'calculatedIndActive1Exp' },
      { title: 'T1-1', fieldName: 'calculatedIndActive1T1Exp' },
      { title: 'T1-2', fieldName: 'calculatedIndActive1T2Exp' },
      { title: 'T1-3', fieldName: 'calculatedIndActive1T3Exp' },
      { title: 'T2', fieldName: 'calculatedIndActive2Exp' },
    ],
  },
  {
    id: 'TotalInduc',
    label: getTranslatedValue('TotalInduc'),
    values: [
      { title: 'T1', fieldName: 'indReactive1Imp' },
      { title: 'T1-1', fieldName: 'indReactive1T1Imp' },
      { title: 'T1-2', fieldName: 'indReactive1T2Imp' },
      { title: 'T1-3', fieldName: 'indReactive1T3Imp' },
      { title: 'T2', fieldName: 'indReactive2Imp' },
    ],
  },
  {
    id: 'TotalCap',
    label: getTranslatedValue('TotalCap'),
    values: [
      { title: 'T1', fieldName: 'indReactive1Exp' },
      { title: 'T1-1', fieldName: 'indReactive1T1Exp' },
      { title: 'T1-2', fieldName: 'indReactive1T2Exp' },
      { title: 'T1-3', fieldName: 'indReactive1T3Exp' },
      { title: 'T2', fieldName: 'indReactive2Exp' },
    ],
  },
  {
    id: 'InductCons',
    label: getTranslatedValue('InductCons'),
    values: [
      { title: 'T1', fieldName: 'indReactiveInd1Imp' },
      { title: 'T1-1', fieldName: 'indReactiveInd1T1Imp' },
      { title: 'T1-2', fieldName: 'indReactiveInd1T2Imp' },
      { title: 'T1-3', fieldName: 'indReactiveInd1T3Imp' },
      { title: 'T2', fieldName: 'indReactiveInd2Imp' },
    ],
  },
  {
    id: 'InductProd',
    label: getTranslatedValue('InductProd'),
    values: [
      { title: 'T1', fieldName: 'indReactiveInd1Exp' },
      { title: 'T1-1', fieldName: 'indReactiveInd1T1Exp' },
      { title: 'T1-2', fieldName: 'indReactiveInd1T2Exp' },
      { title: 'T1-3', fieldName: 'indReactiveInd1T3Exp' },
      { title: 'T2', fieldName: 'indReactiveInd2Exp' },
    ],
  },
  {
    id: 'CapCons',
    label: getTranslatedValue('CapCons'),
    values: [
      { title: 'T1', fieldName: 'indReactiveCap1Imp' },
      { title: 'T1-1', fieldName: 'indReactiveCap1T1Imp' },
      { title: 'T1-2', fieldName: 'indReactiveCap1T2Imp' },
      { title: 'T1-3', fieldName: 'indReactiveCap1T3Imp' },
      { title: 'T2', fieldName: 'indReactiveCap2Imp' },
    ],
  },

  {
    id: 'CapProd',
    label: getTranslatedValue('CapProd'),
    values: [
      { title: 'T1', fieldName: 'indReactiveCap1Exp' },
      { title: 'T1-1', fieldName: 'indReactiveCap1T1Exp' },
      { title: 'T1-2', fieldName: 'indReactiveCap1T2Exp' },
      { title: 'T1-3', fieldName: 'indReactiveCap1T3Exp' },
      { title: 'T2', fieldName: 'indReactiveCap2Exp' },
    ],
  },
  {
    id: 'ActiveCons2',
    label: getTranslatedValue('ActiveCons'),
    values: [{ title: 'T1-4', fieldName: 'indActive1T4Imp' }],
  },
  {
    id: 'BaseActiveProd',
    label: getTranslatedValue('BaseActiveProd'),
    values: [
      { title: 'T1', fieldName: 'indActive1Exp' },
      { title: 'T1-1', fieldName: 'indActive1T1Exp' },
      { title: 'T1-2', fieldName: 'indActive1T2Exp' },
      { title: 'T1-3', fieldName: 'indActive1T3Exp' },
      { title: 'T2', fieldName: 'indActive2Exp' },
    ],
  },
];
