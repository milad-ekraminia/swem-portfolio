import SureDeleteModal from '@/components/ui/action/sure-delete-modal';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import Table from '@/components/ui/table/table';
import { GlobalTableHeader } from '@/components/ui/table/table-head/global-table-header';
import { getColumns } from '@/enum-data/definitions/time-periods';
import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useDownloadFile } from '@/hooks/use-download-file';
import { fetchTimePeriodsList } from '@/services/definitions/time-periods/time-periods';
import { TimePeriod } from '@/types/pages/definitions/time-periods';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import TimePeriodForm from './time-periods-form';

export default function TimePeriodsTable() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [sortData, setSortData] = useState<string[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null);
  const [creatingNewTimePeriod, setCreatingNewTimePeriod] = useState(false);
  const [showEditModal, setShowEditModal] = useState<null | TimePeriod>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading } = useQuery({
    queryKey: ['timePeriods', searchTerm, sortData, pageSize, currentPage],
    queryFn: () =>
      fetchTimePeriodsList({
        filterText: searchTerm,
        skipCount: currentPage * pageSize,
        sorting: sortData,
        maxResultCount: pageSize,
      }),
  });

  const memoizedBaseColumns = useMemo(
    () => getColumns(setShowDeleteModal, setShowEditModal),
    [data],
  );

  const [selectedColumnKeys, setSelectedColumnKeys] = useState<string[]>(
    memoizedBaseColumns.map((col) => col.accessorKey),
  );
  const [columnOrder, setColumnOrder] = useState<string[]>(
    memoizedBaseColumns.map((col) => col.accessorKey),
  );

  const effectiveColumns = useMemo(() => {
    return columnOrder
      .filter((key) => selectedColumnKeys.includes(key))
      .map((key) => memoizedBaseColumns.find((col) => col.accessorKey === key))
      .filter(Boolean) as typeof memoizedBaseColumns;
  }, [columnOrder, selectedColumnKeys, memoizedBaseColumns]);

  const handleCreatingModal = () => {
    setCreatingNewTimePeriod((prev) => !prev);
  };

  const { downloadHandler, isExcelDownloading } = useDownloadFile();

  const handleDownload = () => {
    downloadHandler({
      excelUrl: `app/time-periods/as-excel-file`,
      fileName: getTranslatedValue('TimePeriods'),
      searchInputValue: searchTerm,
      getTokenUrl: `app/time-periods/download-token?api-version=${import.meta.env.VITE_API_VERSION}`,
    });
  };
  const header = useMemo(
    () => (
      <GlobalTableHeader
        label={getTranslatedValue('TimePeriods')}
        tableColumns={memoizedBaseColumns}
        setSelectedColumnKeys={setSelectedColumnKeys}
        selectedColumnKeys={selectedColumnKeys}
        columnOrder={columnOrder}
        handleDownload={handleDownload}
        isExcelDownloading={isExcelDownloading}
        newButtonLabel={getTranslatedValue('NewTimePeriod')}
        setColumnOrder={setColumnOrder}
        searchInputHandler={setSearchTerm}
        setNewItem={
          getPermission('WebNet.TimePeriods.Create')
            ? () => setCreatingNewTimePeriod(true)
            : undefined
        }
      />
    ),
    [
      selectedColumnKeys,
      columnOrder,
      showEditModal,
      isExcelDownloading,
      memoizedBaseColumns,
    ],
  );

  return (
    <>
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
        hasPagination={true}
      />

      {getPermission('WebNet.TimePeriods.Create') && creatingNewTimePeriod && (
        <Modal
          modalSize="lg"
          isOpen={creatingNewTimePeriod}
          onClose={handleCreatingModal}
          showCloseButton={false}
        >
          <TimePeriodForm onSuccess={handleCreatingModal} />
        </Modal>
      )}
      {getPermission('WebNet.TimePeriods.Edit') && showEditModal && (
        <Modal
          modalSize="lg"
          isOpen={!!showEditModal}
          onClose={() => {
            setShowEditModal(null);
          }}
          showCloseButton={false}
        >
          <TimePeriodForm
            timePeriod={showEditModal}
            onSuccess={() => {
              setShowEditModal(null);
            }}
          />
        </Modal>
      )}
      {getPermission('WebNet.TimePeriods.Delete') && showDeleteModal && (
        <Modal
          modalSize="sm"
          isOpen={!!showDeleteModal}
          onClose={() => setShowDeleteModal(null)}
        >
          <SureDeleteModal
            queryKey="timePeriods"
            setShowModal={() => setShowDeleteModal(null)}
            deleteItemUrl={`app/time-periods/${showDeleteModal.toString()}?api-version=${import.meta.env.VITE_API_VERSION}`}
          />
        </Modal>
      )}
    </>
  );
}
