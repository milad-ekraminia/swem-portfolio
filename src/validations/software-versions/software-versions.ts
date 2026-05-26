import { getTranslatedValue } from '@/helpers/get-translated-value';
import * as yup from 'yup';

export const softwareVersions = yup.object({
  one: yup
    .string()
    .required(getTranslatedValue('Required', 'AbpIdentity.texts')),
  two: yup
    .string()
    .required(getTranslatedValue('Required', 'AbpIdentity.texts')),
  three: yup
    .string()
    .required(getTranslatedValue('Required', 'AbpIdentity.texts')),
  versionDescription: yup.string(),
});
