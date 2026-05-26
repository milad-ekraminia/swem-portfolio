import { dataParamsProps } from '@/types/api-methods';
import { ISort } from '@/types/components/ui/table';
import {
  getData,
  getFormDataPost,
} from '@/lib/api-method/api-method-functions';

const apiVersion = import.meta.env.VITE_API_VERSION;

const defaultDataParams = {
  'api-version': apiVersion,
  maxResultCount: 1000,
  skipCount: 0,
};

export async function fetchDefinitionsDeviceModelsList({
  skipCount,
  filterText,
  sorting,
}: {
  skipCount: number;
  filterText: string;
  sorting: ISort;
}) {
  const dataParams: dataParamsProps = {
    ...defaultDataParams,
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
    endPoint: `app/device-models`,
    type: 'get',
    dataParams: dataParams,
  });
}

export async function fetchDefinitionsDeviceModelsListByModelId({
  deviceModelId,
  skipCount,
  pageSize,
  sorting,
  filterText,
}: {
  deviceModelId: number;
  skipCount: number;
  pageSize: number;
  sorting: ISort;
  filterText?: string;
}) {
  const dataParams: any = {
    'api-version': apiVersion,
    maxResultCount: pageSize,
    skipCount,
    DeviceModelIdMin: deviceModelId,
    DeviceModelIdMax: deviceModelId,
    DataDescription: '',
    DataUnit: '',
    TopicName: '',
    SubTopicName: '',
    OpcTagName: '',
    filterText,
  };

  if (sorting?.length > 0) {
    dataParams.sorting = sorting
      .map(({ sortName, direction }) =>
        direction === 'desc' ? `${sortName} DESC` : `${sortName}`,
      )
      .join(',');
  }
  if (!filterText) {
    delete dataParams.filterText;
  }

  return await getData({
    endPoint: `app/device-model-modbus-tables/by-model-id`,
    type: 'get',
    dataParams: dataParams,
  });
}

export async function fetchDefinitionsDeviceDataTypeLabelLabelsList(
  modbusId: number,
) {
  const dataParams: any = {
    'api-version': apiVersion,
  };

  return await getData({
    endPoint: `app/device-model-modbus-tables/localized-data-type-label-lookup/${modbusId}`,
    type: 'get',
    dataParams: dataParams,
  });
}

export async function fetchDefinitionsDeviceFormulasList() {
  const dataParams: any = defaultDataParams;

  return await getData({
    endPoint: `app/device-model-modbus-tables/formulas-lookup`,
    type: 'get',
    dataParams: dataParams,
  });
}

export async function createNewDefinitionDeviceModelModbusModel({
  formData,
}: {
  formData: any;
}) {
  return await getFormDataPost({
    endPoint: `app/device-model-modbus-tables?api-version=${apiVersion}`,
    formData: formData,
    type: 'post',
  });
}

export async function updateDefinitionDeviceModelModbusModel({
  formData,
  id,
}: {
  formData: any;
  id: number;
}) {
  return await getFormDataPost({
    endPoint: `app/device-model-modbus-tables/${id}?api-version=${apiVersion}`,
    formData: {
      ...formData,
      id,
    },
    type: 'put',
  });
}

export async function createNewDefinitionDeviceModelModbusWithUseExcel({
  formData,
  id,
}: {
  formData: any;
  id: number;
}) {
  return await getFormDataPost({
    endPoint: `app/device-model-modbus-tables/modbus-data-mappings-from-excel-file/${id}?api-version=${apiVersion}`,
    formData: formData,
    type: 'post',
    hasExcel: true,
  });
}

export async function createNewDefinitionDeviceModelModbusListWithUseExcel({
  formData,
  id,
}: {
  formData: any;
  id: number;
}) {
  return await getFormDataPost({
    endPoint: `app/device-model-modbus-tables/import-data-mapping-for-model/${id}?api-version=${apiVersion}`,
    formData: formData,
    type: 'post',
    hasExcel: true,
  });
}

export async function checkUsedLabelInPreviousData({
  labelName,
}: {
  labelName: string;
}) {
  return await getData({
    endPoint: `app/device-model-modbus-tables/validate-label-name`,
    type: 'get',
    dataParams: {
      'api-version': apiVersion,
      labelName,
    },
  });
}

export async function getAsduTypesLookup() {
  return await getData({
    endPoint: `app/iec60870-asdu-types/asdu-type-lookup`,
    type: 'get',
  });
}
