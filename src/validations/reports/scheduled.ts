import { getTranslatedValue } from '@/helpers/get-translated-value';
import * as yup from 'yup';

export const scheduledReportFormValidation = yup.object({
  Active: yup.boolean().required(),
  SendMail: yup.boolean().required(),
  Description: yup
    .string()
    .required(
      getTranslatedValue('ScheduledReportDescription') +
        ' ' +
        getTranslatedValue('Required', 'AbpIdentity.texts'),
    ),
  FilterProfileId: yup
    .string()
    .required(
      getTranslatedValue('em_report_filter_profile_name') +
        ' ' +
        getTranslatedValue('Required', 'AbpIdentity.texts'),
    ),
  // ReportType: yup.string().required(),
  WorkHour: yup.number().required(),
  UserIds: yup
    .array()
    .min(
      1,
      getTranslatedValue('E-Posta Gönderilecek Kullanıcılar') +
        ' ' +
        getTranslatedValue('Required', 'AbpIdentity.texts'),
    )
    .required(
      getTranslatedValue('E-Posta Gönderilecek Kullanıcılar') +
        ' ' +
        getTranslatedValue('Required', 'AbpIdentity.texts'),
    ),
  LastReportTime: yup.string().optional().nullable(),
  NextReportTime: yup.string().optional().nullable(),
});
