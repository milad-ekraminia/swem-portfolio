// HalfDonutChart.tsx
import { getTranslatedValue } from '@/helpers/get-translated-value';
import Chart from 'react-apexcharts';

const HalfDonutChartCustom = ({ data, labels, chartValuesPercentage }: any) => {
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'donut',
      height: 550,
    },
    colors: ['#17B26A', '#2E90FA', '#D0D5DD'], // green, blue, gray
    // labels: ["Online", "Erişim Yok", "Pasif"],
    labels,
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 90,
        offsetY: 10,
        donut: {
          size: '50%',
        },
        customScale: 1,
        expandOnClick: false,
      },
    },
    states: {
      hover: {
        filter: {
          type: 'none', // ✅ disables hover shading
        },
      },
      active: {
        filter: {
          type: 'none', // ✅ disables active (clicked) shading
        },
      },
    },
    tooltip: {
      enabled: true,
      fillSeriesColor: false,
      custom: function ({ series, seriesIndex, w }) {
        const label = w.globals.labels[seriesIndex];
        const value = series[seriesIndex];
        return `<div class="custom-tooltip">
            <strong>${value} ${getTranslatedValue(label)} Cihaz</strong>
          </div>`;
      },
    },
    legend: {
      show: false, // turn off default legend
    },

    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 2,
    },
    grid: {
      padding: {
        bottom: -100,
      },
    },
    // responsive: [
    //   {
    //     breakpoint: 480,
    //     options: {
    //       chart: {
    //         height: 240,
    //       },
    //     },
    //   },
    // ],
  };

  return (
    <div style={{ margin: '0 auto' }} className="half-donut-container">
      <Chart options={options} series={data} type="donut" height={550} />
      <div className="custom-legend">
        {labels?.map((label: string, index: number) => (
          <div className="legend-item" key={label}>
            <span
              className="legend-marker"
              style={{ backgroundColor: options.colors?.[index] }}
            ></span>
            <span className="legend-label">{getTranslatedValue(label)}</span>
            <span className="legend-value">{chartValuesPercentage[index]}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HalfDonutChartCustom;
