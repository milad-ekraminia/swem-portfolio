import React, { useEffect, useRef, useState } from 'react';
import { getCookie } from '@/helpers/cookies';
import * as echarts from 'echarts';
import CustomLegend from '../custom-legend';

interface SeriesItem {
  name: string;
  data: { y: number }[];
  color: string;
}

interface Props {
  series: SeriesItem[];
  dates: string[];
}

const HeatMapEcharts: React.FC<Props> = ({ series, dates }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartInstanceRef = useRef<echarts.EChartsType | null>(null);
  const [hiddenSeries, setHiddenSeries] = useState<string[]>([]);

  useEffect(() => {
    if (!chartRef.current) return;
    if (!chartInstanceRef.current) {
      chartInstanceRef.current = echarts.init(chartRef.current);
    }

    return () => {
      chartInstanceRef.current?.dispose();
      chartInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!chartInstanceRef.current) return;

    const isPersian = getCookie('CultureName') === 'fa';
    const chartFontFamily = isPersian
      ? 'YekanBakh'
      : 'InterVariable, sans-serif';

    const filteredSeries = series.filter((s) => !hiddenSeries.includes(s.name));

    const heatmapData: [number, number, number][] = [];
    filteredSeries.forEach((s, rowIndex) => {
      s.data.forEach((point, colIndex) => {
        heatmapData.push([colIndex, rowIndex, point.y]);
      });
    });

    const maxValue =
      heatmapData.length > 0 ? Math.max(...heatmapData.map((d) => d[2])) : 0;

    const option: echarts.EChartsOption = {
      tooltip: {
        position: 'top',
        extraCssText: `font-family: ${chartFontFamily};`,
        formatter: (params: any) => {
          const row = params.data[1];
          const col = params.data[0];
          const value = params.data[2];
          const seriesName = filteredSeries[row]?.name || '';
          const date = dates[col] || '';
          return `
            <div>
              <strong>${seriesName}</strong><br/>
              ${date}: ${value}
            </div>
          `;
        },
      },
      grid: { left: 80, top: 30, right: 30, bottom: 100 },
      xAxis: {
        type: 'category',
        data: dates,
        splitArea: { show: true },
        axisLabel: {
          fontFamily: chartFontFamily,
        },
      },
      yAxis: {
        type: 'category',
        data: filteredSeries.map((s) => s.name),
        splitArea: { show: true },
        axisLabel: {
          fontFamily: chartFontFamily,
        },
      },
      visualMap: {
        min: 0,
        max: maxValue,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: 0,
        inRange: { color: ['#ffebee', '#ff5722', '#d32f2f'] },
      },
      series: [
        {
          name: 'HeatMap',
          type: 'heatmap',
          data: heatmapData,
          label: { show: false },
          emphasis: { itemStyle: { borderColor: '#333', borderWidth: 1 } },
        },
      ],
    };

    chartInstanceRef.current.setOption(option, true);
  }, [series, dates, hiddenSeries]);

  const isValidSeries =
    Array.isArray(series) &&
    series.length > 0 &&
    series.every((s) => Array.isArray(s.data));

  return (
    <div>
      {isValidSeries && (
        <CustomLegend
          chartId="dv-heatmap-style"
          colors={series.map((s, index) => {
            const fallbackPalette = [
              '#1f77b4',
              '#ff7f0e',
              '#2ca02c',
              '#d62728',
              '#9467bd',
              '#8c564b',
              '#e377c2',
              '#7f7f7f',
              '#bcbd22',
              '#17becf',
            ];
            return s.color || fallbackPalette[index % fallbackPalette.length];
          })}
          filteredSeries={series}
          hiddenSeries={hiddenSeries}
          setHiddenSeries={setHiddenSeries}
          maxShownItems={4}
        />
      )}
      <div
        ref={chartRef}
        className="dv-heatmap-style"
        style={{ width: '100%', height: '400px' }}
      />
    </div>
  );
};

export default HeatMapEcharts;
