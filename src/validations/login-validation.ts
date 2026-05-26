import { getTranslatedValue } from '@/helpers/get-translated-value';
import * as yup from 'yup';

// Extract allowed values

export const loginInitialValues = {
  username: undefined,
  password: undefined,
};

export const loginResolver = yup.object({
  username: yup
    .string()
    .required(
      getTranslatedValue('mobile_lang_placeholder_username') +
        ' ' +
        getTranslatedValue('Required', 'AbpIdentity.texts'),
    ),
  password: yup
    .string()
    .required(
      getTranslatedValue('password') +
        ' ' +
        getTranslatedValue('Required', 'AbpIdentity.texts'),
    ),
});

export type loginInitialValuesTypes = yup.InferType<typeof loginResolver>;
