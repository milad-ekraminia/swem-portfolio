import { PowerSvg } from '@/assets/icons/power-svg';
import { StatusSvg } from '@/assets/icons/status-svg';
import { WeatherSvg } from '@/assets/icons/weather-svg';
import SolarPanel from '@/assets/images/solar-panel-1.png';
import WindTurbine from '@/assets/images/wind-turbine.png';
import Image from '@/components/ui/image/image';
import { Loader } from '@/components/ui/loader/loader';
import { alarmLevelType } from '@/enum-data/definitions/enum';
import { getClassNames } from '@/helpers/get-class-names';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { SantralDashboardMapTooltipProps } from '@/types/pages/dashboard';
import { useEffect, useRef, useState } from 'react';


const SantralMapTooltip = ({ data, mapHovered, setMapHovered, isLoading }: SantralDashboardMapTooltipProps) => {
    const isVisible = data !== null && mapHovered;
    const [position, setPosition] = useState<{ left: number, top: number } | undefined>(undefined);

    const tooltipRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (isVisible && data) {
            // محاسبه position بر اساس محل کلیک
            const tooltipWidth = 340; // min-width از CSS
            const tooltipHeight = 300; // ارتفاع تقریبی
            const offset = 10; // فاصله از cursor

            let left = data.x - tooltipWidth - offset;
            let top = data.y - tooltipHeight / 2;

            // اطمینان از اینکه tooltip از صفحه خارج نشود
            if (left < 0) {
                left = data.x + offset; // نمایش در سمت راست cursor
            }
            if (top < 0) {
                top = offset;
            }
            if (top + tooltipHeight > window.innerHeight) {
                top = window.innerHeight - tooltipHeight - offset;
            }

            setPosition({ left, top });
        } else {
            setPosition(undefined);
        }
    }, [data, isVisible]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
                setMapHovered(false);
            }
        };

        if (isVisible) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isVisible, setMapHovered]);

    if (!isVisible || !position) return null;

    return (
        <div
            ref={tooltipRef}
            className={getClassNames('general-map-tooltip', [[isVisible, 'visible']])}
            style={{
                left: `${position.left}px`,
                top: `${position.top}px`,
                position: "absolute",
            }}
            onClick={(e) => e.stopPropagation()}
        >
            {
                isLoading ?
                    <div className="dv-province-info-tooltip-loader-content">
                        <Loader />
                    </div> :
                    <>
                        <div className="tooltip-header">{data?.info?.organizationName ?? '-'}</div>
                        <div className="tooltip-body">
                            <div className='widget'>
                                {
                                    data?.info?.plantEnergyType === 1 || data?.info?.plantEnergyType === 4 ?
                                        <Image src={SolarPanel} alt="" /> :
                                        <Image src={WindTurbine} alt="" className='wind-turbine' />
                                }


                                <div className="info">
                                    <StatusSvg />
                                    <div className="info-title">
                                        {getTranslatedValue("Status")}:
                                    </div>
                                    <div className={`badge-status ${data?.info?.alarmLevelType === 1 || data?.info?.alarmLevelType === 10 ? "warning" :
                                        data?.info?.alarmLevelType === 2 ? "critical" :
                                            data?.info?.alarmLevelType === 3 ? "dangerous" :
                                                "success"
                                        }`
                                    }>
                                        <div className="dot"></div>
                                        {getTranslatedValue(`Enum:AlarmLevelType.${alarmLevelType[data?.info?.alarmLevelType as keyof typeof alarmLevelType]}`)}
                                    </div>
                                </div>

                                {/* <div className="info">
                                            <PlantsSvg />
                                            <div className="info-title">
                                                {getTranslatedValue("Plant")}:
                                            </div>
                                            <div className="info-data">{data?.info?.info?.solarPlantCounts ?? 0}</div>
                                        </div> */}

                                <div className="info">
                                    <WeatherSvg />
                                    <div className="info-title">
                                        {getTranslatedValue("em_org_plant_weather_info")}:
                                    </div>
                                    <div className="info-data">{data?.info?.temperature ?? 0}°C</div>
                                </div>

                                <div className="info">
                                    <PowerSvg />
                                    <div className="info-title">
                                        {getTranslatedValue("Total.ActivePower")}:
                                    </div>
                                    <div className="info-data">{data?.info?.totalActivePower ?? 0} <span className='unit'>kW</span></div>
                                </div>
                            </div>
                        </div>
                    </>
            }

        </div>
    );
};

export default SantralMapTooltip;
