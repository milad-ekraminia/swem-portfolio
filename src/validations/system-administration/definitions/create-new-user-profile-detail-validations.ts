import { getTranslatedValue } from '@/helpers/get-translated-value';
import * as yup from 'yup';

export const createUserNewProfileDetailItemInitialValues = {
  organizationId: '',
};
export const createUserNewProfileDetailItemResolver = yup.object({
  organizationId: yup
    .string()
    .required(`${getTranslatedValue('Required', 'AbpIdentity.texts')}`),
});

export type createUserNewProfileDetailItemInitialValuesTypes = yup.InferType<
  typeof createUserNewProfileDetailItemResolver
>;
