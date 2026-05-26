import { dataParamsProps } from '@/types/api-methods';
import { ISort } from '@/types/components/ui/table';
import {
  getData,
  getFormDataPost,
} from '@/lib/api-method/api-method-functions';

const apiVersion = import.meta.env.VITE_API_VERSION;

export async function fetchAccessPointsList({
  skipCount,
  filterText,
  sorting,
  pageSize = 10,
}: {
  skipCount: number;
  filterText: string;
  sorting: ISort;
  pageSize?: number;
}) {
  const dataParams: dataParamsProps = {
    'api-version': apiVersion,
    maxResultCount: pageSize,
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
    endPoint: `app/access-points`,
    type: 'get',
    dataParams: dataParams,
  });
}

export async function createNewAccessPoint(formData: any) {
  return await getFormDataPost({
    endPoint: `app/access-points/with-broker-subscriber-info?api-version=${apiVersion}`,
    formData,
    type: 'post',
  });
}

// update device model
export async function fetchAccessPointDetails({
  accessPointId,
}: {
  accessPointId: number;
}) {
  return await getData({
    endPoint: `app/access-points/${accessPointId}`,
    type: 'get',
    dataParams: {
      'api-version': apiVersion,
    },
  });
}

export async function fetchAccessPointWithBrokerSubscriptionInfoListDetails({
  accessPointId,
}: {
  accessPointId: number;
}) {
  return await getData({
    endPoint: `app/access-points/${accessPointId}/access-point-broker-subscription-info-list`,
    type: 'get',
    dataParams: {
      'api-version': apiVersion,
    },
  });
}

export async function updateAccessPointDetails({
  data,
  body,
  accessPointId,
}: {
  data: any;
  body: any;
  accessPointId: number;
}) {
  const response = await getFormDataPost({
    endPoint: `app/access-points/${accessPointId}/with-broker-subscriber-info?api-version=${apiVersion}`,
    formData: body,
    type: 'put',
  });
  return { response, data };
}
