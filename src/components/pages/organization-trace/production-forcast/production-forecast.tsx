import { Loader } from '@/components/ui/loader/loader';
import Table from '@/components/ui/table/table';
import { productionForecastTableColumns as basicColumn } from '@/enum-data/organization-trace/org-trace-index';
import { fetchProductionForecast } from '@/services/organization-trace/production-frocast';
import { ISort } from '@/types/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ProductionForecastHeader } from './production-forecast-header';

export const ProductionForecast = () => {
  const treeData = useSelector((state: any) => state?.tree?.info);
  const { inserted_date, period_type } = useSelector(
    (state: any) => state.dateFilter.info,
  );

  const productionForcastTableColumns = basicColumn(period_type);

  const [sorting, setSorting] = useState<ISort>([]);

  const [columnOrder, setColumnOrder] = useState<string[]>(
    productionForcastTableColumns.map((col) => col.accessorKey),
  );

  const [selectedColumnKeys, setSelectedColumnKeys] = useState<string[]>(
    productionForcastTableColumns.map((col) => col.accessorKey),
  );

  const effectiveColumns = columnOrder
    .filter((accessorKey) => selectedColumnKeys.includes(accessorKey))
    .map((accessorKey) =>
      productionForcastTableColumns.find(
        (col) => col.accessorKey === accessorKey,
      ),
    )
    .filter(Boolean) as typeof productionForcastTableColumns;

  const { data: responseData, isLoading } = useQuery({
    queryKey: [
      'production forecast',
      sorting,
      treeData?.tree_id,
      period_type,
      inserted_date,
    ],
    queryFn: () =>
      fetchProductionForecast({
        sorting,
        organizationId: treeData?.tree_id,
        date: inserted_date,
        periodType: period_type,
      }),
    retry: false,
    enabled: !!treeData?.tree_id,
  });

  return (
    <Table
      data={responseData ?? []}
      columns={effectiveColumns}
      renderLoading={() => <Loader />}
      maxHeight="400px"
      isLoading={isLoading}
      headerChildren={
        <ProductionForecastHeader
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
  );
};
