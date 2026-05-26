import { useEffect } from 'react';
import { getCookie } from '@/helpers/cookies';
import { englishLocalization } from '@/helpers/english-localization';
import { useQueries } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import {
  fetchApplicationConfigurationApi,
  fetchApplicationLocalization,
} from '@/services/general/application-localization-api';
import { LazyLoadErrorBoundary } from '@/components/lazy-load-error-boundary';

interface AppProps {
  router: any;
}

const App = ({ router }: AppProps) => {
  const CultureName =
    getCookie('CultureName') ?? (import.meta.env.VITE_CULTURE_NAME as string);
  const authToken = getCookie('auth_token');

  // const results = useQueries({
  //   queries: [
  //     {
  //       queryKey: ['application-localization', CultureName],
  //       queryFn: () => fetchApplicationLocalization({ CultureName }),
  //       retry: false,
  //       enabled: !!CultureName,
  //     },
  //     {
  //       queryKey: ['application-configuration'],
  //       queryFn: () => fetchApplicationConfigurationApi(),
  //       retry: false,
  //       enabled: !!authToken,
  //     },
  //   ],
  // });

  // // Destructure results
  // const [applicationLocalizationResult, applicationConfigurationResult] =
  //   results;
  // const { data, isLoading } = applicationLocalizationResult;
  // const { data: applicationConfigurationData } = applicationConfigurationResult;

  // // used for save user permission in localStorage
  // useEffect(() => {
  //   if (applicationConfigurationData?.auth?.grantedPolicies) {
  //     const existingConfig = localStorage.getItem('application-configuration');

  //     localStorage.setItem(
  //       'application-configuration',
  //       JSON.stringify(applicationConfigurationData?.auth?.grantedPolicies),
  //     );

  //     // If configuration was just set for the first time after login, reload to apply permissions
  //     if (!existingConfig && authToken) {
  //       window.location.reload();
  //     }
  //   }
  // }, [applicationConfigurationData, authToken]);

  // // Refresh page if auth_token exists but applicationConfigurationData doesn't
  // useEffect(() => {
  //   if (
  //     authToken &&
  //     !applicationConfigurationResult.isLoading &&
  //     !applicationConfigurationData
  //   ) {
  //     window.location.reload();
  //   }
  // }, [
  //   authToken,
  //   applicationConfigurationData,
  //   applicationConfigurationResult.isLoading,
  // ]);

  // if (isLoading) {
  //   return (
  //     <div className="dv-center-loader">
  //       <Loader />
  //     </div>
  //   );
  // }

  return (
    <LazyLoadErrorBoundary>
      <RouterProvider router={router} />
    </LazyLoadErrorBoundary>
  );
};

export default App;
