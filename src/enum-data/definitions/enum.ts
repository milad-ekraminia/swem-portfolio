import { getTranslatedValue } from '@/helpers/get-translated-value';

export const DeviceModelTypeEnum = {
  1: 'EnergyAnalyzer',
  2: 'ReactivePowerControlRelay',
  3: 'ElectronicMultimeter',
  11: 'ElectricityMeter',
  12: 'NaturalGasMeter',
  13: 'WaterMeter',
  14: 'HeatMeter',
  21: 'FlowMeter',
  22: 'FlowComputerNaturalGasCorrector',
  23: 'Generator',
  24: 'Compressor',
  25: 'GasChromatography',
  26: 'RenewableEnergyInverter',
  31: 'UPS',
  32: 'GeneratorWebBased',
  33: 'AirConditioning',
  34: 'Camera',
  35: 'CompressorWebBased',
  41: 'VirtualElectricityDevice',
  45: 'EnergyProductivityAnalyzer',
  51: 'MeasurementSensor',
  52: 'CounterSensor',
};

export const deviceModelTypeOptionsEnum = [
  {
    title: getTranslatedValue('Enum:DeviceModelType.' + DeviceModelTypeEnum[1]),
    value: 1,
  },
  {
    title: getTranslatedValue('Enum:DeviceModelType.' + DeviceModelTypeEnum[2]),
    value: 2,
  },
  {
    title: getTranslatedValue('Enum:DeviceModelType.' + DeviceModelTypeEnum[3]),
    value: 3,
  },
  {
    title: getTranslatedValue(
      'Enum:DeviceModelType.' + DeviceModelTypeEnum[11],
    ),
    value: 11,
  },
  {
    title: getTranslatedValue(
      'Enum:DeviceModelType.' + DeviceModelTypeEnum[12],
    ),
    value: 12,
  },
  {
    title: getTranslatedValue(
      'Enum:DeviceModelType.' + DeviceModelTypeEnum[13],
    ),
    value: 13,
  },
  {
    title: getTranslatedValue(
      'Enum:DeviceModelType.' + DeviceModelTypeEnum[14],
    ),
    value: 14,
  },
  {
    title: getTranslatedValue(
      'Enum:DeviceModelType.' + DeviceModelTypeEnum[21],
    ),
    value: 21,
  },
  {
    title: getTranslatedValue(
      'Enum:DeviceModelType.' + DeviceModelTypeEnum[22],
    ),
    value: 22,
  },
  {
    title: getTranslatedValue(
      'Enum:DeviceModelType.' + DeviceModelTypeEnum[23],
    ),
    value: 23,
  },
  {
    title: getTranslatedValue(
      'Enum:DeviceModelType.' + DeviceModelTypeEnum[24],
    ),
    value: 24,
  },
  {
    title: getTranslatedValue(
      'Enum:DeviceModelType.' + DeviceModelTypeEnum[25],
    ),
    value: 25,
  },
  {
    title: getTranslatedValue(
      'Enum:DeviceModelType.' + DeviceModelTypeEnum[26],
    ),
    value: 26,
  },
  {
    title: getTranslatedValue(
      'Enum:DeviceModelType.' + DeviceModelTypeEnum[31],
    ),
    value: 31,
  },
  {
    title: getTranslatedValue(
      'Enum:DeviceModelType.' + DeviceModelTypeEnum[32],
    ),
    value: 32,
  },
  {
    title: getTranslatedValue(
      'Enum:DeviceModelType.' + DeviceModelTypeEnum[33],
    ),
    value: 33,
  },
  {
    title: getTranslatedValue(
      'Enum:DeviceModelType.' + DeviceModelTypeEnum[34],
    ),
    value: 34,
  },
  {
    title: getTranslatedValue(
      'Enum:DeviceModelType.' + DeviceModelTypeEnum[35],
    ),
    value: 35,
  },
  {
    title: getTranslatedValue(
      'Enum:DeviceModelType.' + DeviceModelTypeEnum[41],
    ),
    value: 41,
  },
  {
    title: getTranslatedValue(
      'Enum:DeviceModelType.' + DeviceModelTypeEnum[45],
    ),
    value: 45,
  },
  {
    title: getTranslatedValue(
      'Enum:DeviceModelType.' + DeviceModelTypeEnum[51],
    ),
    value: 51,
  },
  {
    title: getTranslatedValue(
      'Enum:DeviceModelType.' + DeviceModelTypeEnum[52],
    ),
    value: 52,
  },
];

export const deviceModelTypeOptionsForCreateEnum = [
  {
    title: getTranslatedValue('Enum:DeviceModelType.' + DeviceModelTypeEnum[1]),
    value: 1,
  },
  {
    title: getTranslatedValue(
      'Enum:DeviceModelType.' + DeviceModelTypeEnum[11],
    ),
    value: 11,
  },
  {
    title: getTranslatedValue(
      'Enum:DeviceModelType.' + DeviceModelTypeEnum[26],
    ),
    value: 26,
  },
  {
    title: getTranslatedValue(
      'Enum:DeviceModelType.' + DeviceModelTypeEnum[51],
    ),
    value: 51,
  },
];

export const DeviceModelProtocolTypeEnum = {
  0: 'DigitalAnalog',
  1: 'ModBusTCP',
  2: 'ModbusRTU',
  3: 'ModbusAscii',
  4: 'IEC6205621',
  5: 'DLMSCOSEM',
  6: 'Pulse',
  7: 'Virtual',
  8: 'JSONOverHTTPRest',
  9: 'MQTT',
  10: 'OPCUA',
  11: 'IEC60870_104',
};

export const deviceModelProtocolTypeOptionsEnum = [
  {
    title: getTranslatedValue(
      'Enum:DeviceModelProtocolType.' + DeviceModelProtocolTypeEnum[0],
    ),
    value: 0,
  },
  {
    title: getTranslatedValue(
      'Enum:DeviceModelProtocolType.' + DeviceModelProtocolTypeEnum[1],
    ),
    value: 1,
  },
  {
    title: getTranslatedValue(
      'Enum:DeviceModelProtocolType.' + DeviceModelProtocolTypeEnum[2],
    ),
    value: 2,
  },
  {
    title: getTranslatedValue(
      'Enum:DeviceModelProtocolType.' + DeviceModelProtocolTypeEnum[3],
    ),
    value: 3,
  },
  {
    title: getTranslatedValue(
      'Enum:DeviceModelProtocolType.' + DeviceModelProtocolTypeEnum[4],
    ),
    value: 4,
  },
  {
    title: getTranslatedValue(
      'Enum:DeviceModelProtocolType.' + DeviceModelProtocolTypeEnum[5],
    ),
    value: 5,
  },
  {
    title: getTranslatedValue(
      'Enum:DeviceModelProtocolType.' + DeviceModelProtocolTypeEnum[6],
    ),
    value: 6,
  },
  {
    title: getTranslatedValue(
      'Enum:DeviceModelProtocolType.' + DeviceModelProtocolTypeEnum[7],
    ),
    value: 7,
  },
  {
    title: getTranslatedValue(
      'Enum:DeviceModelProtocolType.' + DeviceModelProtocolTypeEnum[8],
    ),
    value: 8,
  },
  {
    title: getTranslatedValue(
      'Enum:DeviceModelProtocolType.' + DeviceModelProtocolTypeEnum[9],
    ),
    value: 9,
  },
  {
    title: getTranslatedValue(
      'Enum:DeviceModelProtocolType.' + DeviceModelProtocolTypeEnum[10],
    ),
    value: 10,
  },
  {
    title: getTranslatedValue(
      'Enum:DeviceModelProtocolType.' + DeviceModelProtocolTypeEnum[11],
    ),
    value: 11,
  },
];

export const writeFunctionOptionsEnum = [
  {
    title: getTranslatedValue('em_write_function_single'),
    value: 1,
  },
  {
    title: getTranslatedValue('em_write_function_multiple'),
    value: 2,
  },
];

export const deviceModelPeriodOptionsEnumOptions = [
  {
    title: 'Enum:ComminicationType.NonCommunication',
    value: 0,
  },
  {
    title: 'Enum:ComminicationType.OnePerMinute',
    value: 1,
  },
  {
    title: 'Enum:ComminicationType.FivePerMinute',
    value: 5,
  },
  {
    title: 'Enum:ComminicationType.FifteenPerMinute',
    value: 15,
  },
  {
    title: 'Enum:ComminicationType.OnePerHour',
    value: 60,
  },
];

export const deviceModelPeriodOptionsEnum = {
  0: 'Enum:ComminicationType.NonCommunication',
  1: 'Enum:ComminicationType.OnePerMinute',
  5: 'Enum:ComminicationType.FivePerMinute',
  15: 'Enum:ComminicationType.FifteenPerMinute',
  60: 'Enum:ComminicationType.OnePerHour',
};

export const deviceModelModbusFunctionType = {
  1: 'frame_type_read_coils',
  2: 'frame_type_read_input_status',
  3: 'frame_type_read_holding_register',
  4: 'frame_type_read_input_register',
  5: 'frame_type_write_single_coil',
  6: 'frame_type_write_single_register',
  15: 'frame_type_write_multiple_coils',
  16: 'frame_type_write_multiple_registers',
  20: 'frame_type_read_file',
  7: 'frame_type_read_file_number_of_bytes',
};

export const deviceModelModbusFunctionTypeOptions = [
  {
    title: getTranslatedValue(
      'Enum:DeviceModelModbusFunctionType.' + deviceModelModbusFunctionType[1],
    ),
    value: 1,
  },
  {
    title: getTranslatedValue(
      'Enum:DeviceModelModbusFunctionType.' + deviceModelModbusFunctionType[2],
    ),
    value: 2,
  },
  {
    title: getTranslatedValue(
      'Enum:DeviceModelModbusFunctionType.' + deviceModelModbusFunctionType[3],
    ),
    value: 3,
  },
  {
    title: getTranslatedValue(
      'Enum:DeviceModelModbusFunctionType.' + deviceModelModbusFunctionType[4],
    ),
    value: 4,
  },
  {
    title: getTranslatedValue(
      'Enum:DeviceModelModbusFunctionType.' + deviceModelModbusFunctionType[5],
    ),
    value: 5,
  },
  {
    title: getTranslatedValue(
      'Enum:DeviceModelModbusFunctionType.' + deviceModelModbusFunctionType[6],
    ),
    value: 6,
  },
  {
    title: getTranslatedValue(
      'Enum:DeviceModelModbusFunctionType.' + deviceModelModbusFunctionType[15],
    ),
    value: 15,
  },
  {
    title: getTranslatedValue(
      'Enum:DeviceModelModbusFunctionType.' + deviceModelModbusFunctionType[16],
    ),
    value: 16,
  },
  {
    title: getTranslatedValue(
      'Enum:DeviceModelModbusFunctionType.' + deviceModelModbusFunctionType[20],
    ),
    value: 20,
  },
  {
    title: getTranslatedValue(
      'Enum:DeviceModelModbusFunctionType.' + deviceModelModbusFunctionType[7],
    ),
    value: 7,
  },
];

export const deviceMultiplierType = {
  0: 'None',
  1: 'IndexMultiplier',
  2: 'VoltageTransformerRatio',
  3: 'CurrentTransformerRatio',
  11: 'EchelonPower',
};

export const deviceMultiplierTypeOptions = [
  {
    title: getTranslatedValue(
      'Enum:DeviceMultiplierType.' + deviceMultiplierType[1],
    ),
    value: 1,
  },
  {
    title: getTranslatedValue(
      'Enum:DeviceMultiplierType.' + deviceMultiplierType[2],
    ),
    value: 2,
  },
  {
    title: getTranslatedValue(
      'Enum:DeviceMultiplierType.' + deviceMultiplierType[3],
    ),
    value: 3,
  },
  {
    title: getTranslatedValue(
      'Enum:DeviceMultiplierType.' + deviceMultiplierType[11],
    ),
    value: 11,
  },
];

export const dataTypeEnum = {
  1: 'Int32ABCD',
  2: 'Float32ABCD',
  3: 'Int64ABCDEFGH',
  4: 'Float64ABCDEFGH',
  5: 'UnixTime',
  101: 'Time3RegisterYMDHMS',
  102: 'Time6RegisterYMDHMS',
  103: 'Time12RegisterYMDHMS',
  6: 'Int16',
  7: 'Float16',
  8: 'Int8',
  9: 'UInt32',
  10: 'UInt64',
  11: 'UInt16',
  12: 'UInt8',
  13: 'String',
  21: 'Int32CDAB',
  22: 'Float32CDAB',
  23: 'Int64GHEFCDAB',
  24: 'Float64GHEFCDAB',
  31: 'Int32BADC',
  32: 'Float32BADC',
  33: 'Int64BADCFEHG',
  34: 'Float64BADCFEHG',
  41: 'Int32DCBA',
  42: 'Float32DCBA',
  43: 'Int64HGFEDCBA',
  44: 'Float64HGFEDCBA',
  45: 'Mod10ABCD',
  46: 'Mod10ABCDEF',
  47: 'Mod10ABCDEFGH',
};

export const dataTypeEnumOptions = [
  {
    title: getTranslatedValue('Enum:DataType.' + dataTypeEnum[1]),
    value: 1,
  },
  {
    title: getTranslatedValue('Enum:DataType.' + dataTypeEnum[2]),
    value: 2,
  },
  {
    title: getTranslatedValue('Enum:DataType.' + dataTypeEnum[3]),
    value: 3,
  },
  {
    title: getTranslatedValue('Enum:DataType.' + dataTypeEnum[4]),
    value: 4,
  },
  {
    title: getTranslatedValue('Enum:DataType.' + dataTypeEnum[5]),
    value: 5,
  },
  {
    title: getTranslatedValue('Enum:DataType.' + dataTypeEnum[6]),
    value: 6,
  },
  {
    title: getTranslatedValue('Enum:DataType.' + dataTypeEnum[7]),
    value: 7,
  },
  {
    title: getTranslatedValue('Enum:DataType.' + dataTypeEnum[8]),
    value: 8,
  },
  {
    title: getTranslatedValue('Enum:DataType.' + dataTypeEnum[9]),
    value: 9,
  },
  {
    title: getTranslatedValue('Enum:DataType.' + dataTypeEnum[10]),
    value: 10,
  },
  {
    title: getTranslatedValue('Enum:DataType.' + dataTypeEnum[11]),
    value: 11,
  },
  {
    title: getTranslatedValue('Enum:DataType.' + dataTypeEnum[12]),
    value: 12,
  },
  {
    title: getTranslatedValue('Enum:DataType.' + dataTypeEnum[13]),
    value: 13,
  },
  {
    title: getTranslatedValue('Enum:DataType.' + dataTypeEnum[21]),
    value: 21,
  },
  {
    title: getTranslatedValue('Enum:DataType.' + dataTypeEnum[22]),
    value: 22,
  },
  {
    title: getTranslatedValue('Enum:DataType.' + dataTypeEnum[23]),
    value: 23,
  },
  {
    title: getTranslatedValue('Enum:DataType.' + dataTypeEnum[24]),
    value: 24,
  },
  {
    title: getTranslatedValue('Enum:DataType.' + dataTypeEnum[31]),
    value: 31,
  },
  {
    title: getTranslatedValue('Enum:DataType.' + dataTypeEnum[32]),
    value: 32,
  },
  {
    title: getTranslatedValue('Enum:DataType.' + dataTypeEnum[33]),
    value: 33,
  },
  {
    title: getTranslatedValue('Enum:DataType.' + dataTypeEnum[41]),
    value: 41,
  },
  {
    title: getTranslatedValue('Enum:DataType.' + dataTypeEnum[42]),
    value: 42,
  },
  {
    title: getTranslatedValue('Enum:DataType.' + dataTypeEnum[43]),
    value: 43,
  },
  {
    title: getTranslatedValue('Enum:DataType.' + dataTypeEnum[45]),
    value: 45,
  },
  {
    title: getTranslatedValue('Enum:DataType.' + dataTypeEnum[46]),
    value: 46,
  },
  {
    title: getTranslatedValue('Enum:DataType.' + dataTypeEnum[47]),
    value: 47,
  },
];

export const qosTypeEnum = {
  0: 'QosMaxOne',
  1: 'QosMinOne',
  2: 'QosFullOne',
};

export const qosTypeEnumOptions = [
  {
    title: getTranslatedValue('Enum:QosType.' + qosTypeEnum[0]),
    value: 0,
  },
  {
    title: getTranslatedValue('Enum:QosType.' + qosTypeEnum[1]),
    value: 1,
  },
  {
    title: getTranslatedValue('Enum:QosType.' + qosTypeEnum[2]),
    value: 2,
  },
];

export const dataEditableTypeEnum = {
  0: 'Readable',
  1: 'ReadableWritable',
  2: 'Writable',
};

export const dataEditableTypeEnumOptions = [
  {
    title: getTranslatedValue(
      'Enum:DataEditableType.' + dataEditableTypeEnum[0],
    ),
    value: 0,
  },
  {
    title: getTranslatedValue(
      'Enum:DataEditableType.' + dataEditableTypeEnum[1],
    ),
    value: 1,
  },
  {
    title: getTranslatedValue(
      'Enum:DataEditableType.' + dataEditableTypeEnum[2],
    ),
    value: 2,
  },
];

export const accessPointCommTypeEnum = {
  1: 'TCPIPServer',
  2: 'TCPIPClient',
  3: 'SerialCommunication',
  4: 'MQTTBroker',
};

export const accessPointCommTypeEnumOptions = [
  {
    title: getTranslatedValue(accessPointCommTypeEnum[1]),
    value: 1,
  },
  {
    title: getTranslatedValue(accessPointCommTypeEnum[2]),
    value: 2,
  },
  {
    title: getTranslatedValue(accessPointCommTypeEnum[3]),
    value: 3,
  },
  {
    title: getTranslatedValue(accessPointCommTypeEnum[4]),
    value: 4,
  },
];

export const accessPointCommMethodEnum = {
  1: 'ProtocolConverter',
  2: 'TransparentConverter',
  3: 'HttpRest',
};

export const accessPointCommMethodEnumOptions = [
  {
    title: getTranslatedValue(accessPointCommMethodEnum[1]),
    value: 1,
  },
  {
    title: getTranslatedValue(accessPointCommMethodEnum[2]),
    value: 2,
  },
  {
    title: getTranslatedValue(accessPointCommMethodEnum[3]),
    value: 3,
  },
];

export const accessPointProtocolIdEnum = {
  1: 'ModBusTCP',
  2: 'ModbusRTU',
  3: 'ModbusAscii',
  4: 'IEC6205621',
  5: 'DLMS/COSEM',
  7: 'OPCUA',
  11: 'IEC60870_104',
};

export const accessPointProtocolIdEnumOptions = [
  {
    title: getTranslatedValue(accessPointProtocolIdEnum[1]),
    value: 1,
  },
  {
    title: getTranslatedValue(accessPointProtocolIdEnum[2]),
    value: 2,
  },
  {
    title: getTranslatedValue(accessPointProtocolIdEnum[3]),
    value: 3,
  },
  {
    title: getTranslatedValue(accessPointProtocolIdEnum[4]),
    value: 4,
  },
  {
    title: getTranslatedValue(accessPointProtocolIdEnum[5]),
    value: 5,
  },
  {
    title: getTranslatedValue(accessPointProtocolIdEnum[7]),
    value: 7,
  },
  {
    title: getTranslatedValue(accessPointProtocolIdEnum[11]),
    value: 11,
  },
];

export const accessPointCommLineEnum = {
  1: 'Cable',
  2: 'GPRS',
};

export const accessPointCommLineEnumOptions = [
  {
    title: getTranslatedValue(accessPointCommLineEnum[1]),
    value: 1,
  },
  {
    title: getTranslatedValue(accessPointCommLineEnum[2]),
    value: 2,
  },
];

export const mqttConnectionProtocolEnum = {
  0: 'Mqtt/Tcp',
  1: 'Mqtt/Tls_CA',
  2: 'Mqtt/Tls_Self',
};

export const mqttConnectionProtocolEnumOptions = [
  {
    title: getTranslatedValue(mqttConnectionProtocolEnum[0]),
    value: 0,
  },
  {
    title: getTranslatedValue(mqttConnectionProtocolEnum[1]),
    value: 1,
  },
  {
    title: getTranslatedValue(mqttConnectionProtocolEnum[2]),
    value: 2,
  },
];

export const mqttVersionEnum = {
  0: 'Default',
  1: 'MQTT_3.1',
  2: 'MQTT_3.1.1',
};

export const mqttVersionEnumOptions = [
  {
    title: getTranslatedValue(mqttVersionEnum[0]),
    value: 0,
  },
  {
    title: getTranslatedValue(mqttVersionEnum[1]),
    value: 1,
  },
  {
    title: getTranslatedValue(mqttVersionEnum[2]),
    value: 2,
  },
];

export const opcConnectionProtocolEnum = {
  0: '0',
  1: 'UsernameAndPassword',
  2: 'Basic128Rsa15',
  3: 'Basic256Sha256',
  4: 'Basic256',
  5: 'Basic128Rsa15UsernameAndPassword',
  6: 'Basic256Sha256UsernameAndPassword',
  7: 'Basic256UsernameAndPassword',
};

export const opcConnectionProtocolEnumOptions = [
  {
    title: getTranslatedValue(opcConnectionProtocolEnum[0]),
    value: 0,
  },
  {
    title: getTranslatedValue(opcConnectionProtocolEnum[1]),
    value: 1,
  },
  {
    title: getTranslatedValue(opcConnectionProtocolEnum[2]),
    value: 2,
  },
  {
    title: getTranslatedValue(opcConnectionProtocolEnum[3]),
    value: 3,
  },
  {
    title: getTranslatedValue(opcConnectionProtocolEnum[4]),
    value: 4,
  },
  {
    title: getTranslatedValue(opcConnectionProtocolEnum[5]),
    value: 5,
  },
  {
    title: getTranslatedValue(opcConnectionProtocolEnum[6]),
    value: 6,
  },
  {
    title: getTranslatedValue(opcConnectionProtocolEnum[7]),
    value: 7,
  },
];

export const opcMessageSecurityModeEnum = {
  0: 'Default',
  1: 'Signed',
  2: 'SignedAndEncrypted',
};

export const opcMessageSecurityModeEnumOptions = [
  {
    title: getTranslatedValue(opcMessageSecurityModeEnum[0]),
    value: 0,
  },
  {
    title: getTranslatedValue(opcMessageSecurityModeEnum[1]),
    value: 1,
  },
  {
    title: getTranslatedValue(opcMessageSecurityModeEnum[2]),
    value: 2,
  },
];

export const subscriptionTopicEnum = {
  0: 'SubscriptionTopicQosMaxOne',
  1: 'SubscriptionTopicQosMinOne',
  2: 'SubscriptionTopicQosFullOne',
};

export const subscriptionTopicEnumOptions = [
  {
    title: getTranslatedValue(subscriptionTopicEnum[0]),
    value: 0,
  },
  {
    title: getTranslatedValue(subscriptionTopicEnum[1]),
    value: 1,
  },
  {
    title: getTranslatedValue(subscriptionTopicEnum[2]),
    value: 2,
  },
];

export const mimicElementShowType = {
  1: 'StaticContent',
  2: 'BitBased',
  21: 'TwoBitBased',
  3: 'MultiStatus',
  4: 'AlarmConfigurationBased',
  5: 'AlarmLevelBased',
  23: 'BitBasedMCS',
  24: 'DerivedValueMultiStatus',
  25: 'BackNavigation',
  26: 'ForwardNavigation',
};

export const mimicElementShowTypeOptions = [
  {
    title:
      'Enum:MimicElementShowType.' +
      getTranslatedValue(mimicElementShowType[1]),
    value: 1,
  },
  {
    title:
      'Enum:MimicElementShowType.' +
      getTranslatedValue(mimicElementShowType[2]),
    value: 2,
  },
  {
    title:
      'Enum:MimicElementShowType.' +
      getTranslatedValue(mimicElementShowType[21]),
    value: 21,
  },
  {
    title:
      'Enum:MimicElementShowType.' +
      getTranslatedValue(mimicElementShowType[3]),
    value: 3,
  },
  {
    title:
      'Enum:MimicElementShowType.' +
      getTranslatedValue(mimicElementShowType[4]),
    value: 4,
  },
  {
    title:
      'Enum:MimicElementShowType.' +
      getTranslatedValue(mimicElementShowType[5]),
    value: 5,
  },
  {
    title:
      'Enum:MimicElementShowType.' +
      getTranslatedValue(mimicElementShowType[23]),
    value: 23,
  },
  {
    title:
      'Enum:MimicElementShowType.' +
      getTranslatedValue(mimicElementShowType[24]),
    value: 24,
  },
  {
    title:
      'Enum:MimicElementShowType.' +
      getTranslatedValue(mimicElementShowType[25]),
    value: 25,
  },
  {
    title:
      'Enum:MimicElementShowType.' +
      getTranslatedValue(mimicElementShowType[26]),
    value: 26,
  },
];

export const fileSelectionTypeOptions = [
  {
    title: getTranslatedValue('SelectionType.Single'),
    value: 'single',
  },
  {
    title: getTranslatedValue('SelectionType.Multiple'),
    value: 'multiple',
  },
];

export const mimicElementGroupTypeOptions = [
  {
    title: getTranslatedValue('Common'),
    value: 'common',
  },
  {
    title: getTranslatedValue('Electricity'),
    value: 'electricity',
  },
  {
    title: getTranslatedValue('OilandGas'),
    value: 'oil_gas',
  },
  {
    title: getTranslatedValue('Water'),
    value: 'water',
  },
  {
    title: getTranslatedValue('PlantAutomation'),
    value: 'plant_automation',
  },
  {
    title: getTranslatedValue('BuildingAutomation'),
    value: 'building_automation',
  },
  {
    title: getTranslatedValue('Other'),
    value: 'other',
  },
];

export const componentConditionEnum = {
  1: 'Equal',
  2: 'InRange',
};

export const componentConditionEnumOptions = [
  {
    title: getTranslatedValue(componentConditionEnum[1]),
    value: 1,
  },
  {
    title: getTranslatedValue(componentConditionEnum[2]),
    value: 2,
  },
];

export const AlphabetItemEnum = {
  97: 'a',
  98: 'b',
  99: 'c',
  100: 'd',
  101: 'e',
  102: 'f',
  103: 'g',
  104: 'h',
  105: 'i',
  106: 'j',
  107: 'k',
  108: 'l',
  109: 'm',
  110: 'n',
  111: 'o',
  112: 'p',
  113: 'q',
  114: 'r',
  115: 's',
  116: 't',
  117: 'u',
  118: 'v',
  119: 'w',
  120: 'x',
  121: 'y',
  122: 'z',
};

export const alphabetItemEnumOptions = [
  {
    title: 'a',
    value: 97,
  },
  {
    title: 'b',
    value: 98,
  },
  {
    title: 'c',
    value: 99,
  },
  {
    title: 'd',
    value: 100,
  },
  {
    title: 'e',
    value: 101,
  },
  {
    title: 'f',
    value: 102,
  },
  {
    title: 'g',
    value: 103,
  },
  {
    title: 'h',
    value: 104,
  },
  {
    title: 'i',
    value: 105,
  },
  {
    title: 'j',
    value: 106,
  },
  {
    title: 'k',
    value: 107,
  },
  {
    title: 'l',
    value: 108,
  },
  {
    title: 'm',
    value: 109,
  },
  {
    title: 'n',
    value: 110,
  },
  {
    title: 'o',
    value: 111,
  },
  {
    title: 'p',
    value: 112,
  },
  {
    title: 'q',
    value: 113,
  },
  {
    title: 'r',
    value: 114,
  },
  {
    title: 's',
    value: 115,
  },
  {
    title: 't',
    value: 116,
  },
  {
    title: 'u',
    value: 117,
  },
  {
    title: 'v',
    value: 118,
  },
  {
    title: 'w',
    value: 119,
  },
  {
    title: 'x',
    value: 120,
  },
  {
    title: 'y',
    value: 121,
  },
  {
    title: 'z',
    value: 122,
  },
];

export const operatorsEnum = {
  1: '+',
  2: '-',
  3: '*',
  4: '/',
  5: '(',
  6: ')',
};

export const operatorsOptions = [
  {
    title: '+',
    value: 1,
  },
  {
    title: '-',
    value: 2,
  },
  {
    title: '*',
    value: 3,
  },
  {
    title: '/',
    value: 4,
  },
  {
    title: '(',
    value: 5,
  },
  {
    title: ')',
    value: 6,
  },
];

export const thresholdTimeUnitTypesEnum = {
  0: 'Second',
  1: 'Minute',
  2: 'Hour',
};

export const thresholdTimeUnitTypesEnumOptions = [
  {
    title: getTranslatedValue(
      `Enum:ThresholdTimeUnitTypes.${thresholdTimeUnitTypesEnum[0]}`,
    ),
    value: 0,
  },
  {
    title: getTranslatedValue(
      `Enum:ThresholdTimeUnitTypes.${thresholdTimeUnitTypesEnum[1]}`,
    ),
    value: 1,
  },
  {
    title: getTranslatedValue(
      `Enum:ThresholdTimeUnitTypes.${thresholdTimeUnitTypesEnum[2]}`,
    ),
    value: 2,
  },
];

export const alarmLevelType = {
  1: 'Warning',
  2: 'Critical',
  3: 'Dangerous',
  10: 'Viewed',
  100: 'Solved',
};

export const alarmLevelTypeOptions = [
  {
    title: getTranslatedValue(`Enum:AlarmLevelType.${alarmLevelType[1]}`),
    value: 1,
  },
  {
    title: getTranslatedValue(`Enum:AlarmLevelType.${alarmLevelType[2]}`),
    value: 2,
  },
  {
    title: getTranslatedValue(`Enum:AlarmLevelType.${alarmLevelType[3]}`),
    value: 3,
  },
  // {
  //   title: getTranslatedValue(`Enum:AlarmLevelType.${alarmLevelType[10]}`),
  //   value: 10,
  // },
  // {
  //   title: getTranslatedValue(`Enum:AlarmLevelType.${alarmLevelType[100]}`),
  //   value: 100,
  // },
];

export const alarmStatusType = {
  0: 'Active',
  1: 'Finished',
  2: 'Cancelled',
};

export const alarmStatusTypeOptions = [
  {
    title: getTranslatedValue(`Enum:AlarmStatusType.${alarmStatusType[0]}`),
    value: 1,
  },
  {
    title: getTranslatedValue(`Enum:AlarmStatusType.${alarmStatusType[1]}`),
    value: 2,
  },
  {
    title: getTranslatedValue(`Enum:AlarmStatusType.${alarmStatusType[2]}`),
    value: 3,
  },
];

export const MCSControlArea = {
  1: 'OutOfRange',
  2: 'InRange',
  3: 'Equal',
  4: 'NotEqual',
};

export const MCSControlAreaOptions = [
  {
    title: getTranslatedValue(`Enum:MCSControlArea.${MCSControlArea[1]}`),
    value: 1,
  },
  {
    title: getTranslatedValue(`Enum:MCSControlArea.${MCSControlArea[2]}`),
    value: 2,
  },
  {
    title: getTranslatedValue(`Enum:MCSControlArea.${MCSControlArea[3]}`),
    value: 3,
  },
  {
    title: getTranslatedValue(`Enum:MCSControlArea.${MCSControlArea[4]}`),
    value: 4,
  },
];

export const MCSPinNumber = {
  0: 'Bit 1',
};

export const MCSPinNumberOptions = [
  {
    title: getTranslatedValue(`Bit 1`),
    value: 0,
  },
];

export const MCSDefaultValue = {
  1: 'Closed',
  2: 'Opened',
};

export const MCSDefaultValueOptions = [
  {
    title: getTranslatedValue(`MCSDefaultValue.${MCSDefaultValue[1]}`),
    value: 1,
  },
  {
    title: getTranslatedValue(`MCSDefaultValue.${MCSDefaultValue[2]}`),
    value: 2,
  },
];

export const MCSFormulaOperator = {
  '(': '(',
  ')': ')',
  '&': '&',
  '|': '|',
  '^': '^',
};

export const MCSFormulaOperatorOptions = [
  {
    title: '(',
    value: '(',
  },
  {
    title: ')',
    value: ')',
  },
  {
    title: '&',
    value: '&',
  },
  {
    title: '|',
    value: '|',
  },
  {
    title: '^',
    value: '^',
  },
];

export const MCSThresholdTimeUnit = {
  0: 0,
  1: 1,
  2: 2,
};

export const MCSThresholdTimeUnitOptions = [
  {
    title: getTranslatedValue(
      `MCSThresholdTimeUnit.${MCSThresholdTimeUnit[0]}`,
    ),
    value: 0,
  },
  {
    title: getTranslatedValue(
      `MCSThresholdTimeUnit.${MCSThresholdTimeUnit[1]}`,
    ),
    value: 1,
  },
  {
    title: getTranslatedValue(
      `MCSThresholdTimeUnit.${MCSThresholdTimeUnit[2]}`,
    ),
    value: 2,
  },
];

export const MCSWriteValue = {
  0: 'Close',
  1: 'Open',
};

export const MCSWriteValueOptions = [
  {
    title: getTranslatedValue(`MCSWriteValue.${MCSWriteValue[0]}`),
    value: 0,
  },
  {
    title: getTranslatedValue(`MCSWriteValue.${MCSWriteValue[1]}`),
    value: 1,
  },
];

export const userNotificationPeriodType = {
  0: 'NoReminder',
  15: 'NotificationPeriod15',
  30: 'NotificationPeriod30',
  45: 'NotificationPeriod45',
  60: 'NotificationPeriod60',
  120: 'NotificationPeriod120',
  180: 'NotificationPeriod180',
  360: 'NotificationPeriod360',
  720: 'NotificationPeriod720',
  1440: 'NotificationPeriod1440',
};

export const userNotificationPeriodTypeOptions = [
  {
    title: getTranslatedValue(
      `Enum:UserNotificationPeriodType.${userNotificationPeriodType[0]}`,
    ),
    value: 0,
  },
  {
    title: getTranslatedValue(
      `Enum:UserNotificationPeriodType.${userNotificationPeriodType[15]}`,
    ),
    value: 15,
  },
  {
    title: getTranslatedValue(
      `Enum:UserNotificationPeriodType.${userNotificationPeriodType[30]}`,
    ),
    value: 30,
  },
  {
    title: getTranslatedValue(
      `Enum:UserNotificationPeriodType.${userNotificationPeriodType[45]}`,
    ),
    value: 45,
  },
  {
    title: getTranslatedValue(
      `Enum:UserNotificationPeriodType.${userNotificationPeriodType[60]}`,
    ),
    value: 60,
  },
  {
    title: getTranslatedValue(
      `Enum:UserNotificationPeriodType.${userNotificationPeriodType[120]}`,
    ),
    value: 120,
  },
  {
    title: getTranslatedValue(
      `Enum:UserNotificationPeriodType.${userNotificationPeriodType[180]}`,
    ),
    value: 180,
  },
  {
    title: getTranslatedValue(
      `Enum:UserNotificationPeriodType.${userNotificationPeriodType[360]}`,
    ),
    value: 360,
  },
  {
    title: getTranslatedValue(
      `Enum:UserNotificationPeriodType.${userNotificationPeriodType[720]}`,
    ),
    value: 720,
  },
  {
    title: getTranslatedValue(
      `Enum:UserNotificationPeriodType.${userNotificationPeriodType[1440]}`,
    ),
    value: 1440,
  },
];

export const userNotificationType = {
  1: 'EMail',
  2: 'SMS',
  3: 'EMailSMS',
  4: 'Mobile',
  5: 'EMailMobile',
  6: 'SMSMobile',
  7: 'EMailSMSMobile',
};

export const userNotificationTypeOptions = [
  {
    title: getTranslatedValue(
      `Enum:UserNotificationType.${userNotificationType[1]}`,
    ),
    value: 1,
  },
  {
    title: getTranslatedValue(
      `Enum:UserNotificationType.${userNotificationType[2]}`,
    ),
    value: 2,
  },
  {
    title: getTranslatedValue(
      `Enum:UserNotificationType.${userNotificationType[3]}`,
    ),
    value: 3,
  },
  {
    title: getTranslatedValue(
      `Enum:UserNotificationType.${userNotificationType[4]}`,
    ),
    value: 4,
  },
  {
    title: getTranslatedValue(
      `Enum:UserNotificationType.${userNotificationType[5]}`,
    ),
    value: 5,
  },
  {
    title: getTranslatedValue(
      `Enum:UserNotificationType.${userNotificationType[6]}`,
    ),
    value: 6,
  },
  {
    title: getTranslatedValue(
      `Enum:UserNotificationType.${userNotificationType[7]}`,
    ),
    value: 7,
  },
];

export const formulaTypeEnum = {
  1: 'Multiplier',
  2: 'AnalogValue',
};

export const formulaTypeEnumOptions = [
  {
    title: getTranslatedValue(`Enum:FormulaType.${formulaTypeEnum[1]}`),
    value: 1,
  },
  {
    title: getTranslatedValue(`Enum:FormulaType.${formulaTypeEnum[2]}`),
    value: 2,
  },
];

export const alarmWorkingType = {
  0: 'Standard',
  1: 'NumberRepetitions',
  2: 'WaitTime',
  3: 'ValueChangeVolume',
};

export const alarmWorkingTypeOptions = [
  {
    title: getTranslatedValue(`Enum:AlarmWorkingType.${alarmWorkingType[0]}`),
    value: 0,
  },
  {
    title: getTranslatedValue(`Enum:AlarmWorkingType.${alarmWorkingType[1]}`),
    value: 1,
  },
  {
    title: getTranslatedValue(`Enum:AlarmWorkingType.${alarmWorkingType[2]}`),
    value: 2,
  },
  {
    title: getTranslatedValue(`Enum:AlarmWorkingType.${alarmWorkingType[3]}`),
    value: 3,
  },
];

export const alarmConfDeviceSelectionType = {
  1: 'OnlyForOneDevice',
  2: 'OrganizationDeviceTreeBased',
};

export const alarmConfDeviceSelectionTypeOptions = [
  {
    title: getTranslatedValue(
      `Enum:AlarmConfDeviceSelectionType.${alarmConfDeviceSelectionType[1]}`,
    ),
    value: 1,
  },
  {
    title: getTranslatedValue(
      `Enum:AlarmConfDeviceSelectionType.${alarmConfDeviceSelectionType[2]}`,
    ),
    value: 2,
  },
];

export const alarmControlType = {
  1: 'OutOfRange',
  2: 'InRange',
};

export const alarmControlTypeOptions = [
  {
    title: getTranslatedValue(`Enum:MCSControlArea.${alarmControlType[1]}`),
    value: 1,
  },
  {
    title: getTranslatedValue(`Enum:MCSControlArea.${alarmControlType[2]}`),
    value: 2,
  },
];

export const lableDataTypeList = {
  0: 'float',
  1: 'int',
  2: 'double',
  3: 'long',
  4: 'date time',
  5: 'bit',
  6: 'string',
};

export const lableDataTypeListOptions = [
  {
    title: 'float',
    value: 0,
  },
  {
    title: 'int',
    value: 1,
  },
  {
    title: 'double',
    value: 2,
  },
  {
    title: 'long',
    value: 3,
  },
  {
    title: 'date time',
    value: 4,
  },
  {
    title: 'bit',
    value: 5,
  },
  {
    title: 'string',
    value: 6,
  },
];

export const labelGroupList = [
  {
    value: 'ElecInstantValue',
    title: getTranslatedValue('Const:LabelGroup.ElecInstantValue'),
  },
  {
    value: 'ElecHarmonic',
    title: getTranslatedValue('Const:LabelGroup.ElecHarmonic'),
  },
  {
    value: 'ElecIndexValue',
    title: getTranslatedValue('Const:LabelGroup.ElecIndexValue'),
  },
  {
    value: 'ElecDemandInstant',
    title: getTranslatedValue('Const:LabelGroup.ElecDemandInstant'),
  },
  {
    value: 'ElecDemandMonthly',
    title: getTranslatedValue('Const:LabelGroup.ElecDemandMonthly'),
  },
  {
    value: 'ElecAlarmLog',
    title: getTranslatedValue('Const:LabelGroup.ElecAlarmLog'),
  },
  {
    value: 'ElecMinMaxValue',
    title: getTranslatedValue('Const:LabelGroup.ElecMinMaxValue'),
  },
  { value: 'ElecStep', title: getTranslatedValue('Const:LabelGroup.ElecStep') },
  {
    value: 'ElecDigInputLog',
    title: getTranslatedValue('Const:LabelGroup.ElecDigInputLog'),
  },
  {
    value: 'ElecArchive',
    title: getTranslatedValue('Const:LabelGroup.ElecArchive'),
  },
  {
    value: 'ElecStatusValue',
    title: getTranslatedValue('Const:LabelGroup.ElecStatusValue'),
  },
  {
    value: 'GeneratorInstantValue',
    title: getTranslatedValue('Const:LabelGroup.GeneratorInstantValue'),
  },
  {
    value: 'CompressorInstantValue',
    title: getTranslatedValue('Const:LabelGroup.CompressorInstantValue'),
  },
  {
    value: 'NGInstantMeasurementValue',
    title: getTranslatedValue('Const:LabelGroup.NGInstantMeasurementValue'),
  },
  {
    value: 'NGComponentValue',
    title: getTranslatedValue('Const:LabelGroup.NGComponentValue'),
  },
  {
    value: 'NGArchive',
    title: getTranslatedValue('Const:LabelGroup.NGArchive'),
  },
  {
    value: 'NGChromatography',
    title: getTranslatedValue('Const:LabelGroup.NGChromatography'),
  },
  {
    value: 'FMInstantValue',
    title: getTranslatedValue('Const:LabelGroup.FMInstantValue'),
  },
  {
    value: 'ElecInverterInstantValue',
    title: getTranslatedValue('Const:LabelGroup.ElecInverterInstantValue'),
  },
  {
    value: 'ElecConfGeneral',
    title: getTranslatedValue('Const:LabelGroup.ElecConfGeneral'),
  },
  {
    value: 'ElecConfNetwork',
    title: getTranslatedValue('Const:LabelGroup.ElecConfNetwork'),
  },
  {
    value: 'ElecConfCommunication',
    title: getTranslatedValue('Const:LabelGroup.ElecConfCommunication'),
  },
  {
    value: 'ElecConfDigitalInput',
    title: getTranslatedValue('Const:LabelGroup.ElecConfDigitalInput'),
  },
  {
    value: 'ElecConfDigitalOutput',
    title: getTranslatedValue('Const:LabelGroup.ElecConfDigitalOutput'),
  },
  {
    value: 'ElecConfRelayOperation',
    title: getTranslatedValue('Const:LabelGroup.ElecConfRelayOperation'),
  },
  {
    value: 'ElecConfCompensation',
    title: getTranslatedValue('Const:LabelGroup.ElecConfCompensation'),
  },
  {
    value: 'ElecConfCompensationLearning',
    title: getTranslatedValue('Const:LabelGroup.ElecConfCompensationLearning'),
  },
  {
    value: 'ElecConfStepInfo',
    title: getTranslatedValue('Const:LabelGroup.ElecConfStepInfo'),
  },
  {
    value: 'ElecConfAlarm',
    title: getTranslatedValue('Const:LabelGroup.ElecConfAlarm'),
  },
  {
    value: 'ElecConfAnalogInput',
    title: getTranslatedValue('Const:LabelGroup.ElecConfAnalogInput'),
  },
  {
    value: 'ElecConfAnalogOutput',
    title: getTranslatedValue('Const:LabelGroup.ElecConfAnalogOutput'),
  },
  {
    value: 'IoDeviceSensorValue',
    title: getTranslatedValue('Const:LabelGroup.IoDeviceSensorValue'),
  },
  {
    value: 'IoDeviceCounterValue',
    title: getTranslatedValue('Const:LabelGroup.IoDeviceCounterValue'),
  },
];

export const deviceModelTypeList = [
  {
    value: 1,
    title: getTranslatedValue('Enum:DeviceModelType.EnergyAnalyzer'),
  },
  {
    value: 2,
    title: getTranslatedValue('Enum:DeviceModelType.ReactivePowerControlRelay'),
  },
  {
    value: 3,
    title: getTranslatedValue('Enum:DeviceModelType.ElectronicMultimeter'),
  },
  {
    value: 11,
    title: getTranslatedValue('Enum:DeviceModelType.ElectricityMeter'),
  },
  {
    value: 12,
    title: getTranslatedValue('Enum:DeviceModelType.NaturalGasMeter'),
  },
  { value: 13, title: getTranslatedValue('Enum:DeviceModelType.WaterMeter') },
  { value: 14, title: getTranslatedValue('Enum:DeviceModelType.HeatMeter') },
  { value: 21, title: getTranslatedValue('Enum:DeviceModelType.FlowMeter') },
  {
    value: 22,
    title: getTranslatedValue(
      'Enum:DeviceModelType.FlowComputerNaturalGasCorrector',
    ),
  },
  { value: 23, title: getTranslatedValue('Enum:DeviceModelType.Generator') },
  { value: 24, title: getTranslatedValue('Enum:DeviceModelType.Compressor') },
  {
    value: 25,
    title: getTranslatedValue('Enum:DeviceModelType.GasChromatography'),
  },
  {
    value: 26,
    title: getTranslatedValue('Enum:DeviceModelType.RenewableEnergyInverter'),
  },
  { value: 31, title: getTranslatedValue('Enum:DeviceModelType.UPS') },
  {
    value: 32,
    title: getTranslatedValue('Enum:DeviceModelType.GeneratorWebBased'),
  },
  {
    value: 33,
    title: getTranslatedValue('Enum:DeviceModelType.AirConditioning'),
  },
  { value: 34, title: getTranslatedValue('Enum:DeviceModelType.Camera') },
  {
    value: 35,
    title: getTranslatedValue('Enum:DeviceModelType.CompressorWebBased'),
  },
  {
    value: 41,
    title: getTranslatedValue('Enum:DeviceModelType.VirtualElectricityDevice'),
  },
  {
    value: 45,
    title: getTranslatedValue(
      'Enum:DeviceModelType.EnergyProductivityAnalyzer',
    ),
  },
  {
    value: 51,
    title: getTranslatedValue('Enum:DeviceModelType.MeasurementSensor'),
  },
  {
    value: 52,
    title: getTranslatedValue('Enum:DeviceModelType.CounterSensor'),
  },
];

export const timePeriodType = {
  1: 'AccordingToHours',
  2: 'AccordingToDayOfWeek',
  3: 'AccordingToDayOfMonth',
  4: 'AccordingToMonths',
  5: 'RealTime',
};

export const timePeriodTypeOptions = [
  {
    title: getTranslatedValue('Enum:AccordingToHours'),
    value: 1,
  },
  {
    title: getTranslatedValue('Enum:AccordingToDayOfWeek'),
    value: 2,
  },
  {
    title: getTranslatedValue('Enum:AccordingToDayOfMonth'),
    value: 3,
  },
  {
    title: getTranslatedValue('Enum:AccordingToMonths'),
    value: 4,
  },
  {
    title: getTranslatedValue('Enum:RealTime'),
    value: 5,
  },
];

export const monthType = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
};

export const monthTypeOptions = [
  {
    title: getTranslatedValue('Enum:MonthType.January'),
    value: 1,
  },
  {
    title: getTranslatedValue('Enum:MonthType.February'),
    value: 2,
  },
  {
    title: getTranslatedValue('Enum:MonthType.March'),
    value: 3,
  },
  {
    title: getTranslatedValue('Enum:MonthType.April'),
    value: 4,
  },
  {
    title: getTranslatedValue('Enum:MonthType.May'),
    value: 5,
  },
  {
    title: getTranslatedValue('Enum:MonthType.June'),
    value: 6,
  },
  {
    title: getTranslatedValue('Enum:MonthType.July'),
    value: 7,
  },
  {
    title: getTranslatedValue('Enum:MonthType.August'),
    value: 8,
  },
  {
    title: getTranslatedValue('Enum:MonthType.September'),
    value: 9,
  },
  {
    title: getTranslatedValue('Enum:MonthType.October'),
    value: 10,
  },
  {
    title: getTranslatedValue('Enum:MonthType.November'),
    value: 11,
  },
  {
    title: getTranslatedValue('Enum:MonthType.December'),
    value: 12,
  },
];

export const dayOfWeek = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
};

export const dayOfWeekOptions = [
  {
    title: getTranslatedValue('Enum:DayOfWeek.Sunday'),
    value: 0,
  },
  {
    title: getTranslatedValue('Enum:DayOfWeek.Monday'),
    value: 1,
  },
  {
    title: getTranslatedValue('Enum:DayOfWeek.Tuesday'),
    value: 2,
  },
  {
    title: getTranslatedValue('Enum:DayOfWeek.Wednesday'),
    value: 3,
  },
  {
    title: getTranslatedValue('Enum:DayOfWeek.Thursday'),
    value: 4,
  },
  {
    title: getTranslatedValue('Enum:DayOfWeek.Friday'),
    value: 5,
  },
  {
    title: getTranslatedValue('Enum:DayOfWeek.Saturday'),
    value: 6,
  },
];

export const weatherDataTypeOptions = [
  {
    title: getTranslatedValue('Temperature'),
    value: 1,
  },
  {
    title: getTranslatedValue('HumidityRatio'),
    value: 2,
  },
  {
    title: getTranslatedValue('Pressure'),
    value: 3,
  },
  {
    title: getTranslatedValue('CloudsRatio'),
    value: 4,
  },
  {
    title: getTranslatedValue('WindSpeed'),
    value: 5,
  },
  {
    title: getTranslatedValue('Visibility'),
    value: 6,
  },
];

export const aggregationTypeOptions = [
  {
    title: getTranslatedValue('Average'),
    value: 0,
  },
  {
    title: getTranslatedValue('MCSMinimum'),
    value: 1,
  },
  {
    title: getTranslatedValue('MCSMaximum'),
    value: 2,
  },
  {
    title: getTranslatedValue('Total'),
    value: 3,
  },
];

export const HttpStatusCodeEnum = {
  100: 'Continue',
  101: 'SwitchingProtocols',
  102: 'Processing',
  103: 'EarlyHints',
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  203: 'NonAuthoritativeInformation',
  204: 'NoContent',
  205: 'ResetContent',
  206: 'PartialContent',
  207: 'MultiStatus',
  208: 'AlreadyReported',
  226: 'IMUsed',
  300: 'MultipleChoices',
  301: 'MovedPermanently',
  302: 'Found',
  303: 'SeeOther',
  304: 'NotModified',
  305: 'UseProxy',
  306: 'Unused',
  307: 'RedirectKeepVerb',
  308: 'PermanentRedirect',
  400: 'BadRequest',
  401: 'Unauthorized',
  402: 'PaymentRequired',
  403: 'Forbidden',
  404: 'NotFound',
  405: 'MethodNotAllowed',
  406: 'NotAcceptable',
  407: 'ProxyAuthenticationRequired',
  408: 'RequestTimeout',
  409: 'Conflict',
  410: 'Gone',
  411: 'LengthRequired',
  412: 'PreconditionFailed',
  413: 'RequestEntityTooLarge',
  414: 'RequestUriTooLong',
  415: 'UnsupportedMediaType',
  416: 'RequestedRangeNotSatisfiable',
  417: 'ExpectationFailed',
  421: 'MisdirectedRequest',
  422: 'UnprocessableEntity',
  423: 'Locked',
  424: 'FailedDependency',
  426: 'UpgradeRequired',
  428: 'PreconditionRequired',
  429: 'TooManyRequests',
  431: 'RequestHeaderFieldsTooLarge',
  451: 'UnavailableForLegalReasons',
  500: 'InternalServerError',
  501: 'NotImplemented',
  502: 'BadGateway',
  503: 'ServiceUnavailable',
  504: 'GatewayTimeout',
  505: 'HttpVersionNotSupported',
  506: 'VariantAlsoNegotiates',
  507: 'InsufficientStorage',
  508: 'LoopDetected',
  510: 'NotExtended',
  511: 'NetworkAuthenticationRequired',
};

export const httpStatusCodeOptionsEnum = [
  // Common Status Codes
  {
    title: getTranslatedValue(HttpStatusCodeEnum[200]) + ' - ' + 200,
    value: 200,
  },
  {
    title: getTranslatedValue(HttpStatusCodeEnum[201]) + ' - ' + 201,
    value: 201,
  },
  {
    title: getTranslatedValue(HttpStatusCodeEnum[204]) + ' - ' + 204,
    value: 204,
  },
  {
    title: getTranslatedValue(HttpStatusCodeEnum[400]) + ' - ' + 400,
    value: 400,
  },
  {
    title: getTranslatedValue(HttpStatusCodeEnum[401]) + ' - ' + 401,
    value: 401,
  },
  {
    title: getTranslatedValue(HttpStatusCodeEnum[403]) + ' - ' + 403,
    value: 403,
  },
  {
    title: getTranslatedValue(HttpStatusCodeEnum[404]) + ' - ' + 404,
    value: 404,
  },
  {
    title: getTranslatedValue(HttpStatusCodeEnum[500]) + ' - ' + 500,
    value: 500,
  },
  {
    title: getTranslatedValue(HttpStatusCodeEnum[502]) + ' - ' + 502,
    value: 502,
  },
  {
    title: getTranslatedValue(HttpStatusCodeEnum[503]) + ' - ' + 503,
    value: 503,
  },
  // 1xx Informational
  {
    title: getTranslatedValue(HttpStatusCodeEnum[100]) + ' - ' + 100,
    value: 100,
  },
  {
    title: getTranslatedValue(HttpStatusCodeEnum[101]) + ' - ' + 101,
    value: 101,
  },
  {
    title: getTranslatedValue(HttpStatusCodeEnum[102]) + ' - ' + 102,
    value: 102,
  },
  {
    title: getTranslatedValue(HttpStatusCodeEnum[103]) + ' - ' + 103,
    value: 103,
  },
  // 2xx Success (Other)
  {
    title: getTranslatedValue(HttpStatusCodeEnum[202]) + ' - ' + 202,
    value: 202,
  },
  {
    title: getTranslatedValue(HttpStatusCodeEnum[203]) + ' - ' + 203,
    value: 203,
  },
  {
    title: getTranslatedValue(HttpStatusCodeEnum[205]) + ' - ' + 205,
    value: 205,
  },
  {
    title: getTranslatedValue(HttpStatusCodeEnum[206]) + ' - ' + 206,
    value: 206,
  },
  {
    title: getTranslatedValue(HttpStatusCodeEnum[207]) + ' - ' + 207,
    value: 207,
  },
  {
    title: getTranslatedValue(HttpStatusCodeEnum[208]) + ' - ' + 208,
    value: 208,
  },
  {
    title: getTranslatedValue(HttpStatusCodeEnum[226]) + ' - ' + 226,
    value: 226,
  },
  // 3xx Redirection
  {
    title: getTranslatedValue(HttpStatusCodeEnum[300]) + ' - ' + 300,
    value: 300,
  },
  {
    title: getTranslatedValue(HttpStatusCodeEnum[301]) + ' - ' + 301,
    value: 301,
  },
  {
    title: getTranslatedValue(HttpStatusCodeEnum[302]) + ' - ' + 302,
    value: 302,
  },
  {
    title: getTranslatedValue(HttpStatusCodeEnum[303]) + ' - ' + 303,
    value: 303,
  },
  {
    title: getTranslatedValue(HttpStatusCodeEnum[304]) + ' - ' + 304,
    value: 304,
  },
  {
    title: getTranslatedValue(HttpStatusCodeEnum[305]) + ' - ' + 305,
    value: 305,
  },
  {
    title: getTranslatedValue(HttpStatusCodeEnum[307]) + ' - ' + 307,
    value: 307,
  },
  {
    title: getTranslatedValue(HttpStatusCodeEnum[308]) + ' - ' + 308,
    value: 308,
  },
  // 4xx Client Errors (Other)
  {
    title: getTranslatedValue(HttpStatusCodeEnum[402]) + ' - ' + 402,
    value: 402,
  },
  {
    title: getTranslatedValue(HttpStatusCodeEnum[405]) + ' - ' + 405,
    value: 405,
  },
  {
    title: getTranslatedValue(HttpStatusCodeEnum[406]) + ' - ' + 406,
    value: 406,
  },
  {
    title: getTranslatedValue(HttpStatusCodeEnum[407]) + ' - ' + 407,
    value: 407,
  },
  {
    title: getTranslatedValue(HttpStatusCodeEnum[408]) + ' - ' + 408,
    value: 408,
  },
  {
    title: getTranslatedValue(HttpStatusCodeEnum[409]) + ' - ' + 409,
    value: 409,
  },
  {
    title: getTranslatedValue(HttpStatusCodeEnum[410]) + ' - ' + 410,
    value: 410,
  },
  {
    title: getTranslatedValue(HttpStatusCodeEnum[411]) + ' - ' + 411,
    value: 411,
  },
  {
    title: getTranslatedValue(HttpStatusCodeEnum[412]) + ' - ' + 412,
    value: 412,
  },
  {
    title: getTranslatedValue(HttpStatusCodeEnum[413]) + ' - ' + 413,
    value: 413,
  },
  {
    title: getTranslatedValue(HttpStatusCodeEnum[414]) + ' - ' + 414,
    value: 414,
  },
  {
    title: getTranslatedValue(HttpStatusCodeEnum[415]) + ' - ' + 415,
    value: 415,
  },
  {
    title: getTranslatedValue(HttpStatusCodeEnum[416]) + ' - ' + 416,
    value: 416,
  },
  {
    title: getTranslatedValue(HttpStatusCodeEnum[417]) + ' - ' + 417,
    value: 417,
  },
  {
    title: getTranslatedValue(HttpStatusCodeEnum[421]) + ' - ' + 421,
    value: 421,
  },
  {
    title: getTranslatedValue(HttpStatusCodeEnum[422]) + ' - ' + 422,
    value: 422,
  },
  {
    title: getTranslatedValue(HttpStatusCodeEnum[423]) + ' - ' + 423,
    value: 423,
  },
  {
    title: getTranslatedValue(HttpStatusCodeEnum[424]) + ' - ' + 424,
    value: 424,
  },
  {
    title: getTranslatedValue(HttpStatusCodeEnum[426]) + ' - ' + 426,
    value: 426,
  },
  {
    title: getTranslatedValue(HttpStatusCodeEnum[428]) + ' - ' + 428,
    value: 428,
  },
  {
    title: getTranslatedValue(HttpStatusCodeEnum[429]) + ' - ' + 429,
    value: 429,
  },
  {
    title: getTranslatedValue(HttpStatusCodeEnum[431]) + ' - ' + 431,
    value: 431,
  },
  {
    title: getTranslatedValue(HttpStatusCodeEnum[451]) + ' - ' + 451,
    value: 451,
  },
  // 5xx Server Errors (Other)
  {
    title: getTranslatedValue(HttpStatusCodeEnum[501]) + ' - ' + 501,
    value: 501,
  },
  {
    title: getTranslatedValue(HttpStatusCodeEnum[504]) + ' - ' + 504,
    value: 504,
  },
  {
    title: getTranslatedValue(HttpStatusCodeEnum[505]) + ' - ' + 505,
    value: 505,
  },
  {
    title: getTranslatedValue(HttpStatusCodeEnum[506]) + ' - ' + 506,
    value: 506,
  },
  {
    title: getTranslatedValue(HttpStatusCodeEnum[507]) + ' - ' + 507,
    value: 507,
  },
  {
    title: getTranslatedValue(HttpStatusCodeEnum[508]) + ' - ' + 508,
    value: 508,
  },
  {
    title: getTranslatedValue(HttpStatusCodeEnum[510]) + ' - ' + 510,
    value: 510,
  },
  {
    title: getTranslatedValue(HttpStatusCodeEnum[511]) + ' - ' + 511,
    value: 511,
  },
];
