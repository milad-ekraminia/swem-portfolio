import { formatDateToCustomISO } from '@/helpers/bys/get-today-date';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import * as yup from 'yup';

export const workOrderInitialValues = {
  workOrderDescription: undefined,
  workOrderStartDateTime: undefined,
  workOrderEndDateTime: undefined,
  workOrderNo: undefined,
  workOrderAssignedUserId: undefined,
  workOrderPriority: 1,
  workOrderType: undefined,
  workOrderCategory: 0,
  workOrderDeviceId: undefined,
  active: true,
  workOrderState: true,
  deviceId: undefined,
  deviceCaption: undefined,
  workOrderAssetType: undefined,
  workOrderAssetNodeId: undefined,
  workOrderSolutionDescription: '',
};

export const workOrderResolver = yup.object({
  workOrderDescription: yup
    .string()
    .required(
      `${getTranslatedValue('WorkOrderDescription')} ${getTranslatedValue(
        'Required',
        'AbpIdentity.texts',
      )}`,
    ),
  workOrderStartDateTime: yup.string().nullable(),
  workOrderEndDateTime: yup.string().nullable(),
  workOrderNo: yup
    .string()
    .required(
      `${getTranslatedValue('WorkOrderNo')} ${getTranslatedValue(
        'Required',
        'AbpIdentity.texts',
      )}`,
    ),
  workOrderAssignedUserId: yup
    .string()
    .required(
      `${getTranslatedValue('WorkOrderAssignedUserId')} ${getTranslatedValue(
        'Required',
        'AbpIdentity.texts',
      )}`,
    ),
  workOrderAssetType: yup.number().nullable().optional(),
  workOrderAssetNodeId: yup.number().nullable(),
  workOrderPriority: yup
    .number()
    .transform((_value, originalValue) => {
      return originalValue === '' ? undefined : Number(originalValue);
    })
    .typeError(
      `${getTranslatedValue('WorkOrderPriority')} ${getTranslatedValue(
        'MustBeNumber',
        'AbpIdentity.texts',
      )}`,
    ),

  workOrderCategory: yup
    .number()
    .transform((_value, originalValue) => {
      return originalValue === '' ? undefined : Number(originalValue);
    })
    .typeError(
      `${getTranslatedValue('WorkOrderCategory')} ${getTranslatedValue(
        'MustBeNumber',
        'AbpIdentity.texts',
      )}`,
    )
    .required(
      `${getTranslatedValue('WorkOrderCategory')} ${getTranslatedValue(
        'Required',
        'AbpIdentity.texts',
      )}`,
    ),
  workOrderDeviceId: yup
    .number()
    .transform((_value, originalValue) => {
      return originalValue === '' ? undefined : Number(originalValue);
    })
    .typeError(
      `${getTranslatedValue('WorkOrderDeviceId')} ${getTranslatedValue(
        'MustBeNumber',
        'AbpIdentity.texts',
      )}`,
    ),
  workOrderType: yup
    .number()
    .transform((_value, originalValue) => {
      return originalValue === '' ? undefined : Number(originalValue);
    })
    .typeError(
      `${getTranslatedValue('WorkOrderType')} ${getTranslatedValue(
        'MustBeNumber',
        'AbpIdentity.texts',
      )}`,
    ),
  // .required(
  //   `${getTranslatedValue("WorkOrderType")} ${getTranslatedValue(
  //     "Required",
  //     "AbpIdentity.texts"
  //   )}`
  // ),
  active: yup.boolean().required(),
  workOrderState: yup.boolean().required(),
  deviceId: yup.number().nullable(),
  deviceCaption: yup.string().nullable(),
  workOrderSolutionDescription: yup.string().nullable(),
});

export type workOrderValuesTypes = yup.InferType<typeof workOrderResolver>;

export const addActionInitialValues = {
  workOrderId: undefined,
  actionUserId: '',
  actionDateTime: formatDateToCustomISO(),
  actionType: undefined,
  actionDescription: '',
  image: undefined,
};

export const addActionResolver = yup.object({
  workOrderId: yup.number().required(),
  actionUserId: yup.string().required(),
  actionDateTime: yup.string().required(),
  actionType: yup
    .number()
    .required(
      `${getTranslatedValue('ActionType')} ${getTranslatedValue(
        'Required',
        'AbpIdentity.texts',
      )}`,
    ),
  actionDescription: yup.string().nullable(),
  image: yup.string().nullable(),
});
export type addActionValuesTypes = yup.InferType<typeof addActionResolver>;

export const addWorkerInitialValues = {
  workOrderId: undefined,
  userId: '',
  workerWorkTime: undefined,
};

export const addWorkerResolver = yup.object({
  workOrderId: yup.number().required(),
  userId: yup
    .string()
    .required(
      `${getTranslatedValue('UserId')} ${getTranslatedValue(
        'Required',
        'AbpIdentity.texts',
      )}`,
    ),
  workerWorkTime: yup
    .number()
    .required(
      `${getTranslatedValue('WorkerWorkTime')} ${getTranslatedValue(
        'Required',
        'AbpIdentity.texts',
      )}`,
    ),
});
export type addWorkerValuesTypes = yup.InferType<typeof addWorkerResolver>;

export const addCostInitialValues = {
  workOrderId: undefined,
  description: '',
  workOrderCostTypeId: undefined,
  cost: 0,
};

export const addCostResolver = yup.object({
  workOrderId: yup.number().required(),
  description: yup.string().nullable(),
  workOrderCostTypeId: yup
    .number()
    .required(
      `${getTranslatedValue('TypeDescription')} ${getTranslatedValue(
        'Required',
        'AbpIdentity.texts',
      )}`,
    ),
  cost: yup
    .number()
    .test((value) => value !== null)
    .required(
      `${getTranslatedValue('Cost')} ${getTranslatedValue(
        'Required',
        'AbpIdentity.texts',
      )}`,
    ),
});
export type addCostValuesTypes = yup.InferType<typeof addCostResolver>;
