import { memo, useState } from 'react';
import { SensorValuesTableHeaders as basicColumn } from '@/enum-data/organization-trace/org-trace-index';
import { dateFormatter } from '@/helpers/format-data';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { ISort } from '@/types/components/ui/table';
import { fetchSensorValue } from '@/services/organization-trace/sensor-value-api';
import Table from '@/components/ui/table/table';
import { SensorValueTableHeader } from './sensor-value-table-header';

const MemoSensorValueTable = () => {
  const treeData = useSelector((state: any) => state?.tree?.info);
  const [sorting, setSorting] = useState<ISort>([]);

  const { data, isLoading, isPending } = useQuery({
    queryKey: ['Fetch Sensor value', treeData?.tree_id, sorting],
    queryFn: () =>
      fetchSensorValue({
        tree_id: treeData?.tree_id,
        sortData: sorting,
      }),
    retry: false,
    enabled: !!treeData?.tree_id,
  });

  return (
    <Table
      data={data?.items ?? []}
      columns={basicColumn()}
      maxHeight="400px"
      isLoading={isLoading || isPending}
      headerChildren={
        <SensorValueTableHeader
          formattedDate={
            dateFormatter(data?.readDateTime, true, false, true) ?? ''
          }
        />
      }
      hasPagination={false}
      lastColumnSticky={false}
      setSorting={setSorting}
      sorting={sorting}
    />
  );
};

const SensorValueTable = memo(MemoSensorValueTable);

export default SensorValueTable;
