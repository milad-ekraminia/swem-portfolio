import { BatterySvg } from '@/assets/icons/battery-svg';
import { BoxLineChartSvg } from '@/assets/icons/box-line-chart-svg';
import { Co2Svg } from '@/assets/icons/co2-svg';
import { ThunderSvg } from '@/assets/icons/thunder-svg';
import cloudsImage from '@/assets/images/clouds.png';
import SolarPanel from '@/assets/images/solar-panel.png';
import WindTurbine from '@/assets/images/wind-turbine.png';
import Image from '@/components/ui/image/image';
import { Loader } from '@/components/ui/loader/loader';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { fetchOrganizationTopBarInfos } from '@/services/organization-trace/dashboard-api';
import { useQuery } from '@tanstack/react-query';
import { MoveUpRight } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

const DashboardHeader = () => {

  // Kayseri coordinates
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>();

  useEffect(() => {
    // Function to get location from IP-based geolocation service
    const getLocationFromIP = async () => {
      try {
        // Using ipapi.co - free service that works without API key
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) {
          throw new Error('IP geolocation failed');
        }
        const data = await response.json();
        setUserLocation({
          latitude: data.latitude,
          longitude: data.longitude,
        });
      } catch (error) {
        console.error('Error getting location from IP:', error);
        // Set default location if IP geolocation also fails
        setUserLocation(null);
      }
    };

    // Try navigator.geolocation first, fallback to IP-based geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location from navigator:', error);
          // Fallback to IP-based geolocation
          getLocationFromIP();
        },
        { timeout: 5000 } // Add timeout to avoid long waits
      );
    } else {
      // Use IP-based geolocation if navigator.geolocation is not supported
      getLocationFromIP();
    }
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ['Get Dashboard Top Bar Infos', userLocation],
    queryFn: () =>
      fetchOrganizationTopBarInfos({
        Latitude: userLocation?.latitude,
        Longitude: userLocation?.longitude,
      }),
    retry: false,
    // enabled: !!userLocation,
  });

  const items = useMemo(() => {
    return [
      {
        title: getTranslatedValue('Total.Capacity'),
        value: data?.maxProductionCapacity ?? 0,
        unit: 'KWh',
        Icon: BatterySvg,
      },
      {
        title: getTranslatedValue('Total.SolarEnergyProduction'),
        value: data?.totalSolarEnergyProduction ?? 0,
        unit: 'MWh',
        Icon: ThunderSvg,
      },
      {
        title: getTranslatedValue('Total.WindEnergyProduction'),
        value: data?.totalWindEnergyProduction ?? 0,
        unit: 'KWh',
        Icon: BoxLineChartSvg,
      },
      {
        title: getTranslatedValue('Saved.CO2'),
        value: data?.recoveredCO2 ?? 0,
        unit: 'Kt',
        Icon: Co2Svg,
      },
    ];
  }, [data, isLoading]);

  const hasWeatherData = !isLoading && data?.weatherData;

  return (
    <div className="dashboard-header">
      <div className={`dashboard-header-data ${!hasWeatherData ? 'full-width' : ''}`}>
        <div className="dashboard-header-data__total">
          <div className="dashboard-header-data__total-images">
            <Image src={SolarPanel} alt="" className="solar-panel" />
            <Image src={WindTurbine} alt="" className="wind-turbine" />
          </div>
          <div className="dashboard-header-data__total-texts">
            <div className="dashboard-header-data__total-texts-title">
              {getTranslatedValue('Total.Plant')}
            </div>
            <div className="dashboard-header-data__total-texts-label">
              {isLoading ? '-' : data?.totalPlantsCount}
            </div>
          </div>
        </div>

        <div className="dashboard-header-data__items">
          {items.map(({ title, value, unit, Icon }, i) => (
            <div key={i} className="dashboard-header-data__items-box">
              <div className="dashboard-header-data__items-box-image">
                <Icon width="26" height="26" />
              </div>
              <div className="dashboard-header-data__items-box-texts">
                <div className="dashboard-header-data__items-box-texts-title">
                  {title}
                </div>
                <div className="dashboard-header-data__items-box-texts-label">
                  {value}
                  {unit && <span className="unit">{unit}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weather */}
      {isLoading ? (
        <div className="dashboard-header-weather loading">
          <Loader />
        </div>
      ) : (
        data?.weatherData && (
          <div className="dashboard-header-weather">
            <img src={cloudsImage}
              alt="clouds"
              className="dashboard-header-weather-image"
            />
            <div className="dashboard-header-weather-content">
              <div className="dashboard-header-weather-info">
                <div className="dashboard-header-weather-info-location">
                  <span className="dashboard-header-weather-info-location-title">
                    {getTranslatedValue('em_weather_location')}
                  </span>
                  <span className="dashboard-header-weather-info-location-subtitle">
                    {data?.weatherData?.locationName}
                  </span>
                </div>
                <span className="dashboard-header-weather-info-temperature">
                  {data?.weatherData?.temperature}°
                </span>
              </div>
              <div className="dashboard-header-weather-details">
                <span>{getTranslatedValue(data?.weatherData?.weatherTypeName)}</span>
                <span>
                  {getTranslatedValue('humidityRatio')}: {data?.weatherData?.humidityRatio}
                </span>
                <span>
                  {getTranslatedValue('dashboard_weather_wind')}: {data?.weatherData?.windSpeed} MPH
                </span>
                <span>
                  <MoveUpRight stroke="#fff" size={15} />
                </span>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default DashboardHeader;