import { memo, useEffect, useRef } from 'react';
import { PlantsSvg } from '@/assets/icons/plants-svg';
import { PowerSvg } from '@/assets/icons/power-svg';
import { StatusSvg } from '@/assets/icons/status-svg';
import { WeatherSvg } from '@/assets/icons/weather-svg';
import { WindPlantSvg } from '@/assets/icons/wind-plant-svg';
import SolarPanel from '@/assets/images/solar-panel-1.png';
import WindTurbine from '@/assets/images/wind-turbine.png';
import { alarmLevelType } from '@/enum-data/definitions/enum';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useQuery } from '@tanstack/react-query';
import * as echarts from 'echarts';
import { fetchTotalEnergyProductionInfo } from '@/services/organization-trace/dashboard-api';
import Image from '@/components/ui/image/image';

const colors = ['#3B82F6', '#FBBF24'];

function TotalEnergyWidget() {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const seriesData = [22, 78];
  const labels = [
    getTranslatedValue('WindEnergy'),
    getTranslatedValue('em_mimic_element_solarpanels'),
  ];

  const { data } = useQuery({
    queryKey: ['Total Energy Production Info'],
    queryFn: () => fetchTotalEnergyProductionInfo(),
    retry: false,
  });

  // Todo
  useEffect(() => {
    if (!chartRef.current) return;
    const myChart = echarts.init(chartRef.current);

    const option: echarts.EChartsOption = {
      series: [
        {
          type: 'pie',
          radius: ['40%', '80%'],
          labelLine: { show: false },
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 4,
          },
          data: labels.map((name, i) => ({
            value: seriesData[i],
            name,
            itemStyle: { color: colors[i] },
          })),
        },
      ],
      tooltip: { show: false },
      legend: { show: false },
    };

    myChart.setOption(option);
    return () => myChart.dispose();
  }, []);

  return (
    <div className="energy-widget">
      <div className="widget-title">
        {getTranslatedValue('energy_production')}
      </div>

      <div className="widget-body">
        <div className="chart">
          <div ref={chartRef} style={{ width: 180, height: 200 }} />

          <div className="chart-info">
            {/* Solar Info */}
            <div className="chart-info-solar">
              <div className="chart-info-solar-box">
                <div className="chart-info-solar-box-title">
                  {getTranslatedValue('em_mimic_element_solarpanels')}
                </div>
                <div className="chart-info-solar-box-title-data">78%</div>
              </div>

              <div className="chart-info-solar-box">
                <div className="chart-info-solar-box-total">
                  {getTranslatedValue('Total.Production')}
                </div>
                <div className="chart-info-solar-box-total-data">
                  {(8965456).toLocaleString()}
                </div>
              </div>
            </div>

            {/* Wind Info */}
            <div className="chart-info-wind">
              <div className="chart-info-wind-box">
                <div className="chart-info-wind-box-title">
                  {getTranslatedValue('WindEnergy')}
                </div>
                <div className="chart-info-wind-box-title-data">22%</div>
              </div>

              <div className="chart-info-wind-box">
                <div className="chart-info-wind-box-total">
                  {getTranslatedValue('Total.Production')}
                </div>
                <div className="chart-info-wind-box-total-data">
                  {(8965456).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="data">
          <div className="widget">
            <Image src={WindTurbine} alt="" className="wind-turbine" />
            <div className="wind-title">{getTranslatedValue('WindEnergy')}</div>
            <div className="info">
              <StatusSvg />
              <div className="info-title">{getTranslatedValue('state')}:</div>
              <div
                className={`badge-status ${
                  data?.windAlarmLevelType === 1 ||
                  data?.windAlarmLevelType === 10
                    ? 'warning'
                    : data?.windAlarmLevelType === 2
                      ? 'critical'
                      : data?.windAlarmLevelType === 3
                        ? 'dangerous'
                        : 'success'
                }`}
              >
                <div className="dot"></div>
                {data?.windAlarmLevelType < 1
                  ? getTranslatedValue('Active')
                  : getTranslatedValue(
                      `Enum:AlarmLevelType.${alarmLevelType[data?.windAlarmLevelType as keyof typeof alarmLevelType]}`,
                    )}
              </div>
            </div>
            <div className="info">
              <WindPlantSvg stroke="#344054" />
              <div className="info-title">{getTranslatedValue('Plant')}:</div>
              <div className="info-data">{data?.windPlantCounts ?? 0}</div>
            </div>
            <div className="info">
              <WeatherSvg />
              <div className="info-title">
                {getTranslatedValue('em_org_plant_weather_info')}:
              </div>
              <div className="info-data">6°C</div>
            </div>
            <div className="info">
              <PowerSvg />
              <div className="info-title">
                {getTranslatedValue('Total.ActivePower')}:
              </div>
              <div className="info-data">
                {data?.windTotalActivePower ?? 0}{' '}
                <span className="unit">kW</span>
              </div>
            </div>
          </div>

          <div className="widget">
            <Image src={SolarPanel} alt="" />
            <div className="solar-title">
              {getTranslatedValue('SolarEnergy')}
            </div>
            <div className="info">
              <StatusSvg />
              <div className="info-title">{getTranslatedValue('state')}:</div>
              <div
                className={`badge-status ${
                  data?.solarAlarmLevelType === 1 ||
                  data?.solarAlarmLevelType === 10
                    ? 'warning'
                    : data?.solarAlarmLevelType === 2
                      ? 'critical'
                      : data?.solarAlarmLevelType === 3
                        ? 'dangerous'
                        : 'success'
                }`}
              >
                <div className="dot"></div>
                {data?.solarAlarmLevelType < 1
                  ? getTranslatedValue('Active')
                  : getTranslatedValue(
                      `Enum:AlarmLevelType.${alarmLevelType[data?.solarAlarmLevelType as keyof typeof alarmLevelType]}`,
                    )}
              </div>
            </div>
            <div className="info">
              <PlantsSvg />
              <div className="info-title">{getTranslatedValue('Plant')}:</div>
              <div className="info-data">{data?.solarPlantCounts ?? 0}</div>
            </div>
            <div className="info">
              <WeatherSvg />
              <div className="info-title">
                {getTranslatedValue('em_org_plant_weather_info')}:
              </div>
              <div className="info-data">6°C</div>
            </div>
            <div className="info">
              <PowerSvg />
              <div className="info-title">
                {getTranslatedValue('Total.ActivePower')}:
              </div>
              <div className="info-data">
                {data?.solarTotalActivePower} <span className="unit">kW</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(TotalEnergyWidget);
