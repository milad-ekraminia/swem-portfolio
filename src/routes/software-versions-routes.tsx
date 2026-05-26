import { lazyImport } from './helper/lazyImport';
import { withProtectedSuspense } from './suspense-helper';

const SoftwareVersions = lazyImport(
  () => import('@/pages/software-versions/index'),
);

export const softwareRoutes: any[] = [
  {
    path: '/software-versions',
    element: withProtectedSuspense(<SoftwareVersions />),
    permission: 'WebNet.ECentralVersions',
  },
];
