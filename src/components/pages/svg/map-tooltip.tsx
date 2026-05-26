import { PlantsSvg } from '@/assets/icons/plants-svg';
import { PowerSvg } from '@/assets/icons/power-svg';
import { StatusSvg } from '@/assets/icons/status-svg';
import { WeatherSvg } from '@/assets/icons/weather-svg';
import { WindPlantSvg } from '@/assets/icons/wind-plant-svg';
import SolarPanel from '@/assets/images/solar-panel-1.png';
import WindTurbine from '@/assets/images/wind-turbine.png';
import { Button } from '@/components/ui/button/button';
import Image from '@/components/ui/image/image';
import { alarmLevelType } from '@/enum-data/definitions/enum';
import { formatNumberWithCommas } from '@/helpers/format-number-with-commas';
import { getClassNames } from '@/helpers/get-class-names';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { DashboardMapTooltipProps } from '@/types/pages/dashboard';
import { MapPin } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';

const GeneralMapTooltip = ({
  data,
  mapHovered,
  setMapHovered,
}: DashboardMapTooltipProps) => {
  const isVisible = data !== null && mapHovered;
  const [position, setPosition] = useState<
    { left: number; top: number } | undefined
  >(undefined);
  const navigate = useNavigate();
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const [tooltip, setTooltip] = useState({
    content: '',
    top: 0,
    bottom: 0,
    left: 0,
    visible: false,
  });

  let tooltipTimeout: NodeJS.Timeout;

  const showTooltip = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const tooltipWidth = 200;
    const centerLeft = rect.left + rect.width / 2 - tooltipWidth / 2;

    setTooltip({
      content: getTranslatedValue('showOnMap'),
      top: rect.top,
      bottom: rect.bottom + 10,
      left: centerLeft,
      visible: true,
    });
  };

  const handleMouseEnter = () => {
    const el = buttonRef.current;
    if (!el) return;

    tooltipTimeout = setTimeout(() => {
      showTooltip(el);
    }, 500);
  };

  const handleMouseLeave = () => {
    clearTimeout(tooltipTimeout);
    setTooltip((prev) => ({ ...prev, visible: false }));
  };

  useEffect(() => {
    if (isVisible && data) {
      const tooltipWidth = 340;
      const tooltipHeight = 400;
      const offset = 10;

      let left = data.x - tooltipWidth - offset;
      let top = data.y - tooltipHeight / 2;

      if (left < 0) {
        left = data.x + offset;
      }
      if (top < 0) {
        top = offset;
      }
      if (top + tooltipHeight > window.innerHeight) {
        top = window.innerHeight - tooltipHeight - offset;
      }

      setPosition({ left, top });
    } else if (!isVisible && !mapHovered) {
      setTimeout(() => {
        setPosition(undefined);
      }, 250);
    }
  }, [data, mapHovered, isVisible]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setMapHovered(false);
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible, setMapHovered]);

  if (!isVisible) return null;
  return (
    <div
      ref={tooltipRef}
      className={getClassNames('general-map-tooltip', [[isVisible, 'visible']])}
      style={
        position
          ? {
            left: `${position.left}px`,
            top: `${position.top}px`,
            position: 'fixed',
          }
          : undefined
      }
      onClick={(e) => e.stopPropagation()}
    >
      <>
        <div className="tooltip-header">
          {data?.info?.provinceName ?? '-'}

          <Button
            ref={buttonRef}
            variant="secondary-blue"
            className="show-on-map-button"
            onClick={(e) => {
              e.stopPropagation();
              setMapHovered(false);
              navigate(`/organization-trace/map/${data?.info?.provinceId}`);
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            leftIcon={<MapPin size={20} />}
          ></Button>
        </div>
        <div className="tooltip-body">
          <div className="widget">
            <Image src={SolarPanel} alt="" />

            <div className="info">
              <StatusSvg />
              <div className="info-title">{getTranslatedValue('Status')}:</div>
              <div
                className={`badge-status ${data?.info?.solarAlarmLevelType === 1 ||
                  data?.info?.solarAlarmLevelType === 10
                  ? 'warning'
                  : data?.info?.solarAlarmLevelType === 2
                    ? 'critical'
                    : data?.info?.solarAlarmLevelType === 3
                      ? 'dangerous'
                      : 'success'
                  }`}
              >
                <div className="dot"></div>
                {getTranslatedValue(
                  `Enum:AlarmLevelType.${alarmLevelType[data?.info?.solarAlarmLevelType as keyof typeof alarmLevelType]}`,
                )}
              </div>
            </div>

            <div className="info">
              <PlantsSvg />
              <div className="info-title">{getTranslatedValue('Plant')}:</div>
              <div className="info-data">
                {data?.info?.solarPlantCounts ?? 0}
              </div>
            </div>

            <div className="info">
              <WeatherSvg />
              <div className="info-title">
                {getTranslatedValue('em_org_plant_weather_info')}:
              </div>
              <div className="info-data">
                {formatNumberWithCommas(data?.info?.solarTemperature ?? 0, 0)}°C
              </div>
            </div>

            <div className="info">
              <PowerSvg />
              <div className="info-title">
                {getTranslatedValue('Total.ActivePower')}:
              </div>
              <div className="info-data">
                {formatNumberWithCommas(data?.info?.solarTotalActivePower ?? 0, 2)}{' '}
                <span className="unit">kW</span>
              </div>
            </div>
          </div>

          <div className="widget">
            <Image src={WindTurbine} alt="" className="wind-turbine" />

            <div className="info">
              <StatusSvg />
              <div className="info-title">{getTranslatedValue('Status')}:</div>
              <div
                className={`badge-status ${data?.info?.windAlarmLevelType === 1 ||
                  data?.info?.windAlarmLevelType === 10
                  ? 'warning'
                  : data?.info?.windAlarmLevelType === 2
                    ? 'critical'
                    : data?.info?.windAlarmLevelType === 3
                      ? 'dangerous'
                      : 'success'
                  }`}
              >
                <div className="dot"></div>
                {getTranslatedValue(
                  `Enum:AlarmLevelType.${alarmLevelType[data?.info?.windAlarmLevelType as keyof typeof alarmLevelType]}`,
                )}
              </div>
            </div>

            <div className="info">
              <WindPlantSvg stroke="#344054" />
              <div className="info-title">{getTranslatedValue('Plant')}:</div>
              <div className="info-data">
                {data?.info?.windPlantCounts ?? 0}
              </div>
            </div>

            <div className="info">
              <WeatherSvg />
              <div className="info-title">
                {getTranslatedValue('em_org_plant_weather_info')}:
              </div>
              <div className="info-data">
                {formatNumberWithCommas(data?.info?.wIndTemperature ?? 0, 0)}°C
              </div>
            </div>

            <div className="info">
              <PowerSvg />
              <div className="info-title">
                {getTranslatedValue('Total.ActivePower')}:
              </div>
              <div className="info-data">
                {formatNumberWithCommas(data?.info?.windTotalActivePower ?? 0, 2)}{' '}
                <span className="unit">kW</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tooltip Element */}
        {tooltip.visible &&
          createPortal(
            <div
              className="table-row__tooltip"
              style={{
                position: 'fixed',
                top: tooltip.bottom,
                left: tooltip.left,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {tooltip.content}
            </div>,
            document.body,
          )}
      </>
    </div>
  );
};

export default GeneralMapTooltip;
