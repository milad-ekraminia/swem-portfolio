import { getTranslatedValue } from '@/helpers/get-translated-value';
import * as yup from 'yup';

export const workOrderTypeInitialValues = {
  active: true,
  typeDescription: '',
};

export const workOrderTypeResolver = yup.object({
  active: yup.boolean(),
  typeDescription: yup
    .string()
    .required(
      `${getTranslatedValue('Description')} ${getTranslatedValue(
        'Required',
        'AbpIdentity.texts',
      )}`,
    ),
});

export type workOrderTypeInitialValuesTypes = yup.InferType<
  typeof workOrderTypeResolver
>;
