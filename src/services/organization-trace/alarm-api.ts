import { ISort } from '@/types/components/ui/table';
import {
  getData,
  getFormDataPost,
} from '@/lib/api-method/api-method-functions';

const apiVersion = import.meta.env.VITE_API_VERSION;

type dataParamsProps = {
  'api-version': number;
  parentType: string;
  maxResultCount: number;
  skipCount: number;
  sorting?: string;
  alarmStatus?: string[];
};

interface DynamicDataParamsProps extends dataParamsProps {
  [key: string]: any;
}

export async function fetchAlarmList({
  orgId,
  parentType,
  skipCount,
  maxResultCount,
  alarmStatus = ['Active'],
  sortData,
  insertedDate,
}: {
  orgId: number;
  parentType: number;
  skipCount: number;
  maxResultCount: number;
  sortData: ISort;
  alarmStatus: string[];
  insertedDate: string;
}) {
  console.log('🚀 ~ fetchAlarmList ~ orgId:', orgId);
  const dataParams: dataParamsProps = {
    'api-version': apiVersion as unknown as number,
    parentType: parentType < 5 ? 'Organization' : 'Device',
    maxResultCount,
    skipCount,
  };

  if (insertedDate) {
    (dataParams as DynamicDataParamsProps)['date'] = insertedDate;
  }

  if (alarmStatus.length > 0) {
    for (let i = 0; i < alarmStatus.length; i++) {
      (dataParams as DynamicDataParamsProps)[`alarmStatus[${i}]`] =
        alarmStatus[i];
    }
  }

  if (sortData?.length > 0) {
    dataParams.sorting = sortData
      .map(({ sortName, direction }) =>
        direction === 'desc' ? `${sortName} DESC` : `${sortName}`,
      )
      .join(',');
  }
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    items: [
      {
        id: 1,
        deviceOrganizationName: 'Istanbul Solar Plant',
        deviceDescription: 'Inverter A-12',
        deviceModelName: 'Huawei SUN2000-100KTL',
        alarmDescription: 'Overvoltage detected',
        alarmTime: 5400,
        alarmConfLevel: 3,
        creationTime: '2026-05-23T09:15:00',
        alarmApprovedDateTime: '2026-05-23T10:05:00',
        lastUpdateUserFullName: 'Ahmet Yılmaz',
      },
      {
        id: 2,
        deviceOrganizationName: 'Ankara Energy Station',
        deviceDescription: 'Transformer B-04',
        deviceModelName: 'Sungrow SG125CX',
        alarmDescription: 'Communication timeout',
        alarmTime: 2400,
        alarmConfLevel: 2,
        creationTime: '2026-05-23T08:40:00',
        alarmApprovedDateTime: null,
        lastUpdateUserFullName: null,
      },
      {
        id: 3,

        deviceOrganizationName: 'Izmir Renewable Hub',
        deviceDescription: 'Inverter C-21',
        deviceModelName: 'SMA Sunny Tripower CORE2',
        alarmDescription: 'Temperature threshold exceeded',
        alarmTime: 7200,
        alarmConfLevel: 1,
        creationTime: '2026-05-23T07:20:00',
        alarmApprovedDateTime: '2026-05-23T08:10:00',
        lastUpdateUserFullName: 'Mehmet Kaya',
      },
      {
        id: 4,

        deviceOrganizationName: 'Bursa Green Energy',
        deviceDescription: 'Panel Group D-08',
        deviceModelName: 'Fronius Eco 27.0-3-S',
        alarmDescription: 'Low production efficiency',
        alarmTime: 3600,
        alarmConfLevel: 2,
        creationTime: '2026-05-23T06:55:00',
        alarmApprovedDateTime: null,
        lastUpdateUserFullName: null,
      },
      {
        id: 5,

        deviceOrganizationName: 'Antalya Solar Farm',
        deviceDescription: 'Battery Unit E-03',
        deviceModelName: 'Growatt MAX 125KTL3-X',
        alarmDescription: 'Battery voltage imbalance',
        alarmTime: 4800,
        alarmConfLevel: 3,
        creationTime: '2026-05-23T05:30:00',
        alarmApprovedDateTime: '2026-05-23T06:00:00',
        lastUpdateUserFullName: 'Ayşe Demir',
      },
    ],
  };
}

export async function approveAlarmApi({ alarmId }: { alarmId: number }) {
  return await getData({
    endPoint: `app/alarms/${alarmId}/approve-alarm`,
    type: 'post',
    dataParams: { 'api-version': apiVersion as unknown as number },
    isHeaderJson: true,
  });
}

export async function cancelAlarmApi({ alarmId }: { alarmId: number }) {
  return await getData({
    endPoint: `app/alarms/${alarmId}/cancel-alarm`,
    type: 'post',
    dataParams: { 'api-version': apiVersion as unknown as number },
    isHeaderJson: true,
  });
}

export async function cancelAlarms(formData: any) {
  return await getFormDataPost({
    endPoint: `app/alarms/cancel-alarms?api-version=${apiVersion}`,
    formData,
    type: 'post',
  });
}

export async function approveAlarms(formData: any) {
  return await getFormDataPost({
    endPoint: `app/alarms/approve-alarms?api-version=${apiVersion}`,
    formData,
    type: 'post',
  });
}

export async function fetchAlarmListPage({
  parentId,
  parentType,
  skipCount,
  maxResultCount,
  alarmStatus = [2],
  sortData,
  deviceId,
  alarmLevels,
  lastUpdateUserFullNames,
}: {
  parentId: number;
  parentType: number;
  skipCount: number;
  maxResultCount: number;
  sortData: ISort;
  alarmStatus: number[];
  deviceId: number[];
  alarmLevels: number[];
  lastUpdateUserFullNames: number[];
}) {
  const dataParams: dataParamsProps = {
    'api-version': apiVersion as unknown as number,
    parentType: parentType < 5 ? 'Organization' : 'Device',
    maxResultCount,
    skipCount,
  };

  if (alarmStatus.length > 0) {
    for (let i = 0; i < alarmStatus.length; i++) {
      (dataParams as DynamicDataParamsProps)[`alarmStatus[${i}]`] =
        alarmStatus[i];
    }
  }

  if (sortData?.length > 0) {
    dataParams.sorting = sortData
      .map(({ sortName, direction }) =>
        direction === 'desc' ? `${sortName} DESC` : `${sortName}`,
      )
      .join(',');
  }

  return await getFormDataPost({
    endPoint: `app/alarms/active-or-passive-alarm-organization-list?api-version=${apiVersion}`,
    formData: {
      parentId,
      parentType,
      deviceId,
      alarmStatus,
      alarmLevels,
      maxResultCount: 1000,
      lastUpdateUserFullNames,
      sorting: dataParams?.sorting,
      skipCount: 0,
    },
    type: 'post',
  });
}
