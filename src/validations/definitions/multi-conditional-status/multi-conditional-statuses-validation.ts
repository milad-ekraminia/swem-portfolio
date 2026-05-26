import { getTranslatedValue } from '@/helpers/get-translated-value';
import * as yup from 'yup';


export const multiConditionalStatusInitialValues = {
  multiConditionalStatus: {
    active: true,
    mcsDescription: '',
    mcsThresholdTime: 1,
    mcsThresholdTimeUnit: 1,
    mcsFormula: '',
    mcsCreateAlarm: true,
    mcsAlarmLevel: 1,
    mcsAlarmConfTimePeriodId: undefined,
  },
  analogItems: [],
  digitalItems: [],
  derivedItems: [],
  actions: [],
  subscribers: [],
};

export const multiConditionalStatusResolver = yup.object({
  multiConditionalStatus: yup.object({
    active: yup
      .boolean()
      .required(getTranslatedValue('Required', 'AbpIdentity.texts')),
    mcsDescription: yup
      .string()
      .max(100, 'Max 5 characters')
      .required(
        getTranslatedValue('MCSDescription') +
          ' ' +
          getTranslatedValue('Required', 'AbpIdentity.texts'),
      ),
    mcsThresholdTime: yup
      .number()
      .nullable()
      .test(
        'not null serial number',
        getTranslatedValue('em_multi_conditional_threshold_time') +
          ' ' +
          getTranslatedValue('Required', 'AbpIdentity.texts'),
        (value) => value !== null,
      ),
    mcsFormula: yup.string().max(256, 'Max 256 characters').nullable(),
    mcsCreateAlarm: yup
      .boolean()
      .required(getTranslatedValue('Required', 'AbpIdentity.texts')),
    mcsAlarmLevel: yup
      .number()
      .required(
        getTranslatedValue('AlarmLevel') +
          ' ' +
          getTranslatedValue('Required', 'AbpIdentity.texts'),
      ),
    mcsAlarmConfTimePeriodId: yup
      .number()
      .nullable()
      .test(
        'not null serial number',
        getTranslatedValue('MCSAlarmConfTimePeriodId') +
          ' ' +
          getTranslatedValue('Required', 'AbpIdentity.texts'),
        (value) => value !== null,
      ),
  }),
  analogItems: yup.array(),
  digitalItems: yup.array(),
  derivedItems: yup.array(),
  actions: yup.array(),
  subscribers: yup.array(),
});
export type multiConditionalStatusInitialValuesTypes = yup.InferType<
  typeof multiConditionalStatusResolver
>;

/*****************  analogItems  ***********************/

export const analogItemInitialValues = {
  mcsItemNr: 97,
  mcsControlArea: 1,
  mcsMinHysteresis: 0,
  mcsMaxHysteresis: 0,
  mcsMinimum: 0,
  mcsMaximum: 0,
  mcsEqual: null,
  mcsId: 0,
  mcsDeviceId: undefined,
  mcsLabelId: undefined,
};

export const analogItemResolver = yup.object({
  mcsItemNr: yup.number().nullable(),
  mcsControlArea: yup.number().nullable(),
  mcsMinHysteresis: yup.number().nullable(),
  mcsMaxHysteresis: yup.number().nullable(),
  mcsMinimum: yup
    .number()
    .typeError('MCSMinimum must be a number') // Ensures input is a valid number
    .nullable(),

  mcsMaximum: yup
    .number()
    .typeError('MCSMaximum must be a number') // Ensures input is a valid number
    .nullable() // Ensure required validation runs
    .test(
      'max-greater-than-min',
      getTranslatedValue('MinAllowedValue'),
      function (value) {
        const min = this.parent.mcsMinimum;
        if (typeof min === 'number' && typeof value === 'number') {
          return value > min;
        }
        return true; // Allow empty or undefined values
      },
    ),
  mcsEqual: yup.string().nullable(),
  mcsId: yup.number().nullable(),
  mcsDeviceId: yup.number().nullable(),
  periodType: yup.number().nullable(),
  mcsLabelId: yup.number().nullable(),
});

export type analogItemInitialValuesTypes = yup.InferType<
  typeof analogItemResolver
>;

/*****************  digitalItems  ***********************/
export const digitalItemInitialValues = {
  mcsItemNr: 106,
  mcsPinNumber: 0,
  mcsDefaultValue: undefined,
  mcsId: 0,
  mcsDeviceId: undefined,
  mcsLabelId: undefined,
};

export const digitalItemResolver = yup.object({
  mcsItemNr: yup.number().nullable(),
  mcsPinNumber: yup.number().nullable(),
  mcsDefaultValue: yup.number().nullable(),
  mcsDeviceId: yup.number().nullable(),
  mcsLabelId: yup.number().nullable(),
});

export type digitalItemInitialValuesTypes = yup.InferType<
  typeof digitalItemResolver
>;

/*****************  derivedItems  ***********************/
export const derivedItemInitialValues = {
  mcsItemNr: 115,
  mcsControlArea: 1,
  mcsMinHysteresis: 0,
  mcsMaxHysteresis: 0,
  mcsMinimum: 0,
  mcsMaximum: 0,
  mcsEqual: null,
  mcsId: 0,
  mcsDerivedId: undefined,
};

export const derivedItemResolver = yup.object({
  mcsItemNr: yup.number().nullable(),
  mcsControlArea: yup.number().nullable(),
  mcsMinHysteresis: yup.number().nullable(),
  mcsMaxHysteresis: yup.number().nullable(),
  mcsMinimum: yup
    .number()
    .typeError('MCSMinimum must be a number') // Ensures input is a valid number
    .nullable(),

  mcsMaximum: yup
    .number()
    .typeError('MCSMaximum must be a number') // Ensures input is a valid number
    .nullable()
    .test(
      'max-greater-than-min',
      getTranslatedValue('MinAllowedValue'),
      function (value) {
        const min = this.parent.mcsMinimum;
        if (typeof min === 'number' && typeof value === 'number') {
          return value > min;
        }
        return true; // Allow empty or undefined values
      },
    ),
  mcsEqual: yup.string().nullable(),
  mcsId: yup.number().nullable(),
  mcsDerivedId: yup.number().nullable(),
});

export type derivedItemInitialValuesTypes = yup.InferType<
  typeof derivedItemResolver
>;

/*****************  actions  ***********************/
export const actionInitialValues = {
  mcsWriteValue: '1',
  mcsId: 0,
  mcsDeviceId: undefined,
  mcsLabelId: undefined,
};

export const actionResolver = yup.object({
  mcsWriteValue: yup.string().nullable(),
  mcsId: yup.number().nullable(),
  mcsDeviceId: yup.number().nullable(),
  mcsLabelId: yup.number().nullable(),
});
export type actionInitialValuesTypes = yup.InferType<typeof actionResolver>;

/*****************  subscribers  ***********************/
export const subscriberInitialValues = {
  userId: '',
  alarmConfigurationId: -1,
  notificationType: 1,
  notificationPeriod: 0,
  mcStatusId: -1,
};

export const subscriberResolver = yup.object({
  userId: yup.string().nullable(),
  alarmConfigurationId: yup.number().nullable(),
  notificationType: yup.number().nullable(),
  notificationPeriod: yup.number().nullable(),
  mcStatusId: yup.number().nullable(),
});

export type subscriberInitialValuesTypes = yup.InferType<
  typeof subscriberResolver
>;