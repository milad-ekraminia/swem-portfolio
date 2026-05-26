import { dataParamsProps } from '@/types/api-methods';
import { ISort } from '@/types/components/ui/table';
import {
  getData,
  getFormDataPost,
} from '@/lib/api-method/api-method-functions';

const apiVersion = import.meta.env.VITE_API_VERSION;

export async function fetchWorkOrderCostTypesList({
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
    endPoint: `app/work-order-cost-types`,
    type: 'get',
    dataParams: dataParams,
  });
}

export async function createNewWorkOrderCostType(formData: any) {
  return await getFormDataPost({
    endPoint: `app/work-order-cost-types?api-version=${apiVersion}`,
    formData,
    type: 'post',
  });
}

export async function fetchWorkOrderCostTypeDetails({
  workOrderCostTypeId,
}: {
  workOrderCostTypeId: number;
}) {
  return await getData({
    endPoint: `app/work-order-cost-types/${workOrderCostTypeId}`,
    type: 'get',
    dataParams: {
      'api-version': apiVersion,
    },
  });
}

export async function updateWorkOrderCostTypeDetails({
  body,
  workOrderCostTypeId,
}: {
  body: any;
  workOrderCostTypeId: number;
}) {
  return await getFormDataPost({
    endPoint: `app/work-order-cost-types/${workOrderCostTypeId}?api-version=${
      apiVersion
    }`,
    formData: body,
    type: 'put',
  });
}
