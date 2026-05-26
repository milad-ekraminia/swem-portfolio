import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import Table from '@/components/ui/table/table';
import { workNotificationTypesColumns as basicColumns } from '@/enum-data/bys/work-notification-types';
import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useDownloadFile } from '@/hooks/use-download-file';
import { fetchWorkNotificationTypesList } from '@/services/system-administration/bys/work-notification-types-api';
import { ISort } from '@/types/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import NewWorkNotificationTypeModal from './add-modal';
import UpdateWorkNotificationTypeModal from './edit-modal';
import { WorkNotificationTypesTableHeader } from './table-header';

export const WorkNotificationTypesTable = () => {
  const [sortData, setSortData] = useState<ISort>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [searchInputValue, setSearchInputValue] = useState<string>('');
  const [showEditModal, setShowEditModal] = useState<any>(null);
  const [newItem, setNewItem] = useState<any>(null);
  const [pageSize, setPageSize] = useState(10);

  const memoizedBaseColumns = useMemo(
    () => basicColumns({ onEdit: setShowEditModal }),
    [],
  );

  const selectedColumnKeys = memoizedBaseColumns.map((col) => col.accessorKey);

  const { isExcelDownloading, downloadHandler } = useDownloadFile();

  const { data, isLoading: isTableLoading } = useQuery({
    queryKey: [
      'Get Work Notification Types List',
      sortData,
      searchInputValue,
      currentPage,
    ],
    queryFn: () =>
      fetchWorkNotificationTypesList({
        filterText: searchInputValue,
        sorting: sortData,
        skipCount: currentPage * pageSize,
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
      excelUrl: `app/work-notification-types/as-excel-file`,
      fileName: getTranslatedValue('WorkNotificationType'),
      searchInputValue: searchInputValue,
      getTokenUrl: `app/work-notification-types/download-token`,
    });
  };

  const header = useMemo(
    () => (
      <WorkNotificationTypesTableHeader
        searchInputHandler={searchInputHandler}
        setNewItem={setNewItem}
        handleDownload={handleDownload}
        isExcelDownloading={isExcelDownloading}
        searchInputValue={searchInputValue}
      />
    ),
    [setNewItem, downloadHandler, isExcelDownloading, searchInputValue],
  );

  return (
    <>
      <Table
        data={data?.items ?? []}
        columns={effectiveColumns}
        maxHeight="73dvh"
        isLoading={isTableLoading}
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
      {getPermission('WebNet.WorkNotificationTypes.Edit') && showEditModal && (
        <Modal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(null)}
          modalSize="sm"
          showCloseButton={false}
        >
          <UpdateWorkNotificationTypeModal
            onClose={() => setShowEditModal(false)}
            info={showEditModal}
          />
        </Modal>
      )}
      {getPermission('WebNet.WorkNotificationTypes.Create') && newItem && (
        <Modal
          isOpen={newItem}
          onClose={() => setNewItem(null)}
          modalSize="sm"
          showCloseButton={false}
        >
          <NewWorkNotificationTypeModal onClose={() => setNewItem(false)} />
        </Modal>
      )}
    </>
  );
};
