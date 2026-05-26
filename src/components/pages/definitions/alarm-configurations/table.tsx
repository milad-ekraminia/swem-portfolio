import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import Table from '@/components/ui/table/table';
import { GlobalTableHeader } from '@/components/ui/table/table-head/global-table-header';
import { AlarmConfigurationsTableColumns as basicColumns } from '@/enum-data/definitions/alarm-configurations-table-columns';
import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useDownloadFile } from '@/hooks/use-download-file';
import { fetchAlarmConfigurationsList } from '@/services/definitions/alarm-configurations/alarm-configurations-api';
import { ISort } from '@/types/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { memo, useMemo, useState } from 'react';
import EditAlarmConfigurationModal from './edit-modal';

const AlarmConfigurationsTable = ({
  devicesList,
  labelsList,
  timePeriodsList,
  setNewItem,
}: {
  devicesList: any[];
  labelsList: any[];
  timePeriodsList: any[];
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
        devicesList,
        labelsList,
        timePeriodsList,
        onEdit,
        queryKey: 'alarm configurations list',
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
      'alarm configurations list',
      sortData,
      searchInputValue,
      currentPage,
      pageSize,
    ],
    queryFn: () =>
      fetchAlarmConfigurationsList({
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
      excelUrl: 'app/alarm-configurations/as-excel-file',
      fileName: getTranslatedValue('AlarmConfigurations'),
      searchInputValue,
      getTokenUrl: 'app/alarm-configurations/download-token',
    });
  };

  const alarmConfigurationsTableColumns = basicColumns({ queryKey: '' });

  const header = useMemo(
    () => (
      <GlobalTableHeader
        setSelectedColumnKeys={setSelectedColumnKeys}
        selectedColumnKeys={selectedColumnKeys}
        columnOrder={columnOrder}
        setColumnOrder={setColumnOrder}
        searchInputHandler={searchInputHandler}
        setNewItem={
          getPermission('WebNet.AlarmConfigurations.Create') && setNewItem
        }
        handleDownload={handleDownload}
        isExcelDownloading={isExcelDownloading}
        label="AlarmConfigurations"
        tableColumns={alarmConfigurationsTableColumns}
        newButtonLabel="NewAlarmConfiguration"
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
        setSorting={setSortData}
        lastColumnSticky
        sorting={sortData}
        setPageSize={setPageSize}
        pageSize={pageSize}
      />
      {getPermission('WebNet.AlarmConfigurations.Edit') && setNewItem && showEditModal && (
        <Modal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(null)}
          modalSize="lg"
          showCloseButton={false}
        >
          <EditAlarmConfigurationModal
            alarmConfiguration={showEditModal}
            setShowEditModal={setShowEditModal}
          />
        </Modal>
      )}
    </>
  );
};

export default memo(AlarmConfigurationsTable);
