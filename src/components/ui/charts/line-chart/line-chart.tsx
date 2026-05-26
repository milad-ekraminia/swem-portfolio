import { formatNumberWithCommas } from '@/helpers/format-number-with-commas';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { LineChartProps } from '@/types/components/ui/charts';
import { ApexOptions } from 'apexcharts';
import { useMemo, useState } from 'react';
import Chart from 'react-apexcharts';
import ChartContent from '../chart-content';
import ChartTitle from '../chart-title';
import CustomLegend from '../custom-legend';
import { getCookie } from '@/helpers/cookies';

const LineChart = ({
  series,
  dates,
  title,
  isLoading,
  children,
  chartId,
  xaxisType = 'datetime',
  colors,
  removeXaxisData,
  downloadHandler,
  height = '400',
  maxShownItems = 5,
  loading = false,
  showSeriesInOne = false,
  tickAmount,
}: LineChartProps) => {
  const [hiddenSeries, setHiddenSeries] = useState<string[]>([]); // Track hidden series
  // const [chartKey, setChartKey] = useState(0);

  // useEffect(() => {
  //   setChartKey((prev) => prev + 1);
  //   setHiddenSeries([]);
  // }, [series]);

  // const options: ApexOptions = {
  //   chart: {
  //     id: chartId, // Add this line
  //     type: "line",
  //     // width: "100%",
  //     toolbar: {
  //       show: true,
  //       tools: {
  //         download: false,
  //         pan: false,
  //       },
  //     },
  //     // animations: animationConfig,
  //     zoom: {
  //       enabled: false,
  //       allowMouseWheelZoom: false,
  //     },
  //   },
  //   dataLabels: {
  //     enabled: false,
  //   },
  //   stroke: {
  //     curve: "smooth",
  //     width: 2,
  //   },
  //   xaxis: removeXaxisData
  //     ? {
  //         // type: "category",
  //         type: xaxisType,
  //         tooltip: {
  //           enabled: false,
  //         },
  //         labels: {
  //           show: true,
  //           rotate: 0,
  //           formatter: (value) => {
  //             if (xaxisType === "datetime") {
  //               const date = new Date(value);
  //               const hours = date.getHours().toString().padStart(2, "0");
  //               const minutes = date.getMinutes().toString().padStart(2, "0");
  //               return `${hours}:${minutes}`;
  //             }
  //             return value;
  //           },
  //           style: {
  //             colors: "#344054",
  //             fontSize: "12px",
  //             fontWeight: "400",
  //           },
  //         },
  //         tickAmount: tickAmount ?? 24,
  //       }
  //     : {
  //         type: xaxisType,
  //         categories: dates,
  //         tooltip: {
  //           enabled: false,
  //         },
  //         labels: {
  //           show: true,
  //           formatter: (value) => {
  //             if (xaxisType === "datetime") {
  //               const date = new Date(value);
  //               const hours = date.getHours().toString().padStart(2, "0");
  //               const minutes = date.getMinutes().toString().padStart(2, "0");
  //               return `${hours}:${minutes}`;
  //             }
  //             return value;
  //           },
  //           // format: "HH:mm",
  //           // format: xaxisType === "datetime" ? "HH:MM" : null,
  //           rotate: 0,
  //           style: {
  //             colors: "#939393",
  //             fontSize: "12px",
  //           },
  //         },
  //         tickAmount:tickAmount ?? 12,
  //       },
  //   yaxis: {
  //     min: 0,
  //     labels: {
  //       formatter: (value) => {
  //         return formatNumberWithCommas(value, 2);
  //       },
  //       style: {
  //         colors: "#344054",
  //         fontSize: "12px",
  //         fontWeight: "400",
  //       },
  //     },
  //   },
  //   tooltip: {
  //     followCursor: true,
  //     x: {
  //       format: "HH:mm", // <-- Also formats tooltip x-axis label
  //     },

  //     custom: function ({ series, dataPointIndex, w }) {
  //       let formattedTime = "";
  //       if (xaxisType === "datetime") {
  //         const xValue = w.globals.seriesX[0][dataPointIndex];
  //         const date = new Date(xValue);
  //         const hours = date.getHours().toString().padStart(2, "0");
  //         const minutes = date.getMinutes().toString().padStart(2, "0");
  //         formattedTime = `${hours}:${minutes}`;
  //       } else formattedTime = dates[dataPointIndex];

  //       let tooltipContent = `<div class="chart-toolbar">
  //         <div class="chart-toolbar__header">
  //         <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
  //           <path d="M9 2.25C12.7279 2.25 15.75 5.27208 15.75 9C15.75 12.7279 12.7279 15.75 9 15.75C5.27208 15.75 2.25 12.7279 2.25 9C2.25 5.27208 5.27208 2.25 9 2.25" stroke="#667085" strokeLinecap="round" strokeLinejoin="round"/>
  //           <path d="M9.375 5.25V9.375H6" stroke="#667085" strokeLinecap="round" strokeLinejoin="round"/>
  //         </svg>
  //           ${formattedTime}
  //         </div>`;

  //       if (w.globals.seriesNames?.length > 4) {
  //         tooltipContent += '<div class="chart-toolbar-legend">';
  //       }

  //       w.globals.seriesNames.forEach((seriesName: string, i: number) => {
  //         if (!hiddenSeries.includes(seriesName)) {
  //           tooltipContent += `<div class="chart-toolbar-legend-item">
  //               <div class="chart-toolbar-legend-item__title-wrapper">
  //                 <span class="chart-toolbar-legend-item__color" style="background-color:${
  //                   w.config.colors?.[i] ?? "#ccc"
  //                 };"></span>
  //                 <span class="chart-toolbar-legend-item__title">${seriesName}:</span>
  //               </div>
  //               <span class="chart-toolbar-legend-item__value">${formatNumberWithCommas(
  //                 series[i][dataPointIndex],
  //                 3
  //               )}</span>
  //           </div>`;
  //         }
  //       });

  //       if (w.globals.seriesNames?.length > 4) {
  //         tooltipContent += "</div>";
  //       }
  //       tooltipContent += "</div>";
  //       return tooltipContent;
  //     },
  //     // fixed: {
  //     //   enabled: true,
  //     //   position: "topRight",
  //     //   offsetX: 0,
  //     //   offsetY: 0,
  //     // },
  //   },
  //   markers: {
  //     size: 0,
  //   },
  //   // colors: ["#00BFFF", "#90EE90", "#696969", "#FFD700"], // Customize the colors for each line
  //   colors: colors,
  //   fill: {
  //     colors, // Generate random colors
  //   },
  //   legend: {
  //     show: false, // Disable default legend
  //   },
  // };

  const shouldRotate = series?.[0]?.data?.length > 24;
  const offsetYValue = shouldRotate ? 50 : 0;
  const isPersian = getCookie('CultureName') === 'fa';
  const chartFontFamily = isPersian ? 'YekanBakh' : 'InterVariable, sans-serif';

  const options: ApexOptions = useMemo(() => {
    return {
      chart: {
        id: chartId, // Add this line
        type: 'line',
        // width: "100%",
        toolbar: {
          show: true,
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
      xaxis: removeXaxisData
        ? {
          // type: "category",
          type: xaxisType,
          tooltip: {
            enabled: false,
          },
          labels: {
            show: true,
            rotate: 45,
            offsetY: offsetYValue,
            formatter: (value) => {
              if (xaxisType === 'datetime') {
                const date = new Date(value);
                const hours = date.getHours().toString().padStart(2, '0');
                const minutes = date.getMinutes().toString().padStart(2, '0');
                return `${hours}:${minutes}`;
              }
              return value;
            },
            style: {
              colors: '#344054',
              fontSize: '12px',
              fontWeight: '400',
              fontFamily: chartFontFamily,
            },
          },
          tickAmount: tickAmount ?? 24,
        }
        : {
          type: xaxisType,
          categories: dates,
          tooltip: {
            enabled: false,
          },
          labels: {
            show: true,
            formatter: (value) => {
              if (xaxisType === 'datetime') {
                const date = new Date(value);
                const hours = date.getHours().toString().padStart(2, '0');
                const minutes = date.getMinutes().toString().padStart(2, '0');
                return `${hours}:${minutes}`;
              }
              return value;
            },
            // format: "HH:mm",
            // format: xaxisType === "datetime" ? "HH:MM" : null,
            rotate: 0,
            style: {
              colors: '#939393',
              fontSize: '12px',
              fontFamily: chartFontFamily,
            },
          },
          tickAmount: tickAmount ?? 12,
        },
      yaxis: {
        min: 0,
        labels: {
          formatter: (value) => {
            return formatNumberWithCommas(value, 2);
          },
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
        x: {
          format: 'HH:mm', // <-- Also formats tooltip x-axis label
        },

        custom: function ({ series, dataPointIndex, w }) {
          let formattedTime = '';
          if (xaxisType === 'datetime') {
            const xValue = w.globals.seriesX[0][dataPointIndex];
            const date = new Date(xValue);
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            formattedTime = `${hours}:${minutes}`;
          } else formattedTime = dates[dataPointIndex];

          let tooltipContent = `<div class="chart-toolbar">
          <div class="chart-toolbar__header">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 2.25C12.7279 2.25 15.75 5.27208 15.75 9C15.75 12.7279 12.7279 15.75 9 15.75C5.27208 15.75 2.25 12.7279 2.25 9C2.25 5.27208 5.27208 2.25 9 2.25" stroke="#667085" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9.375 5.25V9.375H6" stroke="#667085" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
            ${formattedTime}
          </div>`;

          if (w.globals.seriesNames?.length > 4) {
            tooltipContent += '<div class="chart-toolbar-legend">';
          }

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

          if (w.globals.seriesNames?.length > 4) {
            tooltipContent += '</div>';
          }
          tooltipContent += '</div>';
          return tooltipContent;
        },
        // fixed: {
        //   enabled: true,
        //   position: "topRight",
        //   offsetX: 0,
        //   offsetY: 0,
        // },
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
  }, [
    series,
    xaxisType,
    hiddenSeries,
    colors,
    dates,
    tickAmount,
    removeXaxisData,
    chartId,
    chartFontFamily,
  ]);
  const isValidSeries =
    Array.isArray(series) &&
    series?.length > 0 &&
    series.every((s) => Array.isArray(s.data));

  return (
    <div className="line-chart-container">
      <ChartTitle
        downloadHandler={downloadHandler}
        title={title ? getTranslatedValue(title) : ''}
        loading={loading}
      >
        {children}
      </ChartTitle>
      {((isValidSeries && series?.length > 1) ||
        (showSeriesInOne && isValidSeries && series?.length > 0)) && (
          <CustomLegend
            chartId={chartId}
            colors={colors}
            filteredSeries={series}
            hiddenSeries={hiddenSeries}
            setHiddenSeries={setHiddenSeries}
            maxShownItems={maxShownItems}
          />
        )}
      <ChartContent isEmpty={!isValidSeries} isLoading={isLoading}>
        <Chart
          // key={chartKey}
          options={options}
          series={series}
          type="line"
          height={height}
        />
      </ChartContent>
    </div>
  );
};

export default LineChart;
