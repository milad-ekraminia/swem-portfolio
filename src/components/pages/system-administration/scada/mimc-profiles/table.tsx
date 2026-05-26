import SureDeleteModal from '@/components/ui/action/sure-delete-modal';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import Table from '@/components/ui/table/table';
import { GlobalTableHeader } from '@/components/ui/table/table-head/global-table-header';
import { getColumns } from '@/enum-data/system-administration/mimic-profiles';
import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { fetchAllMimicProfiles } from '@/services/system-administration/scada/mimic-profiles';
import { ISort } from '@/types/components/ui/table';
import { MimicProfile } from '@/types/pages/system-administration/scada/mimic-profiles';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import MimicProfilesForm from './form';

export default function MimicProfilesTable() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [sortData, setSortData] = useState<ISort>([]);
  const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null);
  const [creatingNewModel, setCreatingNewModel] = useState(false);
  const [showEditModal, setShowEditModal] = useState<null | MimicProfile>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading } = useQuery({
    queryKey: ['mimicProfiles', searchTerm, sortData, pageSize, currentPage],
    queryFn: () =>
      fetchAllMimicProfiles({
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
        label={getTranslatedValue('Menu:MimicProfiles')}
        tableColumns={memoizedBaseColumns}
        setSelectedColumnKeys={setSelectedColumnKeys}
        selectedColumnKeys={selectedColumnKeys}
        columnOrder={columnOrder}
        newButtonLabel={getTranslatedValue('NewMimicProfile')}
        setColumnOrder={setColumnOrder}
        searchInputHandler={setSearchTerm}
        setNewItem={getPermission('WebNet.MimicProfiles.Create') ? () => setCreatingNewModel(true) : undefined}
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
      {getPermission('WebNet.MimicProfiles.Create') && creatingNewModel && (
        <Modal
          modalSize="sm"
          isOpen={creatingNewModel}
          onClose={handleCreatingModal}
          showCloseButton={false}
        >
          <MimicProfilesForm onSuccess={handleCreatingModal} />
        </Modal>
      )}

      {getPermission('WebNet.MimicProfiles.Edit') && showEditModal && (
        <Modal
          modalSize="sm"
          isOpen={!!showEditModal}
          onClose={() => {
            setShowEditModal(null);
          }}
          showCloseButton={false}
        >
          <MimicProfilesForm
            mimicProfile={showEditModal}
            onSuccess={() => {
              setShowEditModal(null);
            }}
          />
        </Modal>
      )}
      {getPermission('WebNet.MimicProfiles.Delete') && !!showDeleteModal && (
        <Modal
          modalSize="sm"
          isOpen={!!showDeleteModal}
          onClose={() => setShowDeleteModal(null)}
        >
          <SureDeleteModal
            queryKey="mimicProfiles"
            setShowModal={() => setShowDeleteModal(null)}
            deleteItemUrl={`app/mimic-profile/${showDeleteModal}?api-version=${import.meta.env.VITE_API_VERSION}`}
          />
        </Modal>
      )}
    </>
  );
}
