// lib/api-method/fetch-wrapper.ts
import { buildArrayParams } from '@/helpers/query-builder';
import { getData } from '@/lib/api-method/api-method-functions';

const apiVersion = import.meta.env.VITE_API_VERSION;

interface FetchOptions {
  endPoint: string;
  tree_id?: number;
  deviceIds?: number[];
  extraParams?: Record<string, any>;
}

export async function fetchApi({
  endPoint,
  tree_id,
  deviceIds = [],
  extraParams = {},
}: FetchOptions) {
  return await getData({
    endPoint: tree_id ? `${endPoint}/${tree_id}` : endPoint,
    type: 'get',
    dataParams: {
      'api-version': apiVersion,
      ...extraParams,
      ...(deviceIds.length > 0 ? buildArrayParams('DeviceIds', deviceIds) : {}),
    },
  });
}

export function fetchPlantTrendAnalysisDeviceSensorValuesList({
  tree_id,
  deviceIds,
}: {
  tree_id: number;
  deviceIds: number[];
}) {
  return fetchApi({
    endPoint:
      'app/io-device-sensor-values/io-sensor-chart-values-between-dates-trend-list',
    tree_id,
    deviceIds,
  });
}

export function fetchPlantTrendAnalysisInstantDataChartList({
  deviceIds,
  SelectedParameter,
}: {
  deviceIds: number[];
  SelectedParameter: number;
}) {
  return fetchApi({
    endPoint:
      'app/device-elec-inverter-instant-values/inverter-instant-value-trend-chart',
    deviceIds,
    extraParams: {
      SelectedParameter,
    },
  });
}

export function fetchPlantTrendAnalysisProductionForecastGraphList({
  tree_id,
  deviceIds,
  date,
  periodType,
}: {
  tree_id: number;
  deviceIds: number[];
  date: string;
  periodType: string;
}) {
  return fetchApi({
    endPoint: 'app/devices/inverter-device-forecast-trend',
    deviceIds,
    extraParams: {
      Date: date,
      PeriodType: periodType,
      OrganizationId: tree_id,
    },
  });
}

export function fetchPlantTrendAnalysisHeatMapGraphsList({
  deviceIds,
}: {
  deviceIds: number[];
}) {
  return fetchApi({
    endPoint:
      'app/device-elec-hourly-consumptions/energy-prod-periodic-hourly-trend',
    deviceIds,
  });
}

export function fetchPlantTrendAnalysisProductionComparisonGraphList({
  tree_id,
  deviceIds,
  date,
  periodType,
}: {
  tree_id: number;
  deviceIds: number[];
  date: string;
  periodType: string;
}) {
  return fetchApi({
    endPoint: 'app/organizations/inverter-production-comparison',
    tree_id,
    deviceIds,
    extraParams: {
      Date: date,
      PeriodType: periodType,
    },
  });
}
