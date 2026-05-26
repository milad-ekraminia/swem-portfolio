import SureDeleteModal from '@/components/ui/action/sure-delete-modal';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import Table from '@/components/ui/table/table';
import { GlobalTableHeader } from '@/components/ui/table/table-head/global-table-header';
import { getColumns } from '@/enum-data/inventory-management/product-units';
import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { fetchProductsUnitList } from '@/services/inventory-management/product-units';
import { ProductUnit } from '@/types/pages/inventory-management/product-units';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import ProductUnitForm from './product-unit-form';

export default function ProductUnitsTable() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [sortData, setSortData] = useState<string[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null);
  const [creatingNewUnit, setCreatingNewUnit] = useState(false);
  const [showEditModal, setShowEditModal] = useState<null | ProductUnit>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading } = useQuery({
    queryKey: ['productUnits', searchTerm, sortData, pageSize, currentPage],
    queryFn: () =>
      fetchProductsUnitList({
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
    setCreatingNewUnit((prev) => !prev);
  };

  const header = useMemo(
    () => (
      <GlobalTableHeader
        label={getTranslatedValue('ProductUnits')}
        tableColumns={memoizedBaseColumns}
        setSelectedColumnKeys={setSelectedColumnKeys}
        selectedColumnKeys={selectedColumnKeys}
        columnOrder={columnOrder}
        newButtonLabel={getTranslatedValue('NewProductUnit')}
        setColumnOrder={setColumnOrder}
        searchInputHandler={setSearchTerm}
        setNewItem={
          getPermission('WebNet.ProductUnits.Create')
            ? () => setCreatingNewUnit(true)
            : undefined
        }
      />
    ),
    [selectedColumnKeys, columnOrder, showEditModal],
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
      {getPermission('WebNet.ProductUnits.Create') && creatingNewUnit && (
        <Modal
          modalSize="sm"
          isOpen={creatingNewUnit}
          onClose={handleCreatingModal}
          showCloseButton={false}
        >
          <ProductUnitForm onSuccess={handleCreatingModal} />
        </Modal>
      )}

      {getPermission('WebNet.ProductUnits.Edit') && showEditModal && (
        <Modal
          modalSize="sm"
          isOpen={!!showEditModal}
          onClose={() => {
            setShowEditModal(null);
          }}
          showCloseButton={false}
        >
          <ProductUnitForm
            productUnit={showEditModal}
            onSuccess={() => {
              setShowEditModal(null);
            }}
          />
        </Modal>
      )}

      {getPermission('WebNet.ProductUnits.Delete') && showDeleteModal && (
        <Modal
          modalSize="sm"
          isOpen={!!showDeleteModal}
          onClose={() => setShowDeleteModal(null)}
        >
          <SureDeleteModal
            queryKey="productUnits"
            setShowModal={() => setShowDeleteModal(null)}
            deleteItemUrl={`app/product-units/${showDeleteModal}?api-version=${import.meta.env.VITE_API_VERSION
              }`}
          />
        </Modal>
      )}
    </>
  );
}
