import Table from '@/components/ui/table/table';
import { inverterDetailsTableColumns } from '@/enum-data/organization-trace/org-trace-index';
import { fetchDeviceDetails } from '@/services/definitions/devices/device-details-api';
import { useQuery } from '@tanstack/react-query';
import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { DeviceDetailsTableHeader } from './device-details-header';

const MemoDeviceDetails = () => {
  const treeData = useSelector((state: any) => state?.tree?.info);

  const [selectedColumnKeys, setSelectedColumnKeys] = useState<string[]>(
    inverterDetailsTableColumns().map((col) => col.accessorKey),
  );

  const [columnOrder, setColumnOrder] = useState<string[]>(
    inverterDetailsTableColumns().map((col) => col.accessorKey),
  );

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['Fetch Inverter Device Details', treeData?.tree_id],
    queryFn: () =>
      fetchDeviceDetails({
        tree_id: treeData?.tree_id,
      }),
    retry: false,
    enabled: !!treeData?.tree_id,
  });

  // Filter and order columns based on user selection and order state
  const effectiveColumns = columnOrder
    .filter((accessorKey) => selectedColumnKeys.includes(accessorKey))
    .map((accessorKey) =>
      inverterDetailsTableColumns().find(
        (col) => col.accessorKey === accessorKey,
      ),
    )
    .filter(Boolean) as any;

  return (
    <div className="device-details-container">
      <Table
        data={data ?? []}
        columns={effectiveColumns}
        maxHeight="600px"
        isLoading={isLoading || isFetching}
        hasPagination={false}
        headerChildren={
          <DeviceDetailsTableHeader
            setSelectedColumnKeys={setSelectedColumnKeys}
            selectedColumnKeys={selectedColumnKeys}
            columnOrder={columnOrder}
            setColumnOrder={setColumnOrder}
          />
        }
      />
    </div>
  );
};

const DeviceDetails = memo(MemoDeviceDetails);

export default DeviceDetails;
