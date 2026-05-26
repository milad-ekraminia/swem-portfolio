import { getTranslatedValue } from '@/helpers/get-translated-value';
import * as yup from 'yup';

export const deviceCategoriesInitialValues = {
  categoryName: '',
  categoryDescription: '',
  active: true,
};

export const deviceCategoriesResolver = yup.object({
  categoryName: yup
    .string()
    .required(
      `${getTranslatedValue('CategoryName')} ${getTranslatedValue(
        'Required',
        'AbpIdentity.texts',
      )}`,
    ),
  categoryDescription: yup.string().nullable(),
  active: yup.boolean().required(),
});

export type deviceCategoriesInitialValuesTypes = yup.InferType<
  typeof deviceCategoriesResolver
>;
