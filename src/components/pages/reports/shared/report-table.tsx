import Table from '@/components/ui/table/table';
import { createReportColumns } from '@/enum-data/reports/reports-shared';
import React, { JSX, useMemo } from 'react';

interface Props {
  dynamicFields: string[];
  baseColumns: any[];
  data: any[];
  headerChildren?: JSX.Element;
  maxHeight?: number | string;
  isLoading?: boolean;
  currentPage?: number;
  totalCount?: number;
  hasPagination?: boolean;
  pageChangeHandler?: (page: number) => void;
  setCurrentPage?: React.Dispatch<React.SetStateAction<number>>;
  sorting?: any;
  setSorting?: any;
  setPageSize?: any;
  pageSize?: any;
}

export default function ReportTable({
  data,
  dynamicFields,
  baseColumns,
  isLoading,
  headerChildren,
  totalCount,
  setPageSize,
  setSorting,
  pageSize,
  hasPagination,
  sorting,
  setCurrentPage,
  currentPage,
  maxHeight,
}: Props) {
  const memoizedColumns = useMemo(
    () => createReportColumns(baseColumns, dynamicFields),
    [data, dynamicFields, baseColumns],
  );

  return (
    <Table
      data={data || []}
      columns={memoizedColumns}
      maxHeight={maxHeight || '650px'}
      isLoading={isLoading}
      headerChildren={headerChildren}
      totalCount={totalCount}
      pageChangeHandler={setCurrentPage}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
      setSorting={setSorting}
      sorting={sorting}
      setPageSize={setPageSize}
      pageSize={pageSize}
      hasPagination={hasPagination}
    />
  );
}
