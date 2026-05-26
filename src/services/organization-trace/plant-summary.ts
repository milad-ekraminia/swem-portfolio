import { ISort } from '@/types/components/ui/table';
import { mockPlantSummaryData } from '@/components/pages/organization-trace/mock-data';

type dataParamsProps = {
  'api-version': number;
  periodType: string;
  date: string;
  sorting?: string;
};

const apiVersion = import.meta.env.VITE_API_VERSION;

export async function fetchOrganizationPlantSummary({
  tree_id,
  periodType = 'daily',
  date,
  sortData,
}: {
  tree_id: number;
  periodType: string;
  date: string;
  sortData: ISort;
}) {
  console.log('🚀 ~ fetchOrganizationPlantSummary ~ tree_id:', tree_id);
  const dataParams: dataParamsProps = {
    'api-version': apiVersion,
    periodType,
    date,
  };

  if (sortData?.length > 0) {
    dataParams.sorting = sortData
      .map(({ sortName, direction }) =>
        direction === 'desc' ? `${sortName} DESC` : `${sortName}`,
      )
      .join(',');
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return mockPlantSummaryData;
}

export async function fetchOrganizationSummary({
  tree_id,
  periodType = 'daily',
  date,
  sortData,
}: {
  tree_id: number;
  periodType: string;
  date: string;
  sortData: ISort;
}) {
  console.log('🚀 ~ fetchOrganizationSummary ~ tree_id:', tree_id);
  const dataParams: dataParamsProps = {
    'api-version': apiVersion,
    periodType,
    date,
  };

  if (sortData?.length > 0) {
    dataParams.sorting = sortData
      .map(({ sortName, direction }) =>
        direction === 'desc' ? `${sortName} DESC` : `${sortName}`,
      )
      .join(',');
  }
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    {
      organizationName: 'Istanbul Solar Plant',
      deviceDCRatedPower: 15420.235,
      deviceACLimitedPower: 14850.12,
      invACActPowerTotal: 13980.55,
      production: 124500.45,
      eao: 96.4,
      inverterCount: '24 / 26 Active',
      deviceLastSuccessComm: '2026-05-23T10:45:00',
    },
    {
      organizationName: 'Ankara Energy Station',
      deviceDCRatedPower: 13200.5,
      deviceACLimitedPower: 12650.75,
      invACActPowerTotal: 11890.2,
      production: 102340.78,
      eao: 91.8,
      inverterCount: '18 / 20 Active',
      deviceLastSuccessComm: '2026-05-23T10:39:00',
    },
    {
      organizationName: 'Izmir Renewable Hub',
      deviceDCRatedPower: 18750.9,
      deviceACLimitedPower: 17900.45,
      invACActPowerTotal: 16840.67,
      production: 148920.15,
      eao: 97.1,
      inverterCount: '30 / 30 Active',
      deviceLastSuccessComm: '2026-05-23T10:48:00',
    },
    {
      organizationName: 'Bursa Green Energy',
      deviceDCRatedPower: 11240.3,
      deviceACLimitedPower: 10850.25,
      invACActPowerTotal: 10210.4,
      production: 85670.92,
      eao: 89.6,
      inverterCount: '14 / 16 Active',
      deviceLastSuccessComm: '2026-05-23T10:31:00',
    },
    {
      organizationName: 'Antalya Solar Farm',
      deviceDCRatedPower: 20500.75,
      deviceACLimitedPower: 19840.55,
      invACActPowerTotal: 19110.82,
      production: 172450.33,
      eao: 98.2,
      inverterCount: '36 / 36 Active',
      deviceLastSuccessComm: '2026-05-23T10:50:00',
    },
  ];
}
