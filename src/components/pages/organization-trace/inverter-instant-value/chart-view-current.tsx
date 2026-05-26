import LineChart from '@/components/ui/charts/line-chart/line-chart';
import { inverterInstantChartFilterValueHandler } from '@/enum-data/organization-trace/inverter-instant-chart-filter-value-handler';
import { generateRandomColors } from '@/helpers/generate-random-colors';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { getUniqueValues } from '@/helpers/get-unique-values';
import { fetchInverterInstantValueLineChart } from '@/services/organization-trace/inverter-instant-value-api';
import { useQuery } from '@tanstack/react-query';
import { memo } from 'react';
import { useSelector } from 'react-redux';

const MemoChartViewCurrent = () => {
  const treeData = useSelector((state: any) => state?.tree?.info);

  const { data, isLoading } = useQuery({
    queryKey: [
      'Inverter Instant Value Line Chart',
      treeData?.tree_id,
      'em_instant_current',
    ],
    queryFn: () =>
      fetchInverterInstantValueLineChart({
        tree_id: treeData?.tree_id,
        selectedFilters:
          inverterInstantChartFilterValueHandler('em_instant_current'),
      }),
    retry: false,
    enabled: !!treeData?.tree_id,
  });

  const uniqueDates = getUniqueValues(data, 'date');

  const uniqueTypes = getUniqueValues(data, 'type');

  const series = uniqueTypes.map((type) => ({
    name: type.toString(),
    data: [] as { x: string; y: string }[],
  }));

  uniqueDates.forEach((date) => {
    uniqueTypes.forEach((type, typeIndex) => {
      const entry = data?.find(
        (item: any) => item.date === date && item.type === type,
      );
      const value = entry?.value ?? 0;
      series[typeIndex].data.push({ x: date, y: String(value) });
    });
  });

  return (
    <div className="device-inverter-charts-container-grid__item">
      <LineChart
        series={series}
        dates={uniqueDates}
        title={getTranslatedValue(`FlowChart`)}
        isLoading={isLoading}
        chartId="current-chart"
        colors={generateRandomColors(series?.length)}
        showSeriesInOne={true}
        tickAmount={12}
      />
    </div>
  );
};

const ChartViewCurrent = memo(MemoChartViewCurrent);

export default ChartViewCurrent;
