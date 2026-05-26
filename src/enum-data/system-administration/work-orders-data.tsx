import { workNotificationPriorityTypeList } from '@/enum-data/bys/bys-data';
import { dateFormatter } from '@/helpers/format-data';
import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { Check, X } from 'lucide-react';
import StatusTagCircle from '@/components/ui/status-tag-circle.tsx/status-tag-circle';
import WorkOrdersActions from '@/components/pages/bys/work-orders/work-orders-actions';

export const BysWorkOrdersTableColumns = ({
  workOrdersTypeLookup,
  categoryLookup,
  userLookup,
  setShowPreviewModal,
  setEditItem,
  currentUser,
}: {
  workOrdersTypeLookup: any;
  categoryLookup: any;
  userLookup: any;
  setShowPreviewModal: any;
  setEditItem: any;
  currentUser: any;
}) => [
  {
    header: getTranslatedValue('WorkOrderNo'),
    accessorKey: 'workOrderNo',
    sort: 'WorkOrderNo',
    size: 150,
  },
  {
    header: getTranslatedValue('WorkOrderDescription'),
    accessorKey: 'workOrderDescription',
    sort: 'WorkOrderDescription',
    size: 150,
  },
  {
    header: getTranslatedValue('WorkOrderType'),
    accessorKey: 'info.workOrderType',
    sort: 'WorkOrderType',
    size: 180,
    cell: ({ row }: any) => {
      const info = row?.original;
      const workOderType = workOrdersTypeLookup?.filter(
        (item: any) => item.id === info?.workOrderType,
      )[0];
      return <>{workOderType?.displayName ?? '-'}</>;
    },
  },
  {
    header: getTranslatedValue('WorkOrderCategory'),
    accessorKey: 'info.workOrderCategory',
    sort: 'WorkOrderCategory',
    size: 150,
    cell: ({ row }: any) => {
      const info = row?.original;
      const categoryType = categoryLookup?.filter(
        (item: any) => item.id === info?.workOrderCategory,
      )[0];
      return <>{categoryType?.displayName ?? '-'}</>;
    },
  },
  {
    header: getTranslatedValue('Organization'),
    accessorKey: 'OrganizationName',
    sort: 'WorkOrderAssetTree.Organization.OrganizationParentNames',
    size: 200,
    cell: ({ row }: any) => {
      const organization = row?.original?.workOrderAssetTree?.organization;
      const parentNames = organization?.organizationParentNames;
      const orgName = organization?.organizationName;

      let displayValue = '-';
      if (parentNames && parentNames.length) {
        displayValue = parentNames;
      } else if (orgName && orgName.length) {
        displayValue = orgName;
      }

      return <>{displayValue}</>;
    },
  },
  {
    header: getTranslatedValue('Device'),
    accessorKey: 'deviceDescription',
    sort: 'WorkOrderAssetTree.Device.DeviceDescription',
    size: 200,
    cell: ({ row }: any) => {
      const info = row?.original;
      return <>{info?.workOrderAssetTree?.device?.deviceDescription ?? '-'}</>;
    },
  },
  {
    header: getTranslatedValue('WorkOrderAssignedUserId'),
    accessorKey: 'assignedUserName',
    sort: '',
    size: 200,
    cell: ({ row }: any) => {
      const info = row?.original;
      const assignedUserName = userLookup?.find(
        (elem: any) => elem?.id === info?.workOrderAssignedUserId,
      )?.displayName;

      return <>{assignedUserName ?? '-'}</>;
    },
  },
  {
    header: getTranslatedValue('CreatedBy'),
    accessorKey: 'createdByUserName',
    sort: '',
    size: 200,
    cell: ({ row }: any) => {
      const info = row?.original;

      const createdByUserName = userLookup?.find(
        (elem: any) => elem?.id === info?.creatorId,
      )?.displayName;

      return <>{createdByUserName ?? '-'}</>;
    },
  },

  {
    header: getTranslatedValue('WorkOrderStartDateTime'),
    accessorKey: 'workOrderStartDateTime',
    sort: 'WorkOrderStartDateTime',
    size: 150,
    cell: ({ row }: any) => {
      const info = row?.original;
      return (
        <>
          {info?.workOrderStartDateTime
            ? dateFormatter(info?.workOrderStartDateTime)
            : '-'}
        </>
      );
    },
  },
  {
    header: getTranslatedValue('WorkOrderEndDateTime'),
    accessorKey: 'workOrderEndDateTime',
    sort: 'WorkOrderEndDateTime',
    size: 150,
    cell: ({ row }: any) => {
      const info = row?.original;
      return (
        <>
          {info?.workOrderEndDateTime
            ? dateFormatter(info?.workOrderEndDateTime)
            : '-'}
        </>
      );
    },
  },
  {
    header: getTranslatedValue('WorkOrderState'),
    accessorKey: 'WorkOrderState',
    sort: 'WorkOrderState',
    size: 50,
    cell: ({ row }: any) => {
      const info = row?.original;
      const color = info?.workOrderState ? 'success' : 'orange';

      return (
        <StatusTagCircle
          color={color}
          label={
            !info?.workOrderState ? (
              <X size={14} color="red" />
            ) : (
              <Check size={14} color="green" />
            )
          }
        />
      );
    },
  },
  {
    header: getTranslatedValue('WorkNotificationNo'),
    accessorKey: 'WorkNotificationNo',
    sort: 'WorkNotificationNo',
    size: 200,
    cell: ({ row }: any) => {
      const info = row?.original;
      return <>{info?.workNotificationNo ?? '-'}</>;
    },
  },
  {
    header: getTranslatedValue('WorkOrderSolutionDescription'),
    accessorKey: 'WorkOrderSolutionDescription',
    sort: 'WorkOrderSolutionDescription',
    size: 150,
    cell: ({ row }: any) => {
      const info = row?.original;

      return (
        <>
          {info?.workOrderSolutionDescription
            ? info?.workOrderSolutionDescription
            : '-'}
        </>
      );
    },
  },
  {
    header: getTranslatedValue('WorkOrderPriority'),
    accessorKey: 'WorkOrderPriority',
    sort: 'WorkOrderPriority',
    size: 200,
    cell: ({ row }: any) => {
      const info = row?.original;
      const workOrderPriority = workNotificationPriorityTypeList.filter(
        (item) => item.id === info?.workOrderPriority,
      )[0];

      return <>{workOrderPriority?.value ?? '-'}</>;
    },
  },
  {
    header: getTranslatedValue('LastAction'),
    accessorKey: 'LastAction',
    sort: 'LastAction',
    size: 200,
    cell: ({ row }: any) => {
      const info = row?.original;
      return (
        <>
          {' '}
          {info?.lastAction
            ? getTranslatedValue(`Enum:WorkOrderActionType.${info?.lastAction}`)
            : '-'}
        </>
      );
    },
  },

  {
    header: getTranslatedValue('Actions'),
    accessorKey: '',
    sort: '',
    size: 110,
    cell: ({ row }: any) => {
      const info = row?.original;

      return (
        <WorkOrdersActions
          setShowPreviewModal={setShowPreviewModal}
          currentUser={currentUser}
          info={info}
          setEditItem={
            getPermission('WebNet.WorkOrders.Edit') ? setEditItem : undefined
          }
        />
      );
    },
  },
];
