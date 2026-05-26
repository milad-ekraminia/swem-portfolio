import { getTranslatedValue } from '@/helpers/get-translated-value';
import * as yup from 'yup';

export const deviceStartupDataValidation = yup.object({
  device: yup
    .string()
    .required(
      getTranslatedValue('Device') +
        ' ' +
        getTranslatedValue('Required', 'AbpIdentity.texts'),
    ),
  timeInformation: yup
    .string()
    .required(
      getTranslatedValue('TimeInformation') +
        ' ' +
        getTranslatedValue('Required', 'AbpIdentity.texts'),
    ),
  startDate: yup
    .string()
    .required(
      getTranslatedValue('StartDate') +
        ' ' +
        getTranslatedValue('Required', 'AbpIdentity.texts'),
    ),
  endDate: yup
    .string()
    .required(
      getTranslatedValue('EndDate') +
        ' ' +
        getTranslatedValue('Required', 'AbpIdentity.texts'),
    ),
  imp: yup
    .string()
    .required(
      getTranslatedValue('Imp') +
        ' ' +
        getTranslatedValue('Required', 'AbpIdentity.texts'),
    ),
  exp: yup
    .string()
    .required(
      getTranslatedValue('Exp') +
        ' ' +
        getTranslatedValue('Required', 'AbpIdentity.texts'),
    ),
});
