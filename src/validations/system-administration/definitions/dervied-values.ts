import { getTranslatedValue } from '@/helpers/get-translated-value';
import * as yup from 'yup';
import { DerivedValueFormData } from '@/types/pages/system-administration/definitions/derived-values';

export const derivedValueInitialValues: DerivedValueFormData = {
  active: true,
  dvDescription: '',
  dvRecordValue: 1,
  dvThresholdTime: 1,
  dvThresholdTimeUnit: 1,
  dvFormula: '',
  derivedValueParametersDetails: [],
};

export const derivedValueFormValidation = yup.object({
  active: yup.boolean().required(),
  dvDescription: yup
    .string()
    .required(
      `${getTranslatedValue('Description')} ${getTranslatedValue('Required', 'AbpIdentity.texts')}`,
    ),
  dvRecordValue: yup.number().nullable(),
  dvThresholdTime: yup.number().nullable(),
  dvThresholdTimeUnit: yup.number().nullable(),
  dvFormula: yup
    .string()
    .required(
      `${getTranslatedValue('em_derived_value_formula')} ${getTranslatedValue('Required', 'AbpIdentity.texts')}`,
    ),
});
