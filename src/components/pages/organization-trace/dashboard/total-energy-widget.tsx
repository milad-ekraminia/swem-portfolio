import { PlantsSvg } from '@/assets/icons/plants-svg';
import { PowerSvg } from '@/assets/icons/power-svg';
import { StatusSvg } from '@/assets/icons/status-svg';
import { WindPlantSvg } from '@/assets/icons/wind-plant-svg';
import SolarPanel from '@/assets/images/solar-panel-1.png';
import WindTurbine from '@/assets/images/wind-turbine.png';
import Image from '@/components/ui/image/image';
import { alarmLevelType } from '@/enum-data/definitions/enum';
import { getCookie } from '@/helpers/cookies';
import { formatNumberWithCommas } from '@/helpers/format-number-with-commas';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { fetchTotalEnergyProductionInfo } from '@/services/organization-trace/dashboard-api';
import { useQuery } from '@tanstack/react-query';
import * as echarts from 'echarts';
import { memo, useEffect, useMemo, useRef } from 'react';


function TotalEnergyWidget({ mapDataRefreshInterval }: {
  mapDataRefreshInterval: number;
}) {
  const chartRef = useRef<HTMLDivElement | null>(null);

  // Detect language - check both cookie and document.dir for reliability
  const cultureName = useMemo(() => getCookie('CultureName') || 'en', []);
  const isPersian = cultureName === 'fa';
  const chartFontFamily = isPersian ? 'YekanBakh' : 'InterVariable, sans-serif';

  const { data } = useQuery({
    queryKey: ['Total Energy Production Info'],
    queryFn: () => fetchTotalEnergyProductionInfo(),
    retry: false,
    refetchInterval: mapDataRefreshInterval ? mapDataRefreshInterval : false,
  });

  // Todo
  useEffect(() => {
    if (!chartRef.current) return;
    const myChart = echarts.init(chartRef.current);

    const option: echarts.EChartsOption = {
      series: [
        {
          type: 'pie',
          radius: ['55%', '80%'],
          silent: true,
          label: { show: false },
          labelLine: { show: false },
          data: [
            {
              value: 100,
              itemStyle: {
                color: '#fff2d6', // light orange set in background of chart line
              },
            },
          ],
        },
        // orange layer + percentage
        {
          type: 'pie',
          radius: ['55%', '80%'],
          clockwise: true,
          startAngle: 90,
          label: { show: false },
          labelLine: { show: false },
          data: [
            {
              value: data?.percentageDecimal ?? 0,
              itemStyle: {
                color: '#FBBF24',
                borderRadius: 20,
                borderColor: '#fff',
                borderWidth: 2,
              },
            },
            {
              value: 22,
              itemStyle: {
                color: 'transparent',
              },
            },
          ],
        },
      ],
      title: {
        text: `% ${data?.percentageDecimal ?? 0}`,
        left: 'center',
        top: 'center',
        textStyle: {
          fontSize: 22,
          fontWeight: 'bold',
          color: '#667085',
          fontFamily: chartFontFamily,
        },
      },
      tooltip: { show: false },
      legend: { show: false },
    };

    myChart.setOption(option);
    return () => myChart.dispose();
  }, [data, chartFontFamily]);

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
                  {getTranslatedValue('SolarEnergy')}
                </div>
              </div>

              <div className="chart-info-solar-box">
                <div className="chart-info-solar-box-title">
                  {getTranslatedValue('CapacityUtilization')}
                </div>
                <div className="chart-info-solar-box-title-data">
                  {data?.percentageDecimal ?? 0}%
                </div>
              </div>
            </div>

            {/* Wind Info */}
            <div className="chart-info-wind">
              <div className="chart-info-solar-box">
                <div className="chart-info-solar-box-total">
                  {getTranslatedValue('WidgetHeader:TotalPower')}
                </div>
                <div className="chart-info-solar-box-title-data">
                  {formatNumberWithCommas(data?.totalActivePower ?? 0, 2)}
                </div>
              </div>

              <div className="chart-info-solar-box">
                <div className="chart-info-solar-box-total">
                  {getTranslatedValue('TotalACRatedPower')}
                </div>
                <div className="chart-info-solar-box-title-data">
                  {formatNumberWithCommas(data?.maxProductionCapacity ?? 0, 2)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="data">
          <div className="widget">
            <Image src={SolarPanel} alt="" />
            <div className="solar-title">
              {getTranslatedValue('SolarEnergy')}
            </div>
            <div className="info">
              <StatusSvg />
              <div className="info-title">{getTranslatedValue('state')}:</div>
              <div
                className={`badge-status ${data?.solarAlarmLevelType === 1 ||
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
              <div className="info-data">{formatNumberWithCommas(data?.solarPlantCounts ?? 0, 0)}</div>
            </div>
            {/* <div className="info">
                            <WeatherSvg />
                            <div className="info-title">{getTranslatedValue("em_org_plant_weather_info")}:</div>
                            <div className="info-data">6°C</div>
                        </div> */}
            <div className="info">
              <PowerSvg />
              <div className="info-title">
                {getTranslatedValue('Total.ActivePower')}:
              </div>
              <div className="info-data">
                {formatNumberWithCommas(data?.solarTotalActivePower ?? 0, 2)} <span className="unit">kW</span>
              </div>
            </div>
          </div>

          <div className="widget">
            <Image src={WindTurbine} alt="" className="wind-turbine" />
            <div className="wind-title">{getTranslatedValue('WindEnergy')}</div>
            <div className="info">
              <StatusSvg />
              <div className="info-title">{getTranslatedValue('state')}:</div>
              <div
                className={`badge-status ${data?.windAlarmLevelType === 1 ||
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
              <div className="info-data">{formatNumberWithCommas(data?.windPlantCounts ?? 0, 0)}</div>
            </div>
            {/* <div className="info">
                            <WeatherSvg />
                            <div className="info-title">{getTranslatedValue("em_org_plant_weather_info")}:</div>
                            <div className="info-data">6°C</div>
                        </div> */}
            <div className="info">
              <PowerSvg />
              <div className="info-title">
                {getTranslatedValue('Total.ActivePower')}:
              </div>
              <div className="info-data">
                {formatNumberWithCommas(data?.windTotalActivePower ?? 0, 2)}{' '}
                <span className="unit">kW</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(TotalEnergyWidget);