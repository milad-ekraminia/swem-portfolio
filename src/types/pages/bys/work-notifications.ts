export interface WorkNotificationFilters {
  'api-version': string;
  maxResultCount: number;
  skipCount: number;
  sorting?: string;
  filterText?: string;
  Filter?: string;
  Id?: number;
  providerName?: string;
}

export interface WorkNotification {
  workNotification: {
    notificationDescription: string;
    startDate?: string;
    endDate?: string;
    notificationNo: string;
    workNotificationPriorityType: number;
    workNotificationStatusType: number;
    workOrderAssetType: number;
    workNotificationTypeId: number;
    id: number;
    creatorId: string;
    assignedUserId: string;
    assetNodeId: number;
    deviceId: number;
    workOrderDeviceId: number;
  };
  workNotificationType: {
    typeDescription: string;
    id: number;
  };
  workOrderAssetTree: {
    device: {
      id: number;
      deviceDescription: string;
    };
    organization: {
      id: number;
      organizationName: string;
      organizationParentNames: string;
    };
  };
}

export interface WorkNotificationFormData {
  notificationDescription: string;
  startDate: string;
  endDate: null;
  notificationNo: string;
  assignedUserId: string;
  assignedUserGuid: string;
  workNotificationPriorityType: number;
  workNotificationStatusType: number;
  deviceId: number;
  workOrderAssetType: number;
  workNotificationTypeId: number;
  assetNodeId: null;
  deviceCaption: string;
}

export type WorkNotificationUsers = { id: string; displayName: string }[];
