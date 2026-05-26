import Table from '@/components/ui/table/table';
import { wareHousesInventoryListTableColumns as basicColumns } from '@/enum-data/inventory-management/warehouses-data';
import { fetchWarehouseInventoryList } from '@/services/inventory-management/warehouses';
import { ISort } from '@/types/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import WareHousesRecordsTableHeader from './records-table-header';

export const WareHousesInventoriesRecordsTable = ({
  isLoading,
}: {
  isLoading?: boolean;
}) => {
  const [sortData, setSortData] = useState<ISort>([]);
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
    queryKey: ['warehouse inventories', warehouseId, sortData],
    queryFn: () =>
      fetchWarehouseInventoryList({
        warehouseId: Number(warehouseId),
        sorting: sortData,
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
        link={`/inventory-management/warehouses/${warehouseId}/inventories`}
        label="Inventories"
      />
    ),
    [],
  );

  const filteredData = data?.items;

  return (
    <div className="warehouse-edit-records-table">
      <Table
        data={filteredData ?? []}
        columns={effectiveColumns}
        maxHeight="600px"
        isLoading={isLoading || isTableLoading}
        headerChildren={header}
        pageChangeHandler={setCurrentPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        setSorting={setSortData}
        sorting={sortData}
        setPageSize={setPageSize}
        pageSize={pageSize}
      />
    </div>
  );
};
