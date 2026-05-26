import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import ActionButtons from '@/components/ui/action/action-buttons';
import { StatusIcon } from '@/components/ui/status-icon';

export const workOrderTypes = ({ onEdit }: { onEdit: any }) => [
  {
    header: getTranslatedValue('Active'),
    accessorKey: 'Active',
    sort: 'Active',
    size: 100,
    cell: ({ row }: any) => {
      return <>{<StatusIcon status={row?.original?.active} />}</>;
    },
  },
  {
    header: getTranslatedValue('WorkOrderType'),
    accessorKey: 'WorkOrderTypes',
    sort: 'TypeDescription',
    size: 1000,
    cell: ({ row }: any) => {
      const info = row?.original;
      return <>{info?.typeDescription ?? '-'}</>;
    },
  },
  {
    header: getTranslatedValue('Actions'),
    accessorKey: '',
    sort: '',
    size: 200,
    cell: ({ row }: any) => {
      return (
        <ActionButtons
          deleteUrl={`app/work-order-types/${row?.original?.id.toString()}?api-version=${
            import.meta.env.VITE_API_VERSION
          }`}
          queryKey={'Get Work Order Types'}
          disabledDelete={!getPermission('WebNet.WorkOrderTypes.Delete')}
          disabledEdit={!getPermission('WebNet.WorkOrderTypes.Edit')}
          updateHandler={() => {
            onEdit?.(row?.original);
          }}
        />
      );
    },
  },
];
