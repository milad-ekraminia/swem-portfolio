import { calculateSomething } from '@/helpers/production-forcast-api';
import { ISort } from '@/types/components/ui/table';
import { getData, getFormDataPost } from '@/lib/api-method/api-method-functions';


const apiVersion = import.meta.env.VITE_API_VERSION;

export async function fetchPlantProductionActivePowerList({
  tree_id,
  date,
}: {
  tree_id: number;
  date: string;
}) {
  console.log(
    '🚀 ~ fetchPlantProductionActivePowerList ~ date:',
    date,
    tree_id,
  );
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    title: 'Plant Detail Performance',

    categories: [
      '00:00',
      '01:00',
      '02:00',
      '03:00',
      '04:00',
      '05:00',
      '06:00',
      '07:00',
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
      '20:00',
      '21:00',
      '22:00',
      '23:00',
    ],

    series: [
      {
        name: 'Production (kWh)',
        data: [
          0, 0, 0, 0, 20, 80, 150, 300, 520, 780, 1020, 1250, 1400, 1350, 1200,
          1000, 850, 600, 300, 120, 40, 10, 0, 0,
        ],
      },
      {
        name: 'Consumption (kWh)',
        data: [
          120, 110, 100, 95, 90, 100, 150, 250, 400, 600, 800, 950, 1100, 1050,
          980, 920, 870, 700, 500, 300, 200, 180, 150, 130,
        ],
      },
      {
        name: 'Forecast (kWh)',
        data: [
          10, 10, 15, 20, 60, 120, 200, 350, 600, 850, 1100, 1300, 1450, 1400,
          1300, 1100, 900, 650, 400, 200, 80, 30, 10, 5,
        ],
      },
    ],

    colors: ['#2E90FA', '#F04438', '#12B76A'],
  };
}

export async function fetchPlantSensorRadiationList({
  tree_id,
  date,
}: {
  tree_id: number;
  date: string;
}) {
  return await getData({
    endPoint: `app/organizations/organization-plant-sensor-radiation-list/${tree_id}`,
    type: 'get',
    dataParams: { 'api-version': apiVersion, period: 'Daily', date },
  });
}
export async function fetchInverterDevicePeriodicList({
  organizationId,
  date,
  periodType,
  sorting = [],
}: {
  organizationId: number;
  date: string;
  periodType: string;
  sorting?: ISort;
}) {
  const formData: any = {
    organizationId,
    date,
    periodType: calculateSomething(periodType),
  };

  if (sorting?.length > 0) {
    formData.sorting = sorting
      .map(({ sortName, direction }) =>
        direction === 'desc' ? `${sortName} DESC` : `${sortName}`,
      )
      .join(',');
  }
    await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    {
      deviceDescription: 'Huawei SUN2000-100KTL',
      deviceDCRatedPower: 1200,
      deviceACRatedPower: 1000,
      deviceACLimitedPower: 950,
      invACActPowerTotal: 820,
      comparison: 78.5,
      production: 5400,
      eao: 12,
      approvedActiveAlarmCount: 2,
      activeAlarmCount: 5,
      deviceLastSuccessComm: '2026-05-22T14:32:00Z',
    },
    {
      deviceDescription: 'Sungrow SG125CX',
      deviceDCRatedPower: 1500,
      deviceACRatedPower: 1250,
      deviceACLimitedPower: 1200,
      invACActPowerTotal: 1100,
      comparison: 88.2,
      production: 6800,
      eao: 8,
      approvedActiveAlarmCount: 1,
      activeAlarmCount: 3,
      deviceLastSuccessComm: '2026-05-22T16:10:00Z',
    },
    {
      deviceDescription: 'Fronius Eco 27.0',
      deviceDCRatedPower: 900,
      deviceACRatedPower: 800,
      deviceACLimitedPower: 750,
      invACActPowerTotal: 600,
      comparison: 75.0,
      production: 4100,
      eao: 15,
      approvedActiveAlarmCount: 0,
      activeAlarmCount: 2,
      deviceLastSuccessComm: '2026-05-21T09:05:00Z',
    },
    {
      deviceDescription: 'Battery Storage Unit A',
      deviceDCRatedPower: 500,
      deviceACRatedPower: 450,
      deviceACLimitedPower: 420,
      invACActPowerTotal: 300,
      comparison: 66.6,
      production: 2200,
      eao: 4,
      approvedActiveAlarmCount: 3,
      activeAlarmCount: 6,
      deviceLastSuccessComm: '2026-05-23T08:12:00Z',
    },
  ];
}
export async function fetchOrganizationActivePowerSummary({
  tree_id,
}: {
  tree_id: number;
}) {
  return await getData({
    endPoint: `app/organizations/organization-active-power-summary/${tree_id}`,
    type: 'get',
    dataParams: { 'api-version': apiVersion },
  });
}