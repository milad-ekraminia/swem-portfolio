import { workOrderActionTypeList } from '@/enum-data/bys/bys-data';
import { dateFormatter } from '@/helpers/format-data';
import { getTranslatedValue } from '@/helpers/get-translated-value';

export const workOrderActions = ({ userLookup }: { userLookup: any }) => [
  {
    header: getTranslatedValue('Action'),
    accessorKey: 'action',
    size: 300,
    cell: ({ row }: any) => {
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
    accessorKey: 'subscriberUserName',
    size: 200,
    cell: ({ row }: any) => {
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
    accessorKey: 'date',
    sort: 'Date',
    size: 300,
    cell: ({ row }: any) => {
      const info = row?.original;
      return <>{dateFormatter(info?.actionDateTime, true)}</>;
    },
  },
];
