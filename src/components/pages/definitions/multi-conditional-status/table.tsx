import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import Table from '@/components/ui/table/table';
import { GlobalTableHeader } from '@/components/ui/table/table-head/global-table-header';
import { MultiConditionalStatusTableColumns as basicColumns } from '@/enum-data/definitions/multi-conditional-status-table-columns';
import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useDownloadFile } from '@/hooks/use-download-file';
import { fetchDefinitionsGetMultiConditionalStatusesList } from '@/services/definitions/multi-conditional-status/multi-conditional-status-api';
import { ISort } from '@/types/components/ui/table';
import { multiConditionalStatusesListType } from '@/types/pages/definitions/multi-conditional-statuses';
import { useQuery } from '@tanstack/react-query';
import { memo, useMemo, useState } from 'react';
import EditMultiConditionalStatusModal from './edit-modal';

const MultiConditionalStatusTable = ({
  timePeriodLookupResponse,
  deviceLookupResponse,
  labelLookupyResponse,
  derivedValueLookupResponse,
  userLookupResponse,
  setNewItem,
}: {
  timePeriodLookupResponse: multiConditionalStatusesListType;
  deviceLookupResponse: multiConditionalStatusesListType;
  labelLookupyResponse: multiConditionalStatusesListType;
  derivedValueLookupResponse: multiConditionalStatusesListType;
  userLookupResponse: multiConditionalStatusesListType;
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
        queryKey: 'Get Multi Conditional Statuses List',
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
      'Get Multi Conditional Statuses List',
      sortData,
      searchInputValue,
      currentPage,
      pageSize,
    ],
    queryFn: () =>
      fetchDefinitionsGetMultiConditionalStatusesList({
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
      excelUrl: 'app/multi-conditional-statuses/as-excel-file',
      fileName: getTranslatedValue('MultiConditionalStatus'),
      searchInputValue,
      getTokenUrl: 'app/multi-conditional-statuses/download-token',
    });
  };

  const MultiConditionalStatusTableColumns = basicColumns({ queryKey: '' });

  const header = useMemo(
    () => (
      <GlobalTableHeader
        setSelectedColumnKeys={setSelectedColumnKeys}
        selectedColumnKeys={selectedColumnKeys}
        columnOrder={columnOrder}
        setColumnOrder={setColumnOrder}
        searchInputHandler={searchInputHandler}
        setNewItem={
          getPermission('WebNet.MultiConditionalStatuses.Create') && setNewItem
        }
        handleDownload={handleDownload}
        isExcelDownloading={isExcelDownloading}
        label={getTranslatedValue('MultiConditionalStatuses')}
        newButtonLabel={getTranslatedValue('NewMultiConditionalStatus')}
        tableColumns={MultiConditionalStatusTableColumns}
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
        sorting={sortData}
        setPageSize={setPageSize}
        pageSize={pageSize}
      />

      {getPermission('WebNet.MultiConditionalStatuses.Edit') && setNewItem && showEditModal && (
        <Modal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(null)}
          modalSize="lg"
          showCloseButton={false}
        >
          <EditMultiConditionalStatusModal
            conditionalId={showEditModal?.id}
            setShowEditModal={setShowEditModal}
            timePeriodLookupResponse={timePeriodLookupResponse}
            deviceLookupResponse={deviceLookupResponse}
            labelLookupyResponse={labelLookupyResponse}
            derivedValueLookupResponse={derivedValueLookupResponse}
            userLookupResponse={userLookupResponse}
          />
        </Modal>
      )}
    </>
  );
};

export default memo(MultiConditionalStatusTable);
