import { RouteObject } from 'react-router-dom';
import { lazyImport } from './helper/lazyImport';
import { withSuspense } from './suspense-helper';

const Login = lazyImport(() => import('@/pages/login'));

export const authRoutes: RouteObject[] = [
  {
    path: '/login',
    element: withSuspense(<Login />),
  },
];
