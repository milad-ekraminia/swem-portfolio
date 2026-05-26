import { memo } from 'react';
import { generateRandomColors } from '@/helpers/generate-random-colors';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { getUniqueValues } from '@/helpers/get-unique-values';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { fetchSensorChartValuesBetweenDatesList } from '@/services/organization-trace/sensor-value-api';
import LineChart from '@/components/ui/charts/line-chart/line-chart';

const MemoSensorValueLineChart = ({ labelId }: { labelId: string }) => {
  const treeData = useSelector((state: any) => state?.tree?.info);

  const { data, isLoading } = useQuery({
    queryKey: ['sensor value line chart', treeData?.tree_id, labelId],
    queryFn: () =>
      fetchSensorChartValuesBetweenDatesList({
        tree_id: treeData?.tree_id,
        labelId: parseInt(labelId),
      }),
    retry: false,
    enabled: !!treeData?.tree_id && !!labelId,
  });

  const uniqueDates = getUniqueValues(data, 'readTime');

  const series = [
    {
      name: getTranslatedValue('IoSensorData'),
      data: data?.map((item: any) => ({
        x: item.readTime,
        y: item.ioDataValue,
      })),
    },
  ];
  if (data?.length === 0) {
    return null;
  }
  return (
    <LineChart
      series={series}
      xaxisType="category"
      dates={uniqueDates}
      title={getTranslatedValue(`DailyDataChart`)}
      isLoading={isLoading}
      chartId="sensor-value-line-chart"
      colors={generateRandomColors(series?.length)}
    />
  );
};

const SensorValueLineChart = memo(MemoSensorValueLineChart);

export default SensorValueLineChart;
