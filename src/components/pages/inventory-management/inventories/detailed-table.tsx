import { PaperDownloadSvg } from '@/assets/icons/paper-download-svg';
import SureDeleteModal from '@/components/ui/action/sure-delete-modal';
import { Button } from '@/components/ui/button/button';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import Table from '@/components/ui/table/table';
import { GlobalTableHeader } from '@/components/ui/table/table-head/global-table-header';
import { InventoriesDetailedTableColumns as basicColumns } from '@/enum-data/inventory-management/inventories-detailed-table-columns';
import {
  downloadExcelFile,
  downloadExcelFileApiWithRow,
  downloadGetMethodExcelFile,
} from '@/helpers/download-excel-export';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import { fetchInventoriesCategorizedList } from '@/services/inventory-management/inventories/inventories-list-api';
import { ISort } from '@/types/components/ui/table';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { memo, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ConsumablesModal from './consumables-modal';
import EditInventoryModal from './edit-modal';
import InventoryImagesSlider from './images-slider';
import InventoryImportModal from './import-modal';
import TransferModal from './transfer-modal';

const InventoriesDetailedTable = ({
  warehouseId,
  productId,
  activeWarehouse,
  setNewItem,
  handleBack,
}: {
  warehouseId: string;
  productId?: string | null;
  setNewItem: (value: boolean) => void;
  activeWarehouse: string;
  handleBack: VoidFunction;
}) => {
  const navigate = useNavigate();
  const [sortData, setSortData] = useState<ISort>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [searchInputValue, setSearchInputValue] = useState<string>('');
  const [pageSize, setPageSize] = useState(10);
  const [showConsumables, setShowConsumables] = useState<any>(null);
  const [showImageSlider, setShowImageSlider] = useState<any>(null);
  const [showTransferModal, setShowTransferModal] = useState<any>(null);
  const [showEditItem, setShowEditItem] = useState<any>(null);
  const [deleteItem, setDeleteItem] = useState<any>(null);
  const [importModal, setImportModal] = useState<any>(null);

  const { data, isLoading: inventoriesLoading } = useQuery({
    queryKey: [
      'inventories detailed',
      searchInputValue,
      productId,
      warehouseId,
      currentPage,
      sortData,
      pageSize,
    ],
    queryFn: () =>
      fetchInventoriesCategorizedList({
        ProductId: productId ?? '',
        serialNumber: '',
        warehouseId,
        filterText: searchInputValue,
        skipCount: currentPage * pageSize,
        sorting: sortData,
        pageSize,
      }),
    retry: false,
    enabled: !!warehouseId,
  });
  const [searchParams] = useSearchParams();

  const productName = searchParams.get('name') ?? '';

  // const { data: units, isLoading: unitLoading } = useQuery({
  //   queryKey: ["Product Unit Lookup"],
  //   queryFn: () => fetchProductUnitLookup(),
  //   retry: false,
  // });

  const isLoading = inventoriesLoading;

  const memoizedBaseColumns = useMemo(
    () =>
      basicColumns({
        setLogItem: () => {
          navigate(
            `/inventory-management/warehouses/${warehouseId}/stock-change`,
          );
        },
        setEditItem: (row) => {
          setShowEditItem(row?.original);
        },
        setImagesItem: (row) => {
          setShowImageSlider(row?.original);
        },
        setConsumableItem: (row) => {
          setShowConsumables(row?.original);
        },
        setTransferItem: (row) => {
          setShowTransferModal(row?.original);
        },
        setDeleteItem: (row) => {
          setDeleteItem(row?.original);
        },
      }),
    [warehouseId],
  );

  const [selectedColumnKeys, setSelectedColumnKeys] = useState<string[]>(
    memoizedBaseColumns.map((col) => col.accessorKey),
  );
  const [columnOrder, setColumnOrder] = useState<string[]>(
    memoizedBaseColumns.map((col) => col.accessorKey),
  );

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

  const downloadMutation = useMutation({
    mutationFn: downloadExcelFileApiWithRow,
    onSuccess: async (data) => {
      downloadExcelFile({
        response: data,
        fileName: getTranslatedValue('Inventories'),
      });
    },
    onError: async (error: AxiosError) => {
      const errorResponse = await apiErrorHandler(error);
      toastError(errorResponse?.error);
    },
  });
  const handleDownload = () => {
    downloadMutation.mutate({
      url: `app/export-to-excel/export-to-excel-inventory-list?api-version=${import.meta.env.VITE_API_VERSION}`,
      formData: {
        productId,
        warehouseId,
      },
    });
  };
  const handleDownloadTemplate = async () => {
    await downloadGetMethodExcelFile({
      excelUrl: `app/import-from-excel/inventory-excel-import-template?api-version=${import.meta.env.VITE_API_VERSION}`,
      fileName: getTranslatedValue('InventoriesTemplate'),
    });
  };

  const onImport = () => {
    setImportModal(true);
  };

  const header = useMemo(
    () => (
      <GlobalTableHeader
        setSelectedColumnKeys={setSelectedColumnKeys}
        selectedColumnKeys={selectedColumnKeys}
        columnOrder={columnOrder}
        setColumnOrder={setColumnOrder}
        searchInputHandler={searchInputHandler}
        setNewItem={getPermission('WebNet.Inventories.Create') && setNewItem}
        handleDownload={handleDownload}
        isExcelDownloading={downloadMutation?.isPending}
        handleImport={onImport}
        label={productName}
        newButtonLabel={getTranslatedValue('NewInventory')}
        tableColumns={memoizedBaseColumns}
        onBack={handleBack}
        actions={
          <Button
            variant="secondary-blue"
            onClick={handleDownloadTemplate}
            leftIcon={<PaperDownloadSvg width="20" stroke="var(--brand-600)" />}
            style={{ whiteSpace: 'nowrap' }}
          >
            {getTranslatedValue('ExportTemplate')}
          </Button>
        }
      />
    ),
    [selectedColumnKeys, columnOrder, searchInputValue, activeWarehouse],
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

      {importModal && (
        <Modal
          modalSize="sm"
          isOpen={importModal}
          showCloseButton={false}
          onClose={() => setImportModal(false)}
        >
          <InventoryImportModal setShowModal={setImportModal} />
        </Modal>
      )}

      {getPermission('WebNet.Inventories.Edit') && showEditItem && (
        <Modal
          modalSize="md"
          isOpen={showEditItem}
          showCloseButton={false}
          onClose={() => setShowEditItem(false)}
        >
          <EditInventoryModal
            dataInfo={showEditItem}
            setShowModal={setShowEditItem}
          />
        </Modal>
      )}

      {showTransferModal && (
        <Modal
          modalSize="sm"
          isOpen={showTransferModal}
          showCloseButton={false}
          onClose={() => setShowTransferModal(false)}
        >
          <TransferModal
            setShowModal={setShowTransferModal}
            transferDetails={showTransferModal}
          />
        </Modal>
      )}
      {showConsumables && (
        <Modal
          modalSize="sm"
          isOpen={showConsumables}
          showCloseButton={false}
          onClose={() => setShowConsumables(false)}
        >
          <ConsumablesModal
            inventoryId={showConsumables?.inventory?.id?.toString()}
            setShowModal={setShowConsumables}
          />
        </Modal>
      )}
      {showImageSlider && (
        <Modal
          modalSize="sm"
          isOpen={showImageSlider}
          showCloseButton={false}
          onClose={() => setShowImageSlider(false)}
        >
          <InventoryImagesSlider
            inventoryId={showImageSlider?.inventory?.id?.toString()}
            setShowModal={setShowImageSlider}
          />
        </Modal>
      )}

      {getPermission('WebNet.Inventories.Delete') && deleteItem && (
        <Modal
          modalSize="sm"
          isOpen={deleteItem}
          onClose={() => setDeleteItem(false)}
        >
          <SureDeleteModal
            queryKey={'inventories detailed'}
            deleteItemUrl={`app/inventories/${deleteItem?.inventory?.id?.toString()}?api-version=${import.meta.env.VITE_API_VERSION}`}
            setShowModal={setDeleteItem}
          />
        </Modal>
      )}
    </>
  );
};

export default memo(InventoriesDetailedTable);
