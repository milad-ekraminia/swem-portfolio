import { dataParamsProps } from '@/types/api-methods';
import { ISort } from '@/types/components/ui/table';
import {
  getData,
  getFormDataPost,
} from '@/lib/api-method/api-method-functions';

const apiVersion = import.meta.env.VITE_API_VERSION;

export async function fetchDeviceCategoriesList({
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
    maxResultCount: maxResultCount,
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
    endPoint: `app/device-categories`,
    type: 'get',
    dataParams: dataParams,
  });
}

export async function createNewDeviceCategory(formData: any) {
  return await getFormDataPost({
    endPoint: `app/device-categories?api-version=${apiVersion}`,
    formData,
    type: 'post',
  });
}

export async function updateDeviceCategory({
  formData,
  deviceCategoryId,
}: {
  formData: {
    categoryName: string;
    categoryDescription?: string;
    active: boolean;
    concurrencyStamp: string;
  };
  deviceCategoryId: number;
}) {
  return await getFormDataPost({
    endPoint: `app/device-categories/${deviceCategoryId}?api-version=${
      apiVersion
    }`,
    formData,
    type: 'put',
  });
}
