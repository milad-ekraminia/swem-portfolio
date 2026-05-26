import { memo, useState } from 'react';
import { deviceIndexValueListTableColumns } from '@/enum-data/organization-trace/org-trace-index';
import { tableDescriptionHelper } from '@/helpers/table-description-helper';
import { useQueries } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { ISort } from '@/types/components/ui/table';
import { fetchValidDataReadDateTime } from '@/services/organization-trace';
import { fetchDeviceIndexValueList } from '@/services/organization-trace/index-values-api';
import { Loader } from '@/components/ui/loader/loader';
import Table from '@/components/ui/table/table';
import { IndexValueTableHeader } from './index-value-table-header';

export const MemoIndexValueTable = ({ refreshInterval }: { refreshInterval?: number }) => {
  const treeData = useSelector((state: any) => state?.tree?.info);
  const [sorting, setSorting] = useState<ISort>([]);

  const results = useQueries({
    queries: [
      {
        queryKey: ['Index Value Table', treeData?.tree_id, sorting],
        queryFn: () =>
          fetchDeviceIndexValueList({
            tree_id: treeData?.tree_id,
            sortData: sorting,
          }),
        retry: false,
        enabled: !!treeData?.tree_id,
        refetchInterval: refreshInterval
          ? refreshInterval
          : false,
      },
      {
        queryKey: ['Fetch valid data read date time', treeData?.tree_id],
        queryFn: () =>
          fetchValidDataReadDateTime({
            tree_id: treeData?.tree_id,
          }),
        retry: false,
        enabled: !!treeData?.tree_id,
        refetchInterval: refreshInterval
          ? refreshInterval
          : false,
      },
    ],
  });

  const [indexValueResponse, validDataReadDateTimeResponse] = results;
  const { data, isLoading } = indexValueResponse;
  const { data: validDataReadDateTimeData } = validDataReadDateTimeResponse;

  return (
    <Table
      data={data?.items?.length ? data.items : []}
      columns={deviceIndexValueListTableColumns()}
      renderLoading={() => <Loader />}
      maxHeight="600px"
      isLoading={isLoading}
      headerChildren={
        <IndexValueTableHeader
          formattedDate={tableDescriptionHelper({
            timetoReadtheLatestData: data?.readDateTime,
            theTimeoftheLastConfirmedData: validDataReadDateTimeData,
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

const IndexValueTable = memo(MemoIndexValueTable);

export default IndexValueTable;
