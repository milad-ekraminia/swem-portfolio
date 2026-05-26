import { getTranslatedValue } from '@/helpers/get-translated-value';
import * as yup from 'yup';

export const timePeriodDetailValidation = yup.object({
  id: yup.number().nullable(),
  startDateYear: yup.number().nullable(),
  startDateMonth: yup.number().nullable(),
  startDateDay: yup.number().nullable(),
  startDateHour: yup.number().nullable(),
  startDateMinute: yup.number().nullable(),
  endDateYear: yup.number().nullable(),
  endDateMonth: yup.number().nullable(),
  endDateDay: yup.number().nullable(),
  endDateHour: yup.number().nullable(),
  endDateMinute: yup.number().nullable(),
  dayOfWeek: yup.number().nullable(),
});

export const timePeriodValidation = yup.object({
  active: yup.boolean(),
  timePeriodName: yup
    .string()
    .max(
      50,
      `${getTranslatedValue('TimePeriodName')} ${getTranslatedValue('MaxLength', 'AbpValidation.texts')}`,
    )
    .required(
      `${getTranslatedValue('TimePeriodName')} ${getTranslatedValue('Required', 'AbpIdentity.texts')}`,
    ),
  timePeriodType: yup
    .number()
    .required(
      `${getTranslatedValue('TimePeriodType')} ${getTranslatedValue('Required', 'AbpIdentity.texts')}`,
    ),
  timePeriodDescription: yup
    .string()
    .max(
      225,
      `${getTranslatedValue('TimePeriodName')} ${getTranslatedValue('MaxLength', 'AbpValidation.texts')}`,
    ),
  timePeriodDetails: yup.array().of(timePeriodDetailValidation).min(1),
});
