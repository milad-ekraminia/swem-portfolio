import { memo, useMemo, useState } from 'react';
import { PanelsTableColumns as basicColumns } from '@/enum-data/organization-trace/panels-table-columns';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useQuery } from '@tanstack/react-query';
import { fetchAllProvincesInfoList } from '@/services/organization-trace/dashboard-api';
import Table from '@/components/ui/table/table';
import { GlobalTableHeader } from '@/components/ui/table/table-head/global-table-header';

const PanelsTable = ({
  mapDataRefreshInterval,
}: {
  mapDataRefreshInterval?: number;
}) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState(10);

  const memoizedBaseColumns = useMemo(() => basicColumns(), []);

  const [selectedColumnKeys, setSelectedColumnKeys] = useState<string[]>(
    memoizedBaseColumns.map((col) => col.accessorKey),
  );
  const [columnOrder, setColumnOrder] = useState<string[]>(
    memoizedBaseColumns.map((col) => col.accessorKey),
  );

  const { data, isLoading: isTableLoading } = useQuery({
    queryKey: ['Get All Provinces Info List', currentPage, pageSize],
    queryFn: () =>
      fetchAllProvincesInfoList({
        skipCount: currentPage * pageSize,
        maxResultCount: pageSize,
      }),
    retry: false,
    refetchInterval: mapDataRefreshInterval ? mapDataRefreshInterval : false,
  });

  const effectiveColumns = useMemo(() => {
    return columnOrder
      .filter((accessorKey) => selectedColumnKeys.includes(accessorKey))
      .map((accessorKey) =>
        memoizedBaseColumns.find((col) => col.accessorKey === accessorKey),
      )
      .filter(Boolean) as typeof memoizedBaseColumns;
  }, [columnOrder, selectedColumnKeys, memoizedBaseColumns]);

  const MultiConditionalStatusTableColumns = useMemo(() => basicColumns(), []);

  const header = useMemo(
    () => (
      <GlobalTableHeader
        setSelectedColumnKeys={setSelectedColumnKeys}
        selectedColumnKeys={selectedColumnKeys}
        columnOrder={columnOrder}
        setColumnOrder={setColumnOrder}
        label={getTranslatedValue('')}
        newButtonLabel={getTranslatedValue('')}
        tableColumns={MultiConditionalStatusTableColumns}
        hasFilterTable={false}
      />
    ),
    [selectedColumnKeys, columnOrder, MultiConditionalStatusTableColumns],
  );

  return (
    <Table
      data={data?.provincesInfo?.items ?? []}
      columns={effectiveColumns}
      maxHeight="650px"
      isLoading={isTableLoading}
      headerChildren={header}
      totalCount={data?.provincesInfo?.totalCount ?? 0}
      pageChangeHandler={setCurrentPage}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
      setPageSize={setPageSize}
      pageSize={pageSize}
    />
  );
};

export default memo(PanelsTable);
