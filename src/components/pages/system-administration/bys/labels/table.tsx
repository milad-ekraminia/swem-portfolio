import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import Table from '@/components/ui/table/table';
import { GlobalTableHeader } from '@/components/ui/table/table-head/global-table-header';
import { labelsColumns as basicColumns } from '@/enum-data/system-administration/labels-data';
import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useDownloadFile } from '@/hooks/use-download-file';
import { fetchLabelsList } from '@/services/system-administration/bys/labels-api';
import { ISort } from '@/types/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import UpdateLabelModalModal from './edit-modal';

export const LabelsTable = ({ setNewItem }: { setNewItem: any }) => {
  const [sortData, setSortData] = useState<ISort>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [showEditModal, setShowEditModal] = useState<any>(null);
  const [pageSize, setPageSize] = useState(10);

  const memoizedBaseColumns = useMemo(
    () => basicColumns({ onEdit: setShowEditModal }),
    [],
  );

  const initialColumnKeys = memoizedBaseColumns.map((col) => col.accessorKey);
  const [selectedColumnKeys, setSelectedColumnKeys] =
    useState<string[]>(initialColumnKeys);
  const [columnOrder, setColumnOrder] = useState<string[]>(initialColumnKeys);

  const { data, isLoading } = useQuery({
    queryKey: [
      'labels list',
      sortData,
      searchInputValue,
      currentPage,
      pageSize,
    ],
    queryFn: () =>
      fetchLabelsList({
        filterText: searchInputValue,
        skipCount: currentPage * pageSize,
        sorting: sortData,
        maxResultCount: pageSize,
      }),
    retry: false,
  });

  const effectiveColumns = useMemo(() => {
    return selectedColumnKeys
      .map((key) => memoizedBaseColumns.find((col) => col.accessorKey === key))
      .filter(Boolean) as typeof memoizedBaseColumns;
  }, [selectedColumnKeys, memoizedBaseColumns]);

  const { downloadHandler, isExcelDownloading } = useDownloadFile();

  const handleDownload = () => {
    downloadHandler({
      excelUrl: `app/labels/as-excel-file`,
      fileName: getTranslatedValue('Labels'),
      searchInputValue,
      getTokenUrl: `app/labels/download-token?api-version=${import.meta.env.VITE_API_VERSION
        }`,
    });
  };

  const header = useMemo(
    () => (
      <GlobalTableHeader
        searchInputHandler={setSearchInputValue}
        setNewItem={setNewItem}
        handleDownload={handleDownload}
        isExcelDownloading={isExcelDownloading}
        setSelectedColumnKeys={setSelectedColumnKeys}
        selectedColumnKeys={selectedColumnKeys}
        columnOrder={columnOrder}
        setColumnOrder={setColumnOrder}
        label="Label"
        tableColumns={memoizedBaseColumns}
        newButtonLabel="NewLabel"
        hasFilterTable={false}
      />
    ),
    [
      setNewItem,
      handleDownload,
      isExcelDownloading,
      selectedColumnKeys,
      columnOrder,
      memoizedBaseColumns,
    ],
  );

  return (
    <>
      <Table
        data={data?.items ?? []}
        columns={effectiveColumns}
        maxHeight="73dvh"
        isLoading={isLoading}
        headerChildren={header}
        lastColumnSticky
        pageChangeHandler={setCurrentPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        setSorting={setSortData}
        sorting={sortData}
        totalCount={data?.totalCount ?? 0}
        setPageSize={setPageSize}
        pageSize={pageSize}
      />

      {getPermission('WebNet.Labels.Edit') && showEditModal && (
        <Modal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(null)}
          modalSize="md"
          showCloseButton={false}
        >
          <UpdateLabelModalModal
            onClose={() => setShowEditModal(false)}
            info={showEditModal}
          />
        </Modal>
      )}
    </>
  );
};
