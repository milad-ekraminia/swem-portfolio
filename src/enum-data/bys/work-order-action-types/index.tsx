import { workOrderActionTypeList } from '@/enum-data/bys/bys-data';
import { dateFormatter } from '@/helpers/format-data';
import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import ActionButtons from '@/components/ui/action/action-buttons';

export const workOrderActionTypes = ({
  onEdit,
  usersList,
}: {
  onEdit: any;
  usersList: any;
}) => [
  {
    header: getTranslatedValue('WorkOrderId'),
    accessorKey: 'workOrderDescription',
    sort: 'WorkOrderId',
    size: 200,
  },
  {
    header: getTranslatedValue('ActionUserId'),
    accessorKey: 'ActionUserId',
    sort: 'ActionUserId',
    size: 200,
    cell: ({ row }: any) => {
      const info = row?.original;
      return (
        <>
          {info?.actionUserId
            ? usersList?.find(
                (elem: { id: string; displayName: string }) =>
                  elem?.id === info?.actionUserId,
              )?.displayName
            : '-'}
        </>
      );
    },
  },
  {
    header: getTranslatedValue('ActionDateTime'),
    accessorKey: 'ActionDateTime',
    sort: 'ActionDateTime',
    size: 200,
    cell: ({ row }: any) => {
      const info = row?.original;
      return <>{dateFormatter(info?.actionDateTime)}</>;
    },
  },
  {
    header: getTranslatedValue('ActionType'),
    accessorKey: 'ActionType',
    sort: 'ActionType',
    size: 200,
    cell: ({ row }: any) => {
      const info = row?.original;
      return (
        <>
          {info?.actionType
            ? workOrderActionTypeList?.find(
                (elem: any) => elem?.id === info?.actionType,
              )?.value
            : '-'}
        </>
      );
    },
  },
  {
    header: getTranslatedValue('ActionDescription'),
    accessorKey: 'actionDescription',
    sort: 'ActionDescription',
    size: 200,
  },
  {
    header: getTranslatedValue('Actions'),
    accessorKey: '',
    sort: '',
    size: 200,
    cell: ({ row }: any) => {
      return (
        <ActionButtons
          deleteUrl={`app/work-order-actions/${row?.original?.id.toString()}?api-version=${
            import.meta.env.VITE_API_VERSION
          }`}
          queryKey={'Get Work Order Actions List'}
          disabledDelete={!getPermission('WebNet.WorkOrderActions.Delete')}
          disabledEdit={!getPermission('WebNet.WorkOrderActions.Edit')}
          updateHandler={() => {
            onEdit?.(row?.original);
          }}
        />
      );
    },
  },
];
