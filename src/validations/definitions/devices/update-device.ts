import { convertDateToCustomFormat } from '@/helpers/definitions/convert-date-to-custom-format';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import * as yup from 'yup';

export const deviceInitialValues = {
  device: {
    active: true,
    useForCalculation: false,
    deviceSerialNr: null,
    deviceDescription: '',
    deviceCommAddress: '1',
    deviceModelId: undefined,
    deviceModelTypeId: 1,
    deviceCategoryId: null,
    deviceAccessPointId: null,
    deviceOrganizationId: undefined,
    latitude: 52.502566838157,
    longitude: 13.387953597599,
    devicePassword: '',
    deviceDescription2: '',
    deviceWebAddress: '',
    replaceDevice: false,
    replaceDeviceId: null,
    installationDate: convertDateToCustomFormat(),
    uninstallDevice: false,
    uninstallationDate: convertDateToCustomFormat(),
    // not need to show in table
    deviceLastThreadUpdate: convertDateToCustomFormat(),
    deviceLastArchiveHourly: convertDateToCustomFormat(),
    deviceLastArchiveDaily: convertDateToCustomFormat(),
    deviceLastArchiveMonthly: convertDateToCustomFormat(),
    deviceLastSuccessComm: convertDateToCustomFormat(),
    deviceVoltTransValue: 1,
    deviceCurrTransValue: 1,
    deviceBaudRate: 7,
    deviceDataBit: 3,
    deviceParity: 0,
    deviceStopBit: 0,
    deviceFirstPulseIndex: 0,
    devicePulseMultiplier: 1,
    deviceTimeZoneProfileId: 360,
    deviceEnergyOnOffDeviceId: null,
    deviceEnergyOnOffLabelId: null,
    deviceConsCalcProfileId: 1,
    deviceConsCalcThreshold: 16,
    deviceLastArchiveHourlyFileNr: 0,
    deviceLastArchiveDailyFileNr: 0,
    deviceLastArchiveMonthlyFileNr: 0,
    deviceQMin: 0,
    deviceQMax: 0,
    deviceQMinQMaxPenaltyStatus: 0,
    deviceACRatedPower: 0,
    deviceDCRatedPower: 0,
    deviceACLimitedPower: 0,
    deviceMimicDiagramId: -1,
    inventoryId: null,
  },
  invoiceInfo: {
    active: true,
    deviceId: 0,
    invoiceDayOfMonth: 1,
    tariffEnergyId: null,
    tariffEnvironmentalId: null,
    subscriberTitle: '',
    deviceNr: '',
    facilityNr: '',
    facilityArm: 1,
    contractArm: 1,
    inductiveLimit: 20,
    capacitiveLimit: 15,
    ngPressure: 0,
  },
  userAdditionalData: {
    active: true,
    deviceId: 0,
    textInfo1: '',
    textInfo2: '',
    textInfo3: '',
    textInfo4: '',
    textInfo5: '',
    numberInfo1: 0,
    numberInfo2: 0,
    numberInfo3: 0,
    numberInfo4: 0,
    numberInfo5: 0,
  },
  labelDescriptions: [],
  deviceCommunicationPeriod: {
    active: false,
    deviceId: null,
    elecInstantValue: 5,
    elecInstantValueSave: 15,
    elecInstantValueLMED: null,
    elecHarmonic: 0,
    elecHarmonicSave: 0,
    elecHarmonicLMED: null,
    elecIndexValue: 1,
    elecIndexValueSave: 5,
    elecIndexValueLMED: null,
    elecDemandInstant: 0,
    elecDemandInstantSave: 0,
    elecDemandInstantLMED: null,
    elecDemandMonthly: 0,
    elecDemandMonthlySave: 0,
    elecDemandMonthlyLMED: null,
    elecAlarmLog: 0,
    elecAlarmLogSave: 0,
    elecAlarmLogLMED: null,
    elecMinMaxValue: 0,
    elecMinMaxValueSave: 0,
    elecMinMaxValueLMED: null,
    elecStep: 0,
    elecStepSave: 0,
    elecStepLMED: null,
    elecDigInputLog: 0,
    elecDigInputLogSave: 0,
    elecDigInputLogLMED: null,
    elecArchive: 0,
    elecArchiveSave: 0,
    elecArchiveLMED: null,
    elecStatusValue: 0,
    elecStatusValueSave: 0,
    elecStatusValueLMED: '0001-01-01T00:00:00',
    ioDeviceSensorValue: 0,
    ioDeviceSensorValueSave: 0,
    ioDeviceSensorValueLMED: null,
    ioDeviceCounterValue: 0,
    ioDeviceCounterValueSave: 0,
    ioDeviceCounterValueLMED: null,
    generatorValue: 0,
    generatorValueSave: 0,
    generatorValueLMED: null,
    compressorValue: 0,
    compressorValueSave: 0,
    compressorValueLMED: null,
    ngInstantMeasurementValue: 0,
    ngInstantMeasurementValueSave: 0,
    ngInstantMeasurementValueLMED: null,
    ngComponentValue: 0,
    ngComponentValueSave: 0,
    ngComponentValueLMED: null,
    ngArchive: 0,
    ngArchiveSave: 0,
    ngArchiveLMED: null,
    fmInstantValue: 0,
    fmInstantValueSave: 0,
    fmInstantValueLMED: null,
    ngChromatography: 0,
    ngChromatographySave: 0,
    ngChromatographyLMED: null,
    elecInverterInstantValue: 0,
    elecInverterInstantValueSave: 0,
    elecInverterInstantValueLMED: null,
  },
};

export const addDeviceResolver = yup.object({
  device: yup.object({
    active: yup
      .boolean()
      .required(getTranslatedValue('Required', 'AbpIdentity.texts')),
    useForCalculation: yup.boolean(),
    replaceDevice: yup.boolean(),
    installationDate: yup.string(),
    uninstallDevice: yup.boolean(),
    uninstallationDate: yup.string(),
    deviceDescription: yup
      .string()
      .max(100, 'Max 5 characters')
      .required(
        getTranslatedValue('em_device_description') +
          ' ' +
          getTranslatedValue('Required', 'AbpIdentity.texts'),
      ),
    deviceSerialNr: yup
      .number()
      .nullable()
      .test(
        'not null serial number',
        getTranslatedValue('em_device_serial_nr') +
          ' ' +
          getTranslatedValue('Required', 'AbpIdentity.texts'),
        (value) => value !== null,
      ),
    deviceModelId: yup
      .number()
      .required(
        getTranslatedValue('em_device_model') +
          ' ' +
          getTranslatedValue('Required', 'AbpIdentity.texts'),
      ),

    deviceOrganizationId: yup
      .number()
      .required(
        getTranslatedValue('em_device_organization') +
          ' ' +
          getTranslatedValue('Required', 'AbpIdentity.texts'),
      ),

    replaceDeviceId: yup.number().nullable(),
    deviceAccessPointId: yup.number().nullable(),

    deviceModelTypeId: yup
      .number()
      .required(getTranslatedValue('Required', 'AbpIdentity.texts')),
    deviceCategoryId: yup.number().nullable(),

    deviceCommAddress: yup.string().max(20, 'Max 20 characters'),
    deviceDescription2: yup.string().max(20, 'Max 20 characters').nullable(),
    devicePassword: yup.string().max(20, 'Max 20 characters').nullable(),
    latitude: yup
      .number()
      .nullable()
      .test(
        'not null latitude',
        getTranslatedValue('Required', 'AbpIdentity.texts'),
        (value) => value !== null,
      ),
    longitude: yup
      .number()
      .nullable()
      .test(
        'not null longitude',
        getTranslatedValue('Required', 'AbpIdentity.texts'),
        (value) => value !== null,
      ),
    deviceWebAddress: yup.string().nullable(),
    deviceEnergyOnOffDeviceId: yup.number().nullable(),

    deviceEnergyOnOffLabelId: yup
      .number()
      .nullable()
      .test(
        'not null deviceEnergyOnOffLabelId number',
        getTranslatedValue('Required', 'AbpIdentity.texts'),
        (value) => value !== 0,
      ),
    deviceVoltTransValue: yup
      .number()
      .nullable()
      .test(
        'not null deviceVoltTransValue number',
        getTranslatedValue('Required', 'AbpIdentity.texts'),
        (value) => value !== null,
      ),
    deviceCurrTransValue: yup
      .number()
      .nullable()
      .test(
        'not null deviceCurrTransValue number',
        getTranslatedValue('Required', 'AbpIdentity.texts'),
        (value) => value !== null,
      ),
    deviceACRatedPower: yup
      .number()
      .nullable()
      .test(
        'not null deviceACRatedPower number',
        getTranslatedValue('Required', 'AbpIdentity.texts'),
        (value) => value !== null,
      ),
    deviceDCRatedPower: yup
      .number()
      .nullable()
      .test(
        'not null deviceDCRatedPower number',
        getTranslatedValue('Required', 'AbpIdentity.texts'),
        (value) => value !== null,
      ),
    deviceACLimitedPower: yup
      .number()
      .nullable()
      .test(
        'not null deviceACLimitedPower number',
        getTranslatedValue('Required', 'AbpIdentity.texts'),
        (value) => value !== null,
      ),
  }),
  invoiceInfo: yup.object({
    active: yup.boolean(),
    deviceId: yup
      .number()
      .nullable()
      .test(
        'not null deviceId number',
        getTranslatedValue('Required', 'AbpIdentity.texts'),
        (value) => value !== null,
      ),
    invoiceDayOfMonth: yup
      .number()
      .nullable()
      .test(
        'not null invoiceDayOfMonth number',
        getTranslatedValue('Required', 'AbpIdentity.texts'),
        (value) => value !== null,
      ),
    subscriberTitle: yup.string().max(256, 'Max 256 characters').nullable(),
    deviceNr: yup.string().max(20, 'Max 20 characters').nullable(),
    facilityNr: yup.string().max(20, 'Max 20 characters').nullable(),
    ngPressure: yup.number(),
    facilityArm: yup
      .number()
      .nullable()
      .test(
        'not null facilityArm number',
        getTranslatedValue('Required', 'AbpIdentity.texts'),
        (value) => value !== null,
      ),
    contractArm: yup
      .number()
      .nullable()
      .test(
        'not null contractArm number',
        getTranslatedValue('Required', 'AbpIdentity.texts'),
        (value) => value !== null,
      ),
    inductiveLimit: yup
      .number()
      .min(0, 'Min 0')
      .nullable()
      .test(
        'not null inductiveLimit number',
        getTranslatedValue('Required', 'AbpIdentity.texts'),
        (value) => value !== null,
      ),
    capacitiveLimit: yup
      .number()
      .min(0, 'Min 0')
      .nullable()
      .test(
        'not null capacitiveLimit number',
        getTranslatedValue('Required', 'AbpIdentity.texts'),
        (value) => value !== null,
      ),
  }),
  userAdditionalData: yup.object({
    active: yup.boolean(),
    deviceId: yup.number().nullable(),
    textInfo1: yup.string().max(256, 'Max 256 characters').nullable(),
    textInfo2: yup.string().max(256, 'Max 256 characters').nullable(),
    textInfo3: yup.string().max(256, 'Max 256 characters').nullable(),
    textInfo4: yup.string().max(256, 'Max 256 characters').nullable(),
    textInfo5: yup.string().max(256, 'Max 256 characters').nullable(),
    numberInfo1: yup.number().nullable(),
    numberInfo2: yup.number().nullable(),
    numberInfo3: yup.number().nullable(),
    numberInfo4: yup.number().nullable(),
    numberInfo5: yup.number().nullable(),
  }),
  labelDescriptions: yup.array(yup.mixed()).required(),
  deviceCommunicationPeriod: yup.object({}),
});
export type deviceInitialValuesTypes = yup.InferType<typeof addDeviceResolver>;
