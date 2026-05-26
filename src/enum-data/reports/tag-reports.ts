import { getTranslatedValue } from '@/helpers/get-translated-value';

export const getTagReportsColumns = () => {
  return [
    {
      header: getTranslatedValue('OrganizationName'),
      accessorKey: 'organizationName',
      sort: 'OrganizationName',
    },
    {
      header: getTranslatedValue('SubOrganizationName'),
      accessorKey: 'subOrganization',
      sort: 'SubOrganization',
    },
    {
      header: getTranslatedValue('AccessPointName'),
      accessorKey: 'accessPointName',
      sort: 'AccessPointName',
    },
    {
      header: getTranslatedValue('AccessPointIp'),
      accessorKey: 'accessPointIp',
      sort: 'AccessPointIp',
    },
    {
      header: getTranslatedValue('AccessPointPort'),
      accessorKey: 'accessPointPort',
      sort: 'AccessPointPort',
    },
    {
      header: getTranslatedValue('DeviceName'),
      accessorKey: 'deviceDescription',
      sort: 'DeviceDescription',
    },
    {
      header: getTranslatedValue('ProtocolType'),
      accessorKey: 'protocol',
      sort: 'Protocol',
    },
    {
      header: getTranslatedValue('DeviceModelName'),
      accessorKey: 'deviceModelName',
      sort: 'DeviceModelName',
    },
    {
      header: getTranslatedValue('LabelName'),
      accessorKey: 'labelName',
      sort: 'LabelName',
    },
    {
      header: getTranslatedValue('DeviceCommAddress'),
      accessorKey: 'deviceCommAddress',
      sort: 'DeviceCommAddress',
    },
    {
      header: getTranslatedValue('FunctionType'),
      accessorKey: 'functionType',
      sort: 'FunctionType',
    },
    {
      header: getTranslatedValue('Address'),
      accessorKey: 'modbusAddress',
      sort: 'ModbusAddress',
    },
    {
      header: getTranslatedValue('DataTypeName'),
      accessorKey: 'dataTypeName',
      sort: 'DataTypeName',
    },
    {
      header: getTranslatedValue('TagReportDeviceSerialNr'),
      accessorKey: 'deviceSerialNr',
      sort: 'DeviceSerialNr',
    },
  ];
};
