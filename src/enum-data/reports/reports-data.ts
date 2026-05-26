// enum ReportPeriodType {
//   None = 0,
//   Hourly = 1,
//   Daily = 2,
//   Monthly = 3,
// }

import {
  getEnumOptions,
  getEnumStringOptions,
} from '@/helpers/get-enum-options';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { CheckboxGroup } from '@/types/pages/reports/reports';

enum PeriodicReportPeridType {
  Hourly = 0,
  Daily = 1,
  Monthly = 2,
}
export const periodName = {
  0: 'Hourly',
  1: 'Daily',
  2: 'Monthly',
};

enum PhaseNoType {
  Total = 0,
  Phase1 = 1,
  Phase2 = 2,
  Phase3 = 3,
}

// export const periodOptions = getEnumOptions(ReportPeriodType);
export const periodOptions = () => [
  // {
  //   value: 0,
  //   title: getTranslatedValue('Enum:ReportPeriodType.None'),
  // },
  {
    value: '1',
    title: getTranslatedValue('Enum:ReportPeriodType.Hourly'),
  },
  {
    value: '2',
    title: getTranslatedValue('Enum:ReportPeriodType.Daily'),
  },
  {
    value: '3',
    title: getTranslatedValue('Enum:ReportPeriodType.Monthly'),
  },
];

export const periodOptionsWithNone = () => [
  {
    value: '0',
    title: getTranslatedValue('Enum:ReportPeriodType.None'),
  },
  {
    value: '1',
    title: getTranslatedValue('Enum:ReportPeriodType.Hourly'),
  },
  {
    value: '2',
    title: getTranslatedValue('Enum:ReportPeriodType.Daily'),
  },
  {
    value: '3',
    title: getTranslatedValue('Enum:ReportPeriodType.Monthly'),
  },
];

// MODIFIED PERIOD TYPE
// export const periodicReportPeriodOptions = getEnumOptions(PeriodicReportPeridType);
export const periodicReportPeriodOptions = getEnumStringOptions(
  PeriodicReportPeridType,
);

export const phaseNoOptions = getEnumOptions(PhaseNoType);

export const hourRangeOptions = Array.from({ length: 24 }, (_, i) => ({
  value: i.toString(),
  title: `${i.toString().padStart(2, '0')}`,
}));

export const getReportsCheckBoxOptions = (): CheckboxGroup[] => [
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
    id: 'inductCons',
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
    id: 'inductProd',
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
    id: 'ExtraInformation',
    label: getTranslatedValue('ExtraInformation'),
    values: [
      {
        title: getTranslatedValue('InductiveRate'),
        fieldName: 'inductiveRate',
      },
      {
        title: getTranslatedValue('CapacitiveRate'),
        fieldName: 'capacitiveRate',
      },
      {
        title: getTranslatedValue('em_active_power_import_short'),
        fieldName: 'indActivePowImp',
      },
      {
        title: getTranslatedValue('em_active_power_export_short'),
        fieldName: 'indActivePowExp',
      },
    ],
  },
];

// export const reportsCheckBoxOptions: CheckboxGroup[] = [
//   {
//     id: 'ActiveCons',
//     label: getTranslatedValue('ActiveCons'),
//     values: [
//       { title: 'T1', fieldName: 'indActive1Imp' },
//       { title: 'T1-1', fieldName: 'indActive1T1Imp' },
//       { title: 'T1-2', fieldName: 'indActive1T2Imp' },
//       { title: 'T1-3', fieldName: 'indActive1T3Imp' },
//       // { title: "T1-4", fieldName: "indActive1T4Imp" },
//       { title: 'T2', fieldName: 'indActive2Imp' },
//     ],
//   },
//   {
//     id: 'ActiveProd',
//     label: getTranslatedValue('ActiveProd'),
//     values: [
//       { title: 'T1', fieldName: 'calculatedIndActive1Exp' },
//       { title: 'T1-1', fieldName: 'calculatedIndActive1T1Exp' },
//       { title: 'T1-2', fieldName: 'calculatedIndActive1T2Exp' },
//       { title: 'T1-3', fieldName: 'calculatedIndActive1T3Exp' },
//       { title: 'T2', fieldName: 'calculatedIndActive2Exp' },
//     ],
//   },
//   {
//     id: 'TotalInduc',
//     label: getTranslatedValue('TotalInduc'),
//     values: [
//       { title: 'T1', fieldName: 'indReactive1Imp' },
//       { title: 'T1-1', fieldName: 'indReactive1T1Imp' },
//       { title: 'T1-2', fieldName: 'indReactive1T2Imp' },
//       { title: 'T1-3', fieldName: 'indReactive1T3Imp' },
//       { title: 'T2', fieldName: 'indReactive2Imp' },
//     ],
//   },
//   {
//     id: 'TotalCap',
//     label: getTranslatedValue('TotalCap'),
//     values: [
//       { title: 'T1', fieldName: 'indReactive1Exp' },
//       { title: 'T1-1', fieldName: 'indReactive1T1Exp' },
//       { title: 'T1-2', fieldName: 'indReactive1T2Exp' },
//       { title: 'T1-3', fieldName: 'indReactive1T3Exp' },
//       { title: 'T2', fieldName: 'indReactive2Exp' },
//     ],
//   },
//   {
//     id: 'inductCons',
//     label: getTranslatedValue('InductCons'),
//     values: [
//       { title: 'T1', fieldName: 'indReactiveInd1Imp' },
//       { title: 'T1-1', fieldName: 'indReactiveInd1T1Imp' },
//       { title: 'T1-2', fieldName: 'indReactiveInd1T2Imp' },
//       { title: 'T1-3', fieldName: 'indReactiveInd1T3Imp' },
//       { title: 'T2', fieldName: 'indReactiveInd2Imp' },
//     ],
//   },
//   {
//     id: 'inductProd',
//     label: getTranslatedValue('InductProd'),
//     values: [
//       { title: 'T1', fieldName: 'indReactiveInd1Exp' },
//       { title: 'T1-1', fieldName: 'indReactiveInd1T1Exp' },
//       { title: 'T1-2', fieldName: 'indReactiveInd1T2Exp' },
//       { title: 'T1-3', fieldName: 'indReactiveInd1T3Exp' },
//       { title: 'T2', fieldName: 'indReactiveInd2Exp' },
//     ],
//   },
//   {
//     id: 'CapCons',
//     label: getTranslatedValue('CapCons'),
//     values: [
//       { title: 'T1', fieldName: 'indReactiveCap1Imp' },
//       { title: 'T1-1', fieldName: 'indReactiveCap1T1Imp' },
//       { title: 'T1-2', fieldName: 'indReactiveCap1T2Imp' },
//       { title: 'T1-3', fieldName: 'indReactiveCap1T3Imp' },
//       { title: 'T2', fieldName: 'indReactiveCap2Imp' },
//     ],
//   },
//   {
//     id: 'CapProd',
//     label: getTranslatedValue('CapProd'),
//     values: [
//       { title: 'T1', fieldName: 'indReactiveCap1Exp' },
//       { title: 'T1-1', fieldName: 'indReactiveCap1T1Exp' },
//       { title: 'T1-2', fieldName: 'indReactiveCap1T2Exp' },
//       { title: 'T1-3', fieldName: 'indReactiveCap1T3Exp' },
//       { title: 'T2', fieldName: 'indReactiveCap2Exp' },
//     ],
//   },
//   {
//     id: 'ExtraInformation',
//     label: getTranslatedValue('ExtraInformation'),
//     values: [
//       {
//         title: getTranslatedValue('InductiveRate'),
//         fieldName: 'inductiveRate',
//       },
//       {
//         title: getTranslatedValue('CapacitiveRate'),
//         fieldName: 'capacitiveRate',
//       },
//       {
//         title: getTranslatedValue('em_active_power_import_short'),
//         fieldName: 'indActivePowImp',
//       },
//       {
//         title: getTranslatedValue('em_active_power_export_short'),
//         fieldName: 'indActivePowExp',
//       },
//     ],
//   },
// ];

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

export const reportsElecProdConsExtraCheckBoxOptions: CheckboxGroup[] = [
  {
    id: 'ExtraInformation',
    label: getTranslatedValue('ExtraInformation'),
    values: [
      {
        title: getTranslatedValue('inductiveRate'),
        fieldName: 'inductiveRate',
      },
      {
        title: getTranslatedValue('CapacitiveRate'),
        fieldName: 'capacitiveRate',
      },
    ],
  },
];

export const reportsInverterInstantCheckBoxOptions: CheckboxGroup[] = [
  {
    id: 'Voltage', // Voltage
    label: getTranslatedValue('em_instant_voltage'),
    values: [
      { title: getTranslatedValue('Avg'), fieldName: 'invACVoltAvg' },
      { title: getTranslatedValue('phase_1'), fieldName: 'invACVoltPhase1' },
      { title: getTranslatedValue('phase_2'), fieldName: 'invACVoltPhase2' },
      { title: getTranslatedValue('phase_3'), fieldName: 'invACVoltPhase3' },
    ],
  },
  {
    id: 'em_instant_voltage_line_line', // Voltage (Line-Line)
    label: getTranslatedValue('em_instant_voltage_line_line'),
    values: [
      { title: getTranslatedValue('LLAvg'), fieldName: 'invACVoltLLAvg' },
      { title: getTranslatedValue('LL12'), fieldName: 'invACVoltLL12' },
      { title: getTranslatedValue('LL23'), fieldName: 'invACVoltLL23' },
      { title: getTranslatedValue('LL31'), fieldName: 'invACVoltLL31' },
    ],
  },
  {
    id: 'em_instant_current', // Current
    label: getTranslatedValue('em_instant_current'),
    values: [
      {
        title: getTranslatedValue('Enum:PhaseNoType.Total'),
        fieldName: 'invACCurTotal',
      },
      {
        title: getTranslatedValue('Enum:PhaseNoType.Phase1'),
        fieldName: 'invACCurPhase1',
      },
      {
        title: getTranslatedValue('Enum:PhaseNoType.Phase2'),
        fieldName: 'invACCurPhase2',
      },
      {
        title: getTranslatedValue('Enum:PhaseNoType.Phase3'),
        fieldName: 'invACCurPhase3',
      },
    ],
  },
  {
    id: 'em_instant_dc_voltage', // DC Voltage
    label: getTranslatedValue('em_instant_dc_voltage'),
    values: [
      {
        title: 1,
        fieldName: 'invDCVoltPhase1',
      },
      {
        title: 2,
        fieldName: 'invDCVoltPhase2',
      },
      {
        title: 3,
        fieldName: 'invDCVoltPhase3',
      },
      {
        title: 4,
        fieldName: 'invDCVoltPhase4',
      },
    ],
  },
  {
    id: 'em_instant_dc_current', // DC Current
    label: getTranslatedValue('em_instant_dc_current'),
    values: [
      {
        title: 1,
        fieldName: 'invDCCurrPhase1',
      },
      {
        title: 2,
        fieldName: 'invDCCurrPhase2',
      },
      {
        title: 3,
        fieldName: 'invDCCurrPhase3',
      },
      {
        title: 4,
        fieldName: 'invDCCurrPhase4',
      },
    ],
  },
  {
    id: 'instantTemp', // Instant Temp.
    label: getTranslatedValue('InstantTemp'),
    values: [
      {
        title: getTranslatedValue('InnerTemp'),
        fieldName: 'invInnerTemperature',
      },
      {
        title: getTranslatedValue('HeatsinkTemp'),
        fieldName: 'invHeatSinkTemperature',
      },
      {
        title: getTranslatedValue('TransformerTemp'),
        fieldName: 'invTransformerTemperature',
      },
      {
        title: getTranslatedValue('OtherTemp'),
        fieldName: 'invOtherTemperature',
      },
    ],
  },
  {
    id: 'em_instant_string_current', // String Current
    label: getTranslatedValue('em_instant_string_current'),
    values: [
      {
        title: 1,
        fieldName: 'invStringCurrPhase1',
      },
      {
        title: 2,
        fieldName: 'invStringCurrPhase2',
      },
      {
        title: 3,
        fieldName: 'invStringCurrPhase3',
      },
      {
        title: 4,
        fieldName: 'invStringCurrPhase4',
      },
    ],
  },
  {
    id: 'ActivePowerWUnit', // Active Power
    label: getTranslatedValue('ActivePowerWUnit'),
    values: [
      { title: getTranslatedValue('total'), fieldName: 'invACActPowerTotal' },
      { title: getTranslatedValue('DCTotal'), fieldName: 'invDCActPowerTotal' },
      {
        title: getTranslatedValue('em_instant_reactive_power'),
        fieldName: 'invACReactPowerTotal',
      },
      {
        title: getTranslatedValue('em_instant_apperant_power'),
        fieldName: 'invACApperantPowerTotal',
      },
      {
        title: getTranslatedValue('em_instant_power_factor'),
        fieldName: 'invACPowerFactorAvg',
      },
      { title: getTranslatedValue('em_instant_cos'), fieldName: 'invACCosAvg' },
      {
        title: getTranslatedValue('em_instant_frequency'),
        fieldName: 'invACFrequency',
      },
      {
        title: getTranslatedValue('CurrentDayProd'),
        fieldName: 'invCurrentDayProduction',
      },
      {
        title: getTranslatedValue('WorkingTime'),
        fieldName: 'invWorkingTotalHour',
      },
      {
        title: getTranslatedValue('InvStatus'),
        fieldName: 'invStatus',
      },
      {
        title: getTranslatedValue('ProdStatus'),
        fieldName: 'invManStatus',
      },
    ],
  },
];

export const reportsProductionConsumptionsCheckBoxOptions: CheckboxGroup[] = [
  {
    id: 'ActiveCons',
    label: getTranslatedValue('ActiveCons'),
    values: [
      { title: 'T1', fieldName: 'indActive1Imp' },
      { title: 'T1-1', fieldName: 'indActive1T1Imp' },
      { title: 'T1-2', fieldName: 'indActive1T2Imp' },
      { title: 'T1-3', fieldName: 'indActive1T3Imp' },
      { title: 'T2', fieldName: 'indActive2Imp' },
    ],
  },
  {
    id: 'ActiveProd',
    label: getTranslatedValue('ActiveProd'),
    values: [
      { title: 'T1', fieldName: 'indActive1Exp' },
      { title: 'T1-1', fieldName: 'indActive1T1Exp' },
      { title: 'T1-2', fieldName: 'indActive1T2Exp' },
      { title: 'T1-3', fieldName: 'indActive1T3Exp' },
      { title: 'T2', fieldName: 'indActive2Exp' },
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
    id: 'inductCons',
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
    id: 'inductProd',
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
    id: 'ExtraInformation',
    label: getTranslatedValue('ExtraInformation'),
    values: [
      {
        title: getTranslatedValue('InductiveRate'),
        fieldName: 'inductiveRate',
      },
      {
        title: getTranslatedValue('CapacitiveRate'),
        fieldName: 'capacitiveRate',
      },
    ],
  },
];

export const reportsCalculatedIndexExtraCheckBoxOptions: CheckboxGroup[] = [
  {
    id: 'BaseActiveProd',
    label: getTranslatedValue('BaseActiveProd'),
    values: [
      {
        title: 'T1',
        fieldName: 'calculatedIndActive1Exp',
      },
      {
        title: 'T1-1',
        fieldName: 'calculatedIndActive1T1Exp',
      },
      {
        title: 'T1-2',
        fieldName: 'calculatedIndActive1T2Exp',
      },
      {
        title: 'T1-3',
        fieldName: 'calculatedIndActive1T3Exp',
      },
      {
        title: 'T2',
        fieldName: 'calculatedIndActive2Exp',
      },
    ],
  },
];

export const allPeriodicElecProductionConsumptionReportsFieldNames = [
  // From reportsCheckBoxOptions
  'indActive1Imp',
  'indActive1T1Imp',
  'indActive1T2Imp',
  'indActive1T3Imp',
  'indActive2Imp',
  'indActive1Exp',
  'indActive1T1Exp',
  'indActive1T2Exp',
  'indActive1T3Exp',
  'indActive2Exp',
  'indReactive1Imp',
  'indReactive1T1Imp',
  'indReactive1T2Imp',
  'indReactive1T3Imp',
  'indReactive2Imp',
  'indReactive1Exp',
  'indReactive1T1Exp',
  'indReactive1T2Exp',
  'indReactive1T3Exp',
  'indReactive2Exp',
  'indReactiveInd1Imp',
  'indReactiveInd1T1Imp',
  'indReactiveInd1T2Imp',
  'indReactiveInd1T3Imp',
  'indReactiveInd2Imp',
  'indReactiveInd1Exp',
  'indReactiveInd1T1Exp',
  'indReactiveInd1T2Exp',
  'indReactiveInd1T3Exp',
  'indReactiveInd2Exp',
  'indReactiveCap1Imp',
  'indReactiveCap1T1Imp',
  'indReactiveCap1T2Imp',
  'indReactiveCap1T3Imp',
  'indReactiveCap2Imp',
  'indReactiveCap1Exp',
  'indReactiveCap1T1Exp',
  'indReactiveCap1T2Exp',
  'indReactiveCap1T3Exp',
  'indReactiveCap2Exp',

  // From reportsExtraCheckBoxOptions
  'inductiveRate',
  'capacitiveRate',
  'indActivePowImp',
  'indActivePowExp',
];

export const getReportsTableHeaders = [
  { title: 'OrganizationName', sort: 'OrganizationName' },
  { title: 'SubOrganizationName', sort: 'SubOrganization' },
  { title: 'AccessPointName', sort: 'AccessPointName' },
  { title: 'AccessPointIp', sort: 'AccessPointIp' },
  { title: 'AccessPointPort', sort: 'AccessPointPort' },
  { title: 'DeviceName', sort: 'DeviceDescription' },
  { title: 'ProtocolType', sort: 'Protocol' },
  { title: 'DeviceModelName', sort: 'DeviceModelName' },
  { title: 'LabelName', sort: 'LabelName' },
  { title: 'DeviceCommAddress', sort: 'DeviceCommAddress' },
  { title: 'FunctionType', sort: 'FunctionType' },
  { title: 'Address', sort: 'ModbusAddress' },
  { title: 'DataTypeName', sort: 'DataTypeName' },
  { title: 'TagReportDeviceSerialNr', sort: 'DeviceSerialNr' },
];

export const reportsInstantValuesCheckBoxOptions: CheckboxGroup[] = [
  {
    id: 'em_instant_voltage',
    label: getTranslatedValue('em_instant_voltage'),
    values: [
      { title: getTranslatedValue('Avg'), fieldName: 'insVoltAvg' },
      { title: getTranslatedValue('Phase1'), fieldName: 'insVoltPhase1' },
      { title: getTranslatedValue('Phase2'), fieldName: 'insVoltPhase2' },
      { title: getTranslatedValue('Phase3'), fieldName: 'insVoltPhase3' },
    ],
  },
  {
    id: 'em_instant_cos',
    label: getTranslatedValue('em_instant_cos'),
    values: [
      { title: getTranslatedValue('Avg'), fieldName: 'insCosAvg' },
      { title: getTranslatedValue('Phase1'), fieldName: 'insCosPhase1' },
      { title: getTranslatedValue('Phase2'), fieldName: 'insCosPhase2' },
      { title: getTranslatedValue('Phase3'), fieldName: 'insCosPhase3' },
    ],
  },
  {
    id: 'em_instant_voltage_line_line',
    label: getTranslatedValue('em_instant_voltage_line_line'),
    values: [
      {
        title: getTranslatedValue('LLAvg'),
        fieldName: 'insVoltLLAvg',
      },
      { title: getTranslatedValue('LL12'), fieldName: 'insVoltLL12' },
      { title: getTranslatedValue('LL23'), fieldName: 'insVoltLL23' },
      { title: getTranslatedValue('LL31'), fieldName: 'insVoltLL31' },
    ],
  },
  {
    id: 'em_instant_frequency',
    label: getTranslatedValue('em_instant_frequency'),
    values: [
      { title: getTranslatedValue('Total'), fieldName: 'insFrequency' },
      { title: getTranslatedValue('Phase1'), fieldName: 'insFrequencyPhase1' },
      { title: getTranslatedValue('Phase2'), fieldName: 'insFrequencyPhase2' },
      { title: getTranslatedValue('Phase3'), fieldName: 'insFrequencyPhase3' },
    ],
  },
  {
    id: 'em_instant_current',
    label: getTranslatedValue('em_instant_current'),
    values: [
      { title: getTranslatedValue('Total'), fieldName: 'insCurTotal' },
      { title: getTranslatedValue('Phase1'), fieldName: 'insCurPhase1' },
      { title: getTranslatedValue('Phase2'), fieldName: 'insCurPhase2' },
      { title: getTranslatedValue('Phase3'), fieldName: 'insCurPhase3' },
    ],
  },
  {
    id: 'noName',
    label: '',
    values: [
      {
        title: getTranslatedValue('NeutralCurrent'),
        fieldName: 'insCurNeutral',
      },
    ],
  },
  {
    id: 'em_instant_active_power',
    label: getTranslatedValue('em_instant_active_power'),
    values: [
      { title: getTranslatedValue('Total'), fieldName: 'insActPowerTotal' },
      { title: getTranslatedValue('Phase1'), fieldName: 'insActPowerPhase1' },
      { title: getTranslatedValue('Phase2'), fieldName: 'insActPowerPhase2' },
      { title: getTranslatedValue('Phase3'), fieldName: 'insActPowerPhase3' },
    ],
  },
  {
    id: 'em_instant_active_power_production',
    label: getTranslatedValue('em_instant_active_power_production'),
    values: [
      { title: getTranslatedValue('Total'), fieldName: 'insActPowerExpTotal' },
      {
        title: getTranslatedValue('Phase1'),
        fieldName: 'insActPowerExpPhase1',
      },
      {
        title: getTranslatedValue('Phase2'),
        fieldName: 'insActPowerExpPhase2',
      },
      {
        title: getTranslatedValue('Phase3'),
        fieldName: 'insActPowerExpPhase3',
      },
    ],
  },
  {
    id: 'em_instant_reactive_power',
    label: getTranslatedValue('em_instant_reactive_power'),
    values: [
      { title: getTranslatedValue('Total'), fieldName: 'insReactPowerTotal' },
      { title: getTranslatedValue('Phase1'), fieldName: 'insReactPowerPhase1' },
      { title: getTranslatedValue('Phase2'), fieldName: 'insReactPowerPhase2' },
      { title: getTranslatedValue('Phase3'), fieldName: 'insReactPowerPhase3' },
    ],
  },
  {
    id: 'em_instant_reactive_power_production',
    label: getTranslatedValue('em_instant_reactive_power_production'),
    values: [
      {
        title: getTranslatedValue('Total'),
        fieldName: 'insReactPowerExpTotal',
      },
      {
        title: getTranslatedValue('Phase1'),
        fieldName: 'insReactPowerExpPhase1',
      },
      {
        title: getTranslatedValue('Phase2'),
        fieldName: 'insReactPowerExpPhase2',
      },
      {
        title: getTranslatedValue('Phase3'),
        fieldName: 'insReactPowerExpPhase3',
      },
    ],
  },
  {
    id: 'em_instant_apperant_power',
    label: getTranslatedValue('em_instant_apperant_power'),
    values: [
      {
        title: getTranslatedValue('Total'),
        fieldName: 'insApperantPowerTotal',
      },
      {
        title: getTranslatedValue('Phase1'),
        fieldName: 'insApperantPowerPhase1',
      },
      {
        title: getTranslatedValue('Phase2'),
        fieldName: 'insApperantPowerPhase2',
      },
      {
        title: getTranslatedValue('Phase3'),
        fieldName: 'insApperantPowerPhase3',
      },
    ],
  },
  {
    id: 'em_instant_thd_voltage',
    label: getTranslatedValue('em_instant_thd_voltage'),
    values: [
      { title: getTranslatedValue('Total'), fieldName: 'insTHDVoltageTotal' },
      {
        title: getTranslatedValue('Phase1'),
        fieldName: 'insTHDVoltagePhase1',
      },
      {
        title: getTranslatedValue('Phase2'),
        fieldName: 'insTHDVoltagePhase2',
      },
      {
        title: getTranslatedValue('Phase3'),
        fieldName: 'insTHDVoltagePhase3',
      },
    ],
  },
  {
    id: 'em_instant_power_factor',
    label: getTranslatedValue('em_instant_power_factor'),
    values: [
      { title: getTranslatedValue('Avg'), fieldName: 'insPowerFactorAvg' },
      {
        title: getTranslatedValue('Phase1'),
        fieldName: 'insPowerFactorPhase1',
      },
      {
        title: getTranslatedValue('Phase2'),
        fieldName: 'insPowerFactorPhase2',
      },
      {
        title: getTranslatedValue('Phase3'),
        fieldName: 'insPowerFactorPhase3',
      },
    ],
  },
  {
    id: 'em_instant_thd_current',
    label: getTranslatedValue('em_instant_thd_current'),
    values: [
      { title: getTranslatedValue('Total'), fieldName: 'insTHDCurrentTotal' },
      { title: getTranslatedValue('Phase1'), fieldName: 'insTHDCurrentPhase1' },
      { title: getTranslatedValue('Phase2'), fieldName: 'insTHDCurrentPhase2' },
      { title: getTranslatedValue('Phase3'), fieldName: 'insTHDCurrentPhase3' },
    ],
  },
];

export const alarmStatusOptions = [
  {
    title: getTranslatedValue('All'),
    value: -1,
  },
  {
    title: getTranslatedValue('Enum:AlarmStatusType.Active'),
    value: 0,
  },
  {
    title: getTranslatedValue('Enum:AlarmStatusType.Finished'),
    value: 1,
  },
  {
    title: getTranslatedValue('Enum:AlarmStatusType.Cancelled'),
    value: 2,
  },
];

export const alarmApprovalOptions = [
  {
    title: getTranslatedValue('All'),
    value: -1,
  },
  {
    title: getTranslatedValue('Waiting'),
    value: 0,
  },
  {
    title: getTranslatedValue('Approved'),
    value: 1,
  },
];

export const alarmLevelOptions = [
  {
    title: getTranslatedValue('All'),
    value: -1,
  },
  {
    title: getTranslatedValue('alarm_level_1'),
    value: 1,
  },
  {
    title: getTranslatedValue('alarm_level_2'),
    value: 2,
  },
  {
    title: getTranslatedValue('alarm_level_3'),
    value: 3,
  },
  {
    title: getTranslatedValue('alarm_level_10'),
    value: 10,
  },
  {
    title: getTranslatedValue('alarm_level_100'),
    value: 100,
  },
];
export const alarmLevelMainOptions = [
  {
    title: getTranslatedValue('All'),
    value: -1,
  },
  {
    title: getTranslatedValue('alarm_level_1'),
    value: 1,
  },
  {
    title: getTranslatedValue('alarm_level_2'),
    value: 2,
  },
  {
    title: getTranslatedValue('alarm_level_3'),
    value: 3,
  },
];

export const alarmConfLevelOptions = {
  1: getTranslatedValue('Enum:AlarmLevelType.Warning'),
  2: getTranslatedValue('Enum:AlarmLevelType.Critical'),
  3: getTranslatedValue('Enum:AlarmLevelType.Dangerous'),
};
export const alarmStatusEnum = {
  0: getTranslatedValue('Enum:AlarmStatusType.Active'),
  1: getTranslatedValue('Enum:AlarmStatusType.Finished'),
  2: getTranslatedValue('Enum:AlarmStatusType.Cancelled'),
};

export const alarmApprovalEnum = {
  0: getTranslatedValue('Waiting'),
  1: getTranslatedValue('Approved'),
};
