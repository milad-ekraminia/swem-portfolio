import { animationConfig } from '@/helpers/chart-config';
import { formatNumberWithCommas } from '@/helpers/format-number-with-commas';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { HeatmapChartProps } from '@/types/components/ui/charts';
import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import ChartContent from '../chart-content';
import ChartTitle from '../chart-title';
import ColorScale from './color-scale';

const HeatmapChart = ({
  series,
  title,
  isLoading,
  children,
  haveDecimalValue = true,
  // xaxisType = "datetime",
}: HeatmapChartProps) => {
  // Calculate min and max values from the series data
  const values = series.flatMap((s) => s.data.map((point) => point.y));
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);

  const [minFilter, setMinFilter] = useState(0);
  const [maxFilter, setMaxFilter] = useState(0);

  useEffect(() => {
    if (!values.length) return;

    const min = Math.min(...values);
    const max = Math.max(...values);

    // Set only if filters were still at default zero
    if (minFilter === 0 && maxFilter === 0) {
      setMinFilter(min);
      setMaxFilter(max);
    }
  }, [values]);
  const options: ApexOptions = {
    chart: {
      type: 'heatmap',
      toolbar: {
        show: false,
      },
      animations: animationConfig,
      zoom: {
        enabled: false,
      },
    },

    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 0.5,
      colors: ['#4b4b4b'],
    },
    plotOptions: {
      heatmap: {
        enableShades: false,
        shadeIntensity: 0.5,
        radius: 0,
        useFillColorAsStroke: true,
        colorScale: {
          ranges:
            minValue !== maxValue
              ? [
                {
                  from: minValue,
                  to: minValue + (maxValue - minValue) * 0.2,
                  color: '#0D870D',
                  name: 'very low',
                },
                {
                  from: minValue + (maxValue - minValue) * 0.2,
                  to: minValue + (maxValue - minValue) * 0.4,
                  color: '#DDEBA6',
                  name: 'low',
                },
                {
                  from: minValue + (maxValue - minValue) * 0.4,
                  to: minValue + (maxValue - minValue) * 0.6,
                  color: '#FFE677',
                  name: 'medium',
                },
                {
                  from: minValue + (maxValue - minValue) * 0.6,
                  to: minValue + (maxValue - minValue) * 0.8,
                  color: '#FFAA0D',
                  name: 'high',
                },
                {
                  from: minValue + (maxValue - minValue) * 0.8,
                  to: maxValue,
                  color: '#FF2E0D',
                  name: 'very high',
                },
              ]
              : [
                {
                  from: minValue,
                  to: maxValue,
                  color: '#0D870D',
                  // name: "very low",
                },
              ],
        },
      },
    },
    xaxis: {
      // type: xaxisType,
      labels: {
        show: true,
        rotate: 0,
        style: {
          colors: '#344054',
          fontSize: '12px',
          fontWeight: '400',
        },
      },
      tooltip: { enabled: false },

      // categories: days,
      axisBorder: {
        show: false,
      },
      tickAmount: 12,
    },
    yaxis: {
      labels: {
        show: true,
        style: {
          colors: '#344054',
          fontSize: '12px',
          fontWeight: '400',
        },
      },
    },
    tooltip: {
      followCursor: true,
      shared: false,
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const xValue = w.globals.seriesX[seriesIndex][dataPointIndex];
        const value = series[seriesIndex][dataPointIndex];
        const yLabel = w.config.series[seriesIndex].name;

        return `
          <div class="heatmap-tooltip">
            <div class="heatmap-tooltip__header">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                <path d="M9 3.0498C12.7279 3.0498 15.75 6.07188 15.75 9.7998C15.75 13.5277 12.7279 16.5498 9 16.5498C5.27208 16.5498 2.25 13.5277 2.25 9.7998C2.25 6.07188 5.27208 3.0498 9 3.0498" stroke="#667085" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9.375 6.0498V10.1748H6" stroke="#667085" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span class="heatmap-tooltip__header-label">${yLabel}</span>
            </div>
            <div class="heatmap-tooltip__item">
              <span class="heatmap-tooltip__item-title">${getTranslatedValue(
          'Date',
        )}:</span>
              <span class="heatmap-tooltip__item-value">${xValue}</span>
            </div>
            <div class="heatmap-tooltip__item">
              <span class="heatmap-tooltip__item-title">${getTranslatedValue(
          'Value',
        )}:</span>
              <span class="heatmap-tooltip__item-value">${formatNumberWithCommas(
          value,
          haveDecimalValue ? 2 : 0
        )}</span>
            </div>
          </div>
        `;
      },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      show: false,
      position: 'bottom',
      horizontalAlign: 'center',
    },
  };

  const filteredSeries = series.map((s) => ({
    ...s,
    data: s.data.filter((d) => d.y >= minFilter && d.y <= maxFilter),
  }));

  console.log("filteredSeries", filteredSeries)

  const isValidSeries =
    Array.isArray(series) && series.every((s) => Array.isArray(s.data));

  return (
    <div className="heatmap-chart-container">
      <ChartTitle title={getTranslatedValue(title)}>{children}</ChartTitle>
      <ChartContent
        isEmpty={!isValidSeries || !series?.length}
        isLoading={isLoading}
      >
        <Chart
          aria-label="heatmap-chart"
          options={options}
          series={filteredSeries}
          type="heatmap"
          height={400}
        // width="100%"
        />
        <ColorScale
          minValue={minValue}
          maxValue={maxValue}
          minFilter={minFilter}
          maxFilter={maxFilter}
          setMinFilter={setMinFilter}
          setMaxFilter={setMaxFilter}
        />
      </ChartContent>
    </div>
  );
};

export default HeatmapChart;
