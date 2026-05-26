import { dataParamsProps } from '@/types/api-methods';
import { ISort } from '@/types/components/ui/table';
import {
  getData,
  getFormDataPost,
} from '@/lib/api-method/api-method-functions';

const apiVersion = import.meta.env.VITE_API_VERSION;

export async function fetchWorkOrderTypesList({
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
    endPoint: `app/work-order-types`,
    type: 'get',
    dataParams: dataParams,
  });
}

export async function createNewWorkOrderType(formData: any) {
  return await getFormDataPost({
    endPoint: `app/work-order-types?api-version=${apiVersion}`,
    formData,
    type: 'post',
  });
}

// update device model
export async function fetchWorkOrderTypeDetails({
  workOrderTypeId,
}: {
  workOrderTypeId: number;
}) {
  return await getData({
    endPoint: `app/work-order-types/${workOrderTypeId}`,
    type: 'get',
    dataParams: {
      'api-version': apiVersion,
    },
  });
}

export async function updateWorkOrderTypeDetails({
  body,
  workOrderTypeId,
}: {
  body: any;
  workOrderTypeId: number;
}) {
  return await getFormDataPost({
    endPoint: `app/work-order-types/${workOrderTypeId}?api-version=${
      apiVersion
    }`,
    formData: body,
    type: 'put',
  });
}
