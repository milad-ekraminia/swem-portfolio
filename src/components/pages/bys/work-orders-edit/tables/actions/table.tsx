import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import Table from '@/components/ui/table/table';
import { workOrderActions as basicColumns } from '@/enum-data/system-administration/work-orders-edit-actions-data';
import { fetchWorkOrderActionsApi } from '@/services/bys/work-orders/work-orders';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import NewWorkOrderActionModal from './modals/add-action-modal';
import ActionsTableHeader from './table-header';

export const WorkOrderActionsTable = ({
  userLookup,
  workOrderInfo,
}: {
  userLookup: any;
  workOrderInfo: any;
}) => {
  const [newItem, setNewItem] = useState(false);
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
    () => <ActionsTableHeader label="Actions" setNewItem={setNewItem} />,
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
      {newItem && (
        <Modal
          isOpen={newItem}
          onClose={() => setNewItem(false)}
          modalSize="md"
          showCloseButton={false}
        >
          <NewWorkOrderActionModal
            workOrderInfo={workOrderInfo}
            setShowModal={setNewItem}
          />
        </Modal>
      )}
    </div>
  );
};
