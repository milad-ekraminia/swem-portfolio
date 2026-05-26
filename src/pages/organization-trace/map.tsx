import { DefinitionsDevicesSvg } from "@/assets/icons/definitions-devices-svg";
import PagesHeader from "@/components/layouts/page-layout/pages-header/pages-header";
// import { Loader } from "@/components/ui/loader/loader";
import { getTranslatedValue } from "@/helpers/get-translated-value";
import { BreadcrumbItem } from "@/types/components/ui/bread-crumb";

//json
import faProvinces from "@/assets/json/fa/province.json";
import trProvinces from "@/assets/json/tr/province.json";
import { Loader } from "@/components/ui/loader/loader";
import MapContent from "@/components/ui/map/map-content";
import { getCookie } from "@/helpers/cookies";
import { fetchCountryAlarmsStatusList } from "@/services/organization-trace/dashboard-api";
import { DashboardAllProvinceMapProps } from "@/types/pages/dashboard";
import { useQuery } from "@tanstack/react-query";
import { useDataRefreshRates } from "@/hooks/useDataRefreshRates";

const baseBreadcrumbs: BreadcrumbItem[] = [
    {
        label: 'Monitoring Measurement',
    },
    {
        label: 'Map',
    },
];

const title = {
    label: getTranslatedValue('Map'),
};

const MapBox = () => {
    // const { provinceId } = useParams();
    const currentLanguage = getCookie('CultureName') ?? (import.meta.env.VITE_CULTURE_NAME as string);

    const Provinces = currentLanguage === 'fa' ? faProvinces : trProvinces;
    // const countryCenterPosition = currentLanguage === 'fa' ? [33.27710730, 52.36133780] : [38.72350720, 34.71941680];
    const zoom = currentLanguage === 'fa' ? 5 : 6;

    const [mapDataRefreshInterval] = useDataRefreshRates([505]);

    // const [selectedProvince, setSelectedProvince] = useState<string | null>(provinceId ?? null);
    // const [zoom, setZoom] = useState<number>(currentLanguage === 'fa' ? 5 : 6);

    const { data: provinceData, isLoading: provinceLoader } = useQuery({
        queryKey: ['Country Alarms Status'],
        queryFn: () =>
            fetchCountryAlarmsStatusList(),
        retry: false,
        refetchInterval: mapDataRefreshInterval
            ? mapDataRefreshInterval
            : false,
    });

    const enrichData = () => {
        const updatedProvinces = Provinces.map((stateItem) => {
            const matched = provinceData?.alarmStatuses?.find(
                (p: DashboardAllProvinceMapProps) => p.provinceId === stateItem.properties.id
            );

            console.log("matched.alarmLevelType", matched)

            return {
                ...stateItem,
                properties: {
                    ...stateItem.properties,
                    shapeValue: matched ? matched.alarmLevelType : null,
                },
            };
        });

        return { updatedProvinces };
    };

    const { updatedProvinces } = enrichData();

    return (
        <div className="page-wrapper">
            <PagesHeader
                title={title}
                breadcrumbs={baseBreadcrumbs}
                icon={<DefinitionsDevicesSvg />}
            />

            <div className="page-wrapper__body">
                {
                    provinceLoader ?
                        <div className="dv-center-loader">
                            <Loader />
                        </div> :
                        <MapContent
                            zoom={zoom}
                            height="900px"
                            updatedProvinces={updatedProvinces}
                        />
                }
            </div>

        </div>
    );
};

export default MapBox;
