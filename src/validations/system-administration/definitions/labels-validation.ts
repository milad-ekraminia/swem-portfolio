import { getTranslatedValue } from '@/helpers/get-translated-value';
import * as yup from 'yup';

export const deviceTypeLabelInitialValues = {
  deviceTypeId: null,
};

export const deviceTypeLabelSchema = yup.object({
  deviceTypeId: yup
    .number()
    .nullable()
    .test(
      'not null deviceTypeId',
      getTranslatedValue('Required', 'AbpIdentity.texts'),
      (value) => value !== null,
    ),
});

export type deviceTypeLabelSchemaType = yup.InferType<
  typeof deviceTypeLabelSchema
>;

export const labelsInitialValues = {
  active: true,
  labelName: '',
  labelCode: '',
  labelGroup: '',
  labelDataTypeId: 0,
  alarmDefinitionFlag: 1,
  hasFlagValue: 1,
  definitionFlag: true,
  hasFlag: true,
  deviceTypeLabelList: [],
};

export const labelsResolver = yup.object({
  active: yup.boolean(),
  labelName: yup
    .string()
    .required(
      `${getTranslatedValue('LabelName')} ${getTranslatedValue('Required', 'AbpIdentity.texts')}`,
    )
    .max(
      100,
      `${getTranslatedValue('LabelName')} ${getTranslatedValue('MaxLength', 'AbpIdentity.texts')}`,
    ),
  labelCode: yup
    .string()
    .required(
      `${getTranslatedValue('LabelCode')} ${getTranslatedValue('Required', 'AbpIdentity.texts')}`,
    )
    .max(
      50,
      `${getTranslatedValue('LabelCode')} ${getTranslatedValue('MaxLength', 'AbpIdentity.texts')}`,
    ),
  labelGroup: yup
    .string()
    .required(
      `${getTranslatedValue('LabelGroup')} ${getTranslatedValue('Required', 'AbpIdentity.texts')}`,
    )
    .max(
      100,
      `${getTranslatedValue('LabelGroup')} ${getTranslatedValue('MaxLength', 'AbpIdentity.texts')}`,
    ),
  labelDataTypeId: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value)),
  definitionFlag: yup.boolean(),
  hasFlag: yup.boolean(),
  deviceTypeLabelList: yup.array().of(yup.number()),
});

export type labelsInitialValuesTypes = yup.InferType<typeof labelsResolver>;
