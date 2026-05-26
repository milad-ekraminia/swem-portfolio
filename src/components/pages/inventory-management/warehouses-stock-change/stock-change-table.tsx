import Table from '@/components/ui/table/table';
import { stockChangeTableColumns as basicColumns } from '@/enum-data/inventory-management/warehouses-stock-change-data';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useDownloadFile } from '@/hooks/use-download-file';
import { fetchInventoryStockChanges } from '@/services/inventory-management/warehouses-stock-change';
import { ISort } from '@/types/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { StockChangeTableHeader } from './stock-change-table-header';

export const WareHousesStockChangeTable = ({ label }: { label?: string }) => {
  const { id, warehouseId } = useParams();
  const [sortData, setSortData] = useState<ISort>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [searchInputValue, setSearchInputValue] = useState<string>('');
  const [pageSize, setPageSize] = useState(10);

  const memoizedBaseColumns = useMemo(() => basicColumns(), []);

  const [selectedColumnKeys, setSelectedColumnKeys] = useState<string[]>(
    memoizedBaseColumns.map((col) => col.accessorKey),
  );

  const [columnOrder, setColumnOrder] = useState<string[]>(
    memoizedBaseColumns.map((col) => col.accessorKey),
  );

  const { downloadHandler, isExcelDownloading } = useDownloadFile();

  const { data, isLoading: isTableLoading } = useQuery({
    queryKey: [
      'inventories Stock Changes',
      searchInputValue,
      warehouseId,
      currentPage,
      sortData,
      pageSize,
    ],
    queryFn: () =>
      fetchInventoryStockChanges({
        inventoryId: undefined,
        warehouseId: warehouseId || id,
        skipCount: currentPage * pageSize,
        maxResultCount: pageSize,
        sortData,
        FilterText: searchInputValue,
      }),
    retry: false,
  });

  const effectiveColumns = useMemo(() => {
    return columnOrder
      .filter((accessorKey) => selectedColumnKeys.includes(accessorKey))
      .map((accessorKey) =>
        memoizedBaseColumns.find((col) => col.accessorKey === accessorKey),
      )
      .filter(Boolean) as typeof memoizedBaseColumns;
  }, [columnOrder, selectedColumnKeys, memoizedBaseColumns]);

  const searchInputHandler = (value: string) => {
    setSearchInputValue(value);
  };

  const handleDownload = () => {
    downloadHandler({
      excelUrl: `app/stock-changes/as-excel-file?WarehouseId=${warehouseId}`,
      fileName: getTranslatedValue('StockChanges'),
      searchInputValue,
      getTokenUrl: 'app/stock-changes/download-token',
    });
  };

  const header = useMemo(
    () => (
      <StockChangeTableHeader
        setSelectedColumnKeys={setSelectedColumnKeys}
        selectedColumnKeys={selectedColumnKeys}
        columnOrder={columnOrder}
        setColumnOrder={setColumnOrder}
        searchInputHandler={searchInputHandler}
        handleDownload={handleDownload}
        isExcelDownloading={isExcelDownloading}
        searchInputValue={searchInputValue}
        label={label}
      />
    ),
    [
      selectedColumnKeys,
      columnOrder,
      handleDownload,
      isExcelDownloading,
      searchInputValue,
      label,
    ],
  );

  const filteredData = data?.items;

  return (
    <Table
      data={filteredData ?? []}
      columns={effectiveColumns}
      maxHeight={data?.totalCount > 10 ? '68dvh' : '73dvh'}
      isLoading={isTableLoading}
      headerChildren={header}
      pageChangeHandler={setCurrentPage}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
      setSorting={setSortData}
      sorting={sortData}
      setPageSize={setPageSize}
      pageSize={pageSize}
      totalCount={data?.totalCount ?? 0}
    />
  );
};
