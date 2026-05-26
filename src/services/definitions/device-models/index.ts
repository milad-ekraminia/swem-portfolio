import { dataParamsProps } from '@/types/api-methods';
import { ISort } from '@/types/components/ui/table';
import {
  getData,
  getFormDataPost,
} from '@/lib/api-method/api-method-functions';

const apiVersion = import.meta.env.VITE_API_VERSION;

export async function fetchDefinitionsDeviceModelsList({
  skipCount,
  filterText,
  sorting,
  pageSize,
}: {
  skipCount: number;
  filterText: string;
  sorting: ISort;
  pageSize: number;
}) {
  const dataParams: dataParamsProps = {
    'api-version': apiVersion,
    maxResultCount: pageSize,
    skipCount,
  };
  if (filterText) {
    dataParams.filterText = filterText;
  }

  // Sorting and search should be added after filter mode because of the filter mode logic reset all data
  if (sorting?.length > 0) {
    dataParams.sorting = sorting
      .map(({ sortName, direction }) =>
        direction === 'desc' ? `${sortName} DESC` : `${sortName}`,
      )
      .join(',');
  }

  return await getData({
    endPoint: `app/device-models`,
    type: 'get',
    dataParams: dataParams,
  });
}

// create new device model
export async function createNewDefinitionDeviceModel({
  data,
  body,
}: {
  data: any;
  body: any;
}) {
  const response = await getFormDataPost({
    endPoint: `app/device-models?api-version=${apiVersion}`,
    formData: body,
    type: 'post',
  });
  return { response, data };
}

export async function createNewDefinitionDeviceModelCommunicationPeriods(
  formData: any,
) {
  return await getFormDataPost({
    endPoint: `app/device-model-communication-periods?api-version=${apiVersion}`,
    formData,
    type: 'post',
  });
}

// update device model
export async function fetchDefinitionsDeviceModel({
  deviceModelId,
}: {
  deviceModelId: number;
}) {
  return await getData({
    endPoint: `app/device-models/${deviceModelId}`,
    type: 'get',
    dataParams: {
      'api-version': apiVersion,
    },
  });
}

export async function fetchDefinitionsDeviceModelCommunicationPeriods({
  deviceModelId,
}: {
  deviceModelId: number;
}) {
  return await getData({
    endPoint: `app/device-model-communication-periods/${deviceModelId}/device-model-by-id`,
    type: 'get',
    dataParams: {
      'api-version': apiVersion,
    },
  });
}

export async function updateDefinitionDeviceModel({
  data,
  body,
  deviceModelId,
}: {
  data: any;
  body: any;
  deviceModelId: number;
}) {
  const response = await getFormDataPost({
    endPoint: `app/device-models/${deviceModelId}?api-version=${apiVersion}`,
    formData: body,
    type: 'put',
  });
  return { response, data };
}

export async function updateDefinitionDeviceModelCommunicationPeriods({
  deviceModelId,
  formData,
}: {
  deviceModelId: number;
  formData: any;
}) {
  return await getFormDataPost({
    endPoint: `app/device-model-communication-periods/${deviceModelId}?api-version=${apiVersion}`,
    formData,
    type: 'put',
  });
}

export async function fetchDuplicatedLabels({
  deviceModelId,
}: {
  deviceModelId: number;
}) {
  return await getData({
    endPoint: `app/device-model-modbus-tables/model-label-lookup/${deviceModelId}`,
    type: 'get',
    dataParams: {
      'api-version': apiVersion,
    },
  });
}
