import { dataParamsProps } from '@/types/api-methods';
import { ISort } from '@/types/components/ui/table';
import {
  getData,
  getFormDataPost,
} from '@/lib/api-method/api-method-functions';

const apiVersion = import.meta.env.VITE_API_VERSION;
const defaultDataParams: dataParamsProps = {
  'api-version': apiVersion,
  maxResultCount: 1000,
  skipCount: 0,
};

export async function fetchDefinitionsDevicesList({
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
    endPoint: `app/devices`,
    type: 'get',
    dataParams: dataParams,
  });
}

export async function fetchDeviceLabelLookupList() {
  const dataParams = {
    filter: '',
    ids: [],
    skipCount: 0,
    maxResultCount: 1000,
  };

  return await getFormDataPost({
    endPoint: `app/devices/get-device-label-lookup?api-version=${apiVersion}`,
    formData: dataParams,
    type: 'post',
  });
}

export async function fetchDeviceCategoryLookupList() {
  const dataParams = {
    filter: '',
    ids: [],
    skipCount: 0,
    maxResultCount: 1000,
  };

  return await getFormDataPost({
    endPoint: `app/devices/get-device-category-lookup?api-version=${apiVersion}`,
    formData: dataParams,
    type: 'post',
  });
}

export async function fetchDeviceOrganizationLookupList() {
  return await getData({
    endPoint: `app/devices/organization-lookup`,
    type: 'get',
    dataParams: defaultDataParams,
  });
}

export async function fetchDeviceAccessPointLookupList() {
  return await getData({
    endPoint: `app/devices/access-point-lookup`,
    type: 'get',
    dataParams: defaultDataParams,
  });
}

export async function fetchDefinitionsDeviceModelLookupModelTypeList({
  filterText,
  Id,
}: {
  Id?: number;
  filterText?: string;
}) {
  const dataParams: any = defaultDataParams;

  if (typeof Id === 'number') {
    dataParams.Id = Id;
  }
  if (filterText) {
    dataParams.filterText = filterText;
  }

  return await getData({
    endPoint: `app/devices/device-model-lookup-by-model-type`,
    type: 'get',
    dataParams: dataParams,
  });
}

///////////  CREATE  ////////////////

export async function createNewDevice(formData: any) {
  return await getFormDataPost({
    endPoint: `app/devices/with-details?api-version=${apiVersion}`,
    formData,
    type: 'post',
  });
}

export async function fetchDefinitionsOrganizationPassiveDeviceLookupList({
  filterText,
  Id,
}: {
  Id?: number;
  filterText?: string;
}) {
  const dataParams: any = defaultDataParams;

  if (typeof Id === 'number') {
    dataParams.Id = Id;
  }
  if (filterText) {
    dataParams.filterText = filterText;
  }

  return await getData({
    endPoint: `app/devices/organization-passive-device-lookup`,
    type: 'get',
    dataParams: dataParams,
  });
}

export async function fetchDeviceModelCommunicationPeriodReadability({
  deviceModelId,
}: {
  deviceModelId: number;
}) {
  const dataParams = {
    'api-version': apiVersion,
  };

  return await getData({
    endPoint: `app/devices/device-model-communication-period-readability/${deviceModelId}`,
    type: 'get',
    dataParams: dataParams,
  });
}

export async function fetchDeviceModelCommunicationPeriodFormModel({
  deviceModelId,
}: {
  deviceModelId: number;
}) {
  const dataParams = {
    'api-version': apiVersion,
  };

  return await getData({
    endPoint: `app/devices/device-communication-period-from-model/${deviceModelId}`,
    type: 'get',
    dataParams: dataParams,
  });
}

/////////////////// UPDATE ///////////////////////

export async function fetchDeviceUninstallDate({
  deviceId,
}: {
  deviceId: number;
}) {
  const dataParams = {
    'api-version': apiVersion,
  };

  return await getData({
    endPoint: `app/devices/${deviceId}/device-uninstall-date`,
    type: 'get',
    dataParams: dataParams,
  });
}

export async function fetchDeviceWithDetails({
  deviceId,
}: {
  deviceId: number;
}) {
  const dataParams = {
    'api-version': import.meta.env.VITE_API_VERSION,
  };

  return await getData({
    endPoint: `app/devices/${deviceId}/with-detail`,
    type: 'get',
    dataParams: dataParams,
  });
}

export async function fetchUserFilteredOrganizationLookupList({
  filterText,
}: {
  filterText?: string;
}) {
  const dataParams: any = defaultDataParams;

  if (filterText) {
    dataParams.Filter = filterText;
  }

  return await getData({
    endPoint: `app/devices/user-filtered-organization-lookup`,
    type: 'get',
    dataParams: dataParams,
  });
}

export async function updateDeviceInfo({
  formData,
  deviceId,
}: {
  formData: any;
  deviceId: number;
}) {
  const response = await getFormDataPost({
    endPoint: `app/devices/${deviceId}/with-details?api-version=${apiVersion}`,
    formData,
    type: 'put',
  });

  const shouldUninstall = formData?.device?.uninstallDevice === true;
  const uninstallDate = shouldUninstall
    ? (formData?.device?.uninstallationDate ?? null)
    : null;

  return {
    response,
    uninstallDate,
    deviceId,
  };
}

export async function uninstallDeviceApi({
  uninstallDate,
  deviceId,
}: {
  uninstallDate: string;
  deviceId: number;
}) {
  return await getFormDataPost({
    endPoint: `app/devices/${deviceId}/uninstall-device?api-version=${apiVersion}&uninstallDate=${uninstallDate}`,
    formData: {},
    type: 'post',
  });
}
