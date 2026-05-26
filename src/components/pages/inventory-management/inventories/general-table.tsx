import Table from '@/components/ui/table/table';
import { GlobalTableHeader } from '@/components/ui/table/table-head/global-table-header';
import { InventoriesGeneralTableColumns as basicColumns } from '@/enum-data/inventory-management/inventories-general-table-columns';
import {
  downloadExcelFile,
  downloadExcelFileApiWithRow,
} from '@/helpers/download-excel-export';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import { fetchInventoriesCategorizedList } from '@/services/inventory-management/inventories/inventories-list-api';
import { ISort } from '@/types/components/ui/table';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { memo, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InventoriesGeneralTable = ({
  warehouseId,
  productId,
  activeWarehouse,
  setNewItem,
  handleBack,
}: {
  warehouseId: string;
  productId?: string | null;
  setNewItem: (value: boolean) => void;
  activeWarehouse: string;
  handleBack?: any;
}) => {
  const [sortData, setSortData] = useState<ISort>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [searchInputValue, setSearchInputValue] = useState<string>('');
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading: inventoriesLoading } = useQuery({
    queryKey: [
      'inventories general',
      searchInputValue,
      warehouseId,
      currentPage,
      sortData,
      pageSize,
    ],
    queryFn: () =>
      fetchInventoriesCategorizedList({
        ProductId: '',
        serialNumber: '',
        warehouseId,
        filterText: searchInputValue,
        skipCount: currentPage * pageSize,
        sorting: sortData,
        pageSize,
      }),
    retry: false,
    enabled: !!warehouseId,
  });

  // const { data: units, isLoading: unitLoading } = useQuery({
  //   queryKey: ["Product Unit Lookup"],
  //   queryFn: () => fetchProductUnitLookup(),
  //   retry: false,
  //   staleTime: 0,
  // });

  const isLoading = inventoriesLoading;
  const navigate = useNavigate();
  const memoizedBaseColumns = useMemo(
    () =>
      basicColumns({
        onClick: (row: any) => {
          navigate(
            `${row?.original?.productW?.product?.id}?name=${row?.original?.productW?.product?.productName}`,
          );
        },
      }),
    [],
  );

  const [selectedColumnKeys, setSelectedColumnKeys] = useState<string[]>(
    memoizedBaseColumns.map((col) => col.accessorKey),
  );
  const [columnOrder, setColumnOrder] = useState<string[]>(
    memoizedBaseColumns.map((col) => col.accessorKey),
  );

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

  const downloadMutation = useMutation({
    mutationFn: downloadExcelFileApiWithRow,
    onSuccess: async (data) => {
      downloadExcelFile({
        response: data,
        fileName: getTranslatedValue('Inventories'),
      });
    },
    onError: async (error: AxiosError) => {
      const errorResponse = await apiErrorHandler(error);
      toastError(errorResponse?.error);
    },
  });
  const handleDownload = () => {
    downloadMutation.mutate({
      url: `app/export-to-excel/export-to-excel-inventory-list?api-version=${import.meta.env.VITE_API_VERSION}`,
      formData: {
        productId,
        warehouseId,
      },
    });
  };

  const header = useMemo(
    () => (
      <GlobalTableHeader
        setSelectedColumnKeys={setSelectedColumnKeys}
        selectedColumnKeys={selectedColumnKeys}
        columnOrder={columnOrder}
        setColumnOrder={setColumnOrder}
        searchInputHandler={searchInputHandler}
        setNewItem={setNewItem}
        handleDownload={handleDownload}
        isExcelDownloading={downloadMutation?.isPending}
        label={`"${activeWarehouse}" ${getTranslatedValue('Inventories')}`}
        newButtonLabel={getTranslatedValue('NewInventory')}
        tableColumns={memoizedBaseColumns}
        onBack={handleBack}
      />
    ),
    [selectedColumnKeys, columnOrder, searchInputValue, activeWarehouse],
  );

  return (
    <Table
      data={data?.items ?? []}
      columns={effectiveColumns}
      maxHeight="650px"
      isLoading={isLoading}
      headerChildren={header}
      totalCount={data?.totalCount ?? 0}
      pageChangeHandler={setCurrentPage}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
      setSorting={setSortData}
      sorting={sortData}
      setPageSize={setPageSize}
      pageSize={pageSize}
      lastColumnSticky
    />
  );
};

export default memo(InventoriesGeneralTable);
