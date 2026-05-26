import { getCookie } from '@/helpers/cookies';
import * as echarts from 'echarts';
import React, { useEffect, useRef, useState } from 'react';
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

const LineChartEcharts: React.FC<Props> = ({ series, dates }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const [hiddenSeries, setHiddenSeries] = useState<string[]>([]); // Track hidden series
  // const [colors, setColors] = useState<string[]>([]);

  useEffect(() => {
    if (!chartRef.current) return;

    const myChart = echarts.init(chartRef.current);
    const isPersian = getCookie('CultureName') === 'fa';
    const chartFontFamily = isPersian ? 'YekanBakh' : 'InterVariable, sans-serif';

    const filteredSeries = series
      ?.filter((elem) => !hiddenSeries.includes(elem.name))
      ?.map((elem) => ({
        name: elem.name,
        color: elem.color,
        type: 'line' as any,
        smooth: true,
        showSymbol: false,
        data: elem.data.map((point) => point.y),
        large: true,
        largeThreshold: 100,
        progressive: 100,
        progressiveThreshold: 100,
      }));

    const option: echarts.EChartsOption = {
      title: { show: false },
      tooltip: {
        trigger: 'axis',
        extraCssText: `
          background: #fff;
          border: 1px solid #ddd;
          border-radius: 6px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          padding: 8px 12px;
          font-family: ${chartFontFamily};
        `,
        formatter: (params: any) => {
          if (!Array.isArray(params)) return '';

          const count = params.length;
          let columns = 1;
          if (count > 3) columns = 2;
          // else if (count > 6) columns = 4;

          const rows = params.map(
            (item) => `
              <div class="tooltip-item">
                <span class="tooltip-dot" style="background:${item.color}"></span>
                <span class="tooltip-label">${item.seriesName}:</span>
                <span class="tooltip-value">${item.value}</span>
              </div>`,
          );

          const colHtml = Array.from({ length: columns }, (_, colIndex) => {
            return `<div class="tooltip-col">
              ${rows.filter((_, i) => i % columns === colIndex).join('')}
            </div>`;
          }).join('');

          return `
            <div class="tooltip-wrapper">
              <div class="tooltip-title">${params[0].axisValue}</div>
              <div class="tooltip-content">${colHtml}</div>
            </div>
          `;
        },
      },
      legend: { show: false, selectedMode: false },
      grid: { left: 0, right: 0, top: 20, bottom: 20, containLabel: true },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: dates,
        axisLabel: {
          fontFamily: chartFontFamily,
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          fontFamily: chartFontFamily,
        },
      },
      series: filteredSeries,
    };

    myChart.setOption(option);

    return () => myChart.dispose();
  }, [series, dates, hiddenSeries]);

  const isValidSeries =
    Array.isArray(series) &&
    series?.length > 0 &&
    series.every((s) => Array.isArray(s.data));

  return (
    <div>
      {isValidSeries && (
        <CustomLegend
          chartId="dv-echart-style"
          colors={series.map(s => s.color)}
          filteredSeries={series}
          hiddenSeries={hiddenSeries}
          setHiddenSeries={setHiddenSeries}
          maxShownItems={4}
        />
      )}
      <div ref={chartRef} className="dv-echart-style" style={{ width: '100%', height: '400px' }} />
    </div>
  );
};

export default LineChartEcharts;
