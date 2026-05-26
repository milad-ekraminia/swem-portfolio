import { getTranslatedValue } from '@/helpers/get-translated-value';
import * as yup from 'yup';

export const productBrandFormValidation = yup.object({
  brandName: yup
    .string()
    .required(
      `${getTranslatedValue('BrandName')} ${getTranslatedValue('Required', 'AbpIdentity.texts')}`,
    ),
});
