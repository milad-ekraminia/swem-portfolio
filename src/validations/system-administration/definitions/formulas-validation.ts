import { getTranslatedValue } from '@/helpers/get-translated-value';
import * as yup from 'yup';

export const formulasInitialValues = {
  active: true,
  formulaName: '',
  formulaType: undefined,
  formulaMultiplier: 1.0,
  formulaInputMinimum: 4.0,
  formulaInputMaximum: 20.0,
  formulaOutputMinimum: 0.0,
  formulaOutputMaximum: 10.0,
};

export const formulasResolver = yup.object({
  active: yup.boolean(),
  formulaName: yup
    .string()
    .required(
      `${getTranslatedValue('FormulaName')} ${getTranslatedValue(
        'Required',
        'AbpIdentity.texts',
      )}`,
    ),
  formulaType: yup
    .number()
    .nullable()
    .test(
      'not null formulaTyper',
      getTranslatedValue('Required', 'AbpIdentity.texts'),
      (value) => value !== null,
    ),
  accessPointCommType: yup
    .number()
    .nullable()
    .test(
      'not null accessPointCommType',
      getTranslatedValue('Required', 'AbpIdentity.texts'),
      (value) => value !== null,
    ),
  formulaMultiplier: yup
    .number()
    .nullable()
    .test(
      'not null formulaMultiplier',
      getTranslatedValue('Required', 'AbpIdentity.texts'),
      (value) => value !== null,
    ),
  formulaInputMinimum: yup
    .number()
    .nullable()
    .test(
      'not null formulaInputMinimum',
      getTranslatedValue('Required', 'AbpIdentity.texts'),
      (value) => value !== null,
    ),
  formulaInputMaximum: yup
    .number()
    .nullable()
    .test(
      'not null formulaInputMaximum',
      getTranslatedValue('Required', 'AbpIdentity.texts'),
      (value) => value !== null,
    )
    .test(
      'max-greater-than-min',
      getTranslatedValue('MinAllowedValue'),
      function (value) {
        const min = this.parent.formulaInputMinimum;
        if (typeof min === 'number' && typeof value === 'number') {
          return value > min;
        }
        return true; // Allow empty or undefined values
      },
    ),
  formulaOutputMinimum: yup
    .number()
    .nullable()
    .test(
      'not null formulaOutputMinimum',
      getTranslatedValue('Required', 'AbpIdentity.texts'),
      (value) => value !== null,
    ),
  formulaOutputMaximum: yup
    .number()
    .nullable()
    .test(
      'not null formulaOutputMaximum',
      getTranslatedValue('Required', 'AbpIdentity.texts'),
      (value) => value !== null,
    )
    .test(
      'max-greater-than-min',
      getTranslatedValue('MinAllowedValue'),
      function (value) {
        const min = this.parent.formulaOutputMinimum;
        if (typeof min === 'number' && typeof value === 'number') {
          return value > min;
        }
        return true; // Allow empty or undefined values
      },
    ),
});

export type formulasInitialValuesTypes = yup.InferType<typeof formulasResolver>;
