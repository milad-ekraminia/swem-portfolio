import { useMemo, useState } from 'react';
import { getColumns } from '@/enum-data/bys/work-notifications';
import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { WorkNotification } from '@/types/pages/bys/work-notifications';
import { useDownloadFile } from '@/hooks/use-download-file';
import { fetchWorkNotificationsList } from '@/services/bys/work-notifications';
import SureDeleteModal from '@/components/ui/action/sure-delete-modal';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import Table from '@/components/ui/table/table';
import { GlobalTableHeader } from '@/components/ui/table/table-head/global-table-header';
import NewWorkNotificationForm from './create-form';
import EditWorkNotificationModal from './edit-modal';
import FilterModal from './filter-modal';

interface Props {
  users: any[];
  types: any[];
  devices: any[];
  lastWorkNotificationId: number;
  organizations: any[];
  userInfo: any;
}

export default function WorkNotificationsList({
  lastWorkNotificationId,
  types,
  users,
  devices,
  organizations,
  userInfo,
}: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortData, setSortData] = useState<string[]>([]);
  const [creatingNewNotification, setCreateNewNotification] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [showEditModal, setShowEditModal] = useState<WorkNotification | null>(
    null,
  );
  const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState({});
  const { deviceId } = useParams();
  const [pageSize, setPageSize] = useState(10);
  const memoizedBaseColumns = useMemo(
    () =>
      getColumns(
        setShowDeleteModal,
        setShowEditModal,
        getTranslatedValue,
        userInfo,
        users,
      ),
    [userInfo, users],
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

  const { data, isLoading } = useQuery({
    queryKey: [
      'Organization Device Filtered List',
      sortData,
      searchTerm,
      currentPage,
      filters,
      deviceId,
      pageSize,
    ],
    queryFn: () =>
      fetchWorkNotificationsList({
        filterText: searchTerm,
        skipCount: currentPage * 10,
        sorting: sortData,
        value: filters,
        maxResultCount: pageSize,
        deviceId,
      }),
    retry: false,
  });

  const { downloadHandler, isExcelDownloading } = useDownloadFile();

  const handleDownload = () => {
    downloadHandler({
      excelUrl: `app/work-notifications/as-excel-file?WorkNotificationStatusType=Waiting`,
      fileName: getTranslatedValue('WorkNotifications'),
      searchInputValue: searchTerm,
      getTokenUrl: `app/work-notifications/download-token?api-version=${
        import.meta.env.VITE_API_VERSION
      }`,
    });
  };

  const header = useMemo(
    () => (
      <GlobalTableHeader
        openFilterModal={() => setShowFilterModal(true)}
        label={getTranslatedValue('WorkNotifications')}
        tableColumns={memoizedBaseColumns}
        setSelectedColumnKeys={setSelectedColumnKeys}
        selectedColumnKeys={selectedColumnKeys}
        columnOrder={columnOrder}
        newButtonLabel={getTranslatedValue('NewWorkNotification')}
        isExcelDownloading={isExcelDownloading}
        handleDownload={handleDownload}
        hasFilterTable={true}
        hasFilterModal={true}
        setColumnOrder={setColumnOrder}
        searchInputHandler={setSearchTerm}
        setNewItem={
          getPermission('WebNet.WorkNotifications.Create')
            ? () => setCreateNewNotification(true)
            : undefined
        }
      />
    ),
    [selectedColumnKeys, columnOrder, showEditModal, isExcelDownloading],
  );

  return (
    <div className="page-wrapper__body">
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

      {getPermission('WebNet.WorkNotifications.Delete') && showDeleteModal && (
        <Modal
          modalSize="sm"
          isOpen={!!showDeleteModal}
          onClose={() => setShowDeleteModal(null)}
        >
          <SureDeleteModal
            queryKey="Organization Device Filtered List"
            setShowModal={() => setShowDeleteModal(null)}
            deleteItemUrl={`app/work-notifications/${showDeleteModal.toString()}?api-version=${
              import.meta.env.VITE_API_VERSION
            }`}
          />
        </Modal>
      )}
      {getPermission('WebNet.WorkNotifications.Create') &&
        creatingNewNotification && (
          <Modal
            modalSize="md"
            showCloseButton={false}
            isOpen={creatingNewNotification}
            onClose={() => setCreateNewNotification(false)}
          >
            <NewWorkNotificationForm
              users={users}
              lastWorkNotificationId={lastWorkNotificationId}
              types={types}
              setShowModal={setCreateNewNotification}
            />
          </Modal>
        )}

      {getPermission('WebNet.WorkNotifications.Edit') && showEditModal && (
        <Modal
          modalSize="md"
          showCloseButton={false}
          isOpen={!!showEditModal}
          onClose={() => setShowEditModal(null)}
        >
          <EditWorkNotificationModal
            users={users}
            types={types}
            devices={devices}
            organizations={organizations}
            workNotification={showEditModal}
            onClose={() => {
              setShowEditModal(null);
            }}
          />
        </Modal>
      )}
      {showFilterModal && (
        <FilterModal
          types={types}
          filters={filters}
          users={users}
          onChange={(filters: any) => setFilters(filters)}
          onClose={() => setShowFilterModal(false)}
          open={showFilterModal}
        />
      )}
    </div>
  );
}
