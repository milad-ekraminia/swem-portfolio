import { memo } from 'react';
import { generateRandomColors } from '@/helpers/generate-random-colors';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { getUniqueValues } from '@/helpers/get-unique-values';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { fetchInverterIndexValueLineChart } from '@/services/organization-trace/index-values-api';
import LineChart from '@/components/ui/charts/line-chart/line-chart';

export const MemoIndexValueLineChart = ({ refreshInterval }: { refreshInterval?: number }) => {
  const treeData = useSelector((state: any) => state?.tree?.info);

  const { data, isLoading } = useQuery({
    queryKey: ['Index Value Line Chart', treeData?.tree_id],
    queryFn: () =>
      fetchInverterIndexValueLineChart({
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
      title={getTranslatedValue(`DailyProdConsValueChart`)}
      isLoading={isLoading}
      chartId="DailyProdConsValueChart"
      colors={generateRandomColors(series?.length)}
      xaxisType="category"
    />
  );
};
const IndexValueLineChart = memo(MemoIndexValueLineChart);

export default IndexValueLineChart;
