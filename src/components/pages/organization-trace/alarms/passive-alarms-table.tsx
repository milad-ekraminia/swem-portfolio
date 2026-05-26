import { memo, useCallback, useMemo, useState } from 'react';
import { passiveAlarmsTableColumns as baseColumns } from '@/enum-data/organization-trace/passive-alarms-table-columns';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { ISort } from '@/types/components/ui/table';
import { fetchAlarmList } from '@/services/organization-trace/alarm-api';
import { Loader } from '@/components/ui/loader/loader';
import Table from '@/components/ui/table/table';
import { PassiveAlarmsHeader } from './passive.alarms-header';


function PassiveAlarmsTable({ refreshInterval }: { refreshInterval?: number }) {
  const { tree_id, type } = useSelector((state: any) => state.tree.info);
  const { inserted_date: insertedDate, period_type } = useSelector(
    (state: any) => state.dateFilter.info,
  );
  const hasAlarms = window.location.pathname.includes('alarms');

  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortData, setSortData] = useState<ISort>([]);

  const {
    data: responseData,
    isLoading,
    refetch,
    isPending,
  } = useQuery({
    queryKey: [
      'fetch passive alarm organization list',
      tree_id,
      period_type,
      insertedDate,
      page,
      sortData,
      pageSize,
    ],
    queryFn: () =>
      fetchAlarmList({
        orgId: tree_id,
        parentType: type,
        skipCount: page * pageSize,
        maxResultCount: pageSize,
        sortData,
        alarmStatus: ['Cancelled', 'Finished'],
        insertedDate,
      }),
    retry: false,
    refetchInterval: refreshInterval
      ? refreshInterval
      : false,
  });

  const passiveAlarmsTableColumns = useMemo(
    () => baseColumns({ refetch, hasAlarms }),
    [refetch],
  );

  const [selectedColumnKeys, setSelectedColumnKeys] = useState<string[]>(
    passiveAlarmsTableColumns.map((col) => col?.accessorKey),
  );

  const [columnOrder, setColumnOrder] = useState<string[]>(
    passiveAlarmsTableColumns.map((col) => col.accessorKey),
  );

  const effectiveColumns = useMemo(() => {
    return columnOrder
      .filter((accessorKey) => selectedColumnKeys.includes(accessorKey))
      .map((accessorKey) =>
        passiveAlarmsTableColumns.find(
          (col) => col.accessorKey === accessorKey,
        ),
      )
      .filter(Boolean) as typeof passiveAlarmsTableColumns;
  }, [columnOrder, selectedColumnKeys, passiveAlarmsTableColumns]);

  const header = useMemo(
    () => (
      <PassiveAlarmsHeader
        setSelectedColumnKeys={setSelectedColumnKeys}
        selectedColumnKeys={selectedColumnKeys}
        columnOrder={columnOrder}
        setColumnOrder={setColumnOrder}
      />
    ),
    [selectedColumnKeys, columnOrder],
  );

  // Memoize handlers to avoid unnecessary re-renders of Table
  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const handlePageSizeChange = useCallback((size: number) => {
    setPageSize(size);
    setPage(0);
  }, []);

  return (
    <Table
      data={(responseData?.items as any) ?? []}
      columns={effectiveColumns}
      renderLoading={() => <Loader />}
      maxHeight="550px"
      isLoading={isLoading || isPending}
      headerChildren={header}
      totalCount={responseData?.items.length ?? 0}
      pageChangeHandler={handlePageChange} // Make sure your Table prop name is correct
      setCurrentPage={setPage}
      currentPage={page}
      setSorting={setSortData}
      sorting={sortData}
      setPageSize={handlePageSizeChange}
      pageSize={pageSize}
    />
  );
}

export default memo(PassiveAlarmsTable);