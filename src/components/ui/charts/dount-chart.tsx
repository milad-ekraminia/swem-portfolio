import { getTranslatedValue } from '@/helpers/get-translated-value';
import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
import DonutCustomLegend from './donut-custom-legend';

interface DonutChartProps {
  series: number[];
  title: string;
  stats?: number[];
  isLoading?: any;
}

const DonutChart = ({ series, title, isLoading }: DonutChartProps) => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  const dummySeries = [44, 32, 24];

  const labels = [
    getTranslatedValue('Danger'),
    getTranslatedValue('Critical'),
    getTranslatedValue('Warning'),
  ];
  const colors = ['#D92D20', '#EF6820', '#FDB022'];
  const noData = !series?.length;
  const isAllZero = noData || !series?.some((item: any) => item !== 0);
  const noDataColors = ['#E4E7EC', '#E4E7EC', '#E4E7EC'];

  useEffect(() => {
    if (!chartRef.current) return;
    const myChart = echarts.init(chartRef.current);

    const option: echarts.EChartsOption = {
      tooltip: { show: false },
      legend: { show: false },
      series: [
        {
          type: 'pie',
          radius: ['40%', '80%'], // donut
          avoidLabelOverlap: false,
          label: { show: false },
          labelLine: { show: false },
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 4,
          },
          data: labels.map((name, i) => ({
            value: isAllZero ? dummySeries[i] : series[i],
            name,
            itemStyle: { color: isAllZero ? noDataColors[i] : colors[i] },
          })),
        },
      ],
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, [series]);

  return (
    <div className="dount-chart-container">
      <h3 className="title">{title}</h3>

      <div className="chart-wrapper-container">
        <DonutCustomLegend
          isLoading={isLoading}
          series={noData ? [] : series}
        />
        <div ref={chartRef} className="chart-wrapper" style={{ height: 200 }} />
      </div>
    </div>
  );
};

export default DonutChart;
