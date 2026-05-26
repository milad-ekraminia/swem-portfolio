import { AlarmsPage } from '@/pages/organization-trace/alarms';
import { OrgTraceProvider } from '@/providers/organization-trace/organization-trace-context-provider';
import { lazyImport } from './helper/lazyImport';
import { withProtectedSuspense } from './suspense-helper';

const OrganizationTrace = lazyImport(
  () => import('@/pages/organization-trace'),
  'OrganizationTrace',
);
const AlarmDetails = lazyImport(
  () => import('@/pages/organization-trace/alarm-details'),
  'AlarmDetails',
);
const Dashboard = lazyImport(
  () => import('@/pages/organization-trace/dashboard'),
  'Dashboard',
);
const Graphic = lazyImport(() => import('@/pages/organization-trace/graphic'));
const MapBox = lazyImport(() => import('@/pages/organization-trace/map'));
const ProvinceInfoMap = lazyImport(() => import('@/pages/organization-trace/province-info-map'));

export const organizationTraceRoutes: any[] = [
  {
    path: '/',
    element: (
      <OrgTraceProvider>
        {withProtectedSuspense(<Dashboard />)}
      </OrgTraceProvider>
    ),
  },
  {
    path: '/organization-trace',
    element: (
      <OrgTraceProvider>
        {withProtectedSuspense(<OrganizationTrace />)}
      </OrgTraceProvider>
    ),
  },
  {
    path: '/alarm-details/organization-trace',
    element: (
      <OrgTraceProvider>
        {withProtectedSuspense(<AlarmDetails />)}
      </OrgTraceProvider>
    ),
  },
  {
    path: '/organization-trace/graphic',
    element: (
      <OrgTraceProvider>{withProtectedSuspense(<Graphic />)}</OrgTraceProvider>
    ),
    permission: 'WebNet.OrganizationTabs.Graphics',
  },
  {
    path: '/organization-trace/map',
    element: (
      <OrgTraceProvider>{withProtectedSuspense(<MapBox />)}</OrgTraceProvider>
    ),
    permission: 'WebNet.OrganizationTabs.PlantGeoMap',
  },
  {
    path: '/organization-trace/map/:provinceId',
    element: (
      <OrgTraceProvider>{withProtectedSuspense(<ProvinceInfoMap />)}</OrgTraceProvider>
    ),
    permission: 'WebNet.OrganizationTabs.PlantGeoMap',
  },
  {
    path: '/organization-trace/alarms',
    element: (
      <OrgTraceProvider>
        {withProtectedSuspense(<AlarmsPage />)}
      </OrgTraceProvider>
    ),
    permission: 'WebNet.Alarms',
  },
];
