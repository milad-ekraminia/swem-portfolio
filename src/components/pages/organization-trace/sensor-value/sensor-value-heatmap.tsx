import HeatmapChart from '@/components/ui/charts/heatmap-chart/heatmap-chart';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { getUniqueValues } from '@/helpers/get-unique-values';
import { fetchSensorMeasurementList } from '@/services/organization-trace/sensor-value-api';
import { useQuery } from '@tanstack/react-query';
import { memo } from 'react';
import { useSelector } from 'react-redux';

const MemoSensorValueHeatmap = ({
  labelId,
  children,
  isParentLoading = false,
}: {
  labelId: string;
  children?: React.ReactNode;
  isParentLoading?: boolean;
}) => {
  const treeData = useSelector((state: any) => state?.tree?.info);

  const { data, isLoading } = useQuery({
    queryKey: ['sensor value heatmap chart', treeData?.tree_id, labelId],
    queryFn: () =>
      fetchSensorMeasurementList({
        // tree_id: treeData?.tree_id,
        tree_id: treeData?.tree_id,
        labelId: parseInt(labelId),
      }),
    retry: false,
    enabled: !!treeData?.tree_id && !!labelId,
  });

  const uniqueDays = getUniqueValues(data, 'dayText');
  const uniqueHour = getUniqueValues(data, 'readHour');

  const series = uniqueHour?.map((elem: any) => ({
    name: elem.toString(),
    data: [] as { x: string; y: string }[],
  }));

  uniqueDays?.forEach((date) => {
    uniqueHour?.forEach((hour, index) => {
      const entry = data?.find(
        (item: any) => item.dayText === date && item.readHour == hour,
      );
      const value = entry?.ioDataValueAvg ?? 0;
      series[index]?.data.push({ x: date, y: String(value) });
    });
  });

  // if (data?.length === 0) {
  //   return null;
  // }

  return (
    <HeatmapChart
      title={getTranslatedValue(`HourlyMeasurementHeatMapDataChart`)}
      days={uniqueDays}
      series={series}
      isLoading={isLoading || isParentLoading}
      haveDecimalValue={false}
    >
      {children}
    </HeatmapChart>
  );
};
const SensorValueHeatmap = memo(MemoSensorValueHeatmap);

export default SensorValueHeatmap;
