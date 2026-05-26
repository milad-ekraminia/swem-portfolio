import { Navigate, RouteObject } from 'react-router-dom';
import { PermissionWrapper } from '@/components/permission-wrapper';
import { authRoutes } from './auth-routes';
// import { definitionRoutes } from './definition-routes';
import { errorRoutes } from './error-routes';
import { lazyImport } from './helper/lazyImport';
// import { inventoryRoutes } from './inventory-routes';
import { organizationTraceRoutes } from './organization-trace-routes';
import { withSuspense } from './suspense-helper';

// import { systemAdministrationRoutes } from './system-administration-routes';

const NotFound = lazyImport(() => import('@/pages/404'));

const routes: RouteObject[] = [
  ...authRoutes,
  // ...inventoryRoutes,
  // ...systemAdministrationRoutes,
  // ...definitionRoutes,
  ...organizationTraceRoutes,
  ...errorRoutes,
  { path: '*', element: withSuspense(<NotFound />) },
  { path: '/', element: <Navigate to="/login" replace /> },
].map((item) => ({
  ...item,
  element: <PermissionWrapper>{item.element}</PermissionWrapper>,
}));

export default routes;
