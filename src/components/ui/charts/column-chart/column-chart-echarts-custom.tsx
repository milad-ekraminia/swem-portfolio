import React, { useEffect, useRef, useState } from 'react';
import { getCookie } from '@/helpers/cookies';
import { formatNumberWithCommas } from '@/helpers/format-number-with-commas';
import * as echarts from 'echarts';
import CustomLegendColumn from '../custom-legend-column';

interface SeriesItem {
  name: string;
  data: number[]; // Now it's just an array of numbers
  color: string;
}

interface Props {
  series: SeriesItem[];
  categories: string[];
  isStacked?: boolean;
}

const BarChartEchartsCustom: React.FC<Props> = ({
  series,
  categories,
  isStacked = true,
}) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const [hiddenSeries, setHiddenSeries] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const currentLanguage =
    getCookie('CultureName') ?? (import.meta.env.VITE_CULTURE_NAME as string);
  const chartFontFamily =
    currentLanguage === 'fa' ? 'YekanBakh' : 'InterVariable, sans-serif';

  useEffect(() => {
    if (!chartRef.current) return;

    const myChart = echarts.init(chartRef.current, undefined, {
      renderer: 'canvas',
    });

    const filteredSeries = series
      ?.filter((elem) => !hiddenSeries.includes(elem.name))
      ?.map((elem) => {
        // Track colors for legend
        setColors((prev) =>
          prev.includes(elem.color) ? prev : [...prev, elem.color],
        );

        return {
          name: elem.name,
          type: 'bar' as const,
          color: elem.color,
          stack: isStacked ? 'total' : undefined,
          barWidth: '16px',
          // Performance optimizations
          large: true,
          largeThreshold: 400,
          progressive: 300,
          progressiveThreshold: 600,
          animationDuration: 300,
          animationEasing: 'quadraticOut',
          data: elem.data, // direct numbers
        };
      });

    const option: echarts.EChartsOption = {
      textStyle: {
        fontFamily: chartFontFamily,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: (params: any) => {
          let content = `<strong>${params[0].axisValue}</strong><br/>`;
          params
            .filter((p: any) => p.data != 0)
            .forEach((p: any) => {
              content += `
              <span style="display:inline-block;width:10px;height:10px;background:${p.color};margin-right:4px;border-radius:50%;"></span>
              ${p.seriesName}: ${formatNumberWithCommas(p.data as any, 2)}<br/>
            `;
            });
          return content;
        },
      },
      legend: { show: false },
      grid: {
        left: 0,
        right: 0,
        top: 20,
        bottom: 20,
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: true,
        data: categories,
        splitLine: {
          lineStyle: { color: '#E4E7EC', type: 'dashed' },
        },
        axisLine: {
          lineStyle: { color: '#E4E7EC' },
        },
        axisLabel: {
          color: '#344054',
          fontSize: 10,
          interval: 0,
          fontWeight: 'normal',
          fontFamily: chartFontFamily,
          margin: 10,
          rotate: 45,
        },
      },
      yAxis: {
        type: 'value',
        splitLine: {
          lineStyle: { color: '#E4E7EC', type: 'dashed' },
        },
        axisLabel: {
          color: '#344054',
          fontSize: 12,
          interval: 0,
          fontWeight: 'normal',
          margin: 24,
          fontFamily: chartFontFamily,
          formatter: (value: number) => formatNumberWithCommas(value, 2),
        },
      },
      series: filteredSeries as any,
    };

    myChart.setOption(option);

    const handleResize = () => myChart.resize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      myChart.dispose();
    };
  }, [series, categories, hiddenSeries, isStacked, chartFontFamily]);

  return (
    <div className="chart-wrapper">
      <CustomLegendColumn
        colors={colors}
        filteredSeries={series}
        chartId={Math.random().toString()}
        hiddenSeries={hiddenSeries}
        setHiddenSeries={setHiddenSeries}
      />
      <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
    </div>
  );
};

export default BarChartEchartsCustom;
