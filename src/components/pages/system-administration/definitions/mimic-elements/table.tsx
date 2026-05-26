import SureDeleteModal from '@/components/ui/action/sure-delete-modal';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import Table from '@/components/ui/table/table';
import { GlobalTableHeader } from '@/components/ui/table/table-head/global-table-header';
import { getColumns } from '@/enum-data/system-administration/mimic-elements';
import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { getMimicElements } from '@/services/system-administration/definitions/mimic-elements';
import { ISort } from '@/types/components/ui/table';
import { MimicElement } from '@/types/pages/system-administration/definitions/mimic-elements';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import MimicElementsForm from './form';

export default function MimicElementsTable() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [sortData, setSortData] = useState<ISort>([]);
  const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null);
  const [creatingNewModel, setCreatingNewModel] = useState(false);
  const [showEditModal, setShowEditModal] = useState<null | MimicElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading } = useQuery({
    queryKey: ['mimicElements', searchTerm, sortData, pageSize, currentPage],
    queryFn: () =>
      getMimicElements({
        filterText: searchTerm,
        maxResultCount: pageSize,
        skipCount: currentPage * pageSize,
        sorting: sortData,
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
    setCreatingNewModel((prev) => !prev);
  };

  const header = useMemo(
    () => (
      <GlobalTableHeader
        label={getTranslatedValue('Menu:MimicElements')}
        tableColumns={memoizedBaseColumns}
        setSelectedColumnKeys={setSelectedColumnKeys}
        selectedColumnKeys={selectedColumnKeys}
        columnOrder={columnOrder}
        newButtonLabel={getTranslatedValue('NewMimicElement')}
        setColumnOrder={setColumnOrder}
        searchInputHandler={setSearchTerm}
        setNewItem={getPermission('WebNet.MimicElements.Create') ? handleCreatingModal : undefined}
      />
    ),
    [selectedColumnKeys, columnOrder, showEditModal],
  );

  return (
    <>
      <Table
        data={(data?.items as any) ?? []}
        columns={effectiveColumns}
        maxHeight="650px"
        isLoading={isLoading}
        headerChildren={header}
        totalCount={data?.totalCount || 0}
        pageChangeHandler={setCurrentPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        setSorting={setSortData}
        sorting={sortData}
        setPageSize={setPageSize}
        pageSize={pageSize}
        hasPagination={true}
      />
      {getPermission('WebNet.MimicElements.Create') && creatingNewModel && (
        <MimicElementsForm
          isOpen={creatingNewModel}
          onClose={handleCreatingModal}
        />
      )}

      {getPermission('WebNet.MimicElements.Edit') && showEditModal && (
        <MimicElementsForm
          isOpen={!!showEditModal}
          mimicElement={showEditModal}
          onClose={() => {
            setShowEditModal(null);
          }}
        />
      )}

      {getPermission('WebNet.MimicElements.Delete') && !!showDeleteModal && (
        <Modal
          modalSize="sm"
          isOpen={!!showDeleteModal}
          onClose={() => setShowDeleteModal(null)}
        >
          <SureDeleteModal
            queryKey="mimicElements"
            setShowModal={() => setShowDeleteModal(null)}
            deleteItemUrl={`app/mimic-elements/${showDeleteModal}?api-version=${import.meta.env.VITE_API_VERSION}`}
          />
        </Modal>
      )}
    </>
  );
}
