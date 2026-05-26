export interface DashboardAllProvinceMapProps {
  provinceId: string;
  provinceName: string;
  alarmLevelType: number;
}

export interface DashboardMapProps {
  provinceId: string;
  provinceName?: string;
  solarAlarmLevelType: number;
  windAlarmLevelType: number;
  solarTemperature?: number;
  wIndTemperature?: number;
  solarPlantCounts?: number;
  windPlantCounts?: number;
  solarTotalActivePower?: number;
  windTotalActivePower?: number;
}

export interface GeneralTooltipDataType {
  x: number;
  y: number;
  info?: DashboardMapProps;
}

export interface DistrictsProps {
  district: string;
  totalNotifications: number;
  scadaNotifications: number;
  ososNotifications: number;
  crmNotifications: number;
}

export interface DashboardMapTooltipProps {
  data: GeneralTooltipDataType | null;
  mapHovered: boolean;
  setMapHovered: (v: boolean) => void;
  isLoading: boolean;
}
/////////////////////////////////

export interface SantralDashboardMapProps {
  organizationId: number;
  organizationName: string;
  plantEnergyType: number;
  alarmLevelType: number;
  wIndTemperature: number;
  temperature: number;
  windSpeed: number;
  totalActivePower: number;
  latitude: number;
  longitude: number;
}

export interface SantralTooltipDataType {
  x: number;
  y: number;
  info?: SantralDashboardMapProps;
}

export interface SantralDashboardMapTooltipProps {
  data: SantralTooltipDataType;
  mapHovered: boolean;
  setMapHovered: (v: boolean) => void;
  isLoading: boolean;
}
