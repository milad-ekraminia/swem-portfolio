import { ArrowDownSvg } from '@/assets/icons/arrow-down-svg';
import { ArrowUpSvg } from '@/assets/icons/arrow-up-svg';
import { DotMoreDetailsSvg } from '@/assets/icons/dot-more-details-svg';
import { getClassNames } from '@/helpers/get-class-names';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import type { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import SemiCircleProgress from '../progress-bar/half-circle-progress';

interface CardProps {
  title: string;
  count: number | string;
  parametre: string;
  percent: number;
  periodicCount: number | string;
  chartData?: { readDateTime: string; productionValue: number }[];
  chartStatus: boolean;
  hasDetails?: boolean;
  type: 'chart' | 'progressbar';
  showDetailHandler?: any;
}

const Card = ({
  title,
  count,
  parametre,
  percent,
  periodicCount,
  chartStatus,
  chartData = [],
  type,
  hasDetails = true,
  showDetailHandler,
}: CardProps) => {
  const options: ApexOptions = {
    chart: {
      type: 'area',
      toolbar: { show: false },
      zoom: { enabled: false },
      fontFamily: 'inherit',
    },
    colors: [chartStatus ? '#17b26a' : '#f04438'],
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    dataLabels: { enabled: false },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 0.5,
        opacityFrom: 0.55,
        opacityTo: 0.05,
        stops: [0, 100],
      },
    },
    grid: { show: false },
    xaxis: {
      type: 'datetime',
      labels: {
        show: false,
        datetimeUTC: false,
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
      tooltip: { enabled: false },
      crosshairs: { show: false },
    },
    yaxis: {
      show: false,
      labels: {
        formatter: (val) => `${val}`,
      },
    },
    tooltip: {
      x: { format: 'HH:mm' },
      y: {
        formatter: (val) => `${val}`,
        title: {
          formatter: (val) => `${val}`,
        },
      },
      marker: {
        show: false,
      },
    },
  };

  const series = [
    {
      name: ' ',
      data: (chartData || []).map((item) => ({
        x: new Date(item.readDateTime).getTime(),
        y: item.productionValue,
      })),
    },
  ];

  return (
    <div className="information-cards">
      <div className="information-cards__header">
        <h4 className="information-cards__header-title">
          {getTranslatedValue(title)}
        </h4>
        {hasDetails ? (
          <button
            onClick={() => {
              showDetailHandler(title);
            }}
            className="information-cards__header-details"
          >
            <DotMoreDetailsSvg />
          </button>
        ) : null}
      </div>

      <div className="information-cards__content">
        <div className="info-container">
          <div className="chart-container">
            <h1 className="count">
              {count}
              <span className="count-unit">{parametre}</span>
            </h1>
            {type === 'chart' && (
              <ReactApexChart
                options={options}
                series={series}
                type="area"
                height={100}
                width={150}
              />
            )}
            {type == 'progressbar' && (
              <SemiCircleProgress percentage={percent || 0} />
            )}
          </div>
          <div className="info">
            {type !== 'progressbar' && (
              <span className="info__chart-description">
                <span
                  className={getClassNames('percentage', [
                    [!chartStatus, 'desc'],
                  ])}
                >
                  {chartStatus ? <ArrowUpSvg /> : <ArrowDownSvg />}
                  <span>{percent ?? 0}%</span>
                </span>
                <span>{getTranslatedValue('today')}</span>
              </span>
            )}
            {type === 'progressbar' && (
              <>
                <span>{getTranslatedValue('Forecast')}</span>
                <span className="description">
                  <span>{periodicCount}</span>
                  <span>{parametre}</span>
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
