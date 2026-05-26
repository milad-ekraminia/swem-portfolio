import ChartContent from '@/components/ui/charts/chart-content';
import ChartTitle from '@/components/ui/charts/chart-title';
import CustomLegend from '@/components/ui/charts/custom-legend';
import { formatNumberWithCommas } from '@/helpers/format-number-with-commas';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { CustomLineChartProps } from '@/types/components/ui/charts';
import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { PlantDetailPieChart } from './plant-detail-pie-chart';

const PlantDetailCustomChart = ({
  series,
  title,
  isLoading,
  children,
  chartId,
  colors,
  downloadHandler,
}: CustomLineChartProps) => {
  const [hiddenSeries, setHiddenSeries] = useState<string[]>([]); // Track hidden series
  const [chartKey, setChartKey] = useState(0);

  useEffect(() => {
    setChartKey((prev) => prev + 1);
    setHiddenSeries([]);
  }, [series]);

  const options: ApexOptions = {
    chart: {
      id: chartId, // Add this line
      type: 'line',
      width: '100%',
      toolbar: {
        show: false,
        tools: {
          download: false,
          pan: false,
        },
      },
      // animations: animationConfig,
      zoom: {
        enabled: false,
        allowMouseWheelZoom: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    xaxis: {
      tooltip: {
        enabled: false,
      },
      labels: {
        show: true,
        rotate: 0,
        style: {
          colors: '#939393',
          fontSize: '12px',
        },
      },
      tickAmount: 24,
    },
    yaxis: {
      min: 0,
      labels: {
        formatter: (value) => {
          return formatNumberWithCommas(value, 2);
        },
      },
    },
    tooltip: {
      followCursor: true,
      custom: function ({ series, dataPointIndex, w }) {
        let formattedTime = '';
        formattedTime = w?.globals?.categoryLabels[dataPointIndex];

        let tooltipContent = `<div class="chart-toolbar">
          <div class="chart-toolbar__header">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 2.25C12.7279 2.25 15.75 5.27208 15.75 9C15.75 12.7279 12.7279 15.75 9 15.75C5.27208 15.75 2.25 12.7279 2.25 9C2.25 5.27208 5.27208 2.25 9 2.25" stroke="#667085" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9.375 5.25V9.375H6" stroke="#667085" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
            ${formattedTime}
          </div>`;

        w.globals.seriesNames.forEach((seriesName: string, i: number) => {
          if (!hiddenSeries.includes(seriesName)) {
            tooltipContent += `<div class="chart-toolbar-legend-item">
                  <div class="chart-toolbar-legend-item__title-wrapper">
                    <span class="chart-toolbar-legend-item__color" style="background-color:${w.config.colors?.[i] ?? '#ccc'
              };"></span>
                    <span class="chart-toolbar-legend-item__title">${seriesName}:</span>
                  </div>
                  <span class="chart-toolbar-legend-item__value">${formatNumberWithCommas(
                series[i][dataPointIndex],
                3,
              )}</span>
              </div>`;
          }
        });

        tooltipContent += '</div>';
        return tooltipContent;
      },
    },
    markers: {
      size: 0,
    },
    // colors: ["#00BFFF", "#90EE90", "#696969", "#FFD700"], // Customize the colors for each line
    colors: colors,
    fill: {
      colors, // Generate random colors
    },
    legend: {
      show: false, // Disable default legend
    },
  };

  const isValidSeries =
    Array.isArray(series) &&
    series?.length > 0 &&
    series.every((s) => Array.isArray(s.data));

  return (
    <>
      <ChartTitle
        downloadHandler={downloadHandler}
        title={title ? getTranslatedValue(title) : ''}
      >
        {children}
      </ChartTitle>
      <div className="plant-detail__charts-container">
        {isValidSeries && series?.length > 1 && (
          <CustomLegend
            chartId={chartId}
            colors={colors}
            filteredSeries={series}
            hiddenSeries={hiddenSeries}
            setHiddenSeries={setHiddenSeries}
          />
        )}
        <div className="plant-detail__charts-container-charts-section">
          <div className="plant-detail__line-chart">
            <ChartContent isEmpty={!isValidSeries} isLoading={isLoading}>
              <Chart
                key={chartKey}
                options={options}
                series={series}
                type="line"
                height={400}
              />
            </ChartContent>
          </div>
          <PlantDetailPieChart />
        </div>
      </div>
    </>
  );
};

export default PlantDetailCustomChart;
