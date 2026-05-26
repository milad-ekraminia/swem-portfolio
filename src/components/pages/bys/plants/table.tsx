import Table from '@/components/ui/table/table';
import { memo } from 'react';

const PlantsTable = ({
  data,
  effectiveColumns,
  currentPage,
  setCurrentPage,
  isTableLoading,
  sortData,
  setSortData,
  pageSize,
  setPageSize,
}: {
  data: any;
  effectiveColumns: any;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  isTableLoading: any;
  sortData: any;
  setSortData: any;
  pageSize: any;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <Table
      data={data?.items ?? []}
      columns={effectiveColumns}
      maxHeight="650px"
      isLoading={isTableLoading}
      totalCount={data?.totalCount ?? 0}
      pageChangeHandler={setCurrentPage}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
      lastColumnSticky
      setSorting={setSortData}
      sorting={sortData}
      setPageSize={setPageSize}
      pageSize={pageSize}
    />
  );
};

export default memo(PlantsTable);
