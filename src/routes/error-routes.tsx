import { RouteObject } from 'react-router-dom';
import { lazyImport } from './helper/lazyImport';
import { withSuspense } from './suspense-helper';

const ErrorPage = lazyImport(() => import('@/pages/error'));

export const errorRoutes: RouteObject[] = [
  {
    path: '/error/:status',
    element: withSuspense(<ErrorPage />),
  },
];
