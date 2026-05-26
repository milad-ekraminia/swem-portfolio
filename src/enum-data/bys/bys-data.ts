import { getTranslatedValue } from '../../helpers/get-translated-value';

export const workOrderActionTypeList = [
  {
    id: 1,
    value: getTranslatedValue('Enum:WorkOrderActionType.WorkOrderAccepted'),
  },
  {
    id: 2,
    value: getTranslatedValue('Enum:WorkOrderActionType.WorkOrderRejected'),
  },
  {
    id: 3,
    value: getTranslatedValue('Enum:WorkOrderActionType.Working'),
  },
  {
    id: 4,
    value: getTranslatedValue('Enum:WorkOrderActionType.WaitingFor'),
  },
  {
    id: 5,
    value: getTranslatedValue('Enum:WorkOrderActionType.WorkOrderResolved'),
  },
];

export const workNotificationPriorityTypeList = [
  {
    id: 1,
    value: getTranslatedValue('Enum:WorkNotificationPriorityType.1'),
  },
  {
    id: 2,
    value: getTranslatedValue('Enum:WorkNotificationPriorityType.2'),
  },
  {
    id: 3,
    value: getTranslatedValue('Enum:WorkNotificationPriorityType.3'),
  },
  {
    id: 4,
    value: getTranslatedValue('Enum:WorkNotificationPriorityType.4'),
  },
];

export const customWorkOrderActionTypeList = [
  {
    id: 3,
    value: getTranslatedValue('Enum:WorkOrderActionType.Working'),
  },
  {
    id: 4,
    value: getTranslatedValue('Enum:WorkOrderActionType.WaitingFor'),
  },
];
