import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import Table from '@/components/ui/table/table';
import { GlobalTableHeader } from '@/components/ui/table/table-head/global-table-header';
import { DevicesTableColumns as basicColumns } from '@/enum-data/definitions/devices-table-columns';
import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useDownloadFile } from '@/hooks/use-download-file';
import { fetchDefinitionsDevicesList } from '@/services/definitions/devices/devices-api';
import { ISort } from '@/types/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import EditDeviceModal from './edit-modal';

export const DevicesTable = ({
  organizationResponse,
  deviceModelResponse,
  deviceCategoryResponse,
  deviceAccessPointResponse,
  getDeviceLabelResponse,
  setNewItem,
  isLoading,
}: {
  setNewItem?: (value: boolean) => void;
  organizationResponse: any;
  deviceModelResponse: any;
  deviceCategoryResponse: any;
  getDeviceLabelResponse: any;
  deviceAccessPointResponse: any;
  isLoading: boolean;
}) => {
  const [sortData, setSortData] = useState<ISort>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [searchInputValue, setSearchInputValue] = useState<string>('');
  const [showEditModal, setShowEditModal] = useState<any>(null);
  const [pageSize, setPageSize] = useState(10);
  const onEdit = (row: any) => {
    setShowEditModal(row);
  };

  const memoizedBaseColumns = useMemo(
    () =>
      basicColumns({
        deviceModelResponse,
        organizationResponse,
        deviceCategoryResponse,
        deviceAccessPointResponse,
        onEdit,
        queryKey: 'devices list',
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

  const {
    data,
    isLoading: isTableLoading,
    isPending,
  } = useQuery({
    queryKey: [
      'devices list',
      sortData,
      searchInputValue,
      currentPage,
      pageSize,
    ],
    queryFn: () =>
      fetchDefinitionsDevicesList({
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
      excelUrl: 'app/devices/as-excel-file',
      fileName: getTranslatedValue('Devices'),
      searchInputValue,
      getTokenUrl: 'app/devices/download-token',
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
        isExcelDownloading={isExcelDownloading}
        label="Devices"
        tableColumns={memoizedBaseColumns}
        newButtonLabel="NewDevice"
      />
    ),
    [
      selectedColumnKeys,
      columnOrder,
      searchInputValue,
      showEditModal,
      isExcelDownloading,
    ],
  );

  return (
    <>
      <Table
        data={data?.items ?? []}
        columns={effectiveColumns}
        maxHeight="68dvh"
        isLoading={isLoading || isTableLoading || isPending}
        headerChildren={header}
        totalCount={data?.totalCount ?? 0}
        pageChangeHandler={setCurrentPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        lastColumnSticky
        setSorting={setSortData}
        sorting={sortData}
        setPageSize={setPageSize}
        pageSize={pageSize}
      />
      {getPermission('WebNet.Devices.Edit') && showEditModal && (
        <Modal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(null)}
          modalSize="lg"
          showCloseButton={false}
        >
          <EditDeviceModal
            showEditModal={showEditModal}
            setShowEditModal={setShowEditModal}
            deviceCategoryResponse={deviceCategoryResponse}
            deviceAccessPointResponse={deviceAccessPointResponse}
            getDeviceLabelResponse={getDeviceLabelResponse}
          />
        </Modal>
      )}
    </>
  );
};
