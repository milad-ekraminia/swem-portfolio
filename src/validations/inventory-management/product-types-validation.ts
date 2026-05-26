import { getTranslatedValue } from '@/helpers/get-translated-value';
import * as yup from 'yup';

export const productTypeValidations = yup.object({
  name: yup
    .string()
    .required(
      `${getTranslatedValue('ProductType')} ${getTranslatedValue('Name')} ${getTranslatedValue('Required', 'AbpIdentity.texts')}`,
    ),
  description: yup
    .string()
    .required(
      `${getTranslatedValue('ProductType')} ${getTranslatedValue('Description')} ${getTranslatedValue('Required', 'AbpIdentity.texts')}`,
    ),
  productUnitId: yup
    .number()
    .required(
      `${getTranslatedValue('ProductUnit')} ${getTranslatedValue('Required', 'AbpIdentity.texts')}`,
    ),
});
