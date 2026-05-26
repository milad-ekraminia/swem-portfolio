import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import Table from '@/components/ui/table/table';
import { wareHousesTableColumns as basicColumns } from '@/enum-data/inventory-management/warehouses-data';
import {
  downloadExcelFile,
  downloadExcelFileApiWithRow,
} from '@/helpers/download-excel-export';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useDownloadFile } from '@/hooks/use-download-file';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import { fetchWarehouseList } from '@/services/inventory-management/warehouses';
import { ISort } from '@/types/components/ui/table';
import { exportFilterProps } from '@/types/pages/inventory-management/inventory-management';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useMemo, useState } from 'react';
import FunnelModal from './funnel-modal';
import { WareHousesTableHeader } from './table-header';

export const WareHousesTable = ({
  setNewItem,
  isLoading,
  setIsTable,
}: {
  setNewItem: (value: boolean) => void;
  isLoading: boolean;
  setIsTable: any;
}) => {
  const [sortData, setSortData] = useState<ISort>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [searchInputValue, setSearchInputValue] = useState<string>('');
  const [showEditModal, setShowEditModal] = useState<any>(null);
  const [pageSize, setPageSize] = useState(10);
  const [funnelData, setFunnelData] = useState({
    showPassive: true,
    showActive: true,
  });

  const memoizedBaseColumns = useMemo(() => basicColumns(), []);

  const [selectedColumnKeys, setSelectedColumnKeys] = useState<string[]>(
    memoizedBaseColumns.map((col) => col.accessorKey),
  );
  const [columnOrder, setColumnOrder] = useState<string[]>(
    memoizedBaseColumns.map((col) => col.accessorKey),
  );
  const { isExcelDownloading } = useDownloadFile();

  const {
    data,
    isLoading: isTableLoading,
    isPending,
  } = useQuery({
    queryKey: [
      'warehouses list',
      sortData,
      searchInputValue,
      currentPage,
      pageSize,
      funnelData,
    ],
    queryFn: () => {
      const status =
        funnelData?.showActive && funnelData?.showPassive
          ? undefined
          : funnelData?.showActive
            ? true
            : funnelData?.showPassive
              ? false
              : undefined;
      return fetchWarehouseList({
        isPlant: false,
        filterMode: 'all',
        filterText: searchInputValue,
        skipCount: currentPage * pageSize,
        sorting: sortData,
        status,
      });
    },
    retry: false,
  });
  const effectiveColumns = useMemo(() => {
    return columnOrder
      .filter((accessorKey) => selectedColumnKeys.includes(accessorKey))
      .map((accessorKey) =>
        memoizedBaseColumns.find((col) => col.accessorKey === accessorKey),
      )
      .filter(Boolean) as typeof memoizedBaseColumns;
  }, [columnOrder, selectedColumnKeys, memoizedBaseColumns]);

  const searchInputHandler = (value: string) => {
    setSearchInputValue(value);
  };

  const mutation = useMutation({
    mutationFn: downloadExcelFileApiWithRow,
    onSuccess: async (data) => {
      downloadExcelFile({
        response: data,
        fileName: getTranslatedValue('Warehouses'),
      });
    },
    onError: async (error: AxiosError) => {
      const errorResponse = await apiErrorHandler(error);
      toastError(errorResponse?.error);
    },
  });

  const handleDownload = () => {
    const formData: exportFilterProps = {
      address: null,
      coordinate: null,
      downloadToken: null,
      filterText: null,
      isDiscard: null,
      isPlant: null,
      name: null,
      organizationIdMax: null,
      organizationIdMin: null,
      status: null,
      warehouseId: null,
    };
    if (funnelData?.showActive) {
      formData.status = true;
    } else if (funnelData?.showPassive) {
      formData.status = false;
    }
    if (searchInputValue) {
      formData.filterText = searchInputValue;
    }
    mutation.mutate({
      url: `app/export-to-excel/export-to-excel-warehouse-list?api-version=${import.meta.env.VITE_API_VERSION
        }`,
      formData,
    });
  };

  const header = useMemo(
    () => (
      <WareHousesTableHeader
        setSelectedColumnKeys={setSelectedColumnKeys}
        selectedColumnKeys={selectedColumnKeys}
        columnOrder={columnOrder}
        setColumnOrder={setColumnOrder}
        searchInputHandler={searchInputHandler}
        setNewItem={setNewItem}
        handleDownload={handleDownload}
        isExcelDownloading={isExcelDownloading}
        queryKey="warehouses list"
        searchInputValue={searchInputValue}
        setIsTable={setIsTable}
        setShowEditModal={setShowEditModal}
        isTable={true}
      />
    ),
    [
      selectedColumnKeys,
      columnOrder,
      setNewItem,
      handleDownload,
      isExcelDownloading,
      searchInputValue,
      setIsTable,
    ],
  );

  const filteredData = data?.items?.filter(() => {
    // If both are true, don't filter anything
    if (!funnelData.showPassive && !funnelData.showActive) return false;
    return true;
  });

  return (
    <>
      <Table
        data={filteredData ?? []}
        columns={effectiveColumns}
        maxHeight="73dvh"
        isLoading={isLoading || isTableLoading || isPending}
        headerChildren={header}
        lastColumnSticky
        pageChangeHandler={setCurrentPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        setSorting={setSortData}
        sorting={sortData}
        setPageSize={setPageSize}
        pageSize={pageSize}
      />
      {showEditModal && (
        <Modal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(null)}
          modalSize="sm"
          showCloseButton={false}
        >
          <FunnelModal
            setShowEditModal={setShowEditModal}
            setFunnelData={setFunnelData}
            funnelData={funnelData}
          />
        </Modal>
      )}
    </>
  );
};
