import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { fetchDeviceModelCommStatusChartList } from '@/services/organization-trace/device-model';
import ChartContent from '@/components/ui/charts/chart-content';
import HalfDonutChartCustom from '@/components/ui/charts/half-donut-chart-custom';


export const communicationChartMockData = [
  {
    label: 'No Access',
    value: 18,
  },
  {
    label: 'Online',
    value: 142,
  },
  {
    label: 'Offline',
    value: 26,
  },
];



export const CommunicationInfoChart = () => {
  const treeData = useSelector((state: any) => state?.tree?.info);

  //  FETCHING CARDS DATA
  const { data, isLoading } = useQuery({
    queryKey: ['Fetch device model comm status chart list', treeData],
    queryFn: () =>
      fetchDeviceModelCommStatusChartList({ tree_id: treeData?.tree_id }),
    retry: false,
    enabled: !!treeData?.tree_id,
  });
  const labels = ['No Access', 'Online', 'Offline'];
  const chartLabels = labels?.map((item) => getTranslatedValue(`${item}`));
  const chartValues = communicationChartMockData.map((item) => item.value);
const chartValuesPercentage = (() => {
  const total = chartValues.reduce((sum, v) => sum + v, 0);

  return chartValues.map((v) => Math.round((v / total) * 100));
})();

  console.log(chartValues, 'chartValues');

  return (
    <div className="communication-info__chart">
      <ChartContent isEmpty={!data} isLoading={isLoading}>
        <HalfDonutChartCustom
          labels={chartLabels}
          data={chartValues}
          chartValuesPercentage={chartValuesPercentage}
          isLoading={isLoading}
        />
      </ChartContent>
    </div>
  );
};