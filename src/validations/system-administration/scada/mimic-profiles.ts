import { getTranslatedValue } from '@/helpers/get-translated-value';
import * as yup from 'yup';

export const mimicProfileResolver = yup.object({
  mimicProfileName: yup
    .string()
    .required(
      getTranslatedValue('ProfileName') +
        ' ' +
        getTranslatedValue('Required', 'AbpIdentity.texts'),
    ),
  mimicProfileDetail: yup
    .array()
    .min(
      1,
      getTranslatedValue('Plant') +
        ' ' +
        getTranslatedValue('Required', 'AbpIdentity.texts'),
    )
    .required(
      getTranslatedValue('Plant') +
        ' ' +
        getTranslatedValue('Required', 'AbpIdentity.texts'),
    ),
});
