import { dataParamsProps } from '@/types/api-methods';
import { ISort } from '@/types/components/ui/table';
import {
  getData,
  getFormDataPost,
} from '@/lib/api-method/api-method-functions';

const apiVersion = import.meta.env.VITE_API_VERSION;

export async function fetchWorkNotificationTypesList({
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
    endPoint: `app/work-notification-types`,
    type: 'get',
    dataParams: dataParams,
  });
}

export async function createNewWorkNotificationType(formData: any) {
  return await getFormDataPost({
    endPoint: `app/work-notification-types?api-version=${apiVersion}`,
    formData,
    type: 'post',
  });
}

// update device model
export async function fetchWorkNotificationTypeDetails({
  workNotificationTypeId,
}: {
  workNotificationTypeId: number;
}) {
  return await getData({
    endPoint: `app/work-notification-types/${workNotificationTypeId}`,
    type: 'get',
    dataParams: {
      'api-version': apiVersion,
    },
  });
}

export async function updateWorkNotificationTypeDetails({
  body,
  workNotificationTypeId,
}: {
  body: any;
  workNotificationTypeId: number;
}) {
  return await getFormDataPost({
    endPoint: `app/work-notification-types/${workNotificationTypeId}?api-version=${
      apiVersion
    }`,
    formData: body,
    type: 'put',
  });
}
