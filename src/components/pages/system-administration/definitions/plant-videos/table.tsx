import SureDeleteModal from '@/components/ui/action/sure-delete-modal';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import Table from '@/components/ui/table/table';
import { GlobalTableHeader } from '@/components/ui/table/table-head/global-table-header';
import { getColumns } from '@/enum-data/system-administration/plant-videos';
import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useDownloadFile } from '@/hooks/use-download-file';
import { getPartialPlantsList } from '@/services/system-administration/definitions/plant-images';
import { getPlantVideos } from '@/services/system-administration/definitions/plant-videos';
import { ISort } from '@/types/components/ui/table';
import { PlantVideo } from '@/types/pages/system-administration/definitions/plant-videos';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import PlantVideoForm from './form';

export default function PlantVideosTable() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [sortData, setSortData] = useState<ISort>([]);
  const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null);
  const [creatingNewModel, setCreatingNewModel] = useState(false);
  const [showEditModal, setShowEditModal] = useState<null | PlantVideo>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading } = useQuery({
    queryKey: ['plantVideos', searchTerm, sortData, pageSize, currentPage],
    queryFn: () =>
      getPlantVideos({
        filterText: searchTerm,
        maxResultCount: pageSize,
        skipCount: currentPage * pageSize,
        sorting: sortData,
      }),
  });

  const { data: organizations } = useQuery({
    queryKey: ['partialPlantsList'],
    queryFn: () => getPartialPlantsList(),
    retry: false,
  });

  const memoizedBaseColumns = useMemo(
    () => getColumns(setShowDeleteModal, setShowEditModal, organizations),
    [data, organizations],
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
    setCreatingNewModel((prev) => !prev);
  };

  const { downloadHandler, isExcelDownloading } = useDownloadFile();

  const handleDownload = () => {
    downloadHandler({
      excelUrl: `app/plant-videos/as-excel-file`,
      fileName: getTranslatedValue('PlantVideos'),
      searchInputValue: searchTerm,
      getTokenUrl: `app/plant-videos/download-token?api-version=${import.meta.env.VITE_API_VERSION}`,
    });
  };

  const header = useMemo(
    () => (
      <GlobalTableHeader
        label={getTranslatedValue('PlantVideos')}
        tableColumns={memoizedBaseColumns}
        setSelectedColumnKeys={setSelectedColumnKeys}
        selectedColumnKeys={selectedColumnKeys}
        columnOrder={columnOrder}
        newButtonLabel={getTranslatedValue('NewPlantVideo')}
        setColumnOrder={setColumnOrder}
        searchInputHandler={setSearchTerm}
        isExcelDownloading={isExcelDownloading}
        handleDownload={handleDownload}
        setNewItem={getPermission('WebNet.PlantVideos.Create') ? handleCreatingModal : undefined}
      />
    ),
    [selectedColumnKeys, columnOrder, showEditModal, isExcelDownloading],
  );

  return (
    <>
      <Table
        data={(data?.items as any) ?? []}
        columns={effectiveColumns}
        maxHeight="650px"
        isLoading={isLoading}
        headerChildren={header}
        totalCount={data?.totalCount || 0}
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
      {getPermission('WebNet.PlantVideos.Create') && creatingNewModel && (
        <Modal
          modalSize="sm"
          isOpen={creatingNewModel}
          onClose={handleCreatingModal}
          showCloseButton={false}
        >
          <PlantVideoForm
            organizations={organizations}
            onSuccess={() => {
              setCreatingNewModel(false);
            }}
          />
        </Modal>
      )}
      {getPermission('WebNet.PlantVideos.Edit') && showEditModal && (
        <Modal
          modalSize="sm"
          isOpen={!!showEditModal}
          onClose={() => {
            setShowEditModal(null);
          }}
          showCloseButton={false}
        >
          <PlantVideoForm
            plantVideo={showEditModal}
            organizations={organizations}
            onSuccess={() => {
              setShowEditModal(null);
            }}
          />
        </Modal>
      )}

      {!!showDeleteModal && (
        <Modal
          modalSize="sm"
          isOpen={!!showDeleteModal}
          onClose={() => setShowDeleteModal(null)}
        >
          <SureDeleteModal
            queryKey="plantVideos"
            setShowModal={() => setShowDeleteModal(null)}
            deleteItemUrl={`app/plant-videos/${showDeleteModal}?api-version=${import.meta.env.VITE_API_VERSION}`}
          />
        </Modal>
      )}
    </>
  );
}
