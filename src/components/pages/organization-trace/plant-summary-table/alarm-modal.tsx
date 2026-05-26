import { Loader } from '@/components/ui/loader/loader';
import Table from '@/components/ui/table/table';
import { alarmModalTableColumns } from '@/enum-data/organization-trace/org-trace-index';
import { fetchAlarmsList } from '@/services/organization-trace';
import { ISort } from '@/types/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export const AlarmModalTable = ({ rowId }: { rowId: any }) => {
  const [sorting, setSorting] = useState<ISort>([]);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState(10);

  const {
    data: responseData,
    isLoading,
    isPending,
  } = useQuery({
    queryKey: ['Alarm-Organization-List', rowId, sorting, page, pageSize],
    queryFn: () =>
      fetchAlarmsList({
        itemId: rowId?.id,
        skipCount: page * pageSize,
        maxResultCount: pageSize,
        sortData: sorting,
      }),
    retry: false,
    enabled: !!rowId,
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setPage(0);
  };

  return (
    <div className="alarm-list-modal">
      <Table
        data={responseData?.items ?? []}
        columns={alarmModalTableColumns}
        renderLoading={() => <Loader />}
        maxHeight="320px"
        isLoading={isLoading || isPending}
        setSorting={setSorting}
        sorting={sorting}
        totalCount={responseData?.totalCount ?? 0}
        pageChangeHandler={handlePageChange}
        setCurrentPage={setPage}
        currentPage={page}
        setPageSize={handlePageSizeChange}
        pageSize={pageSize}
      />
    </div>
  );
};
