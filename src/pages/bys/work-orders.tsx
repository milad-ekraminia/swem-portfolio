import { BuildingSvg } from '@/assets/icons/building-svg';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import EditWorkOrderModal from '@/components/pages/bys/work-orders/modals/edit-work-order/modal';
import NewWorkOrderModal from '@/components/pages/bys/work-orders/modals/new-work-order/modal';
import WorkOrdersTable from '@/components/pages/bys/work-orders/table';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import { getPermission } from '@/helpers/get-permission-helper';
import {
  fetchWorkOrderCategoryLookUp,
  fetchWorkOrderGetLastId,
  fetchWorkOrderOrganizationsLookup,
  fetchWorkOrdersDeviceLookup,
  fetchWorkOrderTypeLookUp,
  fetchWorkOrderUserLookup,
} from '@/services/bys/work-orders/work-orders';
import { fetchApplicationConfigurationApi } from '@/services/general/application-localization-api';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';
import { useQueries, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export const WorkOrders = () => {
  const [newItem, setNewItem] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const baseBreadcrumbs: BreadcrumbItem[] = [
    {
      label: 'Menu:MaintenanceAndRepair',
      href: '',
    },
    { label: 'Menu:WorkOrders' },
  ];

  const title = {
    label: 'Menu:WorkOrders',
    href: '/bys/work-orders',
  };
  const { data: lastWorkOrderId, refetch: refetchId } = useQuery({
    queryKey: ['Get Last Work order Id'],
    queryFn: () => fetchWorkOrderGetLastId(),
    retry: false,
  });
  const results = useQueries({
    queries: [
      {
        queryKey: ['Work Orders Users Lookup'],
        queryFn: () => fetchWorkOrderUserLookup(),
        retry: false,
      },
      {
        queryKey: ['Work Orders Type Lookup'],
        queryFn: () => fetchWorkOrderTypeLookUp(),
        retry: false,
      },
      {
        queryKey: ['Work Orders Category Lookup'],
        queryFn: () => fetchWorkOrderCategoryLookUp(),
        retry: false,
      },
      // {
      //   queryKey: ["Get Last Work order Id2"],
      //   queryFn: () => fetchWorkOrderGetLastId(),
      //   retry: false,
      // },
      {
        queryKey: ['Work Order Organizations Lookup'],
        queryFn: () => fetchWorkOrderOrganizationsLookup(),
        retry: false,
      },
      {
        queryKey: ['Work Order Device Lookup'],
        queryFn: () => fetchWorkOrdersDeviceLookup(),
        retry: false,
      },
      {
        queryKey: ['userInfo'],
        queryFn: fetchApplicationConfigurationApi,
      },
    ],
  });

  const [
    getWorkOrderUserLookup,
    getWorkOrdersTypeLookup,
    getWorkOrderCategoryLookup,
    // getWorkNotificationGetLastWorkNotificationId,
    getWorkOrdersOrganizationsLookup,
    getWorkOrdersDeviceLookup,
    getUserInfoResponse,
  ] = results;

  const userLookup = getWorkOrderUserLookup?.data?.items ?? [];
  const workOrdersTypeLookup = getWorkOrdersTypeLookup?.data?.items ?? [];
  const categoryLookup = getWorkOrderCategoryLookup?.data?.items ?? [];
  // const getLastWorkOrderId =
  //   getWorkNotificationGetLastWorkNotificationId?.data ?? 0;
  const organizationsLookup =
    getWorkOrdersOrganizationsLookup?.data?.items ?? [];
  const deviceLookup = getWorkOrdersDeviceLookup?.data?.items ?? [];
  const currentUser = getUserInfoResponse?.data?.currentUser ?? null;

  return (
    <>
      <div className="page-wrapper bys-work-orders">
        <PagesHeader
          title={title}
          breadcrumbs={baseBreadcrumbs}
          icon={<BuildingSvg />}
        />
        <div className="page-wrapper__body">
          <WorkOrdersTable
            categoryLookup={categoryLookup}
            currentUser={currentUser}
            deviceLookup={deviceLookup}
            organizationsLookup={organizationsLookup}
            setNewItem={
              getPermission('WebNet.WorkOrders.Create') ? setNewItem : undefined
            }
            setEditItem={
              getPermission('WebNet.WorkOrders.Edit') ? setEditItem : undefined
            }
            workOrdersTypeLookup={workOrdersTypeLookup}
            userLookup={userLookup}
          />
        </div>
      </div>
      {getPermission('WebNet.WorkOrders.Create') && newItem && (
        <Modal
          isOpen={newItem}
          onClose={() => setNewItem(false)}
          modalSize="md"
          showCloseButton={false}
        >
          <NewWorkOrderModal
            refetchId={refetchId}
            notificationTypeLookup={workOrdersTypeLookup}
            userLookup={userLookup}
            setIsVisible={setNewItem}
            categoryLookup={categoryLookup}
            getLastWorkOrderId={lastWorkOrderId}
          />
        </Modal>
      )}
      {getPermission('WebNet.WorkOrders.Edit') && editItem && (
        <Modal
          isOpen={editItem}
          onClose={() => setEditItem(null)}
          modalSize="md"
          showCloseButton={false}
        >
          <EditWorkOrderModal
            notificationTypeLookup={workOrdersTypeLookup}
            userLookup={userLookup}
            setIsVisible={setEditItem}
            categoryLookup={categoryLookup}
            getLastWorkOrderId={lastWorkOrderId}
            workOrderInfo={editItem}
            organizationsLookup={organizationsLookup}
            deviceLookup={deviceLookup}
          />
        </Modal>
      )}
    </>
  );
};
