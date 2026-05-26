import { getTranslatedValue } from '@/helpers/get-translated-value';
import * as yup from 'yup';

export const productBrandModelsValidations = yup.object({
  modelName: yup
    .string()
    .required(
      `${getTranslatedValue('ProductBrandModel')} ${getTranslatedValue(
        'Name',
      )} ${getTranslatedValue('Required', 'AbpIdentity.texts')}`,
    ),
  productBrandId: yup
    .number()
    .required(
      `${getTranslatedValue('ProductBrand')} ${getTranslatedValue(
        'Required',
        'AbpIdentity.texts',
      )}`,
    ),
});
