import AlarmLevelBadge from '@/components/ui/alarm-level-badge/alarm-level-badge';
import { dateFormatter } from '@/helpers/format-data';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { ApproveAlarmComponent } from '../organization-trace/approve-alarm';
import { alarmConfLevelOptions, alarmStatusEnum } from './reports-data';

export const getColumns = ({ refetch }: { refetch: any }) => {
  return [
    {
      header: getTranslatedValue('Device'),
      sort: '',
      accessorKey: 'deviceDescription',
    },
    {
      header: getTranslatedValue('Organization'),
      sort: '',
      accessorKey: 'deviceOrganizationName',
    },
    {
      header: getTranslatedValue('DeviceModelId'),
      sort: '',
      accessorKey: 'deviceModelName',
    },
    {
      header: getTranslatedValue('AlarmDescription'),
      sort: '',
      accessorKey: 'alarmDescription',
    },
    {
      header: getTranslatedValue('Label'),
      sort: 'LabelName',
      accessorKey: 'labelName',
    },
    {
      header: getTranslatedValue('AlarmLevel'),
      sort: '',
      accessorKey: 'alarmConfLevel',
      cell: ({ row }: any) => {
        const getIconColor = () => {
          if (row?.original?.alarmConfLevel === 2) return '#EF6820';
          if (row?.original?.alarmConfLevel === 3) return '#D92D20';
          if (row?.original?.alarmConfLevel === 1) return '#FDB022';
          return '';
        };
        const getColorName = () => {
          if (row?.original?.alarmConfLevel === 2) return 'orange';
          if (row?.original?.alarmConfLevel === 3) return 'red';
          if (row?.original?.alarmConfLevel === 1) return 'yellow';
          return '';
        };
        return (
          <AlarmLevelBadge color={getColorName() as any}>
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '100%',
                backgroundColor: getIconColor(),
                padding: '4px',
              }}
            />
            <span>
              {alarmConfLevelOptions[
                row.original
                  ?.alarmConfLevel as keyof typeof alarmConfLevelOptions
              ] ?? '-'}
            </span>
          </AlarmLevelBadge>
        );
      },
    },
    {
      header: getTranslatedValue('AlarmValue'),
      sort: '',
      accessorKey: 'alarmValue',
    },
    {
      header: getTranslatedValue('CreationTime'),
      sort: '',
      accessorKey: 'creationTime',
      cell: ({ row }: any) =>
        dateFormatter(row.original?.creationTime, true, true),
    },
    {
      header: getTranslatedValue('AlarmTime'),
      sort: '',
      accessorKey: 'alarmTime',
    },
    {
      header: getTranslatedValue('UpdatedBy'),
      sort: '',
      accessorKey: 'lastUpdateUserFullName',
    },
    {
      header: getTranslatedValue('AlarmState'),
      sort: '',
      accessorKey: 'alarmStatus',
      cell: ({ row }: any) => {
        return (
          alarmStatusEnum[
          row.original?.alarmStatus as keyof typeof alarmStatusEnum
          ] ?? '-'
        );
      },
    },
    {
      header: getTranslatedValue('AlarmApproval'),
      accessorKey: 'AlarmApproved',
      sort: 'AlarmApproved',
      cell: ({ row }: any) => {
        return <ApproveAlarmComponent isAll row={row} refetch={refetch} />;
      },
    },
    {
      header: getTranslatedValue('ApprovalDate'),
      sort: '',
      accessorKey: 'alarmApprovedDateTime',
      cell: ({ row }: any) =>
        row.original?.alarmApprovedDateTime
          ? dateFormatter(row.original?.alarmApprovedDateTime, true)
          : '-',
    },
    {
      header: getTranslatedValue('ApprovedBy'),
      sort: '',
      accessorKey: 'alarmApprovedUserFullName',
    },
  ];
};

// Helper to extract field value by name
export const getFieldValue = (fields: any, fieldName: string) => {
  const idx = fields?.findIndex((item: any) => item.fieldName === fieldName);
  if (idx === -1 || idx === undefined) return null;
  return fields[idx]?.fieldValue;
};

export const getNumberFieldValue = (fields: any, fieldName: string) => {
  const value = getFieldValue(fields, fieldName);
  return value !== undefined &&
    value !== null &&
    !isNaN(Number(value)) &&
    Number(value) > -1
    ? Number(value)
    : null;
};
