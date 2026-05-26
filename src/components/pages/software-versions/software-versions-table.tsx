import SureDeleteModal from '@/components/ui/action/sure-delete-modal';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import Table from '@/components/ui/table/table';
import { GlobalTableHeader } from '@/components/ui/table/table-head/global-table-header';
import { softwareVersionsTableColumns as basicColumns } from '@/enum-data/software-versions/data';
import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useDownloadFile } from '@/hooks/use-download-file';
import { fetchSoftwareVersionsList } from '@/services/software-versions/software-versions';
import { ProductUnit } from '@/types/pages/inventory-management/product-units';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import SoftwareVersionForm from './software-version-form';

export default function SoftwareVersionsTable() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [sortData, setSortData] = useState<string[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null);
  const [creatingNewUnit, setCreatingNewUnit] = useState(false);
  const [showEditModal, setShowEditModal] = useState<null | ProductUnit>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading } = useQuery({
    queryKey: ['SoftwareVersions', searchTerm, sortData, pageSize, currentPage],
    queryFn: () =>
      fetchSoftwareVersionsList({
        filterText: searchTerm,
        skipCount: currentPage * pageSize,
        sorting: sortData,
        maxResultCount: pageSize,
      }),
  });

  const memoizedBaseColumns = useMemo(
    () => basicColumns(setShowDeleteModal, setShowEditModal),
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
    setCreatingNewUnit((prev) => !prev);
  };
  const { downloadHandler, isExcelDownloading } = useDownloadFile();
  const handleDownload = () => {
    downloadHandler({
      excelUrl: `app/e-central-versions/as-excel-file`,
      fileName: getTranslatedValue('SoftwareVersions'),
      searchInputValue: searchTerm,
      getTokenUrl: `app/e-central-versions/download-token?api-version=${import.meta.env.VITE_API_VERSION
        }`,
    });
  };

  const header = useMemo(
    () => (
      <GlobalTableHeader
        label={getTranslatedValue('SoftwareVersions')}
        tableColumns={memoizedBaseColumns}
        setSelectedColumnKeys={setSelectedColumnKeys}
        selectedColumnKeys={selectedColumnKeys}
        columnOrder={columnOrder}
        newButtonLabel={getTranslatedValue('NewECentralVersion')}
        setColumnOrder={setColumnOrder}
        searchInputHandler={setSearchTerm}
        handleDownload={handleDownload}
        isExcelDownloading={isExcelDownloading}
        setNewItem={getPermission('WebNet.ECentralVersions.Create') ? () => setCreatingNewUnit(true) : undefined}
        hasFilterTable={false}
      />
    ),
    [selectedColumnKeys, columnOrder, showEditModal, isExcelDownloading],
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
      {getPermission('WebNet.ECentralVersions.Create') && creatingNewUnit && (
        <Modal
          modalSize="md"
          isOpen={creatingNewUnit}
          onClose={handleCreatingModal}
          showCloseButton={false}
        >
          <SoftwareVersionForm onSuccess={handleCreatingModal} />
        </Modal>
      )}

      {getPermission('WebNet.ECentralVersions.Edit') && showEditModal && (
        <Modal
          modalSize="md"
          isOpen={!!showEditModal}
          onClose={() => {
            setShowEditModal(null);
          }}
          showCloseButton={false}
        >
          <SoftwareVersionForm
            data={showEditModal}
            onSuccess={() => {
              setShowEditModal(null);
            }}
          />
        </Modal>
      )}

      {getPermission('WebNet.ECentralVersions.Delete') && showDeleteModal && (
        <Modal
          modalSize="sm"
          isOpen={!!showDeleteModal}
          onClose={() => setShowDeleteModal(null)}
        >
          <SureDeleteModal
            queryKey="SoftwareVersions"
            setShowModal={() => setShowDeleteModal(null)}
            deleteItemUrl={`app/e-central-versions/${showDeleteModal}?api-version=${import.meta.env.VITE_API_VERSION
              }`}
          />
        </Modal>
      )}
    </>
  );
}
