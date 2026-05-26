import { ISort } from '@/types/components/ui/table';
import {
  getData,
  getFormDataPost,
} from '@/lib/api-method/api-method-functions';

const apiVersion = import.meta.env.VITE_API_VERSION;
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchUserOrganizationId() {
  return await getData({
    endPoint: `app/web-net-identity-user/app-user-organization-ids`,
    type: 'get',
    dataParams: {
      'api-version': apiVersion,
    },
  });
}

export async function fetchOrganizationData(ordId: number) {
  return await getData({
    endPoint: `app/organizations/${ordId}`,
    type: 'get',
    dataParams: {
      'api-version': apiVersion,
    },
  });
}
export async function fetchActivePowerSummary({
  tree_id,
}: {
  tree_id: number;
}) {
  console.log('🚀 ~ fetchActivePowerSummary ~ tree_id:', tree_id);
  await delay(1000); // 1s loading simulation

  // Return a mock numeric value
  return 1250.75;
}
export async function fetchPeriodicIndexSummary({
  tree_id,
}: {
  tree_id: number;
}) {
  console.log('🚀 ~ fetchPeriodicIndexSummary ~ tree_id:', tree_id);
  await delay(1000); // 1s simulation

  // Mock data structure matching your component's needs
  return {
    // Daily
    indCurrentDayActive1ExpCons: 452,
    dailyProductionForecast: 510,
    dailyConsumption: 438,
    dailyAccuracyRate: 94.2,
    indCurrentDayActive1Revenue: 18250,

    // Monthly
    indCurrentMonthActive1ExpCons: 13420,
    monthlyProductionForecast: 14200,
    monthlyConsumption: 12980,
    monthlyAccuracyRate: 91.4,
    indCurrentMonthActive1Revenue: 548000,

    // Yearly
    indCurrentYearActive1ExpCons: 158400,
    yearlyProductionForecast: 165000,
    yearlyConsumption: 149750,
    yearlyAccuracyRate: 90.8,
    indCurrentYearActive1Revenue: 6840000,

    // Financial
    normalAmortizationAmount: 275000,
  };
}

export async function fetchAlarmsList({
  itemId,
  skipCount = 0,
  maxResultCount = 10,
  parentType = 'Organization',
  sortData,
}: {
  itemId: number;
  parentType?: string;
  skipCount?: number;
  maxResultCount?: number;
  sortData: ISort;
}) {
  const dataParams: any = {
    'api-version': apiVersion,
    maxResultCount,
    skipCount,
    'alarmStatus[0]': 'active',
    parentType,
  };

  if (sortData?.length > 0) {
    dataParams.sorting = sortData
      .map(({ sortName, direction }) =>
        direction === 'desc' ? `${sortName} DESC` : `${sortName}`,
      )
      .join(',');
  }

  return await getData({
    endPoint: `app/alarms/alarm-organization-list/${itemId}`,
    type: 'get',
    dataParams,
  });
}
export async function fetchCentralDetail({ itemId }: { itemId: number }) {
  const dataParams: any = {
    'api-version': apiVersion,
  };

  return await getData({
    endPoint: `app/weather-data-oWMS/last-weather-data/${itemId}`,
    type: 'get',
    dataParams,
  });
}
export async function fetchCentralPlantImg({ itemId }: { itemId: number }) {
  const dataParams: any = {
    'api-version': apiVersion,
  };

  return await getData({
    endPoint: `app/organizations/organization-plant-images/${itemId}`,
    type: 'get',
    dataParams,
  });
}
export async function fetchPlantDetail({ itemId }: { itemId: number }) {
  const dataParams: any = {
    'api-version': apiVersion,
  };

  return await getData({
    endPoint: `app/organizations/${itemId}`,
    type: 'get',
    dataParams,
  });
}

export async function fetchValidDataReadDateTime({
  tree_id,
}: {
  tree_id: number;
}) {
  return await getData({
    endPoint: `app/devices/valid-data-read-date-time/${tree_id}`,
    type: 'get',
    dataParams: {
      'api-version': apiVersion,
    },
  });
}

export async function fetchDrawerDataInverterDevicePeriodic(formData: {
  organizationId: number;
  date: string;
  periodType: number;
}) {
  return getFormDataPost({
    endPoint: `app/devices/inverter-device-periodic?api-version=${apiVersion}`,
    type: 'post',
    formData,
  });
}

export async function fetchPlantSidebarInfo(formData: {
  organizationId: number;
  date: string;
  periodType: number;
}) {
  return getFormDataPost({
    endPoint: `app/devices/dashboard-device-informations?api-version=${apiVersion}`,
    type: 'post',
    formData,
  });
}
