import { memo, useState } from 'react';
import { getCookie } from '@/helpers/cookies';
import { formatNumberWithCommas } from '@/helpers/format-number-with-commas';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';
import ChartContent from '../chart-content';
import ChartTitle from '../chart-title';
import CustomLegend from '../custom-legend';

// import { isSeriesEqual } from "@/helpers/is-series-equal";

const ColumnChart = memo(
  ({
    series = [],
    categories,
    title,
    downloadHandler,
    isStacked = true,
    isLoading,
    colors = [],
    loading,
  }: any) => {
    const chartId = 'custom-chart-id'; // Unique ID for the chart
    const [hiddenSeries, setHiddenSeries] = useState<string[]>([]); // Track hidden series
    // const [chartKey, setChartKey] = useState(0);

    const isPersian = getCookie('CultureName') === 'fa';
    const chartFontFamily = isPersian
      ? 'YekanBakh'
      : 'InterVariable, sans-serif';

    // const prevSeriesRef = useRef<any[]>([]);

    // useEffect(() => {
    //   if (!isSeriesEqual(prevSeriesRef.current, series)) {
    //     prevSeriesRef.current = series;
    //     setChartKey((prev) => prev + 1);
    //     setHiddenSeries([]);
    //   }
    // }, [series]);

    const options: ApexOptions = {
      chart: {
        id: chartId, // Assign the unique ID here
        type: 'bar',
        width: '100%',
        stacked: isStacked,
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: true,
          allowMouseWheelZoom: false,
        },
      },
      states: {
        hover: {
          filter: {
            type: 'none', // Disable hover state styling
          },
        },
        active: {
          filter: {
            type: 'none', // Disable active state styling
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: categories,
        type: 'category',
        labels: {
          show: true,
          rotate: categories?.length > 18 ? -45 : 0,
          rotateAlways: categories?.length > 18 ? true : false,
          style: {
            colors: '#344054',
            fontSize: '12px',
            fontWeight: '400',
            fontFamily: chartFontFamily,
          },
        },
      },
      yaxis: {
        labels: {
          formatter: (num) => (num == null ? num : num.toFixed(0)),
          style: {
            colors: '#344054',
            fontSize: '12px',
            fontWeight: '400',
            fontFamily: chartFontFamily,
          },
        },
      },
      tooltip: {
        followCursor: true,
        style: {
          fontSize: '10px',
        },
        // shared: true,
        // intersect: false,
        custom: function ({ series, dataPointIndex, w }) {
          const xAxisLabel = w.globals.labels[dataPointIndex]; // Get the x-axis label

          // Start building tooltip content
          let tooltipContent = `
          <div class="chart-toolbar">
            <div class="chart-toolbar__header">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                <path d="M9 3.0498C12.7279 3.0498 15.75 6.07188 15.75 9.7998C15.75 13.5277 12.7279 16.5498 9 16.5498C5.27208 16.5498 2.25 13.5277 2.25 9.7998C2.25 6.07188 5.27208 3.0498 9 3.0498" stroke="#667085" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9.375 6.0498V10.1748H6" stroke="#667085" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              ${xAxisLabel} 
            </div>
        `;

          // Loop through all series and add their values
          w.globals.seriesNames.forEach((seriesName: string, i: number) => {
            if (hiddenSeries.indexOf(seriesName) === -1) {
              tooltipContent += `
                <div class="chart-toolbar-legend-item">
                  <div class="chart-toolbar-legend-item__title-wrapper">
                    <span class="chart-toolbar-legend-item__color" style="background-color:${
                      w.config.colors?.[i] || '#ccc'
                    };"></span>
                    <span style="chart-toolbar-legend-item__title">${seriesName}:</span>
                  </div>
                  <span class="chart-toolbar-legend-item__value">
                    ${formatNumberWithCommas(series[i][dataPointIndex], 3)}
                  </span>
                </div>
              `;
            }
          });

          tooltipContent += '</div>';
          return tooltipContent;
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 5,
        },
      },
      colors,
      legend: {
        show: false, // Disable default legend
      },
    };

    const isValidSeries =
      Array.isArray(series) &&
      series.length > 0 &&
      series.every((s) => Array.isArray(s?.data));

    return (
      <>
        <ChartTitle
          title={getTranslatedValue(title)}
          downloadHandler={downloadHandler}
          loading={loading}
        />
        <div className="column-chart-container">
          {isValidSeries && (
            <CustomLegend
              chartId={chartId}
              colors={colors}
              filteredSeries={series}
              hiddenSeries={hiddenSeries}
              setHiddenSeries={setHiddenSeries}
            />
          )}
          <ChartContent isEmpty={!isValidSeries} isLoading={isLoading}>
            <Chart
              // key={chartKey} // Key change forces re-render
              options={options}
              series={series}
              type="bar"
              height={400}
            />
          </ChartContent>
          {/* Custom Legend */}
        </div>
      </>
    );
  },
);

export default ColumnChart;
