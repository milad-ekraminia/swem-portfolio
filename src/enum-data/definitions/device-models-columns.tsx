import ActionButtons from '@/components/ui/action/action-buttons';
import { StatusIcon } from '@/components/ui/status-icon';
import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { DeviceModelProtocolTypeEnum, DeviceModelTypeEnum } from './enum';

export const deviceModelsTableHeaders = ({
  onEdit,
  queryKey,
}: {
  onEdit: any;
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
      size: 200,
    },
    {
      header: getTranslatedValue('DeviceModelCode'),
      accessorKey: 'deviceModelCode',
      sort: 'DeviceModelCode',
      size: 200,
    },
    {
      header: getTranslatedValue('DeviceModelTypeId'),
      accessorKey: 'deviceModelTypeId',
      sort: 'DeviceModelTypeId',
      size: 200,

      cell: ({ row }: any) => {
        const info = row?.original;
        return (
          <>
            {getTranslatedValue(
              'Enum:DeviceModelType.' +
              DeviceModelTypeEnum[
              info?.deviceModelTypeId as keyof typeof DeviceModelTypeEnum
              ],
            ) ?? '-'}
          </>
        );
      },
    },
    {
      header: getTranslatedValue('DeviceModelProtocolId'),
      accessorKey: 'deviceModelProtocolId',
      sort: 'DeviceModelProtocolId',
      cell: ({ row }: any) => {
        const info = row?.original;
        return (
          <>
            {getTranslatedValue(
              'Enum:DeviceModelProtocolType.' +
              DeviceModelProtocolTypeEnum[
              info?.deviceModelProtocolId as keyof typeof DeviceModelProtocolTypeEnum
              ],
            ) ?? '-'}
          </>
        );
      },
    },

    //   {
    //     header: getTranslatedValue("Actions"),
    //     accessorKey: "",
    //     sort: "",
    //     size: 50,
    //     cell: ({ row }: any) => {
    //       return (
    //         <ActionButtons
    //           deleteUrl={`app/device-models/${row?.original?.id}?api-version=${
    //             import.meta.env.VITE_API_VERSION
    //           }`}
    //           queryKey={queryKey}
    //           updateHandler={() => {
    //             onEdit?.(row?.original);
    //           }}
    //         />
    //       );
    //     },
    //   },
    {
      header: getTranslatedValue('Actions'),
      accessorKey: '',
      sort: '',
      size: 100,
      cell: ({ row }: any) => {
        return (
          <ActionButtons
            deleteUrl={`app/device-models/${row?.original?.id}?api-version=${import.meta.env.VITE_API_VERSION
              }`}
            disabledDelete={!getPermission('WebNet.DeviceModels.Delete')}
            disabledEdit={!getPermission('WebNet.DeviceModels.Edit')}
            queryKey={queryKey}
            updateHandler={() => {
              onEdit?.(row?.original);
            }}
          />
        );
      },
    },
  ];
