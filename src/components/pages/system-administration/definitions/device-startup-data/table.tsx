import SureDeleteModal from '@/components/ui/action/sure-delete-modal';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import Table from '@/components/ui/table/table';
import { GlobalTableHeader } from '@/components/ui/table/table-head/global-table-header';
import {
  getColumns,
  SAMPLE_DEVICE_INITIAL_DATA,
} from '@/enum-data/system-administration/device-startup-data';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { ISort } from '@/types/components/ui/table';
import { DerivedValue } from '@/types/pages/system-administration/definitions/derived-values';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import DeviceStartupForm from './form';

export default function DeviceStartupDataTable() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [sortData, setSortData] = useState<ISort>([]);
  const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [showEditModal, setShowEditModal] = useState<null | DerivedValue>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading } = useQuery({
    queryKey: [
      'deviceStartupData',
      searchTerm,
      sortData,
      pageSize,
      currentPage,
    ],
    queryFn: () => ({
      items: SAMPLE_DEVICE_INITIAL_DATA,
      totalCount: SAMPLE_DEVICE_INITIAL_DATA.length,
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

  const header = useMemo(
    () => (
      <GlobalTableHeader
        label={getTranslatedValue('DeviceStartupData')}
        tableColumns={memoizedBaseColumns}
        setSelectedColumnKeys={setSelectedColumnKeys}
        selectedColumnKeys={selectedColumnKeys}
        columnOrder={columnOrder}
        newButtonLabel={getTranslatedValue('NewDeviceStartupData')}
        setColumnOrder={setColumnOrder}
        searchInputHandler={setSearchTerm}
        setNewItem={() => setIsCreating(true)}
      />
    ),
    [selectedColumnKeys, columnOrder, showEditModal],
  );
  const handleIsCreating = () => {
    setIsCreating((prev) => !prev);
  };
  return (
    <>
      <Table
        data={(data?.items as any) ?? []}
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
      {isCreating && (
        <Modal
          modalSize="md"
          isOpen={isCreating}
          onClose={handleIsCreating}
          showCloseButton={false}
        >
          <DeviceStartupForm onClose={handleIsCreating} />
        </Modal>
      )}
      {showEditModal && (
        <Modal
          modalSize="md"
          isOpen={!!showEditModal}
          onClose={() => {
            setShowEditModal(null);
          }}
          showCloseButton={false}
        >
          <DeviceStartupForm
            deviceStartupData={showEditModal}
            onClose={() => {
              setShowEditModal(null);
            }}
          />
        </Modal>
      )}
      {showDeleteModal && (
        <Modal
          modalSize="sm"
          isOpen={!!showDeleteModal}
          onClose={() => setShowDeleteModal(null)}
        >
          <SureDeleteModal
            queryKey="deviceStartupData"
            setShowModal={() => setShowDeleteModal(null)}
            // TODO -> Change To The Actual Delete API
            deleteItemUrl={`app/derived-values/${showDeleteModal}?api-version=${import.meta.env.VITE_API_VERSION}`}
          />
        </Modal>
      )}
    </>
  );
}
