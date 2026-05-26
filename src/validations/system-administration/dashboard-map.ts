import { getTranslatedValue } from '@/helpers/get-translated-value';
import * as yup from 'yup';

export const dashboardMapValidation = yup.object({
  name: yup
    .string()
    .required(
      getTranslatedValue('Name') +
        ' ' +
        getTranslatedValue('Required', 'AbpIdentity.texts'),
    ),
});
