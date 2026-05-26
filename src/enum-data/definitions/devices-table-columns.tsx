import ActionButtons from '@/components/ui/action/action-buttons';
import { StatusIcon } from '@/components/ui/status-icon';
import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';

export const DevicesTableColumns = ({
  deviceModelResponse,
  organizationResponse,
  deviceCategoryResponse,
  deviceAccessPointResponse,
  onEdit,
  queryKey,
}: {
  deviceModelResponse?: any;
  organizationResponse?: any;
  deviceCategoryResponse?: any;
  deviceAccessPointResponse?: any;
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
      header: getTranslatedValue('Description'),
      accessorKey: 'deviceDescription',
      sort: 'DeviceDescription',
    },
    {
      header: getTranslatedValue('DeviceModel'),
      accessorKey: 'deviceModelId',
      sort: 'DeviceModelId',
      cell: ({ row }: any) => {
        return (
          <>
            {deviceModelResponse?.items?.find(
              (item: any) => item?.id === row?.original?.deviceModelId,
            )?.displayName ?? '-'}
          </>
        );
      },
    },
    {
      header: getTranslatedValue('DeviceSerialNr'),
      accessorKey: 'deviceSerialNr',
      sort: 'DeviceSerialNr',
    },
    {
      header: getTranslatedValue('DeviceCommAddress'),
      accessorKey: 'deviceCommAddress',
      sort: 'DeviceCommAddress',
    },
    {
      header: getTranslatedValue('Organization'),
      accessorKey: 'deviceOrganizationId',
      sort: 'DeviceOrganizationId',
      cell: ({ row }: any) => {
        return (
          <>
            {organizationResponse?.items?.find(
              (item: any) => item?.id === row?.original?.deviceOrganizationId,
            )?.displayName ?? '-'}
          </>
        );
      },
    },
    {
      header: getTranslatedValue('DeviceCategoryId'),
      accessorKey: 'deviceCategoryId',
      sort: 'DeviceCategoryId',
      size: 100,
      cell: ({ row }: any) => {
        return (
          <>
            {deviceCategoryResponse?.items?.find(
              (item: any) => item?.id === row?.original?.deviceCategoryId,
            )?.displayName ?? '-'}
          </>
        );
      },
    },
    {
      header: getTranslatedValue('DeviceAccessPointId'),
      accessorKey: 'deviceAccessPointId',
      sort: 'DeviceAccessPointId',
      cell: ({ row }: any) => {
        return (
          <>
            {deviceAccessPointResponse?.items?.find(
              (item: any) => item?.id === row?.original?.deviceAccessPointId,
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
            disabledDelete={!getPermission('WebNet.Devices.Delete')}
            disabledEdit={!getPermission('WebNet.Devices.Edit')}
            deleteUrl={`app/devices/${row?.original?.id}?api-version=${import.meta.env.VITE_API_VERSION}`}
            queryKey={queryKey}
            updateHandler={() => {
              onEdit?.(row?.original);
            }}
          />
        );
      },
    },
  ];
