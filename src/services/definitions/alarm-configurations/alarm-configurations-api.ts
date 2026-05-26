import { dataParamsProps } from '@/types/api-methods';
import { ISort } from '@/types/components/ui/table';
import {
  getData,
  getFormDataPost,
} from '@/lib/api-method/api-method-functions';

const apiVersion = import.meta.env.VITE_API_VERSION;

export async function fetchAlarmConfigurationsList({
  skipCount,
  filterText,
  sorting,
  pageSize = 10,
}: {
  skipCount: number;
  filterText: string;
  sorting: ISort;
  pageSize?: number;
}) {
  const dataParams: dataParamsProps = {
    'api-version': apiVersion,
    maxResultCount: pageSize,
    skipCount,
  };
  if (filterText) {
    dataParams.filterText = filterText;
  }

  if (sorting?.length > 0) {
    dataParams.sorting = sorting
      .map(({ sortName, direction }) =>
        direction === 'desc' ? `${sortName} DESC` : `${sortName}`,
      )
      .join(',');
  }

  return await getData({
    endPoint: `app/alarm-configurations`,
    type: 'get',
    dataParams: dataParams,
  });
}

export async function fetchAlarmConfigurationsDeviceLookup() {
  return await getData({
    endPoint: `app/alarm-configurations/device-lookup`,
    type: 'get',
    dataParams: {
      'api-version': apiVersion,
      SkipCount: 0,
      MaxResultCount: 1000,
    },
  });
}

export async function fetchAlarmConfigurationsLabelLookup() {
  return await getData({
    endPoint: `app/labels/tfn-ac-labels2Lookup`,
    type: 'get',
    dataParams: {
      'api-version': apiVersion,
      // SkipCount: 0,
      // MaxResultCount: 1000,
    },
  });
}

export async function fetchAlarmConfigurationsGESLookup() {
  return await getData({
    endPoint: `app/alarm-configurations/g-eSLookup`,
    type: 'get',
    dataParams: {
      'api-version': apiVersion,
      SkipCount: 0,
      MaxResultCount: 1000,
    },
  });
}

export async function fetchDeviceLookupBasedSelectedOrganization(id: number) {
  const formData = {
    'api-version': apiVersion,
    SkipCount: 0,
    MaxResultCount: 1000,
  };
  return await getData({
    endPoint: `app/alarm-configurations/device-lookup`,
    type: 'get',
    dataParams:
      id > 0
        ? {
            id,
            ...formData,
          }
        : formData,
  });
}

export async function fetchLablesLookupBasedDeviceId(deviceid: number) {
  return await getData({
    endPoint: `app/labels/tfn-ac-labels2Device-id-lookup`,
    type: 'get',
    dataParams: {
      deviceid,
      'api-version': apiVersion,
    },
  });
}
export async function fetchInvManStatusLablesStatus(labelId: number) {
  return await getData({
    endPoint: `app/alarm-configurations/device-status-offline`,
    type: 'get',
    dataParams: {
      modelId: 0,
      labelId,
      'api-version': apiVersion,
    },
  });
}

export async function fetchTimePeriodsLookup() {
  return await getData({
    endPoint: `app/time-periods/lookup`,
    type: 'get',
    dataParams: {
      'api-version': apiVersion,
      SkipCount: 0,
      MaxResultCount: 1000,
    },
  });
}

export async function fetchAppUserLookupList() {
  return await getData({
    endPoint: `app/web-net-identity-user/app-user-loookup-list`,
    type: 'get',
    dataParams: {
      'api-version': apiVersion,
    },
  });
}

// Create New Alarm Configuration
export async function createNewAlarmConfiguration(formData: any) {
  return await getFormDataPost({
    endPoint: `app/alarm-configurations?api-version=${apiVersion}`,
    formData,
    type: 'post',
  });
}

export async function createNewAlarmConfigurationMultipleDeviceIds(
  formData: any,
) {
  return await getFormDataPost({
    endPoint: `app/alarm-configurations/multiple?api-version=${apiVersion}`,
    formData,
    type: 'post',
  });
}

// update Alarm Configuration
export async function fetchGetUserAlarmConfigurationList({
  alarmConfigurationlId,
}: {
  alarmConfigurationlId: number;
}) {
  return await getData({
    endPoint: `app/user-alarm-configurations/${alarmConfigurationlId}/user-alarm-configuration-list`,
    type: 'get',
    dataParams: {
      'api-version': apiVersion,
      SkipCount: 0,
      MaxResultCount: 1000,
    },
  });
}

export async function updateAlarmConfigurationDetails({
  body,
  alarmConfigurationId,
}: {
  body: any;
  alarmConfigurationId: number;
}) {
  return await getFormDataPost({
    endPoint: `app/alarm-configurations/${alarmConfigurationId}?api-version=${apiVersion}`,
    formData: body,
    type: 'put',
  });
}

// Delete Subscription alarm configuration
export async function deleteUserAlarmConfiguration(id: string) {
  return await getData({
    endPoint: `app/user-alarm-configurations/${id}?api-version=${apiVersion}`,
    type: 'delete',
  });
}

export async function getAllUsersList() {
  const dataParams: dataParamsProps & {
    ExtraProperties: string;
    filter?: string;
  } = {
    'api-version': apiVersion,
    maxResultCount: 1000,
    skipCount: 0,
    ExtraProperties: 'Volo.Abp.Data.ExtraPropertyDictionary',
  };

  return await getData({
    endPoint: `identity/users`,
    type: 'get',
    dataParams,
  });
}
