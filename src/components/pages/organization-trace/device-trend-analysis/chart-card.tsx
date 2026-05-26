import BarChartEchartsCustom from '@/components/ui/charts/column-chart/column-chart-echarts-custom';
import HeatMapEcharts from '@/components/ui/charts/heatmap-chart/heatmap-echarts';
import LineChartEcharts from '@/components/ui/charts/line-chart/line-chart-echart';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { Trash2 } from 'lucide-react';

interface Props {
  title: string;
  onDelete: () => void;
  apiResponse: any[];
}

function ChartCard({ onDelete, title, apiResponse }: Props) {
  if (!apiResponse || apiResponse.length === 0) {
    return null;
  }
  if (title === 'ProductionForecastGraphs') {
    const categories = apiResponse.map((d) => d.deviceDescription);

    const forecastSeries = {
      name: 'Forecast',
      color: '#5ac8fa',
      data: apiResponse.map((d) => d.forecastValue ?? 0),
    };

    const productionSeries = {
      name: 'Production',
      color: '#007aff',
      data: apiResponse.map((d) => d.productionValue ?? 0),
    };

    const series = [forecastSeries, productionSeries];

    return (
      <div className="chart-card">
        <div className="chart-card__header">
          <div className="title">{getTranslatedValue(title)}</div>
          <button type="button" onClick={onDelete}>
            <Trash2 stroke="#344054" size={20} />
          </button>
        </div>
        <BarChartEchartsCustom
          series={series}
          categories={categories}
          isStacked={false}
        />
      </div>
    );
  }

  const dates = apiResponse[0].data.map((d: any) => d.dateText);

  const series = apiResponse?.map((device: any, idx: number) => ({
    name: device.deviceDescription,
    color: getColor(device.deviceId + idx * 10),
    data: device.data.map((d: any) => ({ y: d.value })),
  }));

  return (
    <div className="chart-card">
      <div className="chart-card__header">
        <div className="title">{getTranslatedValue(title)}</div>
        <button type="button" onClick={onDelete}>
          <Trash2 stroke="#344054" size={20} />
        </button>
      </div>

      {title === 'HeatMapGraphs' ? (
        <HeatMapEcharts dates={dates} series={series} />
      ) : (
        <LineChartEcharts dates={dates} series={series} />
      )}
    </div>
  );
}

const getColor = (id: number) => {
  const hue = (id * 137) % 360;
  return `hsl(${hue}, 65%, 50%)`;
};

export default ChartCard;
