import { Loader } from '@/components/ui/loader/loader';
import Table from '@/components/ui/table/table';
import { plantDetailTableColumns } from '@/enum-data/organization-trace/org-trace-index';
import { fetchInverterDevicePeriodicList } from '@/services/organization-trace/plant-detail';
import { ISort } from '@/types/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { PlantDetailHeader } from './plant-detail-header';

export const PlantDetailTable = () => {
  const treeData = useSelector((state: any) => state?.tree?.info);
  const { inserted_date, period_type } = useSelector(
    (state: any) => state.dateFilter.info,
  );
  const [sorting, setSorting] = useState<ISort>([]);
  const [columnOrder, setColumnOrder] = useState<string[]>(
    plantDetailTableColumns().map((col) => col.accessorKey),
  );
  const [selectedColumnKeys, setSelectedColumnKeys] = useState<string[]>(
    plantDetailTableColumns().map((col) => col?.accessorKey),
  );

  const effectiveColumns = columnOrder
    .filter((accessorKey) => selectedColumnKeys.includes(accessorKey))
    .map((accessorKey) =>
      plantDetailTableColumns().find((col) => col.accessorKey === accessorKey),
    )
    .filter(Boolean) as  any;

  const inverterDevicePeriodicList = useQuery({
    queryKey: [
      'fetchInverterDevicePeriodicList',
      sorting,
      inserted_date,
      period_type,
      treeData?.tree_id,
    ],
    queryFn: () =>
      fetchInverterDevicePeriodicList({
        organizationId: treeData?.tree_id,
        date: inserted_date,
        periodType: period_type,
        sorting,
      }),
    retry: false,
  });
  return (
    <Table
      data={inverterDevicePeriodicList?.data as any ?? []}
      columns={effectiveColumns}
      renderLoading={() => <Loader />}
      maxHeight="400px"
      isLoading={inverterDevicePeriodicList?.isLoading}
      headerChildren={
        <PlantDetailHeader
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
