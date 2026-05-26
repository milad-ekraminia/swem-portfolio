import TableWithForm from '@/components/ui/table-with-form';
import { workOrderWorkers as basicColumns } from '@/enum-data/system-administration/work-orders-edit-worker-data';
import { fetchWorkOrderWorkersApi } from '@/services/bys/work-orders/work-orders';
import { useQuery } from '@tanstack/react-query';
import { memo, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import ActionsGlobalTableHeader from '../../table-header';
import WorkersTableHeaderForm from './add-form';

const WorkOrderWorkersTable = ({
  userLookup,
  usersList,
}: {
  userLookup: any;
  usersList: any;
}) => {
  const { workOrderId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['Get Work Order workers', workOrderId],
    queryFn: () =>
      fetchWorkOrderWorkersApi({
        workOrderId: workOrderId ? +workOrderId : 0,
      }),
    enabled: !!workOrderId,
    retry: false,
  });

  const memoizedBaseColumns = useMemo(
    () => basicColumns({ userLookup, queryKey: 'Get Work Order workers' }),
    [userLookup],
  );

  const [selectedColumnKeys] = useState(() =>
    memoizedBaseColumns.map((col) => col.accessorKey),
  );
  const [columnOrder] = useState(() =>
    memoizedBaseColumns.map((col) => col.accessorKey),
  );

  const effectiveColumns = useMemo(() => {
    return columnOrder
      .filter((accessorKey) => selectedColumnKeys.includes(accessorKey))
      .map(
        (accessorKey) =>
          memoizedBaseColumns.find((col) => col.accessorKey === accessorKey)!,
      );
  }, [columnOrder, selectedColumnKeys, memoizedBaseColumns, data]);

  const header = useMemo(
    () => <ActionsGlobalTableHeader label="Workers" />,
    [],
  );

  const form = useMemo(
    () => <WorkersTableHeaderForm usersList={usersList} />,
    [usersList],
  );

  return (
    <div className="warehouse-edit-records-table work-orders-edit-workers-table">
      <TableWithForm
        data={data ?? []}
        columns={effectiveColumns}
        maxHeight="600px"
        isLoading={isLoading}
        headerChildren={header}
        form={form}
      />
    </div>
  );
};

// Export with memoization to avoid unnecessary re-renders
export default memo(WorkOrderWorkersTable);
