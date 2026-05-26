import { getTranslatedValue } from '@/helpers/get-translated-value';
import * as yup from 'yup';

export const productManufacturersFormValidation = yup.object({
  manufacturerTitle: yup
    .string()
    .required(
      `${getTranslatedValue('ManufacturerTitle')} ${getTranslatedValue('Required', 'AbpIdentity.texts')}`,
    ),
});
