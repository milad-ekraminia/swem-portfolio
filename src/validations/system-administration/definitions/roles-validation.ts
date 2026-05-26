import { getTranslatedValue } from '@/helpers/get-translated-value';
import * as yup from 'yup';

export const roleInitialValues = {
  name: '',
  isDefault: false,
  isPublic: false,
};

export const roleResolver = yup.object({
  name: yup
    .string()
    .required(
      `${getTranslatedValue('RoleName', 'AbpIdentity.texts')} ${getTranslatedValue('Required', 'AbpIdentity.texts')}`,
    ),
  isDefault: yup.boolean().required(),
  isPublic: yup.boolean().required(),
});

export type roleValuesTypes = yup.InferType<typeof roleResolver>;
