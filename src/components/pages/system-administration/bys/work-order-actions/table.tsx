import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import Table from '@/components/ui/table/table';
import { GlobalTableHeader } from '@/components/ui/table/table-head/global-table-header';
import { workOrderActionTypes as basicColumns } from '@/enum-data/bys/work-order-action-types';
import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useDownloadFile } from '@/hooks/use-download-file';
import {
  fetchWorkOrderActionsList,
  fetchWorkOrderActionUserLookup,
} from '@/services/system-administration/bys/work-order-actions-api';
import { ISort } from '@/types/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import UpdateWorkOrdrActionsModal from './edit-modal';

export const WorkOrderActionsTable = ({ setNewItem }: { setNewItem: any }) => {
  const [sortData, setSortData] = useState<ISort>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [searchInputValue, setSearchInputValue] = useState<string>('');
  const [showEditModal, setShowEditModal] = useState<any>(null);

  const [pageSize, setPageSize] = useState(10);

  const { downloadHandler, isExcelDownloading } = useDownloadFile();

  const { data: users } = useQuery({
    queryKey: ['Users Lookup'],
    queryFn: () => fetchWorkOrderActionUserLookup(),
    retry: false,
  });

  const usersList = users?.items;
  const { data, isLoading } = useQuery({
    queryKey: [
      'Get Work Order Actions List',
      sortData,
      searchInputValue,
      currentPage,
      pageSize,
    ],
    queryFn: () =>
      fetchWorkOrderActionsList({
        filterText: searchInputValue,
        skipCount: currentPage * pageSize,
        sorting: sortData,
        maxResultCount: pageSize,
      }),
    retry: false,
  });

  const memoizedBaseColumns = useMemo(
    () =>
      basicColumns({
        onEdit: setShowEditModal,
        usersList,
      }),
    [usersList],
  );
  const selectedColumnKeys = memoizedBaseColumns.map((col) => col.accessorKey);

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
      excelUrl: `app/work-order-actions/as-excel-file`,
      fileName: getTranslatedValue('Menu:WorkOrderActions'),
      searchInputValue: searchInputValue,
      getTokenUrl: `app/work-order-actions/download-token?api-version=${import.meta.env.VITE_API_VERSION
        }`,
    });
  };

  const header = useMemo(
    () => (
      <GlobalTableHeader
        setNewItem={setNewItem}
        searchInputHandler={searchInputHandler}
        handleDownload={handleDownload}
        isExcelDownloading={isExcelDownloading}
        label="Menu:WorkOrderActions"
        newButtonLabel="NewWorkOrderAction"
        hasFilterTable={false}
        columnOrder={[]}
        setColumnOrder={() => { }}
        selectedColumnKeys={[]}
        setSelectedColumnKeys={() => { }}
        tableColumns={effectiveColumns}
      />
    ),
    [setNewItem, handleDownload, isExcelDownloading, effectiveColumns],
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
      {getPermission('WebNet.WorkOrderActions.Edit') && showEditModal && (
        <Modal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(null)}
          modalSize="sm"
          showCloseButton={false}
        >
          <UpdateWorkOrdrActionsModal
            onClose={() => setShowEditModal(false)}
            info={showEditModal}
          />
        </Modal>
      )}
    </>
  );
};
