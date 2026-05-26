import SureDeleteModal from '@/components/ui/action/sure-delete-modal';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import Table from '@/components/ui/table/table';
import { GlobalTableHeader } from '@/components/ui/table/table-head/global-table-header';
import { getColumns } from '@/enum-data/inventory-management/product-brand-models';
import {
  downloadExcelFile,
  downloadExcelFileApiWithRow,
} from '@/helpers/download-excel-export';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import { fetchProductsBrandModelsList } from '@/services/inventory-management/product-brand-models';
import { ProductBrandModel } from '@/types/pages/inventory-management/product-brand-models';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useMemo, useState } from 'react';
import ProductBrandModelForm from './product-brand-models-form';

export default function ProductBrandModelsTable() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [sortData, setSortData] = useState<string[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null);
  const [creatingNewModel, setCreatingNewModel] = useState(false);
  const [showEditModal, setShowEditModal] = useState<null | ProductBrandModel>(
    null,
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading } = useQuery({
    queryKey: [
      'productBrandModels',
      searchTerm,
      sortData,
      pageSize,
      currentPage,
    ],
    queryFn: () =>
      fetchProductsBrandModelsList({
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
        fileName: getTranslatedValue('ProductBrandModels'),
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
      url: `app/export-to-excel/export-to-excel-product-brand-model-list?api-version=${import.meta.env.VITE_API_VERSION
        }`,
    });
  };

  const handleCreatingModal = () => {
    setCreatingNewModel((prev) => !prev);
  };

  const header = useMemo(
    () => (
      <GlobalTableHeader
        label={getTranslatedValue('ProductBrandModels')}
        tableColumns={memoizedBaseColumns}
        setSelectedColumnKeys={setSelectedColumnKeys}
        selectedColumnKeys={selectedColumnKeys}
        columnOrder={columnOrder}
        newButtonLabel={getTranslatedValue('NewProductBrandModel')}
        setColumnOrder={setColumnOrder}
        searchInputHandler={setSearchTerm}
        handleDownload={handleDownload}
        isExcelDownloading={mutation.isPending}
        setNewItem={getPermission("WebNet.ProductBrandModels.Create") ? () => setCreatingNewModel(true) : undefined}
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
        lastColumnSticky
        hasPagination={true}
      />
      {getPermission("WebNet.ProductBrandModels.Create") && creatingNewModel && (
        <Modal
          modalSize="sm"
          isOpen={creatingNewModel}
          onClose={handleCreatingModal}
          showCloseButton={false}
        >
          <ProductBrandModelForm onSuccess={handleCreatingModal} />
        </Modal>
      )}

      {getPermission("WebNet.ProductBrandModels.Edit") && showEditModal && (
        <Modal
          modalSize="sm"
          isOpen={!!showEditModal}
          onClose={() => {
            setShowEditModal(null);
          }}
          showCloseButton={false}
        >
          <ProductBrandModelForm
            brandModel={showEditModal}
            onSuccess={() => {
              setShowEditModal(null);
            }}
          />
        </Modal>
      )}

      {getPermission("WebNet.ProductBrandModels.Delete") && showDeleteModal && (
        <Modal
          modalSize="sm"
          isOpen={!!showDeleteModal}
          onClose={() => setShowDeleteModal(null)}
        >
          <SureDeleteModal
            queryKey="productBrandModels"
            setShowModal={() => setShowDeleteModal(null)}
            deleteItemUrl={`app/product-brand-models/${showDeleteModal}?api-version=${import.meta.env.VITE_API_VERSION
              }`}
          />
        </Modal>
      )}
    </>
  );
}
