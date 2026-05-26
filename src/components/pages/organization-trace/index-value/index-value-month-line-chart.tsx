import LineChart from '@/components/ui/charts/line-chart/line-chart';
import { generateRandomColors } from '@/helpers/generate-random-colors';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { getUniqueValues } from '@/helpers/get-unique-values';
import { fetchInverterIndexValueMonthlyLineChart } from '@/services/organization-trace/index-values-api';
import { useQuery } from '@tanstack/react-query';
import { memo } from 'react';
import { useSelector } from 'react-redux';

export const MemoIndexValueMonthLineChart = ({ refreshInterval }: { refreshInterval?: number }) => {
  const treeData = useSelector((state: any) => state?.tree?.info);

  const { data, isLoading } = useQuery({
    queryKey: ['Index Value Monthly Line Chart', treeData?.tree_id],
    queryFn: () =>
      fetchInverterIndexValueMonthlyLineChart({
        tree_id: treeData?.tree_id,
      }),
    retry: false,
    enabled: !!treeData?.tree_id,
    refetchInterval: refreshInterval
      ? refreshInterval
      : false,
  });

  const uniqueDates = getUniqueValues(data, 'dateText');
  const uniqueTypes = getUniqueValues(data, 'type');

  const series = uniqueTypes.map((type) => ({
    name: type.toString(),
    data: [] as { x: string; y: string }[],
  }));

  uniqueDates.forEach((dateText) => {
    uniqueTypes.forEach((type, typeIndex) => {
      const entry = data?.find(
        (item: any) => item.dateText === dateText && item.type === type,
      );

      const value = entry.value ?? 0;
      series[typeIndex].data.push({ x: dateText, y: String(value) });
    });
  });

  return (
    <LineChart
      series={series}
      dates={uniqueDates}
      title={getTranslatedValue(`MonthlyProdConsValueChart`)}
      isLoading={isLoading}
      chartId="MonthlyProdConsValueChart"
      colors={generateRandomColors(series?.length)}
      xaxisType="category"
    />
  );
};
const IndexValueMonthLineChart = memo(MemoIndexValueMonthLineChart);

export default IndexValueMonthLineChart;
