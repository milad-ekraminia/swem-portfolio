import * as yup from 'yup';

export const deviceModelModbusInitialValues = {
  dataDescription: '',
  modbusAddress: 0,
  dataTypeId: 0,
  dataLength: 0,
  labelId: 0,
  formulaId: 0,
  dataUnit: '-1',
  deviceMultiplier: 0,
  dataEditable: 0,
  topicName: '',
  subTopicName: '',
  qosLevel: 0,
  opcTagName: '',
  functionType: 0,
};

export const addDeviceModelModbusResolver = yup.object({
  labelId: yup.number().nullable().optional(),
  dataDescription: yup.string().nullable().optional(),
  modbusAddress: yup.number().nullable().optional(),
  dataTypeId: yup.number().nullable().optional(),
  dataLength: yup.number().nullable().optional(),
  formulaId: yup.number().nullable().optional(),
  dataUnit: yup.string().nullable().optional(),
  deviceMultiplier: yup.number().nullable().optional(),
  dataEditable: yup.number().nullable().optional(),
  topicName: yup.string().nullable().optional(),
  subTopicName: yup.string().nullable().optional(),
  qosLevel: yup.number().nullable().optional(),
  opcTagName: yup.string().nullable().optional(),
  functionType: yup.number().nullable().optional(),
});

export type deviceModelModbusInitialValuesTypes = yup.InferType<
  typeof addDeviceModelModbusResolver
>;
