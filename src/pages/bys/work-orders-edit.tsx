import { DefinitionsDevicesSvg } from '@/assets/icons/definitions-devices-svg';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import WorkOrdersEditWrapper from '@/components/pages/bys/work-orders-edit/work-oders-edit-wrapper';
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
import { useQueries } from '@tanstack/react-query';

export const WorkOrdersEdit = () => {
  const baseBreadcrumbs: BreadcrumbItem[] = [
    {
      label: 'Menu:MaintenanceAndRepair',
      href: '',
    },
    { label: 'Menu:WorkOrders', href: '/bys/work-orders' },
  ];

  const title = {
    label: 'WorkOrders',
    href: `/bys/work-orders`,
  };
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
      {
        queryKey: ['Get Last Work order Id'],
        queryFn: () => fetchWorkOrderGetLastId(),
        retry: false,
      },
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
    getWorkOrdersOrganizationsLookup,
    getWorkOrdersDeviceLookup,
  ] = results;

  const userLookup = getWorkOrderUserLookup?.data?.items ?? [];
  const workOrdersTypeLookup = getWorkOrdersTypeLookup?.data?.items ?? [];
  const categoryLookup = getWorkOrderCategoryLookup?.data?.items ?? [];

  const organizationsLookup =
    getWorkOrdersOrganizationsLookup?.data?.items ?? [];
  const deviceLookup = getWorkOrdersDeviceLookup?.data?.items ?? [];

  return (
    <div className="page-wrapper work-orders-edit">
      <PagesHeader
        title={title}
        breadcrumbs={baseBreadcrumbs}
        icon={<DefinitionsDevicesSvg />}
      />
      <div className="page-wrapper__body">
        <WorkOrdersEditWrapper
          categoryLookup={categoryLookup}
          workOrdersTypeLookup={workOrdersTypeLookup}
          userLookup={userLookup}
          deviceLookup={deviceLookup}
          organizationsLookup={organizationsLookup}
        />
      </div>
    </div>
  );
};
