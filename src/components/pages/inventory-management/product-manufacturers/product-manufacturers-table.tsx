import SureDeleteModal from '@/components/ui/action/sure-delete-modal';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import Table from '@/components/ui/table/table';
import { GlobalTableHeader } from '@/components/ui/table/table-head/global-table-header';
import { getColumns } from '@/enum-data/inventory-management/product-manufacturers';
import {
  downloadExcelFile,
  downloadExcelFileApiWithRow,
} from '@/helpers/download-excel-export';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import { fetchProductsManufacturersList } from '@/services/inventory-management/product-manufacturers';
import { ProductManufacturer } from '@/types/pages/inventory-management/product-manufacturers';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useMemo, useState } from 'react';
import { default as ProductManufacturerForm, default as ProductUnitForm } from './product-manufacturers-form';

export default function ProductManufacturersTable() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [sortData, setSortData] = useState<string[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null);
  const [creatingNewUnit, setCreatingNewUnit] = useState(false);
  const [showEditModal, setShowEditModal] =
    useState<null | ProductManufacturer>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading } = useQuery({
    queryKey: [
      'productManufacturers',
      searchTerm,
      sortData,
      pageSize,
      currentPage,
    ],
    queryFn: () =>
      fetchProductsManufacturersList({
        filterText: searchTerm,
        skipCount: currentPage * 10,

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

  const mutation = useMutation({
    mutationFn: downloadExcelFileApiWithRow,
    onSuccess: async (data) => {
      downloadExcelFile({
        response: data,
        fileName: getTranslatedValue('ProductManufacturers'),
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
        productUnitId: null,
      },
      url: `app/export-to-excel/export-to-excel-product-manufacturer-list?api-version=${import.meta.env.VITE_API_VERSION}`,
    });
  };

  const header = useMemo(
    () => (
      <GlobalTableHeader
        label={getTranslatedValue('ProductManufacturers')}
        tableColumns={memoizedBaseColumns}
        setSelectedColumnKeys={setSelectedColumnKeys}
        selectedColumnKeys={selectedColumnKeys}
        columnOrder={columnOrder}
        isExcelDownloading={mutation.isPending}
        handleDownload={handleDownload}
        newButtonLabel={getTranslatedValue('NewProductManufacturer')}
        setColumnOrder={setColumnOrder}
        searchInputHandler={setSearchTerm}
        setNewItem={getPermission("WebNet.ProductManufacturers.Create") ? () => setCreatingNewUnit(true) : undefined}
      />
    ),
    [selectedColumnKeys, columnOrder, showEditModal],
  );

  const handleCreatingModal = () => {
    setCreatingNewUnit((prev) => !prev);
  };

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
        hasPagination={true}
      />
      {getPermission("WebNet.ProductManufacturers.Create") && creatingNewUnit && (
        <Modal
          modalSize="sm"
          isOpen={creatingNewUnit}
          onClose={handleCreatingModal}
          showCloseButton={false}
        >
          <ProductUnitForm onSuccess={handleCreatingModal} />
        </Modal>
      )}

      {getPermission("WebNet.ProductManufacturers.Edit") && showEditModal && (
        <Modal
          modalSize="sm"
          isOpen={!!showEditModal}
          onClose={() => {
            setShowEditModal(null);
          }}
          showCloseButton={false}
        >
          <ProductManufacturerForm
            manufacturer={showEditModal}
            onSuccess={() => {
              setShowEditModal(null);
            }}
          />
        </Modal>
      )}

      {getPermission("WebNet.ProductManufacturers.Delete") && showDeleteModal && (
        <Modal
          modalSize="sm"
          isOpen={!!showDeleteModal}
          onClose={() => setShowDeleteModal(null)}
        >
          <SureDeleteModal
            queryKey="productManufacturers"
            setShowModal={() => setShowDeleteModal(null)}
            deleteItemUrl={`app/product-manufacturers/${showDeleteModal}?api-version=${import.meta.env.VITE_API_VERSION
              }`}
          />
        </Modal>
      )}
    </>
  );
}
