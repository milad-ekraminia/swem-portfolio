import ActionWithRemoveItemButtonBox from '@/components/ui/action/action-with-remove-item-button-box';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import {
  dataEditableTypeEnum,
  dataTypeEnum,
  deviceModelModbusFunctionType,
  deviceMultiplierType,
  qosTypeEnum,
} from './enum';

export const UploaderExcelDevicesModelModbusInfoTableHeaders = ({
  deviceModelProtocolId,
  formulaList,
  deleteItemHandler,
  editActionHandler,
}: {
  deviceModelProtocolId: any;
  formulaList: any;
  deleteItemHandler: any;
  editActionHandler: any;
}) => {
  const uploadedExceldevicesModelModbusInfoTableHeaders = [
    {
      header: getTranslatedValue('Actions'),
      sort: '',
      accessorKey: '',
      cell: ({ row }: any) => {
        return (
          <ActionWithRemoveItemButtonBox
            deleteItemHandler={() => deleteItemHandler(row?.index)}
            editActionHandler={() =>
              editActionHandler(row?.original, row?.index)
            }
          />
        );
      },
    },
    {
      header: getTranslatedValue('em_modbus_table_label'),
      accessorKey: 'labelId',
      sort: 'LabelId',
      cell: ({ row }: any) => {
        const info = row?.original;
        const hasError = info?.labelId?.toString() == 0;
        return (
          <span style={{ color: hasError ? '#ef4444 ' : '' }}>
            {info?.labelName}
          </span>
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
    uploadedExceldevicesModelModbusInfoTableHeaders.push({
      header: getTranslatedValue('OpcTagName'),
      sort: 'OpcTagName',
      accessorKey: 'opcTagName',
    });
  }
  if (deviceModelProtocolId !== 10) {
    uploadedExceldevicesModelModbusInfoTableHeaders.push({
      header: getTranslatedValue('em_modbus_table_data_type'),
      sort: 'DataTypeId',
      accessorKey: 'dataTypeId',
      cell: ({ row }: any) => {
        const info = row?.original;
        return (
          <>
            {info?.dataTypeId
              ? getTranslatedValue(
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
    uploadedExceldevicesModelModbusInfoTableHeaders.push({
      header: getTranslatedValue('TopicName'),
      sort: 'TopicName',
      accessorKey: 'topicName',
    });
    uploadedExceldevicesModelModbusInfoTableHeaders.push({
      header: getTranslatedValue('SubTopicName'),
      sort: 'SubTopicName',
      accessorKey: 'subTopicName',
    });
    uploadedExceldevicesModelModbusInfoTableHeaders.push({
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
    uploadedExceldevicesModelModbusInfoTableHeaders.push({
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
    uploadedExceldevicesModelModbusInfoTableHeaders.push({
      header: getTranslatedValue('FunctionType'),
      sort: 'FunctionType',
      accessorKey: 'functionType',
      cell: ({ row }: any) => {
        const info = row?.original;
        return (
          <>
            {info?.functionType
              ? getTranslatedValue(
                `Enum:DeviceModelModbusFunctionType.${deviceModelModbusFunctionType[info?.functionType as keyof typeof deviceModelModbusFunctionType]}`,
              )
              : '-'}
          </>
        );
      },
    });
  }

  if (deviceModelProtocolId !== 9 && deviceModelProtocolId !== 10) {
    uploadedExceldevicesModelModbusInfoTableHeaders.push({
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
    uploadedExceldevicesModelModbusInfoTableHeaders.push({
      header: getTranslatedValue('em_modbus_table_address'),
      sort: 'ModbusAddress',
      accessorKey: 'modbusAddress',
    });
  }
  return uploadedExceldevicesModelModbusInfoTableHeaders;
};
