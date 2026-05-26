import { getTranslatedValue } from '@/helpers/get-translated-value';
import DeleteActionButton from '@/components/ui/action/delete-action-button';

export const workOrderCostsTableColumns = ({
  workOrderCostTypeLookup,
  queryKey,
}: {
  workOrderCostTypeLookup: any;
  queryKey: any;
}) => [
  {
    header: getTranslatedValue('TypeDescription'),
    accessorKey: 'warehouse.name',
    sort: 'Warehouse.Name',
    size: 300,
    cell: ({ row }: any) => {
      const info = row?.original;
      return (
        <>
          {workOrderCostTypeLookup?.find(
            (elem: { id: number }) => elem?.id === info?.workOrderCostTypeId,
          )?.displayName ?? '-'}
        </>
      );
    },
  },
  {
    header: getTranslatedValue('Cost'),
    accessorKey: 'cost',
    sort: 'cost',
    size: 300,
    cell: ({ row }: any) => {
      const info = row?.original;

      return <>{info?.cost ?? '-'}</>;
    },
  },

  {
    header: getTranslatedValue('Description'),
    accessorKey: 'Description',
    sort: 'Description',
    size: 300,
    cell: ({ row }: any) => {
      const info = row?.original;

      return <>{info?.description ?? '-'}</>;
    },
  },
  {
    header: getTranslatedValue('Actions'),
    accessorKey: '',
    sort: '',
    size: 100,
    cell: ({ row }: any) => {
      return (
        <DeleteActionButton
          deleteUrl={`app/work-orders/cost-from-work-order/${
            row?.original?.id
          }?api-version=${import.meta.env.VITE_API_VERSION}`}
          queryKey={queryKey}
        />
      );
    },
  },
];
