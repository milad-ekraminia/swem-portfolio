import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import ActionButtons from '@/components/ui/action/action-buttons';
import { StatusIcon } from '@/components/ui/status-icon';

export const workOrderCostTypesColumns = ({ onEdit }: { onEdit: any }) => [
  {
    header: getTranslatedValue('Active'),
    accessorKey: 'Active',
    sort: 'Active',
    size: 200,
    cell: ({ row }: any) => {
      return <>{<StatusIcon status={row?.original?.active} />}</>;
    },
  },
  {
    header: getTranslatedValue('TypeDescription'),
    accessorKey: 'TypeDescription',
    sort: 'TypeDescription',
    size: 200,
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
          deleteUrl={`app/work-order-cost-types/${row?.original?.id.toString()}?api-version=${
            import.meta.env.VITE_API_VERSION
          }`}
          queryKey={'Work Order Cost Types List'}
          disabledDelete={!getPermission('WebNet.WorkOrderCostTypes.Delete')}
          disabledEdit={!getPermission('WebNet.WorkOrderCostTypes.Edit')}
          updateHandler={() => {
            onEdit?.(row?.original);
          }}
        />
      );
    },
  },
];
