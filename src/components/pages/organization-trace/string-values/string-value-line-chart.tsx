import { memo } from 'react';
import { generateRandomColors } from '@/helpers/generate-random-colors';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { getUniqueValues } from '@/helpers/get-unique-values';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { fetchStringValues } from '@/services/organization-trace/string-values-api';
import LineChart from '@/components/ui/charts/line-chart/line-chart';

const MemoStringValueChart = () => {
  const treeData = useSelector((state: any) => state?.tree?.info);

  const { data, isLoading } = useQuery({
    queryKey: ['String Value Line Chart', treeData?.tree_id],
    queryFn: () =>
      fetchStringValues({
        tree_id: treeData?.tree_id,
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
    <div className="string-value-chart">
      <LineChart
        series={series}
        dates={uniqueDates}
        title={getTranslatedValue(`DailyDataChart`)}
        isLoading={isLoading}
        chartId="string-value-chart"
        colors={generateRandomColors(series?.length)}
      />
    </div>
  );
};

const StringValueChart = memo(MemoStringValueChart);

export default StringValueChart;
