import GeneralMapTooltip from '@/components/pages/svg/map-tooltip';
import { Loader } from '@/components/ui/loader/loader';
import { getCookie } from '@/helpers/cookies';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getColorByValue } from '@/helpers/map-color';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import { fetchAProvincesInfo } from '@/services/organization-trace/dashboard-api';
import { DashboardMapProps, GeneralTooltipDataType } from '@/types/pages/dashboard';
import { useMutation } from '@tanstack/react-query';
import { memo, useState } from 'react';
import { GeoJSON, MapContainer } from "react-leaflet";
import { useNavigate } from 'react-router-dom';

interface Props {
    zoom: number;
    updatedProvinces: any;
    height?: string;
}

const MemoMapContent = ({
    zoom,
    updatedProvinces,
    height = "425px",
}: Props) => {

    const currentLanguage = getCookie('CultureName') ?? (import.meta.env.VITE_CULTURE_NAME as string);
    const centerPositionValue: number[] = currentLanguage === 'fa' ? [33.27710730, 52.36133780] : [38.72350720, 34.71941680];

    const navigate = useNavigate();

    const [centerPosition, setCenterPosition] = useState<number[]>(centerPositionValue);
    const [tooltip, setTooltip] = useState<GeneralTooltipDataType | null>(null);
    const [mapHovered, setMapHovered] = useState<boolean>(false);


    const provinceStyle = (feature: any) => {
        const value = feature.properties.shapeValue ?? 0;
        return {
            fillColor: getColorByValue(value),
            color: "#47546745",
            weight: 1,
            fillOpacity: 1,
        };
    };

    const handleSuccess = async (data: DashboardMapProps) => {
        setMapHovered(true)
        setTooltip(prev => prev
            ? { ...prev, info: data }
            : { info: data, x: 0, y: 0 }
        )
    };

    const handleError = async (error: any) => {
        const errorResponse = await apiErrorHandler(error);
        toastError(errorResponse?.error);
    };

    const mutationFetchProvincesInfo = useMutation({
        mutationFn: fetchAProvincesInfo,
        onSuccess: handleSuccess,
        onError: handleError,
    });

    const onEachProvince = (feature: any, layer: any) => {
        layer.on({
            click: (e: any) => {
                const provinceId = feature.properties.id;

                setCenterPosition([feature.properties.latitude, feature.properties.longitude]);

                if (feature.properties.shapeValue && feature.properties.shapeValue >= 0) {
                    mutationFetchProvincesInfo.mutate({ provinceId })
                    setTooltip({
                        x: e.originalEvent.clientX,
                        y: e.originalEvent.clientY
                    })
                }
                else {
                    setMapHovered(false)
                    navigate(`/organization-trace/map/${provinceId}`)
                }
            },
        });
    };

    return (
        <>
            <div style={{ position: 'relative', width: '100%', height }}>
                {mutationFetchProvincesInfo?.isPending && (
                    <div style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        zIndex: 1000,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backdropFilter: 'blur(4px)',
                        width: '100px',
                        height: '100px',
                    }}>
                        <div style={{ transform: 'scale(0.6)', display: 'flex' }}>
                            <Loader />
                        </div>
                    </div>
                )}

                <MapContainer
                    //@ts-expect-error center position is number array
                    center={centerPosition}
                    zoom={zoom}
                    zoomControl={false}
                    scrollWheelZoom={false}
                    doubleClickZoom={false}
                    dragging={false}
                    touchZoom={false}
                    boxZoom={false}
                    style={{ height, width: "100%", backgroundColor: "#fff" }}
                >
                    <GeoJSON
                        data={updatedProvinces as any}
                        style={provinceStyle}
                        onEachFeature={onEachProvince} />
                </MapContainer>

                <GeneralMapTooltip
                    data={tooltip}
                    mapHovered={mapHovered}
                    setMapHovered={setMapHovered}
                    isLoading={false}
                />
            </div>
        </>
    );
};

const MapContent = memo(MemoMapContent);

export default MapContent;