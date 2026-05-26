import { DefinitionsDevicesSvg } from "@/assets/icons/definitions-devices-svg";
import PagesHeader from "@/components/layouts/page-layout/pages-header/pages-header";
// import { Loader } from "@/components/ui/loader/loader";
import { getTranslatedValue } from "@/helpers/get-translated-value";
import { BreadcrumbItem } from "@/types/components/ui/bread-crumb";
import { useState } from "react";

//json
import faCities from "@/assets/json/fa/cities.json";
import faProvinces from "@/assets/json/fa/province.json";
import trCities from "@/assets/json/tr/cities.json";
import trProvinces from "@/assets/json/tr/province.json";
import { Loader } from "@/components/ui/loader/loader";
import ProvinceMapContent from "@/components/ui/map/province-map-content";
import { getCookie } from "@/helpers/cookies";
import { fetchCountryAlarmsStatusList } from "@/services/organization-trace/dashboard-api";
import { DashboardAllProvinceMapProps } from "@/types/pages/dashboard";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const baseBreadcrumbs: BreadcrumbItem[] = [
    {
        label: 'MonitoringMeasurement',
    },
    {
        label: 'Map',
    },
];

const title = {
    label: getTranslatedValue('Map'),
};

const ProvinceInfoMap = () => {
    const { provinceId } = useParams();
    const currentLanguage = getCookie('CultureName') ?? (import.meta.env.VITE_CULTURE_NAME as string);

    const Provinces = currentLanguage === 'fa' ? faProvinces : trProvinces;
    const Cities = currentLanguage === 'fa' ? faCities : trCities;

    const countryCenterPosition = currentLanguage === 'fa' ? [33.27710730, 52.36133780] : [38.72350720, 34.71941680];

    const [selectedProvince, setSelectedProvince] = useState<string | null>(provinceId ?? null);
    const [zoom, setZoom] = useState<number>(currentLanguage === 'fa' ? 5 : 6);

    const { data: provinceData, isLoading: provinceLoader } = useQuery({
        queryKey: ['Country Alarms Status'],
        queryFn: () =>
            fetchCountryAlarmsStatusList(),
        retry: false,
    });

    const enrichData = () => {
        const updatedProvinces = Provinces.map((stateItem) => {
            const matched = provinceData?.alarmStatuses?.find(
                (p: DashboardAllProvinceMapProps) => p.provinceId === stateItem.properties.id
            );

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
                        <ProvinceMapContent
                            zoom={zoom}
                            updatedProvinces={updatedProvinces}
                            selectedProvince={selectedProvince}
                            setSelectedProvince={setSelectedProvince}
                            setZoom={setZoom}
                            countryCenterPosition={countryCenterPosition}
                            cityList={Cities}
                        />
                }
            </div>

        </div>
    );
};

export default ProvinceInfoMap;
