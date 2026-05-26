import { WorkNotificationFormData } from '@/types/pages/bys/work-notifications';
import {
  getData,
  getFormDataPost,
} from '@/lib/api-method/api-method-functions';

// type SortDirection = 'asc' | 'desc';

// interface SortOption {
//   sortName: string;
//   direction?: SortDirection;
// }

type WorkNotificationStatus = 'Accepted' | 'Rejected' | 'Waiting';

function mapStatusType(statusCode?: number): WorkNotificationStatus {
  if (statusCode === 2) return 'Accepted';
  if (statusCode === 1) return 'Rejected';
  return 'Waiting';
}

const apiVersion = import.meta.env.VITE_API_VERSION;

const defaultDataParams = {
  'api-version': apiVersion,
  maxResultCount: 1000,
  skipCount: 0,
};

export async function fetchWorkNotificationsList({
  skipCount,
  filterText,
  sorting,
  value,
  deviceId,
  maxResultCount,
}: {
  skipCount: number;
  filterText: string;
  sorting: any;
  value: Record<string, unknown> & { workNotificationStatusType?: number };
  deviceId?: string;
  maxResultCount: number;
}) {
  const dataParams: Record<string, unknown> = {
    'api-version': apiVersion,
    maxResultCount,
    skipCount,
  };

  if (filterText) {
    dataParams.filterText = filterText;
  }

  const hasValue = value && Object.keys(value).length > 0;
  if (hasValue) {
    const {
      CreationTimeMin,
      CreationTimeMax,
      EndDateMin,
      EndDateMax,
      workNotificationTypeId,
      AssignedUserId,
    } = value as Record<string, unknown>;

    if (CreationTimeMin) dataParams.CreationTimeMin = CreationTimeMin;
    if (CreationTimeMax) dataParams.CreationTimeMax = CreationTimeMax;
    if (EndDateMin) dataParams.EndDateMin = EndDateMin;
    if (EndDateMax) dataParams.EndDateMax = EndDateMax;
    if (workNotificationTypeId)
      dataParams.workNotificationTypeId = workNotificationTypeId;
    if (AssignedUserId) dataParams.AssignedUserId = AssignedUserId;
  }

  dataParams.WorkNotificationStatusType = mapStatusType(
    (value?.workNotificationStatusType as number | undefined) ?? undefined,
  );

  if (deviceId) {
    const parsedDeviceId = parseInt(deviceId, 10);
    if (!Number.isNaN(parsedDeviceId)) {
      dataParams.DeviceIdMin = parsedDeviceId;
      dataParams.DeviceIdMax = parsedDeviceId;
    }
  }

  // Sorting and search should be added after filter mode because of the filter mode logic reset all data
  if (sorting?.length > 0) {
    dataParams.sorting = sorting
      ?.map((sortOption: any) => {
        let sort = '';
        sort += sortOption.sortName;
        if (sortOption.direction === 'desc') sort += ` DESC`;
        return sort;
      })
      .join(',');
  }

  return await getData({
    endPoint: `app/work-notifications/organization-device-filtered-list`,
    type: 'get',
    dataParams,
  });
}

export async function fetchWorkNotificationTypes() {
  return await getData({
    endPoint: `app/work-notifications/work-notification-type-lookup`,
    type: 'get',
    dataParams: defaultDataParams,
  });
}
export async function fetchWorkNotificationUserLookup() {
  return await getData({
    endPoint: `app/work-notifications/user-lookup`,
    type: 'get',
    dataParams: defaultDataParams,
  });
}
export async function fetchWorkNotificationOrganizationsLookup() {
  return await getData({
    endPoint: `app/organizations/organizations-lookup`,
    type: 'get',
    dataParams: defaultDataParams,
  });
}
export async function fetchWorkNotificationDeviceLookup() {
  return await getData({
    endPoint: `app/work-notifications/device-lookup`,
    type: 'get',
    dataParams: defaultDataParams,
  });
}
export async function createNewWorkNotification(formData: any) {
  return await getFormDataPost({
    endPoint: `app/work-notifications?api-version=${apiVersion}`,
    formData,
    type: 'post',
  });
}

export async function fetchWorkNotificationDetails({
  workNotificationId,
}: {
  workNotificationId: number;
}) {
  return await getData({
    endPoint: `app/work-notifications/${workNotificationId}/with-navigation-properties`,
    type: 'get',
    dataParams: {
      'api-version': apiVersion,
    },
  });
}

export async function updateWorkNotificationDetails({
  body,
  workNotificationId,
}: {
  body: WorkNotificationFormData;
  workNotificationId: number;
}) {
  return await getFormDataPost({
    endPoint: `app/work-notifications/${workNotificationId}?api-version=${apiVersion}`,
    formData: body,
    type: 'put',
  });
}

export async function acceptWorkNotification({
  workNotificationId,
}: {
  workNotificationId: number;
}) {
  return await getFormDataPost({
    endPoint: `app/work-notifications/accept-work-notification/${workNotificationId}?api-version=${apiVersion}`,
    formData: {},
    type: 'post',
  });
}

export async function convertIntoWorkOrder({
  workNotificationId,
  body,
}: {
  workNotificationId: number;
  body: any;
}) {
  return await getFormDataPost({
    endPoint: `app/work-notifications/convert-into-work-order/${workNotificationId}?api-version=${apiVersion}`,
    formData: body,
    type: 'post',
  });
}

export async function getLastWorkNotificationId() {
  return await getData({
    endPoint: `app/work-notifications/last-work-notification-id`,
    type: 'get',
    dataParams: { 'api-version': apiVersion },
  });
}
