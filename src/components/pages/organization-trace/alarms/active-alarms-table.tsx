import { memo, useCallback, useMemo, useState } from 'react';
import { activeAlarmsTableColumns as baseColumns } from '@/enum-data/organization-trace/active-alarms-table-columns';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ISort } from '@/types/components/ui/table';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import {
  approveAlarms,
  cancelAlarms,
  fetchAlarmList,
} from '@/services/organization-trace/alarm-api';
import { Loader } from '@/components/ui/loader/loader';
import Table from '@/components/ui/table/table';
import { ActiveAlarmsHeader } from './active-alarms-header';

const ActiveAlarmsTable = ({
  refreshInterval,
}: {
  refreshInterval?: number;
}) => {
  const queryClient = useQueryClient();
  const hasAlarms = window.location.pathname.includes('alarms');
  const { tree_id, type } = useSelector((state: any) => state.tree.info);
  const { inserted_date: insertedDate, period_type } = useSelector(
    (state: any) => state.dateFilter.info,
  );

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortData, setSortData] = useState<ISort>([]);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  // Memoized base columns (pure data)

  // Query
  const {
    data: responseData,
    isLoading,
    isPending,
    refetch,
  } = useQuery({
    queryKey: [
      'fetch active alarm organization list',
      tree_id,
      period_type,
      insertedDate,
      sortData,
      page,
      pageSize,
    ],
    queryFn: () =>
      fetchAlarmList({
        orgId: tree_id,
        parentType: type,
        skipCount: page * pageSize,
        maxResultCount: pageSize,
        sortData,
        alarmStatus: ['Active'],
        insertedDate,
      }),
    retry: false,
    refetchInterval: refreshInterval ? refreshInterval : false,
  });
  const memoizedBaseColumns = useMemo(
    () => baseColumns({ refetch, hasAlarms }),
    [],
  );

  const [selectedColumnKeys, setSelectedColumnKeys] = useState<string[]>(
    memoizedBaseColumns.map((col) => col.accessorKey),
  );
  const [columnOrder, setColumnOrder] = useState<string[]>(
    memoizedBaseColumns.map((col) => col.accessorKey),
  );
  // Mutations
  const { mutate: mutateApproveAlarms, isPending: isApprovePending } =
    useMutation({
      mutationFn: approveAlarms,
      onSuccess: () => {
        toast.success(getTranslatedValue('Approved'));
        queryClient.invalidateQueries({
          queryKey: ['fetch active alarm organization list'],
        });
      },
      onError: async (error: AxiosError) => {
        toastError((await apiErrorHandler(error))?.error);
      },
    });

  const { mutate: mutateCancelAlarms, isPending: isCancelPending } =
    useMutation({
      mutationFn: cancelAlarms,
      onSuccess: () => {
        toast.success(getTranslatedValue('alarm_status_1'));
        queryClient.invalidateQueries({
          queryKey: ['fetch active alarm organization list'],
        });
        queryClient.invalidateQueries({
          queryKey: ['fetch passive alarm organization list'],
        });
      },
      onError: async (error: AxiosError) => {
        toastError((await apiErrorHandler(error))?.error);
      },
    });

  // Memoize columns based on selection and order
  const effectiveColumns = useMemo(() => {
    return columnOrder
      .filter((accessorKey) => selectedColumnKeys.includes(accessorKey))
      .map((accessorKey) =>
        memoizedBaseColumns.find((col) => col.accessorKey === accessorKey),
      )
      .filter(Boolean) as typeof memoizedBaseColumns;
  }, [columnOrder, selectedColumnKeys, memoizedBaseColumns]);

  // Row selection handlers
  const selectAllRows = () => {
    if (responseData?.items) {
      setSelectedRows(responseData.items.map((row: any) => row.id));
    }
  };

  const deselectAllRows = () => setSelectedRows([]);

  const selectRowsHandler = (id: number, isAll = false) => {
    if (!responseData?.items) return;

    if (isAll) {
      if (selectedRows.length === responseData.items.length) {
        deselectAllRows();
      } else {
        selectAllRows();
      }
    } else {
      setSelectedRows((prev) =>
        prev.includes(id)
          ? prev.filter((rowId) => rowId !== id)
          : [...prev, id],
      );
    }
  };

  // Action handlers
  const handleApproveAlarms = useCallback(() => {
    mutateApproveAlarms(selectedRows);
    setSelectedRows([]);
  }, [mutateApproveAlarms, selectedRows]);

  const handleCancelAlarms = useCallback(() => {
    mutateCancelAlarms(selectedRows);
    setSelectedRows([]);
  }, [mutateCancelAlarms, selectedRows]);

  // Header memoized
  const header = useMemo(
    () => (
      <ActiveAlarmsHeader
        setSelectedColumnKeys={setSelectedColumnKeys}
        selectedColumnKeys={selectedColumnKeys}
        columnOrder={columnOrder}
        setColumnOrder={setColumnOrder}
        handleApproveAlarms={handleApproveAlarms}
        handleCancelAlarms={handleCancelAlarms}
        isCancelPending={isCancelPending}
        isApprovePending={isApprovePending}
        selectedRows={selectedRows}
      />
    ),
    [
      selectedColumnKeys,
      columnOrder,
      isCancelPending,
      isApprovePending,
      selectedRows,
      handleApproveAlarms,
      handleCancelAlarms,
    ],
  );

  return (
    <Table
      data={(responseData?.items as any) ?? []}
      columns={effectiveColumns}
      renderLoading={() => <Loader />}
      maxHeight="550px"
      isLoading={isLoading || isPending}
      headerChildren={header}
      totalCount={responseData?.items.length ?? 0}
      pageChangeHandler={setPage}
      setCurrentPage={setPage}
      currentPage={page}
      selectRowsHandler={selectRowsHandler}
      hasCheckbox={!hasAlarms}
      selectedRows={selectedRows}
      setSorting={setSortData}
      sorting={sortData}
      setPageSize={setPageSize}
      pageSize={pageSize}
    />
  );
};

export default memo(ActiveAlarmsTable);
