import SureDeleteModal from '@/components/ui/action/sure-delete-modal';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import Table from '@/components/ui/table/table';
import { GlobalTableHeader } from '@/components/ui/table/table-head/global-table-header';
import { getColumns } from '@/enum-data/inventory-management/product-brands';
import {
  downloadExcelFile,
  downloadExcelFileApiWithRow,
} from '@/helpers/download-excel-export';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import { fetchProductsBrandsList } from '@/services/inventory-management/product-brands';
import { ProductBrand } from '@/types/pages/inventory-management/product-brands';
import { isPending } from '@reduxjs/toolkit';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useMemo, useState } from 'react';
import ProductBrandForm from './product-brands-form';

export default function ProductBrandsTable() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [sortData, setSortData] = useState<string[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null);
  const [creatingNewBrand, setCreatingNewBrand] = useState(false);
  const [showEditModal, setShowEditModal] = useState<null | ProductBrand>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading } = useQuery({
    queryKey: ['productBrands', searchTerm, sortData, pageSize, currentPage],
    queryFn: () =>
      fetchProductsBrandsList({
        filterText: searchTerm,
        skipCount: currentPage * pageSize,
        sorting: sortData,
        maxResultCount: pageSize,
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
    setCreatingNewBrand((prev) => !prev);
  };

  const mutation = useMutation({
    mutationFn: downloadExcelFileApiWithRow,
    onSuccess: async (data) => {
      downloadExcelFile({
        response: data,
        fileName: getTranslatedValue('ProductBrands'),
      });
    },
    onError: async (error: AxiosError) => {
      const errorResponse = await apiErrorHandler(error);
      toastError(errorResponse?.error);
    },
  });

  const handleDownload = () => {
    mutation.mutate({
      formData: {
        downloadToken: null,
        filterText: null,
        name: null,
        description: null,
      },
      url: `app/export-to-excel/export-to-excel-product-brand-list?api-version=${import.meta.env.VITE_API_VERSION}`,
    });
  };

  const header = useMemo(
    () => (
      <GlobalTableHeader
        label={getTranslatedValue('ProductBrands')}
        tableColumns={memoizedBaseColumns}
        setSelectedColumnKeys={setSelectedColumnKeys}
        selectedColumnKeys={selectedColumnKeys}
        columnOrder={columnOrder}
        handleDownload={handleDownload}
        isExcelDownloading={mutation.isPending}
        newButtonLabel={getTranslatedValue('NewProductBrand')}
        setColumnOrder={setColumnOrder}
        searchInputHandler={setSearchTerm}
        setNewItem={getPermission("WebNet.ProductBrands.Create") ? () => setCreatingNewBrand(true) : undefined}
      />
    ),
    [selectedColumnKeys, columnOrder, showEditModal, isPending],
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
        hasPagination={true}
      />
      {getPermission("WebNet.ProductBrands.Create") && creatingNewBrand && (
        <Modal
          modalSize="sm"
          isOpen={creatingNewBrand}
          onClose={handleCreatingModal}
          showCloseButton={false}
        >
          <ProductBrandForm onSuccess={handleCreatingModal} />
        </Modal>
      )}

      {getPermission("WebNet.ProductBrands.Edit") && showEditModal && (
        <Modal
          modalSize="sm"
          isOpen={!!showEditModal}
          onClose={() => {
            setShowEditModal(null);
          }}
          showCloseButton={false}
        >
          <ProductBrandForm
            brand={showEditModal}
            onSuccess={() => {
              setShowEditModal(null);
            }}
          />
        </Modal>
      )}

      {getPermission("WebNet.ProductBrands.Delete") && showDeleteModal && (
        <Modal
          modalSize="sm"
          isOpen={!!showDeleteModal}
          onClose={() => setShowDeleteModal(null)}
        >
          <SureDeleteModal
            queryKey="productBrands"
            setShowModal={() => setShowDeleteModal(null)}
            deleteItemUrl={`app/product-brands/${showDeleteModal}?api-version=${import.meta.env.VITE_API_VERSION
              }`}
          />
        </Modal>
      )}
    </>
  );
}
