import { StrictMode } from 'react';
import App from '@/app.tsx';
import { QueryClientProvider } from '@tanstack/react-query';
import i18next from 'i18next';
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { createBrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './assets/styles/app.scss';
import './assets/styles/pages.scss';
import './index.scss';
import { getCookie } from '@/helpers/cookies';
import { englishLocalization } from '@/helpers/english-localization';
import { queryClient } from './lib/react-query.ts';
import { ReduxStoreProvider } from './providers/redux-store-provider.tsx';
import routes from './routes/index.tsx';

const router = createBrowserRouter(routes, {
  basename: '/',
});

const CultureName =
  getCookie('CultureName') ?? (import.meta.env.VITE_CULTURE_NAME as string);
if (globalThis.window !== undefined && CultureName?.startsWith('en')) {
  const existing = localStorage.getItem('application-localization');
  const currentLocalization =
    existing && existing !== 'undefined' ? JSON.parse(existing) : {};

  const mergedLocalization = {
    ...currentLocalization,
    WebNet: currentLocalization.WebNet
      ? { ...currentLocalization.WebNet, ...englishLocalization.WebNet }
      : { ...englishLocalization.WebNet },
    AbpUi: currentLocalization.AbpUi
      ? { ...currentLocalization.AbpUi, ...englishLocalization.AbpUi }
      : { ...englishLocalization.AbpUi },
  };

  localStorage.setItem(
    'application-localization',
    JSON.stringify(mergedLocalization),
  );
  document.dir = 'ltr';
  document.documentElement.lang = CultureName;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReduxStoreProvider>
        <I18nextProvider i18n={i18next}>
          <App router={router} />
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </I18nextProvider>
      </ReduxStoreProvider>
    </QueryClientProvider>
  </StrictMode>,
);
