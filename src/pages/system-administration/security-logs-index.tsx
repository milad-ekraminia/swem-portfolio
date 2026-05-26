import { SingleUserSettingSvg } from '@/assets/icons/single-user-setting-svg';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import Filters from '@/components/pages/system-administration/security-logs/filters';
import Table from '@/components/ui/table/table';
import { getColumns } from '@/enum-data/system-administration/security-logs';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { getSecurityLogsList } from '@/services/system-administration/security-logs';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';
import { ISort } from '@/types/components/ui/table';
import { Filters as FiltersTypes } from '@/types/pages/system-administration/security-logs';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

const baseBreadcrumbs: BreadcrumbItem[] = [
  {
    label: getTranslatedValue('Menu:SystemAdministration'),
  },
  {
    label: getTranslatedValue('SecurityLogs', 'AbpIdentity.texts'),
  },
];
const title = {
  label: getTranslatedValue('SecurityLogs', 'AbpIdentity.texts'),
  href: `/system-administration/security-logs`,
};

export default function SecurityLogsIndex() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [sortData, setSortData] = useState<ISort>([]);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState<FiltersTypes>({});

  const { data, isLoading } = useQuery({
    queryKey: ['securrityLogs', sortData, currentPage, pageSize, filters],
    queryFn: () =>
      getSecurityLogsList({
        skipCount: currentPage * pageSize,
        sorting: sortData,
        maxResultCount: pageSize,
        filterValues: filters,
      }),
    retry: false,
  });

  const memoizedBaseColumns = useMemo(() => getColumns(), [data]);

  const handleChangeFilters = (filters: FiltersTypes) => {
    setFilters(filters);
  };
  return (
    <div className="page-wrapper security-logs">
      <PagesHeader
        title={title}
        breadcrumbs={baseBreadcrumbs}
        icon={<SingleUserSettingSvg stroke="#323232" />}
      />
      <div className="security-logs__wrapper">
        <div className="page-wrapper__body security-logs__body">
          <div className="security-logs__header">
            {getTranslatedValue('SecurityLogs', 'AbpIdentity.texts')}
          </div>
          <div className=" security-logs__body-content">
            <Filters handleChangeFilters={handleChangeFilters} />
            <Table
              data={data?.items || []}
              columns={memoizedBaseColumns}
              maxHeight="650px"
              isLoading={isLoading}
              totalCount={data?.totalCount || 0}
              pageChangeHandler={setCurrentPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              setSorting={setSortData}
              sorting={sortData}
              setPageSize={setPageSize}
              pageSize={pageSize}
              hasPagination={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
