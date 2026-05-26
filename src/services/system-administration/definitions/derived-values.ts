import { dataParamsProps } from '@/types/api-methods';
import { ISort } from '@/types/components/ui/table';
import {
  getData,
  getFormDataPost,
} from '@/lib/api-method/api-method-functions';

const apiVersion = import.meta.env.VITE_API_VERSION;

export async function fetchDefinitionsDerivedValuesList({
  skipCount,
  filterText,
  maxResultCount,
  sorting,
}: {
  skipCount: number;
  filterText: string;
  maxResultCount: number;
  sorting: ISort;
}) {
  const dataParams: dataParamsProps = {
    'api-version': apiVersion,
    maxResultCount,
    skipCount,
    filterText,
  };

  if (sorting?.length > 0) {
    dataParams.sorting = sorting
      .map((sortOption) => {
        let sort = '';
        sort += sortOption.sortName;
        if (sortOption.direction === 'desc') sort += ` DESC`;
        return sort;
      })
      .join(',');
  }

  return await getData({
    endPoint: `app/derived-values`,
    type: 'get',
    dataParams: dataParams,
  });
}

export async function fetchDevicesListLookup() {
  return await getData({
    endPoint: `app/devices/devices-lookup?api-version=${apiVersion}`,
    type: 'get',
  });
}

export async function getLablesListBasedDeviceIdLookup(dvDeviceId: number) {
  const dataParams = {
    'api-version': apiVersion,
    deviceid: dvDeviceId,
  };

  return await getData({
    endPoint: `app/labels/tfn-ac-labels2Device-id-lookup`,
    type: 'get',
    dataParams: dataParams,
  });
}

// create new derived values
export async function createNewDerivedValueApi({
  formData,
}: {
  formData: any;
}) {
  const response = await getFormDataPost({
    endPoint: `app/derived-values?api-version=${apiVersion}`,
    formData,
    type: 'post',
  });

  return { response, submitedFormData: formData };
}

export async function createNewDerivedValueDetailsApi({
  formData,
  lastParams,
}: {
  formData: any;
  lastParams: boolean;
}) {
  const response = await getFormDataPost({
    endPoint: `app/derived-value-details?api-version=${apiVersion}`,
    formData,
    type: 'post',
  });
  return { response, lastParams };
}

// update derived values
export async function getDerivedValueDetailsList({
  derivedValueId,
}: {
  derivedValueId: number;
}) {
  return await getData({
    endPoint: `app/derived-value-details/details-list/${derivedValueId}?api-version=${apiVersion}`,
    type: 'get',
  });
}

export async function editDerivedValueApi({ formData }: { formData: any }) {
  const response = await getFormDataPost({
    endPoint: `app/derived-values/save?api-version=${apiVersion}`,
    formData,
    type: 'post',
  });
  return { response, submitedFormData: formData };
}

export async function editDerivedValueDetailApi({
  formData,
  derivedValueId,
  lastParams,
}: {
  formData: any;
  derivedValueId: number;
  lastParams: boolean;
}) {
  const response = await getFormDataPost({
    endPoint: `app/derived-value-details/${derivedValueId}?api-version=${apiVersion}`,
    formData,
    type: 'put',
  });

  return { response, lastParams };
}

export async function deleteDerivedValueDetailId({
  derivedValueDetailId,
}: {
  derivedValueDetailId: number;
}) {
  return await getData({
    endPoint: `app/derived-value-details/${derivedValueDetailId}?api-version=${apiVersion}`,
    type: 'delete',
  });
}
