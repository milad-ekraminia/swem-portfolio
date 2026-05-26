import { getCookie } from '@/helpers/cookies';
import { getData } from '@/lib/api-method/api-method-functions';


const apiVersion = import.meta.env.VITE_API_VERSION;
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchOrganizationDailyProducedValue({
  orgId,
}: {
  orgId: number;
}) {
  console.log("🚀 ~ fetchOrganizationDailyProducedValue ~ orgId:", orgId)
  await delay(1000); // 1s loading simulation

  return {
    oneDayBeforeCompared: 12.5, // Used for 'percent' and 'chartStatus'
    organizationPlantProductionDto: [
      { time: '08:00', value: 100 },
      { time: '10:00', value: 450 },
      { time: '12:00', value: 800 },
      { time: '14:00', value: 700 },
      { time: '16:00', value: 300 },
    ],
  };
}

export async function fetchOrganizationActiveAlarmsCount({
  orgId,
}: {
  orgId: number;
}) {
  const dataParams = {
    'api-version': apiVersion,
  };

  return await getData({
    endPoint: `app/alarms/organization-alarms/${orgId}`,
    type: 'get',
    dataParams: dataParams,
  });
}

export async function fetchOrganizationPlantWeeklyProductionValues({
  StartDate,
  EndDate,
}: {
  StartDate: string;
  EndDate: string;
}) {
  const dataParams = {
    'api-version': apiVersion,
    StartDate,
    EndDate,
  };

  return await getData({
    endPoint: `app/organizations/organization-plants-weekly-production-value`,
    type: 'get',
    dataParams: dataParams,
  });
}

export async function fetchDashboardPeriodicIndexSummary({
  orgId,
}: {
  orgId: number;
}) {
  const dataParams = {
    'api-version': apiVersion,
  };
  return await getData({
    endPoint: `app/organizations/organization-main-card-details/${orgId}`,
    type: 'get',
    dataParams,
  });
}

export async function fetchOrganizationTopBarInfos({
  Latitude,
  Longitude,
}: {
  Latitude?: number;
  Longitude?: number;
}) {
  const dataParams: any = {
    'api-version': apiVersion,
  };

  if (Latitude) {
    dataParams.Latitude = Latitude;
  }
  if (Longitude) {
    dataParams.Longitude = Longitude;
  }

  return await getData({
    endPoint: `app/organizations/dashboard-top-bar-info`,
    type: 'get',
    dataParams: dataParams,
  });
}

export async function fetchTotalEnergyProductionInfo() {
  const dataParams = {
    'api-version': apiVersion,
  };

  return await getData({
    endPoint: `app/organizations/total-energy-production-info`,
    type: 'get',
    dataParams: dataParams,
  });
}

// map

// used for map
export async function fetchCountryAlarmsStatusList() {
  const currentLanguage =
    getCookie('CultureName') ?? (import.meta.env.VITE_CULTURE_NAME as string);
  const dataParams = {
    'api-version': apiVersion,
    CountryCode: currentLanguage === 'fa' ? 'IR' : 'TR',
  };

  return await getData({
    endPoint: `app/organizations/country-alarms-status`,
    type: 'get',
    dataParams: dataParams,
  });
}

// used for table
export async function fetchAllProvincesInfoList({
  skipCount,
  maxResultCount,
}: {
  skipCount: number;
  maxResultCount: number;
}) {
  const currentLanguage =
    getCookie('CultureName') ?? (import.meta.env.VITE_CULTURE_NAME as string);
  const dataParams = {
    'api-version': apiVersion,
    CountryCode: currentLanguage === 'fa' ? 'IR' : 'TR',
    skipCount,
    maxResultCount,
  };

  return await getData({
    endPoint: `app/organizations/total-provinces-info`,
    type: 'get',
    dataParams: dataParams,
  });
}

export async function fetchAProvincesInfo({
  provinceId,
}: {
  provinceId: number;
}) {
  const dataParams = {
    'api-version': apiVersion,
  };

  return await getData({
    endPoint: `app/organizations/province-info/${provinceId}`,
    type: 'get',
    dataParams: dataParams,
  });
}

export async function fetchProvincePlantsInfo({
  provinceId,
}: {
  provinceId: string;
}) {
  const dataParams = {
    'api-version': apiVersion,
  };

  return await getData({
    endPoint: `app/organizations/province-plant-info/${provinceId}`,
    type: 'get',
    dataParams: dataParams,
  });
}

export async function fetchOrganizationAlarmStatusDetails({
  orgId,
  alarmLevel,
}: {
  orgId: number;
  alarmLevel: string;
}) {
  const dataParams = {
    'api-version': apiVersion as unknown as number,
    alarmLevel,
  };
  return await getData({
    endPoint: `app/alarms/organization-alarm-status-details/${orgId}`,
    type: 'get',
    dataParams,
  });
}