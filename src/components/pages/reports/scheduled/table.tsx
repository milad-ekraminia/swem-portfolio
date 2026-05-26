import SureDeleteModal from '@/components/ui/action/sure-delete-modal';
import { Button } from '@/components/ui/button/button';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import Table from '@/components/ui/table/table';
import { GlobalTableHeader } from '@/components/ui/table/table-head/global-table-header';
import {
  getColumns
} from '@/enum-data/reports/scheduled';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useDownloadFile } from '@/hooks/use-download-file';
import { fetchScheduledReportsList, getReportsFilterProfileList } from '@/services/reports/scheduled-reports-api';
import { ISort } from '@/types/components/ui/table';
import { ScheduledReport } from '@/types/pages/reports/scheduled';
import { useQuery } from '@tanstack/react-query';
import { RefreshCcw } from 'lucide-react';
import { useMemo, useState } from 'react';
import ScheduledReportsForm from './form';

export default function ScheduledReportsTable() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sort, setSort] = useState<ISort>([]);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<ScheduledReport | null>(null);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['Scheduled Reports', currentPage, sort, pageSize, searchTerm],
    queryFn: () => fetchScheduledReportsList({
      maxResultCount: pageSize,
      skipCount: currentPage * pageSize,
      filterText: searchTerm,
      sorting: sort
    }),
    retry: false,
  });

  const { data: reportsFilterProfileList, isLoading: reportsFilterProfileListLoading } = useQuery({
    queryKey: ['reports filter profile list'],
    queryFn: getReportsFilterProfileList,
    retry: false,
  });

  const memoizedBaseColumns = useMemo(
    () => getColumns(setIsDeleting, setIsUpdating, reportsFilterProfileListLoading ? [] : reportsFilterProfileList),
    [data, reportsFilterProfileList, reportsFilterProfileListLoading],
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

  const { downloadHandler, isExcelDownloading } = useDownloadFile();

  const handleDownload = () => {
    downloadHandler({
      excelUrl: `app/scheduled-reports/as-excel-file`,
      fileName: getTranslatedValue('mnuEMScheduledReport'),
      searchInputValue: searchTerm,
      getTokenUrl: `app/scheduled-reports/download-token?api-version=${import.meta.env.VITE_API_VERSION
        }`,
    });
  };


  const header = useMemo(
    () => (
      <GlobalTableHeader
        label={getTranslatedValue('mnuEMScheduledReport')}
        tableColumns={effectiveColumns}
        setNewItem={setIsCreating}
        newButtonLabel={getTranslatedValue('Add')}
        searchInputHandler={setSearchTerm}
        setSelectedColumnKeys={setSelectedColumnKeys}
        selectedColumnKeys={selectedColumnKeys}
        columnOrder={columnOrder}
        setColumnOrder={setColumnOrder}
        isExcelDownloading={isExcelDownloading}
        handleDownload={handleDownload}
        actions={
          <Button onClick={() => refetch()} type="button" variant="secondary">
            <div
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: ' var(--spacing-xs, 4px)',
              }}
            >
              <RefreshCcw size={18} stroke="#344054" />
              {getTranslatedValue('Refresh', 'AbpUi.texts')}
            </div>
          </Button>
        }
      />
    ),
    [selectedColumnKeys, columnOrder, isExcelDownloading],
  );
  return (
    <>
      <Table
        data={data?.items ?? []}
        maxHeight="650px"
        isLoading={isLoading}
        headerChildren={header}
        totalCount={data?.totalCount || 0}
        pageChangeHandler={setCurrentPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        setSorting={setSort}
        sorting={sort}
        setPageSize={setPageSize}
        pageSize={pageSize}
        hasPagination={true}
        columns={effectiveColumns}
      />

      {isCreating ? (
        <Modal
          modalSize="md"
          isOpen={isCreating}
          onClose={() => setIsCreating(false)}
          showCloseButton={false}
        >
          <ScheduledReportsForm
            onSuccess={() => setIsCreating(false)}
            reportsFilterProfileList={reportsFilterProfileList}
          />
        </Modal>
      ) : null}

      {isUpdating ? (
        <Modal
          modalSize="md"
          isOpen={!!isUpdating}
          onClose={() => setIsUpdating(null)}
          showCloseButton={false}
        >
          <ScheduledReportsForm
            scheduledReport={isUpdating}
            onSuccess={() => setIsUpdating(null)}
            reportsFilterProfileList={reportsFilterProfileList}
          />
        </Modal>
      ) : null}

      {isDeleting ? (
        <Modal
          modalSize="sm"
          isOpen={!!isDeleting}
          onClose={() => setIsDeleting(null)}
          showCloseButton={false}
        >
          <SureDeleteModal
            queryKey="Scheduled Reports"
            setShowModal={() => setIsDeleting(null)}
            deleteItemUrl={`app/scheduled-reports/${isDeleting}?api-version=${import.meta.env.VITE_API_VERSION}`}
          />
        </Modal>
      ) : null}
    </>
  );
}
