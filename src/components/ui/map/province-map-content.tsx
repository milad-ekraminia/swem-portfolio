import SantralMapTooltip from '@/components/pages/svg/santral-map-tooltip';
import { Button } from '@/components/ui/button/button';
import { Loader } from '@/components/ui/loader/loader';
import { getCookie } from '@/helpers/cookies';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import { fetchProvincePlantsInfo } from '@/services/organization-trace/dashboard-api';
import {
  SantralDashboardMapProps,
  SantralTooltipDataType,
} from '@/types/pages/dashboard';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import L from 'leaflet';
import { StepBack, StepForward } from 'lucide-react';
import { memo, useEffect, useState } from 'react';
import { GeoJSON, MapContainer, Marker } from 'react-leaflet';
import { useNavigate, useParams } from 'react-router-dom';

// height: 900px; width: 100 %; background - color: rgb(255, 255, 255); position: relative; outline - style: none;
//leaflet-container leaflet-touch leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom
interface Props {
  zoom: number;
  selectedProvince: string | null;
  setSelectedProvince: (province: string | null) => void;
  setZoom: (zoom: number) => void;
  countryCenterPosition: number[];
  updatedProvinces: any;
  cityList: any;
}

const MemoProvinceMapContent = ({
  zoom,
  selectedProvince,
  updatedProvinces,
  setSelectedProvince,
  setZoom,
  countryCenterPosition,
  cityList,
}: Props) => {
  const navigate = useNavigate();
  const { provinceId } = useParams<{ provinceId: string }>();
  const isRTL = getCookie('CultureName') === 'fa';

  const [provinceCoordinateInfo, setProvinceCoordinateInfo] =
    useState<any>(null);
  const [keyNumber, setKeyNumber] = useState<number>(1);
  const [centerPosition, setCenterPosition] = useState<number[]>(
    countryCenterPosition,
  );
  const [plants, setPlants] = useState<any[]>([]);
  const [tooltip, setTooltip] = useState<SantralTooltipDataType | null>(null);
  const [mapHovered, setMapHovered] = useState<boolean>(false);

  const cityStyle = () => {
    return {
      fillColor: '#D1E9FF',
      color: '#47546745',
      weight: 1,
      fillOpacity: 1,
    };
  };

  const mutation = useMutation({
    mutationFn: fetchProvincePlantsInfo,
    onSuccess: async (data) => {
      const city = cityList.find(
        (city: any) => city.provinceId === selectedProvince,
      );
      if (city) {
        setProvinceCoordinateInfo(city);
        setPlants(data);
        setKeyNumber((prev) => prev + 1);
        setZoom(isRTL ? 7 : 8);
      }
    },
    onError: async (error: AxiosError) => {
      const errorResponse = await apiErrorHandler(error);
      toastError(errorResponse?.error);
    },
  });

  useEffect(() => {
    if (selectedProvince) {
      const province = updatedProvinces?.find(
        (feature: any) => feature.properties.id === selectedProvince,
      );
      if (
        province?.properties.shapeValue !== undefined &&
        province.properties.shapeValue >= 0
      ) {
        mutation.mutate({ provinceId: selectedProvince });
        setCenterPosition([
          Number(province.properties.latitude),
          Number(province.properties.longitude),
        ]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProvince]);

  const resetHandler = () => {
    if (provinceId) {
      navigate(-1);
    } else {
      navigate('/organization-trace/map');
      setSelectedProvince(null);
      setProvinceCoordinateInfo(null);
      setZoom(isRTL ? 5 : 6);
      setKeyNumber((prev) => prev + 1);
      setCenterPosition(countryCenterPosition);
    }
  };

  const getPlantIcon = (plantEnergyType: number, alarmLevelType: number) => {
    const baseIcon =
      plantEnergyType === 1 || plantEnergyType === 4
        ? '/images/solar-panel-map.png'
        : '/images/wind-turbine-map.png';

    return L.icon({
      iconUrl: baseIcon,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      className:
        alarmLevelType === 1
          ? 'alarm-green'
          : alarmLevelType === 2
            ? 'alarm-orange'
            : 'alarm-red',
    });
  };

  if (mutation.isPending)
    return (
      <div className="dv-center-loader">
        <Loader />
      </div>
    );

  return (
    <MapContainer
      key={keyNumber}
      //@ts-expect-error center position is number array
      center={centerPosition}
      zoom={zoom}
      zoomControl={false}
      scrollWheelZoom={false}
      doubleClickZoom={false}
      dragging={false}
      touchZoom={false}
      // boxZoom={false}
      style={{ height: '900px', width: '100%', backgroundColor: '#fff' }}
    >
      {provinceCoordinateInfo && (
        <>
          <Button
            variant="secondary"
            className="dv-back-on-map-button"
            type="button"
            onClick={resetHandler}
          >
            <span>
              {isRTL ? <StepForward size={18} /> : <StepBack size={18} />}
              {getTranslatedValue('ReturnGenralMap')}
            </span>
          </Button>
          <GeoJSON
            data={provinceCoordinateInfo as any}
            style={cityStyle}
          // onEachFeature={onEachCitites}
          />
        </>
      )}

      {provinceCoordinateInfo &&
        plants.map((plant) => (
          <Marker
            key={plant.organizationId}
            position={[plant.latitude, plant.longitude]}
            icon={getPlantIcon(plant.plantEnergyType, plant.alarmLevelType)}
            eventHandlers={{
              click: (e) => {
                setTooltip({
                  x: e.originalEvent.clientX,
                  y: e.originalEvent.clientY,
                  info: plant as SantralDashboardMapProps,
                });
                setMapHovered(true);
              },
            }}
          >
            {tooltip && (
              <SantralMapTooltip
                data={tooltip}
                mapHovered={mapHovered}
                setMapHovered={setMapHovered}
                isLoading={false}
              />
            )}
          </Marker>
        ))}
    </MapContainer>
  );
};

const ProvinceMapContent = memo(MemoProvinceMapContent);

export default ProvinceMapContent;
