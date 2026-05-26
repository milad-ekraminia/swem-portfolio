import Table from '@/components/ui/table/table';
import { plantTransferLogsTableColumns as basicColumns } from '@/enum-data/bys/plant-transfer-logs-table-columns';
import { fetchInventoryStockChanges } from '@/services/inventory-management/warehouses';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import PlantLogsTableHeader from './table-header';

export const PlantTransferLogsTable = ({
  isLoading,
}: {
  isLoading?: boolean;
}) => {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState(10);

  const memoizedBaseColumns = useMemo(() => basicColumns(), []);

  const [selectedColumnKeys] = useState<string[]>(
    memoizedBaseColumns.map((col) => col.accessorKey),
  );
  const [columnOrder] = useState<string[]>(
    memoizedBaseColumns.map((col) => col.accessorKey),
  );

  const { data, isLoading: isTableLoading } = useQuery({
    queryKey: ['plant transfer logs', id],
    queryFn: () =>
      fetchInventoryStockChanges({
        warehouseId: Number(id),
        skipCount: 0,
        sortData: [],
        maxResultCount: 6,
      }),
    retry: false,
    enabled: !!id,
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
      <PlantLogsTableHeader
        link={`/bys/plants/${id}/stock-changes`}
        description="Permission:StockChanges"
        label="TransferLogs"
      />
    ),
    [id],
  );

  const filteredData = data?.items;

  return (
    <div className="plant-transfer-records-table">
      <Table
        data={filteredData?.slice(0, 6) ?? []}
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
