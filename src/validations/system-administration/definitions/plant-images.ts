import { getTranslatedValue } from '@/helpers/get-translated-value';
import * as yup from 'yup';

export const plantImageFormValidation = yup.object({
  name: yup
    .string()
    .required(
      getTranslatedValue('Name') +
        ' ' +
        getTranslatedValue('Required', 'AbpIdentity.texts'),
    ),
  organizationId: yup
    .string()
    .required(
      getTranslatedValue('Organization') +
        ' ' +
        getTranslatedValue('Required', 'AbpIdentity.texts'),
    ),
  uri: yup
    .string()
    .required(
      getTranslatedValue('Image') +
        ' ' +
        getTranslatedValue('Required', 'AbpIdentity.texts'),
    ),
});
