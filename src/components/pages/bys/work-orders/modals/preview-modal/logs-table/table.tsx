import Table from '@/components/ui/table/table';
import { WorkOrdersLogColumns as basicColumns } from '@/enum-data/system-administration/logs-table-data';
import { fetchWorkOrderActionsApi } from '@/services/bys/work-orders/work-orders';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

function LogsTable({
  userLookup,
  workOrderId,
}: Readonly<{
  userLookup: any;
  workOrderId: any;
}>) {
  const [sortData, setSortData] = useState<any[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ['Work Order Actions', workOrderId],
    queryFn: () =>
      fetchWorkOrderActionsApi({
        workOrderId,
      }),
    retry: false,
  });
  const memoizedBaseColumns = useMemo(
    () => basicColumns({ userLookup }),
    [userLookup],
  );

  const [selectedColumnKeys] = useState<string[]>(
    memoizedBaseColumns.map((col) => col.accessorKey),
  );

  const [columnOrder] = useState<string[]>(
    memoizedBaseColumns.map((col) => col.accessorKey),
  );

  const effectiveColumns = useMemo(() => {
    return columnOrder
      .filter((key) => selectedColumnKeys.includes(key))
      .map((key) => memoizedBaseColumns.find((col) => col.accessorKey === key))
      .filter(Boolean) as typeof memoizedBaseColumns;
  }, [columnOrder, selectedColumnKeys, memoizedBaseColumns]);

  return (
    <Table
      data={data ?? []}
      columns={effectiveColumns}
      maxHeight="600px"
      isLoading={isLoading}
      totalCount={data?.totalCount ?? 0}
      setSorting={setSortData}
      sorting={sortData}
    />
  );
}

export default LogsTable;
