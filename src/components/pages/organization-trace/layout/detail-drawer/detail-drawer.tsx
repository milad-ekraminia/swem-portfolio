import { HumiditySvg } from '@/assets/icons/humidity-svg';
import { RainSvg } from '@/assets/icons/rain-svg';
import { SunSvg } from '@/assets/icons/sun-svg';
import { WindSvg } from '@/assets/icons/wind-svg';
import cloudy from '@/assets/images/weather/cloudy.png';
import humid from '@/assets/images/weather/humid.png';
import rainyWithLightning from '@/assets/images/weather/rainy-with-lightning.png';
import rainy from '@/assets/images/weather/rainy.png';
import snowy from '@/assets/images/weather/snowy.png';
import Image from '@/components/ui/image/image';
import { ImageSlider } from '@/components/ui/img-slider/img-slider';
import { Loader } from '@/components/ui/loader/loader';
import { dateFormatter } from '@/helpers/format-data';
import { getClassNames } from '@/helpers/get-class-names';
import { getTodayDate } from '@/helpers/get-today-date';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useOrgTraceContext } from '@/providers/organization-trace/organization-trace-context';
import { fetchCentralDetail, fetchCentralPlantImg, fetchPlantSidebarInfo } from '@/services/organization-trace';
import { useQueries } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


export const DetailDrawer = () => {
  const context = useOrgTraceContext();
  const treeData = useSelector((state: any) => state?.tree?.info);

  const { inserted_date, period_type } = useSelector(
    (state: any) => state.dateFilter.info,
  );
  const todayDate = getTodayDate();

  const [selectedDate, setSelectedDate] = useState<string>(
    inserted_date ?? todayDate,
  );

  useEffect(() => {
    if (inserted_date) {
      setSelectedDate(inserted_date);
    }
  }, [inserted_date]);

  const results = useQueries({
    queries: [
      {
        queryKey: ['Fetch central detail drawer', treeData?.locationId],
        queryFn: () =>
          fetchCentralDetail({
            itemId: treeData?.locationId,
          }),
        enabled: !!treeData?.locationId,
      },
      {
        queryKey: ['Fetch central plant image', treeData?.tree_id],
        queryFn: () =>
          fetchCentralPlantImg({
            itemId: treeData?.tree_id,
          }),
        enabled: !!treeData?.tree_id,
      },
      {
        queryKey: ['Get a Plant Sidebar Info', treeData?.tree_id, selectedDate],
        queryFn: () => fetchPlantSidebarInfo(
          {
            organizationId: treeData?.tree_id,
            date: selectedDate,
            periodType: period_type,
          }
        ),
        enabled: !!treeData?.tree_id,
      },
    ],
  });

  const isLoading = results.some((q) => q.isLoading);
  const detailData = results[0].data;
  const plantImageData = results[1].data;
  const plantSidebarInfo = results[2].data;

  const getWeatherIcon = (weatherType: string) => {
    switch (weatherType) {
      case 'weather_type_thunderstorm':
        return <Image src={rainyWithLightning} alt="rainy-with-lightning" />;
      case 'weather_type_raining':
      case 'weather_type_drizzle_raining':
        return <Image src={rainy} alt="raining" />;
      case 'weather_type_heavy_raining':
        return <Image src={rainyWithLightning} alt="heavy raining" />;
      case 'weather_type_snowing':
        return <Image src={snowy} alt="snowy" />;
      case 'weather_type_foggy':
        return <Image src={humid} alt="foggy" />;
      case 'weather_type_clear':
        return <SunSvg />;
      case 'weather_type_few_clouds':
      case 'weather_type_broken_clouds':
        return <Image src={cloudy} alt="cloudy" />;
      default:
        return <SunSvg />;
    }
  };

  const imageUrls =
    plantImageData?.length > 0 && plantImageData?.map((item: any) => item.uri);

  return (
    <div
      className={getClassNames('org-trace-detail-drawer', [
        [!!context?.showRightSideBar, 'expanded'],
      ])}
    >
      <div className="org-trace-detail-drawer__header">
        <h1 className="org-trace-detail-drawer__header-title">
          {getTranslatedValue('PlantInfo')}
        </h1>
      </div>
      <div className="org-trace-detail-drawer__body">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {detailData ? (
              <>
                <div className="weather-summary">
                  <div className="weather-summary__status">
                    <div className="clouds">
                      {getWeatherIcon(detailData?.weatherTypeName)}
                      <span>
                        {getTranslatedValue(detailData?.weatherTypeName)}
                      </span>
                    </div>
                    <span className="temp">{detailData?.temperature}°C</span>
                  </div>
                  <div className="weather-summary__stats">
                    <div className="weather-summary__stats-item">
                      <div className="title">
                        <RainSvg />
                        <span>
                          {getTranslatedValue('weather_type_raining')}:
                        </span>
                      </div>
                      <span>{detailData?.pressure}</span>
                    </div>
                    <div className="dash" />
                    <div className="weather-summary__stats-item">
                      <div className="title">
                        <HumiditySvg />
                        <span>
                          {getTranslatedValue('dashboard_weather_humidity')}:
                        </span>
                      </div>
                      <span className="">%{detailData?.humidityRatio}</span>
                    </div>
                    <div className="dash" />
                    <div className="weather-summary__stats-item">
                      <div className="title">
                        <WindSvg />
                        <span>
                          {getTranslatedValue('dashboard_weather_wind')}:
                        </span>
                      </div>
                      <span className="">{detailData?.windSpeed} MPH</span>
                    </div>
                  </div>
                </div>
                {
                  imageUrls?.length > 0 &&
                  <div className="plant-image">
                    <ImageSlider
                      images={imageUrls}
                      autoSlide={false}
                      slideInterval={5000}
                    />
                  </div>
                }
              </>
            ) : null}
            <div className="plant-details">
              <div className="plant-details__item">
                <span className="title">{getTranslatedValue("PowerPlantLocationInfo")}</span>
                <span className="value">{plantSidebarInfo?.coordinateInformation}</span>
              </div>
              <div className="plant-details__item">
                <span className="title">{getTranslatedValue('PlantName')}</span>
                <span className="value">{plantSidebarInfo?.organizationName}</span>
              </div>
              <div className="plant-details__item">
                <span className="title">
                  {getTranslatedValue('FacilityArm')}
                </span>
                <span className="value">{plantSidebarInfo?.sumDeviceACRatedPower} Kwp</span>
              </div>
              <div className="plant-details__item">
                <span className="title">{getTranslatedValue("InverterBrand")}</span>
                <span className="value">{plantSidebarInfo?.deviceInverterModelId}</span>
              </div>
              <div className="plant-details__item">
                <span className="title">{getTranslatedValue("LatestData")}</span>
                <span className="value">{dateFormatter(plantSidebarInfo?.deviceLastSuccessComm, true, false, true)}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};