import TableWithForm from '@/components/ui/table-with-form';
import { workOrderCostsTableColumns as basicColumns } from '@/enum-data/system-administration/work-orders-edit-cost-data';
import {
  fetchWorkOrderCostApi,
  fetchWorkOrderCostTypeLookupApi,
} from '@/services/bys/work-orders/work-orders';
import { useQueries } from '@tanstack/react-query';
import { memo, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import ActionsGlobalTableHeader from '../../table-header';
import WorkOrderCostsTableHeaderForm from './add-form';

const WorkOrderCostsTable = () => {
  const { workOrderId } = useParams();
  const results = useQueries({
    queries: [
      {
        queryKey: ['Get Work Order Costs'],
        queryFn: () =>
          fetchWorkOrderCostApi({
            workOrderId: workOrderId ? +workOrderId : 0,
          }),
        retry: false,
      },
      {
        queryKey: ['Work Notification Device Lookup'],
        queryFn: () => fetchWorkOrderCostTypeLookupApi(),
        retry: false,
      },
    ],
  });

  const [getWorkOrderCostLookup, getWorkOrderCostTypeLookup] = results;

  const data = getWorkOrderCostLookup?.data ?? [];
  const workOrderCostTypeLookup = getWorkOrderCostTypeLookup?.data?.items ?? [];

  const memoizedBaseColumns = useMemo(
    () =>
      basicColumns({
        workOrderCostTypeLookup,
        queryKey: 'Get Work Order Costs',
      }),
    [workOrderCostTypeLookup],
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
  }, [columnOrder, selectedColumnKeys, memoizedBaseColumns]);

  const header = useMemo(
    () => <ActionsGlobalTableHeader label="WorkOrderCosts" />,
    [],
  );

  const form = useMemo(
    () => (
      <WorkOrderCostsTableHeaderForm
        workOrderCostTypeLookup={workOrderCostTypeLookup}
      />
    ),
    [workOrderCostTypeLookup],
  );

  return (
    <div className="warehouse-edit-records-table work-orders-edit-workers-table">
      <TableWithForm
        data={data ?? []}
        columns={effectiveColumns}
        maxHeight="600px"
        isLoading={false}
        headerChildren={header}
        form={form}
      />
    </div>
  );
};

// Export with memoization to avoid unnecessary re-renders
export default memo(WorkOrderCostsTable);
