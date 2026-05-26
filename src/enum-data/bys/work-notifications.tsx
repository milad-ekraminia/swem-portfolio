import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { Edit, Trash2 } from 'lucide-react';
import { WorkNotification } from '@/types/pages/bys/work-notifications';

export const workNotificationStatusTypeList = [
  {
    id: '0',
    displayName: getTranslatedValue('Enum:WorkNotificationStatusType.0'),
  },
  {
    id: '1',
    displayName: getTranslatedValue('Enum:WorkNotificationStatusType.1'),
  },
  {
    id: '2',
    displayName: getTranslatedValue('Enum:WorkNotificationStatusType.2'),
  },
];

export const workNotificationPriorityTypeList = [
  {
    id: 1,
    displayName: getTranslatedValue('Enum:WorkNotificationPriorityType.1'),
  },
  {
    id: 2,
    displayName: getTranslatedValue('Enum:WorkNotificationPriorityType.2'),
  },
  {
    id: 3,
    displayName: getTranslatedValue('Enum:WorkNotificationPriorityType.3'),
  },
  {
    id: 4,
    displayName: getTranslatedValue('Enum:WorkNotificationPriorityType.4'),
  },
];

export const getColumns = (
  setShowDeleteModal: (id: number | null) => void,
  setShowEditModal: (notification: WorkNotification | null) => void,
  getTranslatedValue: (key: string) => string,
  currentUser: any,
  users: any[],
) => {
  return [
    {
      header: getTranslatedValue('WorkNotificationType'),
      accessorKey: 'workNotificationType.typeDescription',
      sort: 'WorkNotificationType.TypeDescription',
    },
    {
      header: getTranslatedValue('NotificationDescription'),
      accessorKey: 'workNotification.notificationDescription',
      sort: 'WorkNotification.NotificationDescription',
    },
    {
      header: getTranslatedValue('CreatedBy'),
      accessorKey: '1',
      sort: 'WorkNotification.CreatorId',
      cell: ({ row }: any) => {
        return (
          users?.find(
            (user) =>
              String(user?.id) === row?.original?.workNotification?.creatorId,
          )?.displayName || '-'
        );
      },
    },
    {
      header: getTranslatedValue('WorkOrderAssignedUser'),
      accessorKey: '2',
      sort: 'WorkNotification.AssignedUserId',
      cell: ({ row }: any) => {
        return (
          users?.find(
            (user) =>
              String(user?.id) ===
              row?.original?.workNotification?.assignedUserId,
          )?.displayName || '-'
        );
      },
    },
    {
      header: getTranslatedValue('WorkOrderOrganizationId'),
      accessorKey: '3',
      sort: 'WorkOrderAssetTree.Organization.OrganizationName',
      cell: ({ row }: any) => {
        const organization = row?.original?.workOrderAssetTree?.organization;
        const parentNames = organization?.organizationParentNames;
        const orgName = organization?.organizationName;

        let displayValue = '-';
        if (parentNames && parentNames?.length) {
          displayValue = parentNames;
        } else if (orgName && orgName?.length) {
          displayValue = orgName;
        }

        return <>{displayValue}</>;
      },
    },
    {
      header: getTranslatedValue('WorkNotificationDeviceDescription'),
      accessorKey: 'workOrderAssetTree.device.deviceDescription',
      sort: 'WorkOrderAssetTree.Device.DeviceDescription',
    },
    {
      header: getTranslatedValue('NotificationNo'),
      accessorKey: 'workNotification.notificationNo',
      sort: 'WorkNotification.NotificationNo',
    },
    {
      header: getTranslatedValue('Actions'),
      accessorKey: 'product.productName',
      sort: '',
      cell: ({ row }: any) => (
        <div className="dv-edit-delete-buttons ">
          {getPermission('WebNet.WorkNotifications.Edit') && (
            <button
              type="button"
              onClick={() => setShowEditModal(row?.original)}
              className="dv-edit-delete-buttons__delete-button"
              disabled={
                currentUser?.id !==
                row?.original.workNotification?.assignedUserId
              }
            >
              <Edit color="var(--brand-600)" size={20} />
            </button>
          )}
          {getPermission('WebNet.WorkNotifications.Delete') && (
            <button
              type="button"
              className="dv-edit-delete-buttons__delete-button"
              onClick={() =>
                setShowDeleteModal(row?.original.workNotification.id)
              }
            >
              <Trash2 color="#F04438" size={20} />
            </button>
          )}
        </div>
      ),
    },
  ];
};
