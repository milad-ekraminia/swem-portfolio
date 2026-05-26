import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import Table from '@/components/ui/table/table';
import { GlobalTableHeader } from '@/components/ui/table/table-head/global-table-header';
import { deviceModelsTableHeaders as basicColumns } from '@/enum-data/definitions/device-models-columns';
import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useDownloadFile } from '@/hooks/use-download-file';
import { fetchDefinitionsDeviceModelsList } from '@/services/definitions/device-models';
import { ISort } from '@/types/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { memo, useMemo, useState } from 'react';
import EditDeviceModel from './edit-modal';

export const MemoDeviceModelsTable = ({
  setNewItem,
}: {
  setNewItem?: (value: boolean) => void;
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

  const {
    data,
    isLoading: isTableLoading,
    isPending,
  } = useQuery({
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
      excelUrl: 'app/device-models/as-excel-file',
      fileName: getTranslatedValue('DeviceModels'),
      searchInputValue,
      getTokenUrl: 'app/device-models/download-token',
    });
  };

  const deviceModelsTableColumns = basicColumns({
    queryKey: '',
    onEdit: () => { },
  });

  const header = useMemo(
    () => (
      <GlobalTableHeader
        setSelectedColumnKeys={setSelectedColumnKeys}
        selectedColumnKeys={selectedColumnKeys}
        columnOrder={columnOrder}
        setColumnOrder={setColumnOrder}
        searchInputHandler={searchInputHandler}
        setNewItem={getPermission('WebNet.DeviceModels.Create') && setNewItem}
        handleDownload={handleDownload}
        isExcelDownloading={isExcelDownloading}
        label="DeviceModels"
        tableColumns={deviceModelsTableColumns}
        newButtonLabel="NewDeviceModel"
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
        maxHeight="650px"
        isLoading={isTableLoading || isPending}
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
      {getPermission('WebNet.DeviceModels.Edit') && showEditModal && (
        <Modal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(null)}
          modalSize="lg"
          showCloseButton={false}
        >
          <EditDeviceModel
            setIsVisible={setShowEditModal}
            deviceModelId={showEditModal?.id}
          />
        </Modal>
      )}
    </>
  );
};

const DeviceModelsTable = memo(MemoDeviceModelsTable);

export default DeviceModelsTable;
