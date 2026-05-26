import { Loader } from '@/components/ui/loader/loader';
import Table from '@/components/ui/table/table';
import { fetchDeviceModelCommStatusList } from '@/services/organization-trace/device-model';
import { ISort } from '@/types/components/ui/table';
import { CommunicationTable } from '@/types/pages/organization-trace';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export const CommunicationInfoTable = ({
  effectiveColumns,
}: CommunicationTable) => {
  const treeData = useSelector((state: any) => state?.tree?.info);

  const [sorting, setSorting] = useState<ISort>([]);

  const { data, isLoading } = useQuery({
    queryKey: [
      'Fetch device model comm status list',
      treeData?.tree_id,
      sorting,
    ],
    queryFn: () =>
      fetchDeviceModelCommStatusList({
        tree_id: treeData?.tree_id,
        sortData: sorting,
      }),
    retry: false,
    enabled: !!treeData?.tree_id,
  });

  return (
    <Table
      data={data as any ?? []}
      columns={effectiveColumns}
      renderLoading={() => <Loader />}
      maxHeight="450px"
      isLoading={isLoading}
      hasPagination={false}
      lastColumnSticky={false}
      setSorting={setSorting}
      sorting={sorting}
    />
  );
};
