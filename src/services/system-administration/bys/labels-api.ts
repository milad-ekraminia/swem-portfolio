import { dataParamsProps } from '@/types/api-methods';
import { ISort } from '@/types/components/ui/table';
import {
  getData,
  getFormDataPost,
} from '@/lib/api-method/api-method-functions';

const apiVersion = import.meta.env.VITE_API_VERSION;

export async function fetchLabelsList({
  skipCount,
  filterText,
  sorting,
  maxResultCount = 10,
}: {
  skipCount: number;
  filterText: string;
  sorting: ISort;
  maxResultCount?: number;
}) {
  const dataParams: dataParamsProps = {
    'api-version': apiVersion,
    maxResultCount,
    skipCount,
    filterText,
  };

  // Sorting and search should be added after filter mode because of the filter mode logic reset all data
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
    endPoint: `app/labels`,
    type: 'get',
    dataParams: dataParams,
  });
}

/** Create new label **/

export async function createNewLabel(formData: any) {
  return await getFormDataPost({
    endPoint: `app/labels?api-version=${apiVersion}`,
    formData,
    type: 'post',
  });
}

export async function createNewDeviceType(formData: any) {
  return await getFormDataPost({
    endPoint: `app/device-type-labels?api-version=${apiVersion}`,
    formData,
    type: 'post',
  });
}

export async function fetchDeviceTypeLabelList(labelId: number) {
  return await getData({
    endPoint: `app/device-type-labels/device-type-label-list/${labelId}?api-version=${
      apiVersion
    }`,
    type: 'get',
  });
}

/** Update label **/

export async function updateLabelApi({
  formData,
  labelId,
}: {
  formData: any;
  labelId: number;
}) {
  return await getFormDataPost({
    endPoint: `app/labels/${labelId}?api-version=${apiVersion}`,
    formData,
    type: 'put',
  });
}

export async function deleteDeviceTypeLabel(labelId: number) {
  return await getData({
    endPoint: `app/device-type-labels/${labelId}?api-version=${apiVersion}`,
    type: 'delete',
  });
}
