import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import Table from '@/components/ui/table/table';
import { GlobalTableHeader } from '@/components/ui/table/table-head/global-table-header';
import { workOrderCostTypesColumns as basicColumns } from '@/enum-data/bys/work-order-cost-types';
import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useDownloadFile } from '@/hooks/use-download-file';
import { fetchWorkOrderCostTypesList } from '@/services/system-administration/bys/work-order-cost-types-api';
import { ISort } from '@/types/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import UpdateWorkNotificationTypeModal from './edit-modal';

export const WorkOrderCostTypesTable = ({
  setNewItem,
}: {
  setNewItem: any;
}) => {
  const [sortData, setSortData] = useState<ISort>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [searchInputValue, setSearchInputValue] = useState<string>('');
  const [showEditModal, setShowEditModal] = useState<any>(null);
  const [pageSize, setPageSize] = useState(10);

  const memoizedBaseColumns = useMemo(
    () => basicColumns({ onEdit: setShowEditModal }),
    [],
  );

  const selectedColumnKeys = memoizedBaseColumns.map((col) => col.accessorKey);

  const { isExcelDownloading, downloadHandler } = useDownloadFile();

  const { data, isLoading } = useQuery({
    queryKey: [
      'Work Order Cost Types List',
      sortData,
      searchInputValue,
      currentPage,
    ],
    queryFn: () =>
      fetchWorkOrderCostTypesList({
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
      excelUrl: `app/work-order-cost-types/as-excel-file`,
      fileName: getTranslatedValue('WorkOrderCostTypes'),
      searchInputValue: searchInputValue,
      getTokenUrl: `app/work-order-cost-types/download-token?api-version=${import.meta.env.VITE_API_VERSION
        }`,
    });
  };

  const header = useMemo(
    () => (
      <GlobalTableHeader
        label={getTranslatedValue('WorkOrderCostTypes')}
        tableColumns={memoizedBaseColumns}
        setSelectedColumnKeys={[] as any}
        selectedColumnKeys={selectedColumnKeys}
        columnOrder={[]}
        newButtonLabel={getTranslatedValue('NewWorkOrderCostType')}
        isExcelDownloading={isExcelDownloading}
        handleDownload={handleDownload}
        hasFilterTable={false}
        setColumnOrder={() => { }}
        searchInputHandler={searchInputHandler}
        setNewItem={() => setNewItem(true)}
      />
    ),
    [
      memoizedBaseColumns,
      selectedColumnKeys,
      isExcelDownloading,
      handleDownload,
      setNewItem,
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
      {getPermission('WebNet.WorkOrderCostTypes.Edit') && showEditModal && (
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
    </>
  );
};
