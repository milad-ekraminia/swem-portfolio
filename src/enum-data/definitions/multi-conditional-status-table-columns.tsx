import ActionButtons from '@/components/ui/action/action-buttons';
import { StatusIcon } from '@/components/ui/status-icon';
import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { alarmLevelType } from './enum';

export const MultiConditionalStatusTableColumns = ({
  onEdit,
  queryKey,
}: {
  onEdit?: (row: any) => void;
  queryKey: string;
}) => [
    {
      header: getTranslatedValue('Description'),
      accessorKey: 'mcsDescription',
      sort: 'MCSDescription',
    },
    {
      header: getTranslatedValue('MCSThresholdTime'),
      accessorKey: 'mcsThresholdTime',
      sort: 'MCSThresholdTime',
      cell: ({ row }: any) => {
        const info = row?.original;
        return (
          <>
            {info?.mcsThresholdTime}{' '}
            {getTranslatedValue(
              `MCSThresholdTimeUnit.${info?.mcsThresholdTimeUnit}`,
            )}
          </>
        );
      },
    },
    {
      header: getTranslatedValue('MCSFormula'),
      accessorKey: 'mcsFormula',
      sort: 'MCSFormula',
    },
    {
      header: getTranslatedValue('MCSCreateAlarm'),
      accessorKey: 'mcsCreateAlarm',
      sort: 'MCSCreateAlarm',
      size: 50,
      cell: ({ row }: any) => {
        return <>{<StatusIcon status={row?.original?.mcsCreateAlarm} />}</>;
      },
    },
    {
      header: getTranslatedValue('MCSAlarmLevel'),
      accessorKey: 'mcsAlarmLevel',
      sort: 'MCSAlarmLevel',
      cell: ({ row }: any) => {
        const info = row?.original;
        return (
          <>
            {getTranslatedValue(
              `Enum:AlarmLevelType.${alarmLevelType[info?.mcsAlarmLevel as keyof typeof alarmLevelType]}`,
            )}
          </>
        );
      },
    },
    {
      header: getTranslatedValue('Status'),
      accessorKey: 'active',
      sort: 'Active',
      size: 50,
      cell: ({ row }: any) => {
        return <>{<StatusIcon status={row?.original?.active} />}</>;
      },
    },

    {
      header: getTranslatedValue('Actions'),
      accessorKey: '',
      sort: '',
      size: 50,
      cell: ({ row }: any) => {
        return (
          <ActionButtons
            deleteUrl={`app/multi-conditional-statuses/${row?.original?.id}?api-version=${import.meta.env.VITE_API_VERSION}`}
            queryKey={queryKey}
            disabledDelete={
              !getPermission('WebNet.MultiConditionalStatuses.Delete')
            }
            disabledEdit={!getPermission('WebNet.MultiConditionalStatuses.Edit')}
            updateHandler={() => {
              onEdit?.(row?.original);
            }}
          />
        );
      },
    },
  ];
