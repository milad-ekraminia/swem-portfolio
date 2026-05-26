import { getTranslatedValue } from '@/helpers/get-translated-value';
import * as yup from 'yup';

export const mimicElementFormValidation = yup.object({
  active: yup.boolean().required(),
  mimicElementFileName: yup.string().when('mimicElementShowType', {
    is: (value: number) => value === 1 || value === 25 || value === 26,
    then: (schema) =>
      schema.required(
        `${getTranslatedValue('UploadElement')} ${getTranslatedValue('Required', 'AbpIdentity.texts')}`,
      ),
    otherwise: (schema) => schema.nullable(),
  }),
  mimicElementGroup: yup
    .string()
    .required(
      `${getTranslatedValue('MimicElementGroup')} ${getTranslatedValue('Required', 'AbpIdentity.texts')}`,
    ),
  mimicElementShowType: yup
    .number()
    .required(
      `${getTranslatedValue('MimicElementShowType')} ${getTranslatedValue('Required', 'AbpIdentity.texts')}`,
    ),
  uploadFolder: yup
    .string()
    // .oneOf(['mimic-elements', 'plant-images', 'plant-videos'])
    .required(
      `${getTranslatedValue('UploadFolder')} ${getTranslatedValue('Required', 'AbpIdentity.texts')}`,
    ),
  fileSelectionType: yup.string(),
  // check if fileSelectionType is single the mimicElementFileName filed is required
  mimicElementName: yup.string().when('fileSelectionType', {
    is: 'single',
    then: (schema) =>
      schema.required(
        `${getTranslatedValue('MimicElementName')} ${getTranslatedValue('Required', 'AbpIdentity.texts')}`,
      ),
    otherwise: (schema) => schema.nullable(),
  }),
  mimicElementDefaultElementId: yup.number().nullable(),
  mimicElementBitZeroElementId: yup.number().nullable(),
  mimicElementBitOneElementId: yup.number().nullable(),
  mimicElementBitZeroOneElementId: yup.number().nullable(),
  mimicElementBitOneZeroElementId: yup.number().nullable(),
});

export const mimicElementRelatedElementValidation = yup.object({
  id: yup.number().required(),
  componentCondition: yup
    .number()
    .nullable()
    .test(
      'not null componentCondition',
      getTranslatedValue('Required', 'AbpIdentity.texts'),
      (value) => value !== null,
    ),
  componentConditionEqual: yup
    .number()
    .nullable()
    .test(
      'not null componentConditionEqual',
      getTranslatedValue('Required', 'AbpIdentity.texts'),
      (value) => value !== null,
    ),
  componentConditionMinimum: yup
    .number()
    .nullable()
    .test(
      'not null componentConditionMinimum',
      getTranslatedValue('Required', 'AbpIdentity.texts'),
      (value) => value !== null,
    ),
  componentConditionMaximum: yup
    .number()
    .nullable()
    .test(
      'not null componentConditionMaximum',
      getTranslatedValue('Required', 'AbpIdentity.texts'),
      (value) => value !== null,
    ),
  conditionElementId: yup
    .number()
    .nullable()
    .test(
      'not null conditionElementId',
      getTranslatedValue('Required', 'AbpIdentity.texts'),
      (value) => value !== null,
    ),
});
