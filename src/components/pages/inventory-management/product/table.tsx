import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import Table from '@/components/ui/table/table';
import { GlobalTableHeader } from '@/components/ui/table/table-head/global-table-header';
import { ProductsTableColumns as basicColumns } from '@/enum-data/inventory-management/products-table-columns';
import {
  downloadExcelFile,
  downloadExcelFileApiWithRow,
} from '@/helpers/download-excel-export';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import { fetchProductsList } from '@/services/inventory-management/products/products-list-api';
import {
  fetchProductBrandLookup,
  fetchProductBrandModelLookup,
  fetchProductManufacturerLookup,
  fetchProductTypeLookup,
} from '@/services/inventory-management/products/products-side-api';
import { ISort } from '@/types/components/ui/table';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { memo, useMemo, useState } from 'react';
import EditProductModal from './edit-modal';

const ProductsTable = ({
  setNewItem,
}: {
  setNewItem?: (value: boolean) => void;
}) => {
  const [sortData, setSortData] = useState<ISort>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [searchInputValue, setSearchInputValue] = useState<string>('');
  const [showEditModal, setShowEditModal] = useState<any>(null);
  const [pageSize, setPageSize] = useState(10);

  const onEdit = (row: any) => {
    setShowEditModal(row);
  };

  const { data: brands, isLoading: brandsLoading } = useQuery({
    queryKey: ['Product Brand Loopkup'],
    queryFn: () => fetchProductBrandLookup(),
    retry: false,
  });

  const { data: brandModels, isLoading: brandModelsLoading } = useQuery({
    queryKey: ['Product Brand Model Loopkup'],
    queryFn: () => fetchProductBrandModelLookup(),
    retry: false,
  });

  const { data: manufacturers, isLoading: manufacturersLoading } = useQuery({
    queryKey: ['Product Manufacturer Loopkup'],
    queryFn: () => fetchProductManufacturerLookup(),
    retry: false,
  });

  const { data: types, isLoading: typesLoading } = useQuery({
    queryKey: ['Product Type Loopkup'],
    queryFn: () => fetchProductTypeLookup(),
    retry: false,
  });

  const memoizedBaseColumns = useMemo(
    () =>
      basicColumns({
        brands,
        brandModels,
        manufacturers,
        types,
        onEdit,
        queryKey: 'Products List',
      }),
    [brands, brandModels, manufacturers, types],
  );

  const [selectedColumnKeys, setSelectedColumnKeys] = useState<string[]>(
    memoizedBaseColumns.map((col) => col.accessorKey),
  );
  const [columnOrder, setColumnOrder] = useState<string[]>(
    memoizedBaseColumns.map((col) => col.accessorKey),
  );

  const {
    data,
    isLoading: isTableLoading,
    isPending,
  } = useQuery({
    queryKey: [
      'Products List',
      sortData,
      searchInputValue,
      currentPage,
      pageSize,
    ],
    queryFn: () =>
      fetchProductsList({
        filterText: searchInputValue,
        skipCount: currentPage * pageSize,
        sorting: sortData,
        pageSize,
      }),
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
      await downloadExcelFile({
        response: data,
        fileName: getTranslatedValue('Products'),
      });
    },
    onError: async (error: AxiosError) => {
      const errorResponse = await apiErrorHandler(error);
      toastError(errorResponse?.error);
    },
  });
  const downloadHandler = () => {
    mutation.mutate({
      url: `app/export-to-excel/export-to-excel-product-list?api-version=${import.meta.env.VITE_API_VERSION}`,
      formData: {
        barcodeNumber: null,
        productId: null,
        currentStockAmountMax: null,
        currentStockAmountMin: null,
        downloadToken: null,
        filterText: searchInputValue,
        isConsumable: null,
      },
    });
  };

  const handleDownload = () => {
    downloadHandler();
  };

  const isLoading =
    isTableLoading ||
    isPending ||
    typesLoading ||
    brandModelsLoading ||
    brandsLoading ||
    manufacturersLoading;

  const header = useMemo(
    () => (
      <GlobalTableHeader
        setSelectedColumnKeys={setSelectedColumnKeys}
        selectedColumnKeys={selectedColumnKeys}
        columnOrder={columnOrder}
        setColumnOrder={setColumnOrder}
        searchInputHandler={searchInputHandler}
        setNewItem={setNewItem}
        handleDownload={handleDownload}
        label={getTranslatedValue('Products')}
        newButtonLabel={getTranslatedValue('NewProduct')}
        tableColumns={memoizedBaseColumns}
      />
    ),
    [selectedColumnKeys, columnOrder, searchInputValue, showEditModal],
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
      />

      {getPermission("WebNet.Products.Edit") && showEditModal && (
        <Modal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(null)}
          modalSize="lg"
          showCloseButton={false}
        >
          <EditProductModal
            dataInfo={showEditModal}
            setShowModal={setShowEditModal}
          />
        </Modal>
      )}
    </>
  );
};

export default memo(ProductsTable);
