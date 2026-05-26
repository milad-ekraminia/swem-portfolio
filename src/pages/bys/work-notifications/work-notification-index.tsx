import { BuildingSvg } from '@/assets/icons/building-svg';
import { useQueries } from '@tanstack/react-query';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';
import {
  fetchWorkNotificationDeviceLookup,
  fetchWorkNotificationOrganizationsLookup,
  fetchWorkNotificationTypes,
  fetchWorkNotificationUserLookup,
  getLastWorkNotificationId,
} from '@/services/bys/work-notifications';
import { fetchApplicationConfigurationApi } from '@/services/general/application-localization-api';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import WorkNotificationsList from '@/components/pages/bys/work-notification/work-notification-list';

const baseBreadcrumbs: BreadcrumbItem[] = [
  {
    label: 'Menu:MaintenanceAndRepair',
  },
  { label: 'WorkNotifications' },
];

const title = {
  label: 'WorkNotifications',
  href: '/inventory-management/products',
};

export default function WorkNotificationsIndex() {
  const [
    { data: typeData },
    { data: userData },
    { data: organizationData },
    { data: deviceData },
    { data: userInfo },
    { data: lastNotificationData },
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
        queryKey: ['Work Notification Organizations Lookup'],
        queryFn: fetchWorkNotificationOrganizationsLookup,
      },
      {
        queryKey: ['Work Notification Device Lookup'],
        queryFn: fetchWorkNotificationDeviceLookup,
      },
      {
        queryKey: ['userInfo'],
        queryFn: fetchApplicationConfigurationApi,
      },
      {
        queryKey: ['Last Work Notification Id'],
        queryFn: () => getLastWorkNotificationId(),
        retry: false,
      },
    ],
  });

  const types = typeData?.items ?? [];
  const users = userData?.items ?? [];
  const organizations = organizationData?.items ?? [];
  const devices = deviceData?.items ?? [];
  const lastWorkNotificationId = lastNotificationData?.items ?? [];
  const currentUser = userInfo?.currentUser ?? [];
  return (
    <div className="page-wrapper">
      <PagesHeader
        title={title}
        breadcrumbs={baseBreadcrumbs}
        icon={<BuildingSvg />}
      />
      <div className="page-wrapper__body">
        <WorkNotificationsList
          devices={devices}
          userInfo={currentUser}
          lastWorkNotificationId={lastWorkNotificationId}
          organizations={organizations}
          users={users}
          types={types}
        />
      </div>
    </div>
  );
}
