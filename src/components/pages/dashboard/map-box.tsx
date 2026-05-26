import faProvinces from "@/assets/json/fa/province.json";
import trProvinces from "@/assets/json/tr/province.json";
import { Loader } from "@/components/ui/loader/loader";
import MapContent from "@/components/ui/map/map-content";
import { getCookie } from "@/helpers/cookies";
import { DashboardAllProvinceMapProps } from "@/types/pages/dashboard";

const DashboardMapBox = ({
    isLoading,
    provinceData,
}: {
    isLoading: boolean;
    provinceData: DashboardAllProvinceMapProps[];
}) => {

    const currentLanguage = getCookie('CultureName') ?? (import.meta.env.VITE_CULTURE_NAME as string);
    const Provinces = currentLanguage === 'fa' ? faProvinces : trProvinces;
    const zoom = currentLanguage === 'fa' ? 5 : 6;

    const enrichData = () => {
        const updatedProvinces = Provinces.map((stateItem) => {
            const matched = provinceData?.find(
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


    // // Usage example
    const { updatedProvinces } = enrichData();

    return isLoading ? (
        <div className="dv-center-loader">
            <Loader />
        </div>
    ) : (
        <MapContent
            zoom={zoom}
            updatedProvinces={updatedProvinces} />
    );
};

export default DashboardMapBox;