import { getColumns } from '@/enum-data/system-administration/audit-logs';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import { getAuditLogsList } from '@/services/system-administration/audit-logs';

import FilterForm from '@/components/pages/system-administration/definitions/audit-logs/filter-form';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import Table from '@/components/ui/table/table';
import AuditLogDetailModal from './detail-modal';

export default function AuditLogsTab() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [sortData, setSortData] = useState<any[]>([]);
  const [showDetail, setShowDetail] = useState<any | null>(null);
  const [filterValues, setFilterValues] = useState<any>({});
  const memoizedBaseColumns = useMemo(() => getColumns(setShowDetail), []);

  // Fetch audit logs data
  const { data, isLoading } = useQuery({
    queryKey: ['audit-logs', currentPage, pageSize, sortData, filterValues],
    queryFn: () =>
      getAuditLogsList({
        skipCount: currentPage * pageSize,
        maxResultCount: pageSize,
        sorting: sortData,
        filterValues: filterValues,
      }),
    retry: false,
  });

  return (
    <div className="audit-logs__wrapper">
      <div className="audit-logs__header">
        {getTranslatedValue('Menu:AuditLogging', 'AbpAuditLogging.texts')}
      </div>
      <div className="audit-logs__wrapper-content">
        <FilterForm isLoading={isLoading} setFilterValues={setFilterValues} setCurrentPage={setCurrentPage} />
        <Table
          columns={memoizedBaseColumns}
          data={data?.items || []}
          currentPage={currentPage}
          isLoading={isLoading}
          setCurrentPage={setCurrentPage}
          sorting={sortData}
          setSorting={setSortData}
          hasPagination={true}
          pageSize={pageSize}
          setPageSize={setPageSize}
          totalCount={data?.totalCount || 0}
        />
        <Modal
          showCloseButton={false}
          modalSize="md"
          isOpen={!!showDetail}
          onClose={() => setShowDetail(null)}
        >
          <AuditLogDetailModal
            onClose={() => setShowDetail(null)}
            auditLogId={showDetail}
          />
        </Modal>
      </div>
    </div>
  );
}
