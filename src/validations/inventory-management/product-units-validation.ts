import { getTranslatedValue } from '@/helpers/get-translated-value';
import * as yup from 'yup';

export const productUnitFormValidation = yup.object({
  name: yup
    .string()
    .required(
      `${getTranslatedValue('ProductUnit')} ${getTranslatedValue('Name')} ${getTranslatedValue('Required', 'AbpIdentity.texts')}`,
    ),
});
