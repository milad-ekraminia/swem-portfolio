import { getTranslatedValue } from '@/helpers/get-translated-value';
import * as yup from 'yup';

export const workOrderActionInitialValues = {
  id: undefined,
  workOrderId: undefined,
  actionUserId: '',
  actionDateTime: '',
  actionType: undefined,
  actionDescription: '',
};

export const workOrderActionResolver = yup.object({
  id: yup.number(),
  workOrderId: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .required(
      `${getTranslatedValue('WorkOrderId')} ${getTranslatedValue(
        'Required',
        'AbpIdentity.texts',
      )}`,
    ),
  actionUserId: yup
    .string()
    .required(
      `${getTranslatedValue('ActionUserId')} ${getTranslatedValue(
        'Required',
        'AbpIdentity.texts',
      )}`,
    ),
  actionDateTime: yup
    .string()
    .nullable()
    .required(
      `${getTranslatedValue('ActionDateTime')} ${getTranslatedValue(
        'Required',
        'AbpIdentity.texts',
      )}`,
    ),
  actionType: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value)),
  actionDescription: yup.string().nullable(),
});

export type workOrderActionInitialValuesTypes = yup.InferType<
  typeof workOrderActionResolver
>;
