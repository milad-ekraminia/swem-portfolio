import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import Table from '@/components/ui/table/table';
import { BysWorkOrdersTableColumns as basicColumns } from '@/enum-data/system-administration/work-orders-data';
import {
  downloadExcelFileTokenApi,
  downloadGetMethodExcelFile,
} from '@/helpers/download-excel-export';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import { fetchWorkOrdersList } from '@/services/bys/work-orders/work-orders';
import { displayNameListItemType } from '@/types/pages/definitions/multi-conditional-statuses';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { memo, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import WorkOrderFilterModal from './modals/filter-work-orders/modal';
import WorkOrderPreviewModal from './modals/preview-modal/modal';
import { BysWorkOrdersTableHeader } from './table-header';

function MemoWorkOrdersTable({
  setNewItem,
  workOrdersTypeLookup,
  userLookup,
  categoryLookup,
  organizationsLookup,
  deviceLookup,
  setEditItem,
  currentUser,
}: // currentUser,
  Readonly<{
    setNewItem?: (value: any) => void;
    setEditItem?: (value: any) => void;
    workOrdersTypeLookup: displayNameListItemType[];
    userLookup: displayNameListItemType[];
    categoryLookup: displayNameListItemType[];
    organizationsLookup: displayNameListItemType[];
    deviceLookup: displayNameListItemType[];
    currentUser: any;
  }>) {
  const { register, handleSubmit, reset, setValue, control } = useForm();

  const { deviceId } = useParams();
  const [showPreviewModal, setShowPreviewModal] = useState(null);
  const [showFunnelModal, setShowFunnelModal] = useState(null);
  const [sortData, setSortData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [pageSize, setPageSize] = useState(10);

  const [filterValue, setFilterValue] = useState<any>({});

  useEffect(() => {
    reset({
      // required string
      workOrderType: filterValue.workOrderType,
      creatorId: filterValue.creatorId,
      workOrderCategory: filterValue.workOrderCategory,
      minStartDate: filterValue.minStartDate ?? null,
      maxStartDate: filterValue.maxStartDate ?? null,
      minEndDate: filterValue.minEndDate ?? null,
      maxEndDate: filterValue.maxEndDate ?? null,
      openWorkOrders: filterValue.openWorkOrders ?? true,
    });
  }, [filterValue, reset]);

  const {
    data,
    isLoading,
    // refetch: refetchList,
  } = useQuery({
    queryKey: [
      'Work Orders Organization Device Filtered List',
      sortData,
      searchInputValue,
      currentPage,
      deviceId,
      pageSize,
      filterValue,
      showFunnelModal,
    ],
    queryFn: () =>
      fetchWorkOrdersList({
        filterText: searchInputValue,
        skipCount: currentPage * pageSize,
        sorting: sortData,
        value: filterValue,
        deviceId,
        maxResultCount: pageSize,
      }),
    retry: false,
  });

  const getTokenMutation = useMutation({
    mutationFn: downloadExcelFileTokenApi,
    onSuccess: async (data) => {
      await downloadGetMethodExcelFile({
        excelUrl: `app/work-orders/as-excel-file?DownloadToken=${data?.token
          }&FilterText=${searchInputValue ?? ''}`,
        fileName: getTranslatedValue('WorkOrders'),
      });
    },
    onError: async (error: AxiosError) => {
      const errorResponse = await apiErrorHandler(error);
      toastError(errorResponse?.error);
    },
  });

  const downloadHandler = () => {
    getTokenMutation.mutate({
      url: `app/work-orders/download-token?api-version=${import.meta.env.VITE_API_VERSION
        }&WorkOrderState=${true}`,
    });
  };
  console.log(filterValue, 'filterValue');
  const memoizedBaseColumns = useMemo(
    () =>
      basicColumns({
        workOrdersTypeLookup,
        categoryLookup,
        userLookup,
        setShowPreviewModal,
        setEditItem,
        currentUser,
      }),
    [
      categoryLookup,
      currentUser,
      setEditItem,
      userLookup,
      workOrdersTypeLookup,
      data?.items,
    ],
  );

  const searchInputHandler = (value: string) => {
    setSearchInputValue(value);
  };

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
      <BysWorkOrdersTableHeader
        setSelectedColumnKeys={setSelectedColumnKeys}
        selectedColumnKeys={selectedColumnKeys}
        columnOrder={columnOrder}
        setColumnOrder={setColumnOrder}
        searchInputHandler={searchInputHandler}
        setNewItem={setNewItem}
        handleDownload={downloadHandler}
        isExcelDownloading={getTokenMutation?.isPending}
        label={getTranslatedValue('WorkOrders')}
        newButtonLabel={getTranslatedValue('NewWorkOrder')}
        tableColumns={memoizedBaseColumns}
        setShowFunnelModal={setShowFunnelModal}
      />
    ),
    [
      selectedColumnKeys,
      columnOrder,
      setNewItem,
      downloadHandler,
      getTokenMutation?.isPending,
      memoizedBaseColumns,
    ],
  );
  const onSubmitFilter = (data: any) => {
    setFilterValue(data);
    setShowFunnelModal(null);
  };
  return (
    <>
      <Table
        data={data?.items ?? []}
        columns={effectiveColumns}
        maxHeight="73dvh"
        isLoading={isLoading}
        headerChildren={header}
        totalCount={data?.totalCount ?? 0}
        pageChangeHandler={setCurrentPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        lastColumnSticky
        setSorting={setSortData}
        sorting={sortData}
        setPageSize={setPageSize}
        pageSize={pageSize}
      />
      {showPreviewModal && (
        <Modal
          isOpen={showPreviewModal}
          onClose={() => setShowPreviewModal(null)}
          modalSize="md"
          showCloseButton={false}
        >
          <WorkOrderPreviewModal
            notificationTypeLookup={workOrdersTypeLookup}
            userLookup={userLookup}
            setIsVisible={setShowPreviewModal}
            categoryLookup={categoryLookup}
            workOrderInfo={showPreviewModal}
            workOrdersTypeLookup={workOrdersTypeLookup}
            deviceLookup={deviceLookup}
            organizationsLookup={organizationsLookup}
          />
        </Modal>
      )}
      {showFunnelModal && (
        <Modal
          isOpen={showFunnelModal}
          onClose={() => setShowFunnelModal(null)}
          modalSize="md"
          showCloseButton={false}
        >
          <WorkOrderFilterModal
            notificationTypeLookup={workOrdersTypeLookup}
            userLookup={userLookup}
            setIsVisible={setShowFunnelModal}
            categoryLookup={categoryLookup}
            register={register}
            control={control}
            handleSubmit={handleSubmit}
            reset={reset}
            setValue={setValue}
            onSubmit={onSubmitFilter}
            setShowFunnelModal={setShowFunnelModal}
            isLoading={isLoading}
          />
        </Modal>
      )}
    </>
  );
}

const WorkOrdersTable = memo(MemoWorkOrdersTable);

export default WorkOrdersTable;
