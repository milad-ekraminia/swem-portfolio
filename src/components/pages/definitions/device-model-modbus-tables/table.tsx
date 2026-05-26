import Table from '@/components/ui/table/table';
import { GlobalTableHeader } from '@/components/ui/table/table-head/global-table-header';
import { devicesModelModbusTableHeaders as basicColumns } from '@/enum-data/definitions/device-model-modbus-tables';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useDownloadFile } from '@/hooks/use-download-file';
import { fetchDefinitionsDeviceModelsList } from '@/services/definitions/device-models';
import { ISort } from '@/types/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { memo, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MemoDevicesModelModbusTable = () => {
  const [sortData, setSortData] = useState<ISort>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [pageSize, setPageSize] = useState(10);

  const navigate = useNavigate();

  const onEdit = (row: any) => {
    navigate(`/definitions/device-model-modbus-tables/${row?.id}`);
  };

  const memoizedBaseColumns = useMemo(
    () =>
      basicColumns({
        onEdit,
        queryKey: 'device models list',
      }),
    [],
  );

  const [selectedColumnKeys, setSelectedColumnKeys] = useState<string[]>(
    memoizedBaseColumns.map((col) => col.accessorKey),
  );
  const [columnOrder, setColumnOrder] = useState<string[]>(
    memoizedBaseColumns.map((col) => col.accessorKey),
  );
  const { downloadHandler, isExcelDownloading } = useDownloadFile();

  const { data, isLoading } = useQuery({
    queryKey: [
      'device models list',
      sortData,
      searchInputValue,
      currentPage,
      pageSize,
    ],
    queryFn: () =>
      fetchDefinitionsDeviceModelsList({
        filterText: searchInputValue,
        skipCount: currentPage * pageSize,
        sorting: sortData,
        pageSize,
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
      excelUrl: `app/devices/as-excel-file`,
      fileName: getTranslatedValue('Menu:DeviceModelModbusTables'),
      searchInputValue,
      getTokenUrl: 'app/devices/download-token',
    });
  };

  const tableColumns = basicColumns({ queryKey: '' });

  const header = useMemo(
    () => (
      <GlobalTableHeader
        setSelectedColumnKeys={setSelectedColumnKeys}
        selectedColumnKeys={selectedColumnKeys}
        columnOrder={columnOrder}
        setColumnOrder={setColumnOrder}
        searchInputHandler={searchInputHandler}
        handleDownload={handleDownload}
        isExcelDownloading={isExcelDownloading}
        label="Menu:DeviceModelModbusTables"
        tableColumns={tableColumns}
      />
    ),
    [selectedColumnKeys, columnOrder, searchInputValue, isExcelDownloading],
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
      lastColumnSticky
      setPageSize={setPageSize}
      pageSize={pageSize}
    />
  );
};

const DevicesModelModbusTable = memo(MemoDevicesModelModbusTable);

export default DevicesModelModbusTable;
