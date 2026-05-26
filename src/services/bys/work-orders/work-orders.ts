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

export async function fetchWorkOrdersList({
  skipCount,
  filterText,
  sorting,
  value,
  deviceId,
  maxResultCount,
}: {
  skipCount: number;
  filterText: string;
  sorting: ISort;
  value: any;
  deviceId?: string;
  maxResultCount?: number;
}) {
  const dataParams: any = {
    'api-version': apiVersion,
    maxResultCount: maxResultCount ?? 10,
    skipCount,
  };

  if (filterText) {
    dataParams.filterText = filterText;
  }

  if (Object.keys(value)?.length > 0) {
    if (value?.workOrderType)
      dataParams['workOrderType'] = value?.workOrderType;
    if (value?.workOrderCategory)
      dataParams['workOrderCategory'] = value?.workOrderCategory;
    if (value?.creatorId) dataParams['creatorId'] = value?.creatorId;
    if (value?.minStartDate)
      dataParams['WorkOrderEndDateTimeMin'] = value?.minStartDate;
    if (value?.maxStartDate)
      dataParams['WorkOrderEndDateTimeMax'] = value?.maxStartDate;
    if (value?.minEndDate)
      dataParams['WorkOrderCreationDateTimeMin'] = value?.minEndDate;
    if (value?.maxEndDate)
      dataParams['WorkOrderCreationDateTimeMax'] = value?.maxEndDate;
    if (typeof value?.openWorkOrders === 'boolean')
      dataParams['WorkOrderState'] = value?.openWorkOrders;
  } else {
    dataParams['WorkOrderState'] = 'True';
  }

  if (deviceId) {
    const parsedDeviceId = parseInt(deviceId, 10);
    if (!Number.isNaN(parsedDeviceId)) {
      dataParams['WorkOrderDeviceIdMin'] = parsedDeviceId;
      dataParams['WorkOrderDeviceIdMax'] = parsedDeviceId;
    }
  }

  if (sorting?.length > 0) {
    dataParams.sorting = sorting
      .map(({ sortName, direction }) =>
        direction === 'desc' ? `${sortName} DESC` : `${sortName}`,
      )
      .join(',');
  }

  return await getData({
    endPoint: `app/work-orders/organization-device-filtered-list`,
    type: 'get',
    dataParams: dataParams,
  });
}
export async function fetchWorkOrderOrganizationsLookup() {
  return await getData({
    endPoint: `app/organizations/organizations-lookup`,
    type: 'get',
    dataParams: defaultDataParams,
  });
}

export async function fetchWorkOrdersDeviceLookup() {
  return await getData({
    endPoint: `app/work-orders/device-lookup`,
    type: 'get',
    dataParams: defaultDataParams,
  });
}

export async function fetchWorkOrderUserLookup() {
  return await getData({
    endPoint: `app/work-orders/user-lookup`,
    type: 'get',
    dataParams: defaultDataParams,
  });
}
export async function fetchWorkOrderTypeLookUp() {
  return await getData({
    endPoint: `app/work-orders/work-order-type-lookup`,
    type: 'get',
    dataParams: defaultDataParams,
  });
}
export async function fetchWorkOrderCategoryLookUp() {
  return await getData({
    endPoint: `app/work-orders/work-order-category-lookup`,
    type: 'get',
    dataParams: defaultDataParams,
  });
}
export async function fetchWorkOrdersAssetNodeLookup() {
  return await getData({
    endPoint: `app/work-orders/asset-node-lookup`,
    type: 'get',
    dataParams: defaultDataParams,
  });
}

export async function createNewWorkOrder(formData: any) {
  return await getFormDataPost({
    endPoint: `app/work-orders?api-version=${apiVersion}`,
    formData,
    type: 'post',
  });
}
export async function updateWorkOrderDetails({
  body,
  workOrderId,
}: {
  body: any;
  workOrderId: number;
}) {
  return await getFormDataPost({
    endPoint: `app/work-orders/${workOrderId}?api-version=${apiVersion}`,
    formData: body,
    type: 'put',
  });
}
export async function fetchWorkOrderGetLastId() {
  return await getData({
    endPoint: `app/work-orders/last-work-order-id`,
    type: 'get',
    dataParams: { 'api-version': apiVersion },
  });
}

export async function acceptWorkOrderApi({
  workOrderId,
}: {
  workOrderId: number;
}) {
  return await getData({
    endPoint: `app/work-orders/accept-work-order/${workOrderId}`,
    type: 'post',
    dataParams: { 'api-version': apiVersion },
  });
}

export async function rejectWorkOrderApi({
  workOrderId,
}: {
  workOrderId: number;
}) {
  return await getData({
    endPoint: `app/work-orders/reject-work-order/${workOrderId}`,
    type: 'post',
    dataParams: { 'api-version': apiVersion },
  });
}

export async function fetchWorkOrderActionsApi({
  workOrderId,
}: {
  workOrderId: number;
}) {
  const dataParams: any = {
    'api-version': apiVersion,
  };

  return await getData({
    endPoint: `app/work-orders/work-order-actions/${workOrderId}`,
    type: 'get',
    dataParams,
  });
}

export async function addWorkOrderActionsApi(formData: any) {
  return await getFormDataPost({
    endPoint: `app/work-orders/action-to-work-order?api-version=${apiVersion}`,
    formData,
    type: 'post',
  });
}

export async function addWorkOrderActionsImageApi(formData: {
  image?: string;
  workOrderId: number;
}) {
  return await getFormDataPost({
    endPoint: `app/work-orders/images-to-work-order-action?api-version=${
      apiVersion
    }`,
    formData: [formData],
    type: 'post',
  });
}

export async function fetchWorkOrderWorkersApi({
  workOrderId,
}: {
  workOrderId: number;
}) {
  return await getData({
    endPoint: `app/work-orders/work-order-workers/${workOrderId}`,
    type: 'get',
    dataParams: { 'api-version': apiVersion },
  });
}

export async function addWorkOrderWorkerApi(formData: any) {
  return await getFormDataPost({
    endPoint: `app/work-orders/worker-to-work-order?api-version=${apiVersion}`,
    formData,
    type: 'post',
  });
}

export async function fetchWorkOrderCostApi({
  workOrderId,
}: {
  workOrderId: number;
}) {
  return await getData({
    endPoint: `app/work-orders/work-order-cost/${workOrderId}`,
    type: 'get',
    dataParams: { 'api-version': apiVersion },
  });
}

export async function fetchWorkOrderCostTypeLookupApi() {
  return await getData({
    endPoint: `app/work-orders/work-order-cost-type-lookup`,
    type: 'get',
    dataParams: defaultDataParams,
  });
}

export async function addWorkOrderCostsApi(formData: any) {
  return await getFormDataPost({
    endPoint: `app/work-orders/cost-to-work-order?api-version=${apiVersion}`,
    formData,
    type: 'post',
  });
}

export async function addResolveWorkOrderApi({
  workOrderId,
  solutionDescription,
}: {
  workOrderId: number;
  solutionDescription: string;
}) {
  return await getData({
    endPoint: `app/work-orders/resolve-work-order/${workOrderId}?workOrderSolutionDescription=${solutionDescription}&api-version=${
      apiVersion
    }`,
    type: 'post',
  });
}

export async function fetchWorkOrderLastActionApi(workOrderId: number) {
  const dataParams = {
    'api-version': apiVersion,
  };
  return await getData({
    endPoint: `app/work-orders/work-order-last-action/${workOrderId}`,
    type: 'get',
    dataParams,
  });
}
