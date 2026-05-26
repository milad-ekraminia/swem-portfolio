import { getTranslatedValue } from '@/helpers/get-translated-value';
import * as yup from 'yup';

export const userAlarmConfigurationsInitialValues = {
  userId: '',
  notificationType: 1,
  notificationPeriod: 0,
};

export const userAlarmConfigurationsSchema = yup.object({
  userId: yup.string(),
  notificationType: yup
    .number()
    .required(
      `${getTranslatedValue('NotificationType')} ${getTranslatedValue('Required', 'AbpIdentity.texts')}`,
    ),
  notificationPeriod: yup
    .number()
    .required(
      `${getTranslatedValue('NotificationPeriod')} ${getTranslatedValue('Required', 'AbpIdentity.texts')}`,
    ),
});

export type userAlarmConfigurationsSchemaType = yup.InferType<
  typeof userAlarmConfigurationsSchema
>;

export const alarmConfigurationsInitialValues = {
  active: true,
  alarmConfDescription: '',
  alarmConfDeviceSelectionType: 1,
  alarmConfOrganizationId: undefined,
  alarmConfDeviceId: undefined,
  alarmConfLabelId: undefined,
  alarmConfLevel: 1,
  alarmConfTimePeriodId: undefined,
  alarmDataLogFlag: false,
  alarmWorkingType: 0,
  alarmConfPinNumber: 0,
  alarmConfDefaultValue: 0,
  alarmConfControlArea: 1,
  alarmConfMinimum: 0,
  alarmConfMaximum: 0,
  alarmConfMinHysteresis: 0.0,
  alarmConfMaxHysteresis: 0.0,
  alarmNumberRepetition: undefined,
  alarmWaitTime: undefined,
  alarmValueChangeVolume: undefined,
  alarmConfDeviceIds: [], // [1,2,3]
  userAlarmConfigurationList: [],
};

export const alarmConfigurationsResolver = yup.object({
  active: yup.boolean(),
  alarmConfDescription: yup
    .string()
    .required(
      `${getTranslatedValue('AlarmConfDescription')} ${getTranslatedValue('Required', 'AbpIdentity.texts')}`,
    ),
  alarmConfDeviceSelectionType: yup.number().nullable(),
  alarmConfOrganizationId: yup.number().nullable(),
  // .when("alarmConfDeviceSelectionType", {
  //   is: 1,
  //   then: (schema) =>
  //     schema.required(
  //       `${getTranslatedValue("Organization")} ${getTranslatedValue("Required", "AbpIdentity.texts")}`,
  //     ),
  //   otherwise: (schema) => schema.nullable(),
  // }),
  // if alarmConfDeviceSelectionType === 1 alarmConfDeviceId is required
  alarmConfDeviceId: yup
    .number()
    .nullable()
    .when('alarmConfDeviceSelectionType', {
      is: 1,
      then: (schema) =>
        schema.required(
          `${getTranslatedValue('Device')} ${getTranslatedValue('Required', 'AbpIdentity.texts')}`,
        ),
      otherwise: (schema) => schema.nullable(),
    }),
  alarmConfLabelId: yup
    .number()
    .required(
      `${getTranslatedValue('Label')} ${getTranslatedValue('Required', 'AbpIdentity.texts')}`,
    ),
  alarmConfLevel: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value)),
  alarmConfTimePeriodId: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value)),
  alarmDataLogFlag: yup.boolean(),
  alarmWorkingType: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value)),
  alarmConfPinNumber: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value)),
  alarmConfDefaultValue: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value)),
  alarmConfControlArea: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value)),
  alarmConfMinimum: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value)),
  alarmConfMaximum: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .test(
      'max-greater-than-min',
      getTranslatedValue('MinAllowedValue'),
      function (value) {
        const min = this.parent.alarmConfMinimum;
        if (typeof min === 'number' && typeof value === 'number') {
          return value >= min;
        }
        return true; // Allow empty or undefined values
      },
    ),
  alarmConfMinHysteresis: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value)),
  alarmConfMaxHysteresis: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .test(
      'max-greater-than-min',
      getTranslatedValue('MinAllowedValue'),
      function (value) {
        const min = this.parent.alarmConfMinHysteresis;
        if (typeof min === 'number' && typeof value === 'number') {
          return value >= min;
        }
        return true; // Allow empty or undefined values
      },
    ),
  alarmNumberRepetition: yup.number().nullable(),
  alarmWaitTime: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value)),
  alarmValueChangeVolume: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value)),
  alarmConfDeviceIds: yup
    .array()
    .of(yup.number())
    .nullable()
    .when('alarmConfDeviceSelectionType', {
      is: 2,
      then: (schema) =>
        schema
          .required(
            `${getTranslatedValue('Organization')} ${getTranslatedValue('Required', 'AbpIdentity.texts')}`,
          )
          .min(
            1,
            `${getTranslatedValue('Organization')} ${getTranslatedValue('Required', 'AbpIdentity.texts')}`,
          ),
      otherwise: (schema) => schema.nullable(),
    }),
  userAlarmConfigurationList: yup
    .array()
    .of(userAlarmConfigurationsSchema)
    .nullable(),
});

export type alarmConfigurationsInitialValuesTypes = yup.InferType<
  typeof alarmConfigurationsResolver
>;
