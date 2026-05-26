import { memo, useState } from 'react';
import { inverterCalculatedDataTableColumns } from '@/enum-data/organization-trace/org-trace-index';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { ISort } from '@/types/components/ui/table';
import { fetchInverterCalculatedData } from '@/services/organization-trace/inverter-calculated-data-api';
import Table from '@/components/ui/table/table';
import { InverterCalculatedHeader } from './inverter-calculated-header';

const MemoInverterCalculatedDataTable = () => {
  const treeData = useSelector((state: any) => state?.tree?.info);

  const [sorting, setSorting] = useState<ISort>([]);
  const [columnOrder, setColumnOrder] = useState<string[]>(
    inverterCalculatedDataTableColumns().map((col) => col.accessorKey),
  );
  const [selectedColumnKeys, setSelectedColumnKeys] = useState<string[]>(
    inverterCalculatedDataTableColumns().map((col) => col?.accessorKey),
  );
  const { data, isLoading } = useQuery({
    queryKey: [
      'Fetch device inverter Calculated Data',
      treeData?.tree_id,
      sorting,
    ],
    queryFn: () =>
      fetchInverterCalculatedData({
        tree_id: treeData?.tree_id,
        sortData: sorting,
      }),
    retry: false,
    enabled: !!treeData?.tree_id,
  });

  const effectiveColumns = columnOrder
    .filter((accessorKey) => selectedColumnKeys.includes(accessorKey))
    .map((accessorKey) =>
      inverterCalculatedDataTableColumns().find(
        (col) => col.accessorKey === accessorKey,
      ),
    )
    .filter(Boolean) as any;

  return (
    <div className="inverter-calculated-data-container">
      <Table
        data={data ?? []}
        columns={effectiveColumns}
        maxHeight="600px"
        isLoading={isLoading}
        headerChildren={
          <InverterCalculatedHeader
            setSelectedColumnKeys={setSelectedColumnKeys}
            selectedColumnKeys={selectedColumnKeys}
            columnOrder={columnOrder}
            setColumnOrder={setColumnOrder}
          />
        }
        hasPagination={false}
        lastColumnSticky={false}
        setSorting={setSorting}
        sorting={sorting}
      />
    </div>
  );
};

const InverterCalculatedDataTable = memo(MemoInverterCalculatedDataTable);

export default InverterCalculatedDataTable;
