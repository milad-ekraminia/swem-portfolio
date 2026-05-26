import { dataParamsProps } from '@/types/api-methods';
import {
  getData,
  getFormDataPost,
} from '@/lib/api-method/api-method-functions';

const apiVersion = import.meta.env.VITE_API_VERSION;

export async function fetchTimePeriodsList({
  skipCount,
  filterText,
  sorting,
  maxResultCount,
}: {
  skipCount: number;
  filterText: string;
  sorting: any[];
  maxResultCount: number;
}) {
  const dataParams: dataParamsProps = {
    'api-version': apiVersion,
    maxResultCount,
    skipCount,
  };
  if (filterText) {
    dataParams.filterText = filterText;
  }

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
    endPoint: `app/time-periods`,
    type: 'get',
    dataParams: dataParams,
  });
}

// Create New Time Periods
export async function createNewTimePeriod(formData: any) {
  return await getFormDataPost({
    endPoint: `app/time-periods?api-version=${apiVersion}`,
    formData,
    type: 'post',
  });
}

// update Time Periods
export async function fetchGetTimePeriodForEdit({
  timePeriodlId,
}: {
  timePeriodlId: number;
}) {
  return await getData({
    endPoint: `app/time-periods/${timePeriodlId}/for-edit`,
    type: 'get',
    dataParams: {
      'api-version': apiVersion,
    },
  });
}

export async function updateTimePeriodDetails({ formData }: { formData: any }) {
  return await getFormDataPost({
    endPoint: `app/time-periods?api-version=${apiVersion}`,
    formData,
    type: 'put',
  });
}

// Delete Subscription Time Periods
export async function deleteUserTimePeriod(id: string) {
  return await getData({
    endPoint: `app/user-time-periods/${id}?api-version=${apiVersion}`,
    type: 'delete',
  });
}
