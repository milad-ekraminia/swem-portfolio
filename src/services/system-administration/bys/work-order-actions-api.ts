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

export async function fetchWorkOrderActionsList({
  skipCount,
  filterText,
  sorting,
  maxResultCount = 10,
}: {
  skipCount: number;
  filterText: string;
  sorting: ISort;
  maxResultCount: number;
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
    endPoint: `app/work-order-actions`,
    type: 'get',
    dataParams: dataParams,
  });
}

export async function fetchWorkOrderActionUserLookup() {
  return await getData({
    endPoint: `app/work-order-actions/user-lookup`,
    dataParams: defaultDataParams,
    type: 'get',
  });
}

export async function fetchWorkOrderLookup() {
  return await getData({
    endPoint: `app/work-order-workers/work-order-lookup`,
    dataParams: defaultDataParams,
    type: 'get',
  });
}

export async function createNewWorkOrderAction(formData: any) {
  return await getFormDataPost({
    endPoint: `app/work-order-actions?api-version=${apiVersion}`,
    formData,
    type: 'post',
  });
}

// update device model
export async function fetchWorkOrderActionDetails({
  workOrderActionId,
}: {
  workOrderActionId: number;
}) {
  return await getData({
    endPoint: `app/work-order-actions/${workOrderActionId}/with-navigation-properties`,
    type: 'get',
    dataParams: {
      'api-version': apiVersion,
    },
  });
}

export async function updateWorkOrderActionDetails({
  body,
  workOrderActionId,
}: {
  body: any;
  workOrderActionId: number;
}) {
  return await getFormDataPost({
    endPoint: `app/work-order-actions/${workOrderActionId}?api-version=${
      apiVersion
    }`,
    formData: body,
    type: 'put',
  });
}
