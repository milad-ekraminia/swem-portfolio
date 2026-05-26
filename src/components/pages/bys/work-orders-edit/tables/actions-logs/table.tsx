import Table from '@/components/ui/table/table';
import { workOrderActionsLogs as basicColumns } from '@/enum-data/system-administration/work-orders-edit-actions-logs-data';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { fetchWorkOrderActionsApi } from '@/services/bys/work-orders/work-orders';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import ActionsGlobalTableHeader from '../../table-header';

export const WorkOrderActionsLogsTable = ({
  userLookup,
}: {
  userLookup: any;
}) => {
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

  const { workOrderId } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ['Work Order Actions', workOrderId],
    queryFn: () =>
      fetchWorkOrderActionsApi({
        workOrderId: workOrderId ? +workOrderId : 0,
      }),
    retry: false,
    enabled: !!workOrderId,
  });

  const effectiveColumns = useMemo(() => {
    return columnOrder
      .filter((accessorKey) => selectedColumnKeys.includes(accessorKey))
      .map((accessorKey) =>
        memoizedBaseColumns.find((col) => col.accessorKey === accessorKey),
      )
      .filter(Boolean) as typeof memoizedBaseColumns;
  }, [columnOrder, selectedColumnKeys, memoizedBaseColumns]);

  const header = useMemo(
    () => (
      <ActionsGlobalTableHeader
        label={getTranslatedValue(
          'Feature:AuditLoggingGroup',
          'AbpAuditLogging.texts',
        )}
      />
    ),
    [],
  );

  return (
    <div className="warehouse-edit-records-table">
      <Table
        data={data ?? []}
        columns={effectiveColumns}
        maxHeight="600px"
        isLoading={isLoading}
        headerChildren={header}
      />
    </div>
  );
};
