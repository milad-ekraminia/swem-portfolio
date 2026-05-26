import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import Table from '@/components/ui/table/table';
import { GlobalTableHeader } from '@/components/ui/table/table-head/global-table-header';
import { formulasColumns as basicColumns } from '@/enum-data/system-administration/formulas-data';
import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useDownloadFile } from '@/hooks/use-download-file';
import { fetchFormulasList } from '@/services/system-administration/bys/formulas-api';
import { ISort } from '@/types/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import UpdateFormulaModal from './edit-modal';

export const FormulasTable = ({ setNewItem }: { setNewItem: any }) => {
  const [sortData, setSortData] = useState<ISort>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [searchInputValue, setSearchInputValue] = useState<string>('');
  const [showEditModal, setShowEditModal] = useState<any>(null);
  const [pageSize, setPageSize] = useState(10);

  const memoizedBaseColumns = useMemo(
    () => basicColumns({ onEdit: setShowEditModal }),
    [],
  );

  const [selectedColumnKeys, setSelectedColumnKeys] = useState<string[]>(
    memoizedBaseColumns.map((col) => col.accessorKey),
  );

  const [columnOrder, setColumnOrder] = useState<string[]>(
    memoizedBaseColumns.map((col) => col.accessorKey),
  );

  const { isExcelDownloading, downloadHandler } = useDownloadFile();

  const { data, isLoading } = useQuery({
    queryKey: [
      'formulas list',
      sortData,
      searchInputValue,
      currentPage,
      pageSize,
    ],
    queryFn: () =>
      fetchFormulasList({
        filterText: searchInputValue,
        skipCount: currentPage * pageSize,
        sorting: sortData,
        maxResultCount: pageSize,
      }),
    retry: false,
  });

  const effectiveColumns = useMemo(() => {
    return selectedColumnKeys
      .filter((accessorKey) => selectedColumnKeys.includes(accessorKey))
      .map((accessorKey) =>
        memoizedBaseColumns.find((col) => col.accessorKey === accessorKey),
      )
      .filter(Boolean) as typeof memoizedBaseColumns;
  }, [selectedColumnKeys, memoizedBaseColumns]);

  const searchInputHandler = (value: string) => {
    setSearchInputValue(value);
  };

  const handleDownload = () => {
    downloadHandler({
      excelUrl: `app/formulas/as-excel-file`,
      fileName: getTranslatedValue('Formulas'),
      searchInputValue: searchInputValue,
      getTokenUrl: `app/formulas/download-token?api-version=${import.meta.env.VITE_API_VERSION
        }`,
    });
  };

  const header = useMemo(
    () => (
      <GlobalTableHeader
        searchInputHandler={searchInputHandler}
        setNewItem={setNewItem}
        handleDownload={handleDownload}
        isExcelDownloading={isExcelDownloading}
        setSelectedColumnKeys={setSelectedColumnKeys}
        selectedColumnKeys={selectedColumnKeys}
        columnOrder={columnOrder}
        setColumnOrder={setColumnOrder}
        label="Formulas"
        tableColumns={memoizedBaseColumns}
        newButtonLabel="NewFormula"
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
        totalCount={data?.totalCount}
        setPageSize={setPageSize}
        pageSize={pageSize}
      />
      {getPermission('WebNet.Formulas.Edit') && showEditModal && (
        <Modal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(null)}
          modalSize="sm"
          showCloseButton={false}
        >
          <UpdateFormulaModal
            onClose={() => setShowEditModal(false)}
            info={showEditModal}
          />
        </Modal>
      )}
    </>
  );
};
