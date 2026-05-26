import { useMemo, useState } from 'react';
import { wareHousesTableColumns as basicColumns } from '@/enum-data/inventory-management/warehouses-data';
import {
  downloadExcelFile,
  downloadExcelFileApiWithRow,
} from '@/helpers/download-excel-export';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { exportFilterProps } from '@/types/pages/inventory-management/inventory-management';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import { useDownloadFile } from '@/hooks/use-download-file';
import { fetchWarehouseList } from '@/services/inventory-management/warehouses';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import TableBox from '@/components/ui/table-box/table-box';
import FunnelModal from './funnel-modal';
import { WareHousesTableHeader } from './table-header';

export const BoxesWrapper = ({
  setNewItem,
  setIsTable,
}: {
  setNewItem: (value: boolean) => void;
  setIsTable: any;
}) => {
  const [searchInputValue, setSearchInputValue] = useState<string>('');
  const [showEditModal, setShowEditModal] = useState<any>(null);
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
    queryKey: ['warehouses list', searchInputValue, funnelData],
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
        skipCount: 0,
        sorting: [],
        status,
      });
    },
    retry: false,
  });

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
      url: `app/export-to-excel/export-to-excel-warehouse-list?api-version=${
        import.meta.env.VITE_API_VERSION
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

  const sortedArray = [
    ...(filteredData?.filter(
      (item: any) => item && !item?.warehouse?.isDiscard,
    ) || []),
    ...(filteredData?.filter(
      (item: any) => item && item?.warehouse?.isDiscard === true,
    ) || []),
  ];

  return (
    <>
      <TableBox
        data={
          sortedArray?.map((item: any) => ({
            ...item,
            haveDeletePermission: getPermission('WebNet.Warehouses.Delete'),
            haveEditPermmission: getPermission('WebNet.Warehouses.Edit'),
            haveInventoriesPermission: getPermission('WebNet.Inventories'),
            havePermissionSetup: true,
          })) ?? []
        }
        maxHeight="73dvh"
        isLoading={isTableLoading || isPending}
        headerChildren={header}
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
