import Table from '@/components/ui/table/table';
import { inverterStatusTableColumn } from '@/enum-data/organization-trace/org-trace-index';
import { fetchInverterStatus } from '@/services/organization-trace/inverter-status-api';
import { ISort } from '@/types/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { InverterStatusTableHeader } from './inverter-status-table-header';

const MemoInverterStatusTable = () => {
  const treeData = useSelector((state: any) => state?.tree?.info);

  const [sortData, setSortData] = useState<ISort>([]);
  const [selectedColumnKeys, setSelectedColumnKeys] = useState<string[]>(
    inverterStatusTableColumn().map((col) => col?.accessorKey),
  );
  const [columnOrder, setColumnOrder] = useState<string[]>(
    inverterStatusTableColumn().map((col: any) => col.accessorKey),
  );
  const { data, isLoading, isPending } = useQuery({
    queryKey: ['Fetch device inverter Status', treeData?.tree_id, sortData],
    queryFn: () =>
      fetchInverterStatus({
        tree_id: treeData?.tree_id,
        sortData,
      }),
    retry: false,
    enabled: !!treeData?.tree_id,
  });
  const effectiveColumns = columnOrder
    .filter((accessorKey) => selectedColumnKeys.includes(accessorKey))
    .map((accessorKey) =>
      inverterStatusTableColumn().find((col) => col.accessorKey === accessorKey),
    )
    .filter(Boolean) as any;

  return (
    <div className="inverter-status-container">
      <Table
        data={data?.items ?? []}
        columns={effectiveColumns}
        maxHeight="600px"
        isLoading={isLoading || isPending}
        hasPagination={false}
        headerChildren={
          <InverterStatusTableHeader
            setSelectedColumnKeys={setSelectedColumnKeys}
            selectedColumnKeys={selectedColumnKeys}
            columnOrder={columnOrder}
            setColumnOrder={setColumnOrder}
          />
        }
        setSorting={setSortData}
        sorting={sortData}
      />
    </div>
  );
};

const InverterStatusTable = memo(MemoInverterStatusTable);

export default InverterStatusTable;
