import React, { useEffect, useMemo, useRef, useState } from 'react';
import { dateFormatter, monthDateFormatter } from '@/helpers/format-data';
import * as echarts from 'echarts';
import CustomLegend from '../custom-legend';

interface SeriesItem {
  name: string;
  data: { x: string; y: number }[];
  color: string;
  serial: 'line' | 'bar' | 'dot';
}

interface Props {
  series: SeriesItem[];
  dates: string[];
  chartPeriod?: string | number;
}

const EchartsMixed: React.FC<Props> = ({ series, dates, chartPeriod }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const [hiddenSeries, setHiddenSeries] = useState<string[]>([]);

  // Extract colors once from series data (not in loop)
  const colors = useMemo(() => {
    return series?.map((s) => s.color).filter((c) => c) || [];
  }, [series]);

  // Memoize filtered series to avoid recalculating on every render
  const filteredSeries = useMemo(() => {
    return series
      ?.filter((elem) => !hiddenSeries.includes(elem.name))
      ?.map((elem) => {
        // Create a Map for O(1) lookup instead of O(n) find
        const dataMap = new Map(elem.data.map((d) => [d.x, d.y]));

        // Map dates to values using the Map - O(n) instead of O(n²)
        const data = dates.map((date) => dataMap.get(date) ?? null);

        // map serial to echarts type
        let chartType: 'line' | 'bar' | 'scatter' = 'line';
        if (elem.serial === 'bar') chartType = 'bar';
        else if (elem.serial === 'dot') chartType = 'scatter';

        // Assign yAxisIndex: even series → right, odd → left (or custom logic)
        const yAxisIndex = elem.name === 'wheatherData' ? 1 : 0;

        return {
          name: elem.name,
          type: chartType,
          smooth: chartType === 'line',
          showSymbol: chartType === 'line' ? false : true,
          symbolSize: chartType === 'scatter' ? 10 : undefined,
          color: elem.color,
          data,
          barMaxWidth: chartType === 'bar' ? 40 : undefined,
          large: true,
          largeThreshold: 100,
          yAxisIndex, // <-- key to assign series to correct axis
        };
      });
  }, [series, dates, hiddenSeries]);

  useEffect(() => {
    if (!chartRef.current) return;

    const myChart = echarts.init(chartRef.current);

    const option: echarts.EChartsOption = {
      tooltip: {
        trigger: 'axis',
        // Show delay in milliseconds (default: 0)
        showDelay: 0,
        // Hide delay in milliseconds (default: 100)
        hideDelay: 100,
        // Whether to show the tooltip content box
        show: true,
        // Position of tooltip - can be 'auto', [x, y], or function
        position: 'top',
        // Whether to show tooltip only when mouse enters
        enterable: false,
        // Custom CSS styling
        extraCssText: `
          background: #fff;
          border: 1px solid #E4E7EC;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          padding: 12px 16px;
          font-family: 'InterVariable', sans-serif;
          font-size: 12px;
        `,
        // Custom formatter function
        formatter: (params: any) => {
          if (!Array.isArray(params)) return '';

          // Format date based on chartPeriod
          const dateValue = params[0].axisValue;
          let formattedDate = dateValue;
          if (chartPeriod && +chartPeriod === 2) {
            formattedDate = dateFormatter(dateValue);
          } else if (chartPeriod && +chartPeriod === 3) {
            formattedDate = monthDateFormatter(dateValue);
          } else {
            formattedDate = dateFormatter(dateValue, true);
          }

          // Build tooltip content
          const items = params
            .filter(
              (item: any) => item.value !== null && item.value !== undefined,
            )
            .map((item: any) => {
              // Format value (add commas for thousands if needed)
              const value =
                typeof item.value === 'number'
                  ? item.value.toLocaleString('en-US', {
                      maximumFractionDigits: 2,
                    })
                  : item.value;

              return `
                <div style="display: flex; align-items: center; margin-bottom: 4px;">
                  <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: ${item.color}; margin-right: 8px;"></span>
                  <span style="color: #344054; margin-right: 8px;">${item.seriesName}:</span>
                  <span style="color: #101828; font-weight: 600;">${value}</span>
                </div>
              `;
            })
            .join('');

          return `
            <div style="padding: 0;">
              <div style="margin-bottom: 8px; padding-bottom: 8px; border-bottom: 1px solid #E4E7EC; color: #344054; font-weight: 500;">
                ${formattedDate}
              </div>
              <div>
                ${items}
              </div>
            </div>
          `;
        },
      },
      legend: {
        show: false,
      },
      grid: {
        left: 50, // space for left axis
        right: 50, // space for right axis
        top: 20,
        bottom: 20,
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: dates,
        boundaryGap: true,
        axisLabel:
          chartPeriod && +chartPeriod === 2
            ? {
                formatter: (value: string) => dateFormatter(value),
              }
            : chartPeriod && +chartPeriod === 3
              ? {
                  formatter: (value: string) => monthDateFormatter(value),
                }
              : {
                  formatter: (value: string) => dateFormatter(value, true),
                },
        splitLine: {
          lineStyle: { color: '#E4E7EC', width: 1, type: 'dashed' },
        },
        axisLine: { lineStyle: { color: '#E4E7EC', width: 1 } },
      },
      yAxis: [
        {
          type: 'value',
          position: 'left',
          splitLine: {
            lineStyle: { color: '#E4E7EC', width: 1, type: 'dashed' },
          },
        },
        {
          type: 'value',
          position: 'right',
          splitLine: { show: false },
        },
      ],
      series: filteredSeries,
    };

    myChart.setOption(option);

    return () => myChart.dispose();
  }, [filteredSeries, dates, chartPeriod]);

  const isValidSeries =
    Array.isArray(series) &&
    series?.length > 0 &&
    series.every((s) => Array.isArray(s?.data || []));

  return (
    <div>
      {isValidSeries && (
        <CustomLegend
          chartId="dv-echart-style"
          colors={colors}
          filteredSeries={series}
          hiddenSeries={hiddenSeries}
          setHiddenSeries={setHiddenSeries}
          maxShownItems={4}
        />
      )}
      <div
        ref={chartRef}
        className="dv-echart-style"
        style={{ width: '100%', height: '600px' }}
      />
    </div>
  );
};

export default EchartsMixed;
