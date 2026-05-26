import ActionButtons from '@/components/ui/action/action-buttons';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import {
  dataEditableTypeEnum,
  dataTypeEnum,
  deviceModelModbusFunctionType,
  deviceMultiplierType,
  qosTypeEnum,
} from './enum';

export const finalDevicesModelModbusInfoTableHeaders = ({
  deviceModelProtocolId,
  labelList,
  formulaList,
  onEdit,
  queryKey,
  asduTypesLookup,
}: {
  deviceModelProtocolId: any;
  labelList: any;
  formulaList: any;
  queryKey: any;
  onEdit: any;
  asduTypesLookup: any;
}) => {
  const devicesModelModbusInfoTableHeaders = [
    {
      header: getTranslatedValue('em_modbus_table_label'),
      accessorKey: 'labelId',
      sort: 'LabelId',
      cell: ({ row }: any) => {
        const info = row?.original;
        return (
          <>
            {info?.labelName
              ? getTranslatedValue(info?.labelName)
              : getTranslatedValue(
                labelList?.find((item: any) => item.id == info.labelId)
                  ?.displayName ?? '-',
              )}
          </>
        );
      },
    },
    {
      header: getTranslatedValue('DeviceMultiplier'),
      sort: 'DeviceMultiplier',
      accessorKey: 'deviceMultiplier',
      cell: ({ row }: any) => {
        const info = row?.original;
        return (
          <>
            {info?.deviceMultiplier > -1
              ? getTranslatedValue(
                `Enum:DeviceMultiplierType.${deviceMultiplierType[
                info?.deviceMultiplier as keyof typeof deviceMultiplierType
                ]
                }`,
              )
              : '-'}
          </>
        );
      },
    },
    {
      header: getTranslatedValue('em_modbus_table_formula'),
      sort: 'FormulaId',
      accessorKey: 'formulaId',
      cell: ({ row }: any) => {
        const info = row?.original;
        return (
          <>
            {getTranslatedValue(
              formulaList?.find((item: any) => item.id === info.formulaId)
                ?.displayName ?? '-',
            )}
          </>
        );
      },
    },
    {
      header: getTranslatedValue('em_modbus_table_data_length'),
      sort: 'DataLength',
      accessorKey: 'dataLength',
    },
  ];

  if (deviceModelProtocolId === 10) {
    devicesModelModbusInfoTableHeaders.push({
      header: getTranslatedValue('OpcTagName'),
      sort: 'OpcTagName',
      accessorKey: 'opcTagName',
    });
  }
  if (deviceModelProtocolId !== 10) {
    devicesModelModbusInfoTableHeaders.push({
      header: getTranslatedValue(deviceModelProtocolId === 11 ? 'AsduType' : 'DataType'),
      sort: 'DataTypeId',
      accessorKey: 'dataTypeId',
      cell: ({ row }: any) => {
        const info = row?.original;
        return (
          <>
            {info?.dataTypeId
              ?
              deviceModelProtocolId === 11 ?
                asduTypesLookup?.find((item: any) => item.id === info.dataTypeId)?.displayName :
                getTranslatedValue(
                  `Enum:DataType.${dataTypeEnum[info?.dataTypeId as keyof typeof dataTypeEnum]
                  }`,
                )
              : '-'}
          </>
        );
      },
    });
  }

  if (deviceModelProtocolId === 9) {
    devicesModelModbusInfoTableHeaders.push({
      header: getTranslatedValue('TopicName'),
      sort: 'TopicName',
      accessorKey: 'topicName',
    });
    devicesModelModbusInfoTableHeaders.push({
      header: getTranslatedValue('SubTopicName'),
      sort: 'SubTopicName',
      accessorKey: 'subTopicName',
    });
    devicesModelModbusInfoTableHeaders.push({
      header: getTranslatedValue('QosLevel'),
      sort: 'QosLevel',
      accessorKey: 'qosLevel',
      cell: ({ row }: any) => {
        const info = row?.original;
        return (
          <>
            {info?.qosLevel >= 0
              ? getTranslatedValue(
                `Enum:QosType.${qosTypeEnum[info?.qosLevel as keyof typeof qosTypeEnum]
                }`,
              )
              : '-'}
          </>
        );
      },
    });
  }

  if (deviceModelProtocolId !== 0 && deviceModelProtocolId !== 4) {
    devicesModelModbusInfoTableHeaders.push({
      header: getTranslatedValue('em_modbus_table_editable'),
      sort: 'dataEditable',
      accessorKey: 'dataEditable',
      cell: ({ row }: any) => {
        const info = row?.original;
        return (
          <>
            {info?.dataEditable >= 0
              ? getTranslatedValue(
                `Enum:DataEditableType.${dataEditableTypeEnum[
                info?.dataEditable as keyof typeof dataEditableTypeEnum
                ]
                }`,
              )
              : '-'}
          </>
        );
      },
    });
  }

  if (
    deviceModelProtocolId === 1 ||
    deviceModelProtocolId === 2 ||
    deviceModelProtocolId === 3
  ) {
    devicesModelModbusInfoTableHeaders.push({
      header: getTranslatedValue('FunctionType'),
      sort: 'FunctionType',
      accessorKey: 'functionType',
      cell: ({ row }: any) => {
        const info = row?.original;
        return (
          <>
            {info?.functionType >= 0
              ? getTranslatedValue(
                `Enum:DeviceModelModbusFunctionType.${deviceModelModbusFunctionType[
                info?.functionType as keyof typeof deviceModelModbusFunctionType
                ]
                }`,
              )
              : '-'}
          </>
        );
      },
    });
  }

  if (deviceModelProtocolId !== 9 && deviceModelProtocolId !== 10) {
    devicesModelModbusInfoTableHeaders.push({
      header: getTranslatedValue('Description'),
      sort: 'DataDescription',
      accessorKey: 'dataDescription',
    });
  }

  if (
    deviceModelProtocolId === 1 ||
    deviceModelProtocolId === 2 ||
    deviceModelProtocolId === 3 ||
    deviceModelProtocolId === 6 ||
    deviceModelProtocolId === 7 ||
    deviceModelProtocolId === 8
  ) {
    devicesModelModbusInfoTableHeaders.push({
      header: getTranslatedValue('em_modbus_table_address'),
      sort: 'ModbusAddress',
      accessorKey: 'modbusAddress',
    });
  }
  devicesModelModbusInfoTableHeaders.push({
    header: getTranslatedValue('Actions'),
    sort: '',
    accessorKey: '',
    cell: ({ row }: any) => {
      const info = row?.original;

      return (
        <ActionButtons
          queryKey={queryKey}
          deleteUrl={`app/device-model-modbus-tables/${info?.id}?api-version=${import.meta.env.VITE_API_VERSION
            }`}
          updateHandler={() => {
            onEdit?.(row?.original);
          }}
        />
      );
    },
  });
  return devicesModelModbusInfoTableHeaders;
};
