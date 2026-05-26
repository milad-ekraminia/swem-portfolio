import SureDeleteModal from '@/components/ui/action/sure-delete-modal';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import Table from '@/components/ui/table/table';
import { GlobalTableHeader } from '@/components/ui/table/table-head/global-table-header';
import { getColumns } from '@/enum-data/system-administration/derived-values';
import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { fetchDefinitionsDerivedValuesList } from '@/services/system-administration/definitions/derived-values';
import { ISort } from '@/types/components/ui/table';
import { DerivedValue } from '@/types/pages/system-administration/definitions/derived-values';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import DerivedValuesForm from './form';

export default function DerivedValuesTable() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [sortData, setSortData] = useState<ISort>([]);
  const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null);
  const [creatingNewDerivedValue, setCreatingNewDerivedValue] = useState(false);
  const [showEditModal, setShowEditModal] = useState<null | DerivedValue>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading } = useQuery({
    queryKey: ['derivedValues', searchTerm, sortData, pageSize, currentPage],
    queryFn: () =>
      fetchDefinitionsDerivedValuesList({
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
    setCreatingNewDerivedValue((prev) => !prev);
  };

  const header = useMemo(
    () => (
      <GlobalTableHeader
        label={getTranslatedValue('Menu:DerivedValues')}
        tableColumns={memoizedBaseColumns}
        setSelectedColumnKeys={setSelectedColumnKeys}
        selectedColumnKeys={selectedColumnKeys}
        columnOrder={columnOrder}
        newButtonLabel={`${getTranslatedValue('New')} ${getTranslatedValue('DerivedValue')}`}
        setColumnOrder={setColumnOrder}
        searchInputHandler={setSearchTerm}
        setNewItem={getPermission('WebNet.DerivedValues.Create') ? () => setCreatingNewDerivedValue(true) : undefined}
      />
    ),
    [selectedColumnKeys, columnOrder, showEditModal],
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
      {getPermission('WebNet.DerivedValues.Create') && creatingNewDerivedValue && (
        <Modal
          modalSize="lg"
          isOpen={creatingNewDerivedValue}
          onClose={handleCreatingModal}
          showCloseButton={false}
        >
          <DerivedValuesForm onClose={handleCreatingModal} />
        </Modal>
      )}
      {getPermission('WebNet.DerivedValues.Edit') && showEditModal && (
        <Modal
          modalSize="lg"
          isOpen={!!showEditModal}
          onClose={() => {
            setShowEditModal(null);
          }}
          showCloseButton={false}
        >
          <DerivedValuesForm
            derivedValue={showEditModal}
            onClose={() => {
              setShowEditModal(null);
            }}
          />
        </Modal>
      )}
      {getPermission('WebNet.DerivedValues.Delete') && showDeleteModal && (
        <Modal
          modalSize="sm"
          isOpen={!!showDeleteModal}
          onClose={() => setShowDeleteModal(null)}
        >
          <SureDeleteModal
            queryKey="derivedValues"
            setShowModal={() => setShowDeleteModal(null)}
            deleteItemUrl={`app/derived-values/${showDeleteModal}?api-version=${import.meta.env.VITE_API_VERSION}`}
          />
        </Modal>
      )}
    </>
  );
}
