import ActionButtons from '@/components/ui/action/action-buttons';
import { StatusIcon } from '@/components/ui/status-icon';
import StatusTag from '@/components/ui/status-tag/status-tag';
import { formatNumberWithCommas } from '@/helpers/format-number-with-commas';
import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { displayNameListItemType } from '@/types/pages/definitions/multi-conditional-statuses';
import { alarmLevelType, alarmWorkingType, MCSControlArea } from './enum';

export const AlarmConfigurationsTableColumns = ({
  devicesList = [],
  labelsList = [],
  timePeriodsList = [],
  onEdit,
  queryKey,
}: {
  devicesList?: any[];
  labelsList?: any[];
  timePeriodsList?: any[];
  onEdit?: (row: any) => void;
  queryKey: string;
}) => [
    {
      header: getTranslatedValue('State'),
      accessorKey: 'active',
      sort: 'active',
      size: 50,
      cell: ({ row }: any) => {
        return <>{<StatusIcon status={row?.original?.active} />}</>;
      },
    },
    {
      header: getTranslatedValue('AlarmDescription'),
      accessorKey: 'alarmConfDescription',
      sort: 'alarmConfDescription',
    },
    {
      header: getTranslatedValue('Device'),
      accessorKey: 'alarmConfDeviceId',
      sort: 'alarmConfDeviceId',
      cell: ({ row }: any) => {
        return (
          <>
            {devicesList?.find(
              (elem: displayNameListItemType) =>
                elem?.id === row?.original?.alarmConfDeviceId,
            )?.displayName ?? '-'}
          </>
        );
      },
    },
    {
      header: getTranslatedValue('OrganizationName'),
      accessorKey: 'organizationName',
      sort: '',
    },
    {
      header: getTranslatedValue('Label'),
      accessorKey: 'alarmConfLabelId',
      sort: 'alarmConfLabelId',
      cell: ({ row }: any) => {
        const info = row?.original;
        return (
          <>
            {labelsList?.find(
              (elem: displayNameListItemType) =>
                elem?.id === info?.alarmConfLabelId,
            )?.displayName ?? '-'}
          </>
        );
      },
    },
    {
      header: getTranslatedValue('AlarmLevel'),
      accessorKey: 'alarmConfLevel',
      sort: '',
      cell: ({ row }: any) => {
        const info = row?.original;

        const color =
          Number(info?.alarmConfLevel) === 1
            ? 'warning'
            : Number(info?.alarmConfLevel) === 2
              ? 'orange'
              : Number(info?.alarmConfLevel) === 3
                ? 'danger'
                : 'success';
        return (
          <>
            <StatusTag
              color={color}
              label={
                getTranslatedValue(
                  alarmLevelType[
                  info?.alarmConfLevel as keyof typeof alarmLevelType
                  ],
                ) ?? '-'
              }
            />
          </>
        );
      },
    },
    {
      header: getTranslatedValue('AlarmWorkingType'),
      accessorKey: 'alarmWorkingType',
      sort: '',
      cell: ({ row }: any) => {
        const info = row?.original;
        return (
          <>
            {getTranslatedValue(
              `Enum:AlarmWorkingType.${alarmWorkingType[info?.alarmWorkingType as keyof typeof alarmWorkingType]}`,
            ) ?? '-'}
          </>
        );
      },
    },
    {
      header: getTranslatedValue('AlarmConfControlArea'),
      accessorKey: 'alarmConfControlArea',
      sort: '',
      cell: ({ row }: any) => {
        const info = row?.original;
        return (
          <>
            {getTranslatedValue(
              `Enum:MCSControlArea.${MCSControlArea[info?.alarmConfControlArea as keyof typeof MCSControlArea]}`,
            ) ?? '-'}
          </>
        );
      },
    },
    {
      header: getTranslatedValue('AlarmConfMinimum'),
      accessorKey: 'alarmConfMinimum',
      sort: '',
      cell: ({ row }: any) => {
        const info = row?.original;
        return <>{formatNumberWithCommas(info?.alarmConfMinimum, 4) ?? '-'}</>;
      },
    },
    {
      header: getTranslatedValue('AlarmConfMaximum'),
      accessorKey: 'alarmConfMaximum',
      sort: '',
      cell: ({ row }: any) => {
        const info = row?.original;
        return <>{formatNumberWithCommas(info?.alarmConfMaximum, 4) ?? '-'}</>;
      },
    },
    {
      header: getTranslatedValue('AlarmConfPinNumber'),
      accessorKey: 'alarmConfPinNumber',
      sort: '',
    },
    {
      header: getTranslatedValue('NormalValue'),
      accessorKey: 'alarmConfTimePeriodId',
      sort: '',
      cell: ({ row }: any) => {
        return (
          <>
            {timePeriodsList?.find(
              (elem: displayNameListItemType) =>
                elem?.id === row?.original?.alarmConfTimePeriodId,
            )?.displayName ?? '-'}
          </>
        );
      },
    },

    {
      header: getTranslatedValue('Actions'),
      accessorKey: '',
      sort: '',
      size: 100,
      cell: ({ row }: any) => {
        return (
          <ActionButtons
            deleteUrl={`app/alarm-configurations/${row?.original?.id}?api-version=${import.meta.env.VITE_API_VERSION}`}
            queryKey={queryKey}
            disabledDelete={!getPermission('WebNet.AlarmConfigurations.Delete')}
            disabledEdit={!getPermission('WebNet.AlarmConfigurations.Edit')}
            updateHandler={() => {
              onEdit?.(row?.original);
            }}
          />
        );
      },
    },
  ];
