import { Loader } from '@/components/ui/loader/loader';
import Table from '@/components/ui/table/table';
import { deviceInverterInstantValueTableColumns } from '@/enum-data/organization-trace/org-trace-index';
import { memo } from 'react';
import { InverterInstantValueTableHeader } from './inverter-instant-value-table-header';

const MemoInverterInstantValueTable = ({
  viewMode,
  setViewMode,
  data,
  isLoading,
  sorting,
  setSorting,
  formattedDate,
}: {
  viewMode: any;
  setViewMode: any;
  data: any;
  isLoading: any;
  sorting: any;
  setSorting: any;
  formattedDate: any;
}) => {
  return (
    <Table
      data={data?.items?.length > 0 ? data?.items : []}
      columns={deviceInverterInstantValueTableColumns()}
      renderLoading={() => <Loader />}
      maxHeight="600px"
      isLoading={isLoading}
      headerChildren={
        <InverterInstantValueTableHeader
          formattedDate={formattedDate}
          setViewMode={setViewMode}
          viewMode={viewMode}
        />
      }
      hasPagination={false}
      lastColumnSticky={false}
      setSorting={setSorting}
      sorting={sorting}
    />
  );
};

const InverterInstantValueTable = memo(MemoInverterInstantValueTable);

export default InverterInstantValueTable;
