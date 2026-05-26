import { getTranslatedValue } from '@/helpers/get-translated-value';
import * as yup from 'yup';

export const createWorkNotificationValidation = yup.object({
  notificationDescription: yup
    .string()
    .required(
      getTranslatedValue('NotificationDescription') +
        ' ' +
        getTranslatedValue('Required', 'AbpIdentity.texts'),
    ),
  notificationNo: yup
    .string()
    .required(
      getTranslatedValue('NotificationNo') +
        ' ' +
        getTranslatedValue('Required', 'AbpIdentity.texts'),
    ),
  assignedUserId: yup
    .string()
    .required(
      getTranslatedValue('WorkOrderAssignedUser') +
        ' ' +
        getTranslatedValue('Required', 'AbpIdentity.texts'),
    ),
  workNotificationTypeId: yup
    .string()
    .required(
      getTranslatedValue('WorkNotificationType') +
        ' ' +
        getTranslatedValue('Required', 'AbpIdentity.texts'),
    ),
});
