import { workOrderActionTypeList } from '@/enum-data/bys/bys-data';
import { dateFormatter } from '@/helpers/format-data';
import { getTranslatedValue } from '@/helpers/get-translated-value';

export const WorkOrdersLogColumns = ({ userLookup }: { userLookup: any }) => [
  {
    header: getTranslatedValue('WorkOrderState'),
    accessorKey: 'WorkOrderState',
    sort: 'WorkOrderState',
    // size: 100,
    cell: ({ row }: { row: any }) => {
      const info = row?.original;
      return (
        <>
          {workOrderActionTypeList?.find(
            (elem) => elem?.id === info?.actionType,
          )?.value ?? '-'}
        </>
      );
    },
  },
  {
    header: getTranslatedValue('SubscriberUserName'),
    accessorKey: 'SubscriberUserName',
    sort: 'SubscriberUserName',
    // size: 100,
    cell: ({ row }: { row: any }) => {
      const info = row?.original;
      return (
        <>
          {userLookup?.find((elem: any) => elem?.id === info?.actionUserId)
            ?.displayName ?? '-'}
        </>
      );
    },
  },
  {
    header: getTranslatedValue('Date'),
    accessorKey: 'Date',
    sort: 'Date',
    // size: 100,
    cell: ({ row }: { row: any }) => {
      const info = row?.original;
      return <>{dateFormatter(info?.actionDateTime, true)}</>;
    },
  },
];
