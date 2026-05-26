import { getTranslatedValue } from '@/helpers/get-translated-value';
import * as yup from 'yup';

export const plantVideoFormValidation = yup.object({
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
      getTranslatedValue('Video') +
        ' ' +
        getTranslatedValue('Required', 'AbpIdentity.texts'),
    ),
  poster: yup
    .string()
    .required(
      getTranslatedValue('Poster') +
        ' ' +
        getTranslatedValue('Required', 'AbpIdentity.texts'),
    ),
});
