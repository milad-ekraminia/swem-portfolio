import SureDeleteModal from '@/components/ui/action/sure-delete-modal';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import Table from '@/components/ui/table/table';
import { GlobalTableHeader } from '@/components/ui/table/table-head/global-table-header';
import { getColumns } from '@/enum-data/inventory-management/product-types';
import {
  downloadExcelFile,
  downloadExcelFileApiWithRow,
} from '@/helpers/download-excel-export';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import { fetchProductTypesList } from '@/services/inventory-management/product-types';
import { ProductType } from '@/types/pages/inventory-management/product-types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useMemo, useState } from 'react';
import ProductTypeForm from './product-types-form';

export default function ProductTypesTable() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [sortData, setSortData] = useState<string[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null);
  const [creatingNewUnit, setCreatingNewUnit] = useState(false);
  const [showEditModal, setShowEditModal] = useState<null | ProductType>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading } = useQuery({
    queryKey: ['productTypes', searchTerm, sortData, pageSize, currentPage],
    queryFn: () =>
      fetchProductTypesList({
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

  const mutation = useMutation({
    mutationFn: downloadExcelFileApiWithRow,
    onSuccess: async (data) => {
      downloadExcelFile({
        response: data,
        fileName: getTranslatedValue('ProductTypes'),
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
      url: `app/export-to-excel/export-to-excel-product-type-list?api-version=${import.meta.env.VITE_API_VERSION
        }`,
    });
  };

  const handleCreatingModal = () => {
    setCreatingNewUnit((prev) => !prev);
  };

  const header = useMemo(
    () => (
      <GlobalTableHeader
        label={getTranslatedValue('ProductTypes')}
        tableColumns={memoizedBaseColumns}
        setSelectedColumnKeys={setSelectedColumnKeys}
        selectedColumnKeys={selectedColumnKeys}
        columnOrder={columnOrder}
        newButtonLabel={getTranslatedValue('NewProductType')}
        setColumnOrder={setColumnOrder}
        searchInputHandler={setSearchTerm}
        handleDownload={handleDownload}
        isExcelDownloading={mutation.isPending}
        setNewItem={getPermission("WebNet.ProductTypes.Create") ? () => setCreatingNewUnit(true) : undefined}
      />
    ),
    [selectedColumnKeys, columnOrder, showEditModal, mutation.isPending],
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
      {getPermission("WebNet.ProductTypes.Create") && creatingNewUnit && (
        <Modal
          modalSize="sm"
          isOpen={creatingNewUnit}
          onClose={handleCreatingModal}
          showCloseButton={false}
        >
          <ProductTypeForm onSuccess={handleCreatingModal} />
        </Modal>
      )}

      {getPermission("WebNet.ProductTypes.Edit") && showEditModal && (
        <Modal
          modalSize="sm"
          isOpen={!!showEditModal}
          onClose={() => {
            setShowEditModal(null);
          }}
          showCloseButton={false}
        >
          <ProductTypeForm
            productType={showEditModal}
            onSuccess={() => {
              setShowEditModal(null);
            }}
          />
        </Modal>
      )}

      {getPermission("WebNet.ProductTypes.Delete") && showDeleteModal && (
        <Modal
          modalSize="sm"
          isOpen={!!showDeleteModal}
          onClose={() => setShowDeleteModal(null)}
        >
          <SureDeleteModal
            queryKey="productTypes"
            setShowModal={() => setShowDeleteModal(null)}
            deleteItemUrl={`app/product-types/${showDeleteModal.toString()}?api-version=${import.meta.env.VITE_API_VERSION
              }`}
          />
        </Modal>
      )}
    </>
  );
}
