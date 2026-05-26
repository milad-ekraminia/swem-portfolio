import Table from '@/components/ui/table/table';
import { wareHousesTransferRecordsTableColumns as basicColumns } from '@/enum-data/inventory-management/warehouses-data';
import { fetchInventoryStockChanges } from '@/services/inventory-management/warehouses';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import WareHousesRecordsTableHeader from './records-table-header';

export const WareHousesTransferRecordsTable = ({
  isLoading,
}: {
  isLoading?: boolean;
}) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState(10);

  const memoizedBaseColumns = useMemo(() => basicColumns(), []);

  const [selectedColumnKeys] = useState<string[]>(
    memoizedBaseColumns.map((col) => col.accessorKey),
  );
  const [columnOrder] = useState<string[]>(
    memoizedBaseColumns.map((col) => col.accessorKey),
  );

  const { id: warehouseId } = useParams();

  const { data, isLoading: isTableLoading } = useQuery({
    queryKey: ['warehouse transfer logs', warehouseId],
    queryFn: () =>
      fetchInventoryStockChanges({
        warehouseId: Number(warehouseId),
        skipCount: 0,
        sortData: [],
        maxResultCount: 6,
      }),
    retry: false,
    enabled: !!warehouseId,
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
      <WareHousesRecordsTableHeader
        link={`/inventory-management/warehouses/${warehouseId}/stock-change`}
        description="Permission:StockChanges"
        label="TransferLogs"
      />
    ),
    [warehouseId],
  );

  return (
    <div className="warehouse-edit-records-table">
      <Table
        data={data?.items ?? []}
        columns={effectiveColumns}
        maxHeight="600px"
        isLoading={isLoading || isTableLoading}
        headerChildren={header}
        pageChangeHandler={setCurrentPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        setPageSize={setPageSize}
        pageSize={pageSize}
      />
    </div>
  );
};
