import { getTranslatedValue } from '@/helpers/get-translated-value';
import * as yup from 'yup';

export const workOrderCostTypeInitialValues = {
  id: undefined,
  active: true,
  typeDescription: '',
};

export const workOrderCostTypeResolver = yup.object({
  id: yup.number(),
  active: yup.boolean(),
  typeDescription: yup
    .string()
    .required(
      `${getTranslatedValue('TypeDescription')} ${getTranslatedValue('Required', 'AbpIdentity.texts')} `,
    ),
});

export type workOrderCostTypeInitialValuesTypes = yup.InferType<
  typeof workOrderCostTypeResolver
>;
