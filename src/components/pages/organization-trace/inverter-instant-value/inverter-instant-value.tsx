import { tableDescriptionHelper } from '@/helpers/table-description-helper';
import { fetchValidDataReadDateTime } from '@/services/organization-trace';
import { fetchDeviceInverterInstantValue } from '@/services/organization-trace/inverter-instant-value-api';
import { ISort } from '@/types/components/ui/table';
import { useQueries } from '@tanstack/react-query';
import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import ChartViewActivePower from './chart-view-active-power';
import ChartViewCurrent from './chart-view-current';
import ChartViewFrequency from './chart-view-frequency';
import ChartViewVoltage from './chart-view-voltage';
import InverterInstantValueChart from './inverter-instant-value-chart';
import InverterInstantValueTable from './inverter-instant-value-table';
import { InverterInstantValueTableHeader } from './inverter-instant-value-table-header';

const MemoInverterInstantValue = () => {
  const [viewMode, setViewMode] = useState<'list' | 'charts'>('list');

  // Get current tree data from Redux
  const treeData = useSelector((state: any) => state?.tree?.info);

  // Sorting state for table data
  const [sorting, setSorting] = useState<ISort>([]);

  // Fetch both instant value data and last valid read date-time concurrently
  const results = useQueries({
    queries: [
      {
        queryKey: [
          'Fetch device inverter instant value list',
          treeData?.tree_id,
          sorting,
        ],
        queryFn: () =>
          fetchDeviceInverterInstantValue({
            tree_id: treeData?.tree_id,
            sortData: sorting,
          }),
        retry: false,
        enabled: !!treeData?.tree_id,
      },
      {
        queryKey: ['Fetch valid data read date time', treeData?.tree_id],
        queryFn: () =>
          fetchValidDataReadDateTime({ tree_id: treeData?.tree_id }),
        retry: false,
        enabled: !!treeData?.tree_id,
      },
    ],
  });

  const [instantValueResponse, validDateTimeResponse] = results;

  const { data, isLoading } = instantValueResponse;
  const { data: validDataReadDateTimeData } = validDateTimeResponse;

  // Prepare formatted date string for headers
  const formattedDate = tableDescriptionHelper({
    timetoReadtheLatestData: data?.readDateTime,
    theTimeoftheLastConfirmedData: validDataReadDateTimeData,
  });

  return viewMode === 'list' ? (
    <div className="device-inverter">
      <InverterInstantValueTable
        data={data}
        isLoading={isLoading}
        sorting={sorting}
        setSorting={setSorting}
        viewMode={viewMode}
        setViewMode={setViewMode}
        formattedDate={formattedDate}
      />
      <InverterInstantValueChart />
    </div>
  ) : (
    <div className="device-inverter-charts-container">
      <InverterInstantValueTableHeader
        formattedDate={formattedDate}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
      <div className="device-inverter-charts-container-grid">
        <ChartViewCurrent />
        <ChartViewFrequency />
        <ChartViewActivePower />
        <ChartViewVoltage />
      </div>
    </div>
  );
};

const InverterInstantValue = memo(MemoInverterInstantValue);

export default InverterInstantValue;
