import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import ActionButtons from '@/components/ui/action/action-buttons';
import { StatusIcon } from '@/components/ui/status-icon';
import { DeviceModelTypeEnum } from './enum';

export const devicesModelModbusTableHeaders = ({
  onEdit,
  queryKey,
}: {
  onEdit?: (row: any) => void;
  queryKey: string;
}) => [
  {
    header: getTranslatedValue('Active'),
    accessorKey: 'active',
    sort: 'Active',
    size: 50,
    cell: ({ row }: any) => {
      return <>{<StatusIcon status={row?.original?.active} />}</>;
    },
  },
  {
    header: getTranslatedValue('DeviceModelName'),
    accessorKey: 'deviceModelName',
    sort: 'DeviceModelName',
    size: 170,
  },
  {
    header: getTranslatedValue('DeviceModelTypeId'),
    accessorKey: 'deviceModelTypeId',
    sort: 'DeviceModelTypeId',
    size: 170,

    cell: ({ row }: any) => {
      const item: number = row?.original?.deviceModelTypeId;
      return (
        <>
          {' '}
          {getTranslatedValue(
            'Enum:DeviceModelType.' +
              DeviceModelTypeEnum[item as keyof typeof DeviceModelTypeEnum],
          )}
        </>
      );
    },
  },
  {
    header: getTranslatedValue('DeviceModelCode'),
    accessorKey: 'deviceModelCode',
    sort: 'DeviceModelCode',
    size: 170,
  },

  ...(getPermission('WebNet.DeviceModelModbusTables.Edit')
    ? [
        {
          header: getTranslatedValue('Actions'),
          accessorKey: '',
          sort: '',
          size: 100,
          cell: ({ row }: any) => (
            <ActionButtons
              queryKey={queryKey}
              updateHandler={() => {
                onEdit?.(row?.original);
              }}
            />
          ),
        },
      ]
    : []),
];
