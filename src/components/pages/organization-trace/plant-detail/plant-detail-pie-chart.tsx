import { formatNumberWithCommas } from '@/helpers/format-number-with-commas';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';

export const PlantDetailPieChart = () => {
  const mockActivePowerSummary = 356.789;

  const mockInverterDevicePeriodicList = [
    { id: 1, deviceName: 'Inverter 1', deviceACRatedPower: 250 },
    { id: 2, deviceName: 'Inverter 2', deviceACRatedPower: 300 },
    { id: 3, deviceName: 'Inverter 3', deviceACRatedPower: 200 },
  ];

  const totalRatedPower = mockInverterDevicePeriodicList.reduce(
    (sum, d) => sum + d.deviceACRatedPower,
    0,
  );

  const utilization = (mockActivePowerSummary / totalRatedPower) * 100;

  const options: ApexOptions = {
    chart: {
      height: 250,
      width: 250,
      type: 'radialBar',
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -145,
        endAngle: 215,
        hollow: {
          margin: 0,
          size: '60%',
          background: '#F9FAFB',
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: 'front',
        },
        track: {
          background: '#E4E7EC',
          strokeWidth: '90%',
          margin: 0,
        },

        dataLabels: {
          show: true,
          name: {
            offsetY: 5,
            show: false,
            color: '#888',
            fontSize: '17px',
          },
          value: {
            color: '#323232b3',
            offsetY: 9,
            fontSize: '24px',
            show: true,
          },
        },
      },
    },
    tooltip: {
      enabled: false, // disables hover tooltip
    },
    states: {
      hover: {
        filter: {
          type: 'none', // disables hover effect
        },
      },
      active: {
        filter: {
          type: 'none', // disables click active state
        },
      },
    },
    colors: ['#47CD89'],
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        gradientToColors: ['#2E90FA'],
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: 'round',
    },
  };

  return (
    <div className="plant-detail__pie-chart">
      <Chart
        options={options}
        series={[Number(utilization.toFixed(2))]}
        type="radialBar"
      />
      <div className="plant-detail__pie-chart-legends">
        <div className="plant-detail__pie-chart-legends-item">
          <span className="title">
            {getTranslatedValue('WidgetHeader:TotalPower')} :
          </span>
          <b className="value">
            {formatNumberWithCommas(mockActivePowerSummary, 3)}
          </b>
        </div>
        <div className="plant-detail__pie-chart-legends-item">
          <span className="title">
            {getTranslatedValue('TotalRatedPower')} :
          </span>
          <b className="value">
            {formatNumberWithCommas(mockActivePowerSummary, 3)}
          </b>
        </div>
      </div>
    </div>
  );
};
