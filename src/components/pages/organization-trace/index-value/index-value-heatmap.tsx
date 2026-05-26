import { memo } from 'react';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { getUniqueValues } from '@/helpers/get-unique-values';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import {
  fetchInverterIndexConsValueHeatmapChart,
  fetchInverterIndexValueHeatmapChart,
} from '@/services/organization-trace/index-values-api';
import HeatmapChart from '@/components/ui/charts/heatmap-chart/heatmap-chart';

const MemoIndexValueHeatmap = ({ orgType, refreshInterval }: { orgType?: number; refreshInterval?: number }) => {
  const treeData = useSelector((state: any) => state?.tree?.info);

  const { data, isLoading } = useQuery({
    queryKey: [
      orgType === 5
        ? 'index-value-cons-heatmap-chart'
        : 'index-value-heatmap-chart',
      treeData?.tree_id,
    ],
    queryFn: () =>
      orgType === 5
        ? fetchInverterIndexConsValueHeatmapChart({
            tree_id: treeData?.tree_id,
          })
        : fetchInverterIndexValueHeatmapChart({
            tree_id: treeData?.tree_id,
          }),
    retry: false,
    enabled: !!treeData?.tree_id,
    refetchInterval: refreshInterval
      ? refreshInterval
      : false,
  });

  const uniqueDays = getUniqueValues(data, 'dayText');

  const transformData = (info: any = []) => {
    const groupedData = info.reduce((acc: any, curr: any) => {
      const { dayText, hourText, value } = curr;
      acc[hourText] ??= [];
      acc[hourText].push({ x: dayText, y: value });
      return acc;
    }, {});

    // Convert grouped data into the series format
    return Object.keys(groupedData).map((day) => ({
      name: day,
      data: groupedData[day],
    }));
  };

  const series = transformData(data);

  return (
    <HeatmapChart
      title={getTranslatedValue(
        orgType === 5
          ? `HourlyConsumptionHeatMapChart`
          : `HourlyProductionHeatMapChart`,
      )}
      days={uniqueDays}
      series={series}
      isLoading={isLoading}
    />
  );
};
const IndexValuesHeatMap = memo(MemoIndexValueHeatmap);

export default IndexValuesHeatMap;
