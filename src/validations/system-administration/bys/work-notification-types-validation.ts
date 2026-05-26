import { getTranslatedValue } from '@/helpers/get-translated-value';
import * as yup from 'yup';

export const createWorkNotificationTypes = yup.object({
  typeDescription: yup
    .string()
    .required(
      getTranslatedValue('WorkNotificationType') +
        ' ' +
        getTranslatedValue('Required', 'AbpIdentity.texts'),
    ),
});
