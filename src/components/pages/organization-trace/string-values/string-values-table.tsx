import { Loader } from '@/components/ui/loader/loader';
import Table from '@/components/ui/table/table';
import { stringValuesTableColumns } from '@/enum-data/organization-trace/org-trace-index';
import { fetchStringValues } from '@/services/organization-trace/string-values-api';
import { ISort } from '@/types/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { StringTableHeader } from './string-table-header';

export const StringValuesTable = () => {
  const treeData = useSelector((state: any) => state?.tree?.info);
  const [sortData, setSortData] = useState<ISort>([]);
  const [selectedColumnKeys, setSelectedColumnKeys] = useState<string[]>(
    stringValuesTableColumns().map((col) => col?.accessorKey),
  );
  const [columnOrder, setColumnOrder] = useState<string[]>(
    stringValuesTableColumns().map((col) => col.accessorKey),
  );

  const { isLoading, data, isPending } = useQuery({
    queryKey: ['Fetch Inverter String Values', treeData?.tree_id],
    queryFn: () =>
      fetchStringValues({
        tree_id: treeData?.tree_id,
      }),
    retry: false,
    enabled: !!treeData?.tree_id,
  });

  const effectiveColumns = columnOrder
    .filter((accessorKey) => selectedColumnKeys.includes(accessorKey))
    .map((accessorKey) =>
      stringValuesTableColumns().find((col: any) => col.accessorKey === accessorKey),
    )
    .filter(Boolean) as any;

  return (
    <Table
      data={data ?? []}
      columns={effectiveColumns}
      renderLoading={() => <Loader />}
      maxHeight="500px"
      isLoading={isLoading || isPending}
      hasPagination={false}
      headerChildren={
        <StringTableHeader
          setSelectedColumnKeys={setSelectedColumnKeys}
          selectedColumnKeys={selectedColumnKeys}
          columnOrder={columnOrder}
          setColumnOrder={setColumnOrder}
        />
      }
      setSorting={setSortData}
      sorting={sortData}
    />
  );
};
