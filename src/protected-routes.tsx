import { ReactNode, useEffect } from 'react';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useQueries } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import MainLayout from './components/layouts/page-layout/main-layout';
import { Loader } from './components/ui/loader/loader';
import { getCookie, setCookie } from './helpers/cookies';
import { fetchApplicationConfigurationApi, fetchApplicationLocalization } from './services/general/application-localization-api';


interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // const auth_token = getCookie('auth_token');
  const auth_token = 'test';
  const CultureName = getCookie('CultureName') ?? import.meta.env.VITE_CULTURE_NAME as string;

  const navigate = useNavigate();

  useEffect(() => {
    if (!auth_token) {
      const currentPath = window.location.pathname + window.location.search;
      localStorage.setItem('redirect_after_login', currentPath);
      toast(getTranslatedValue('UserNotLoggedIn'), {
        type: 'warning',
        autoClose: 3000,
      });
      navigate('/login', { replace: true });
    }
  }, [auth_token, navigate]);

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
  //     },
  //   ],
  // });

  // // Destructure results
  // const [applicationLocalizationResult, applicationConfigurationResult] =
  //   results;
  // const { data, isLoading } = applicationLocalizationResult;
  // const { data: applicationConfigurationData } = applicationConfigurationResult;

  // useEffect(() => {
  //   if (data) {
  //     setCookie('CultureName', data?.currentCulture?.name, 86400);
  //     localStorage.setItem(
  //       'application-localization',
  //       JSON.stringify(data?.resources),
  //     );
  //   }
  // }, [data, CultureName]);

  // // used for save user permission in localStorage
  // useEffect(() => {
  //   if (applicationConfigurationData?.auth?.grantedPolicies) {
  //     console.log('setItem');
  //     localStorage.setItem(
  //       'application-configuration',
  //       JSON.stringify(applicationConfigurationData?.auth?.grantedPolicies),
  //     );
  //   }
  // }, [applicationConfigurationData]);

  // if (isLoading) {
  //   return (
  //     <div style={{ width: '100%', height: '100vh' }}>
  //       <Loader />;
  //     </div>
  //   );
  // }

  return <MainLayout resources={{}}>{children}</MainLayout>;
};

export default ProtectedRoute;