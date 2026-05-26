import { LazyLoadErrorBoundary } from '@/components/lazy-load-error-boundary';
import { Loader } from '@/components/ui/loader/loader';
import ProtectedRoute from '@/protected-routes';
import { ReactNode, Suspense } from 'react';

export const withSuspense = (children: ReactNode) => (
  <LazyLoadErrorBoundary>
    <>{children}</>
  </LazyLoadErrorBoundary>
);

export const withProtectedSuspense = (children: ReactNode) => (
  <LazyLoadErrorBoundary>
    <ProtectedRoute>
      <Suspense fallback={<Loader isFallBack={true} />}>{children}</Suspense>
    </ProtectedRoute>
  </LazyLoadErrorBoundary>
);
