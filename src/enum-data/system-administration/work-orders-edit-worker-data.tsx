import { generateTimeOptions } from '@/helpers/generate-time-options';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import DeleteActionButton from '@/components/ui/action/delete-action-button';

export const workOrderWorkers = ({
  userLookup,
  queryKey,
}: {
  userLookup: any;
  queryKey: string;
}) => [
  {
    header: getTranslatedValue('Worker'),
    accessorKey: 'warehouse.name',
    sort: 'Warehouse.Name',
    size: 500,
    cell: ({ row }: any) => {
      const info = row?.original;
      return (
        <>
          {userLookup?.find((elem: any) => elem?.id === info?.userId)
            ?.displayName ?? '-'}
        </>
      );
    },
  },
  {
    header: getTranslatedValue('WorkerWorkTime'),
    accessorKey: 'WorkerWorkTime',
    sort: 'WorkerWorkTime',
    size: 550,
    cell: ({ row }: any) => {
      const info = row?.original;
      const workerTime = generateTimeOptions();

      return (
        <>
          {workerTime?.find((elem) => elem?.value === info?.workerWorkTime)
            ?.title ?? '-'}
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
        <DeleteActionButton
          deleteUrl={`app/work-orders/worker-from-work-order/${
            row?.original?.id
          }?api-version=${import.meta.env.VITE_API_VERSION}`}
          queryKey={queryKey}
        />
      );
    },
  },
];
