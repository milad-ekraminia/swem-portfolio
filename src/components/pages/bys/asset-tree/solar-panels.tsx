import { useState } from 'react';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useQueries, useQuery } from '@tanstack/react-query';
import {
  fetchWorkNotificationDeviceLookup,
  fetchWorkNotificationOrganizationsLookup,
  fetchWorkNotificationTypes,
  fetchWorkNotificationUserLookup,
  getLastWorkNotificationId,
} from '@/services/bys/work-notifications';
import {
  fetchWorkOrderCategoryLookUp,
  fetchWorkOrderGetLastId,
  fetchWorkOrderTypeLookUp,
} from '@/services/bys/work-orders/work-orders';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import NewWorkNotificationForm from '../work-notification/create-form';
import NewWorkOrderModal from '../work-orders/modals/new-work-order/modal';
import AssetTree from './asset-tree';

export default function SolarPanels() {
  const [isCreating, setIsCreating] = useState<number | null>(null);
  const [isCreatingWorkOrder, setIsCreatingWorkOrder] = useState<number | null>(
    null,
  );

  const { data: lastWorkOrderId, refetch: refetchId } = useQuery({
    queryKey: ['Get Last Work order Id'],
    queryFn: () => fetchWorkOrderGetLastId(),
    retry: false,
  });

  const [
    { data: typeData },
    { data: userData },
    { data: lastNotificationData },
    { data: organizationData },
    { data: deviceData },
    { data: categoriesData },
    { data: getWorkOrdersTypeDatas },
  ] = useQueries({
    queries: [
      {
        queryKey: ['Work Notification Types'],
        queryFn: fetchWorkNotificationTypes,
      },
      {
        queryKey: ['Work Notification Users'],
        queryFn: fetchWorkNotificationUserLookup,
      },
      {
        queryKey: ['Last Work Notification Id'],
        queryFn: getLastWorkNotificationId,
        retry: false,
      },
      {
        queryKey: ['Work Notification Organizations Lookup'],
        queryFn: fetchWorkNotificationOrganizationsLookup,
      },
      {
        queryKey: ['Work Notification Device Lookup'],
        queryFn: fetchWorkNotificationDeviceLookup,
      },
      {
        queryKey: ['Work Orders Category Lookup'],
        queryFn: () => fetchWorkOrderCategoryLookUp(),
        retry: false,
      },
      {
        queryKey: ['Work Orders Type Lookup'],
        queryFn: () => fetchWorkOrderTypeLookUp(),
        retry: false,
      },
    ],
  });

  const types = typeData?.items ?? [];
  const users = userData?.items ?? [];
  const lastWorkNotificationId = lastNotificationData?.items ?? [];
  const organizations = organizationData?.items ?? [];
  const devices = deviceData?.items ?? [];
  const categoryLookup = categoriesData?.items ?? [];
  const workOrdersTypeLookup = getWorkOrdersTypeDatas?.items ?? [];

  const handleIsCreating = (id: number | null) => {
    setIsCreating(id);
  };
  const handleIsCreatingWorkOrder = (id: number | null) => {
    setIsCreatingWorkOrder(id);
  };

  return (
    <div className="asset-tree-table-wrapper">
      <div className="asset-tree-header">
        <span className="asset-tree-wrapper__header-title">
          {getTranslatedValue('WorkOrderAssetTree')}
        </span>
      </div>
      <AssetTree
        handleIsCreatingWorkOrder={handleIsCreatingWorkOrder}
        handleIsCreating={handleIsCreating}
      />
      {isCreating && (
        <Modal
          modalSize="md"
          showCloseButton={false}
          isOpen={!!isCreating}
          onClose={() => handleIsCreating(null)}
        >
          <NewWorkNotificationForm
            users={users}
            devices={devices}
            organizations={organizations}
            deviceId={isCreating}
            lastWorkNotificationId={lastWorkNotificationId}
            types={types}
            setShowModal={() => handleIsCreating(null)}
          />
        </Modal>
      )}
      {isCreatingWorkOrder && (
        <Modal
          isOpen={!!isCreatingWorkOrder}
          onClose={() => setIsCreatingWorkOrder(null)}
          modalSize="md"
          showCloseButton={false}
        >
          <NewWorkOrderModal
            refetchId={refetchId}
            notificationTypeLookup={workOrdersTypeLookup}
            userLookup={users}
            setIsVisible={setIsCreatingWorkOrder}
            categoryLookup={categoryLookup}
            getLastWorkOrderId={lastWorkOrderId}
            deviceId={isCreatingWorkOrder}
          />
        </Modal>
      )}
    </div>
  );
}
