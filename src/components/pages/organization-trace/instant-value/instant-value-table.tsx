import Table from '@/components/ui/table/table';
import { deviceInverterInstantValueTableHeaders } from '@/enum-data/organization-trace/org-trace-index';
import { tableDescriptionHelper } from '@/helpers/table-description-helper';
import { fetchValidDataReadDateTime } from '@/services/organization-trace';
import { fetchDeviceInstantValue } from '@/services/organization-trace/instant-value';
import { ISort } from '@/types/components/ui/table';
import { useQueries } from '@tanstack/react-query';
import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { InstantValueTableHeader } from './instant-value-table-header';

const MemoInstantValueTable = () => {
  const treeData = useSelector((state: any) => state?.tree?.info);
  const [sorting, setSorting] = useState<ISort>([]);

  const results = useQueries({
    queries: [
      {
        queryKey: [
          'Fetch device instant value list',
          treeData?.tree_id,
          sorting,
        ],
        queryFn: () =>
          fetchDeviceInstantValue({
            tree_id: treeData?.tree_id,
            sortData: sorting,
          }),
        retry: false,
        enabled: !!treeData?.tree_id,
      },
      {
        queryKey: ['Fetch valid data read date time', treeData?.tree_id],
        queryFn: () =>
          fetchValidDataReadDateTime({
            tree_id: treeData?.tree_id,
          }),
        retry: false,
        enabled: !!treeData?.tree_id,
      },
    ],
  });

  // Destructure results for clarity
  const [
    fetchDeviceInverterStatusResponse,
    fetchValidDataReadDateTimeResponse,
  ] = results;

  // Extract data and loading states
  const { data, isLoading } = fetchDeviceInverterStatusResponse;
  const { data: validDataReadDateTime } = fetchValidDataReadDateTimeResponse;

  return (
    <Table
      data={data?.items?.length ? data.items : []}
      columns={deviceInverterInstantValueTableHeaders()}
      maxHeight="600px"
      isLoading={isLoading}
      headerChildren={
        <InstantValueTableHeader
          formattedDate={tableDescriptionHelper({
            timetoReadtheLatestData: data?.readDateTime,
            theTimeoftheLastConfirmedData: validDataReadDateTime,
          })}
        />
      }
      hasPagination={false}
      lastColumnSticky={false}
      setSorting={setSorting}
      sorting={sorting}
    />
  );
};

const InstantValueTable = memo(MemoInstantValueTable);

export default InstantValueTable;
