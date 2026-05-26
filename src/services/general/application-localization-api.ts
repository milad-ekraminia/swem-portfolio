import { getData } from '@/lib/api-method/api-method-functions';

const apiVersion = import.meta.env.VITE_API_VERSION;

export async function fetchApplicationLocalization({
  CultureName,
}: {
  CultureName: string;
}) {
  return await getData({
    endPoint: `abp/application-localization`,
    type: 'get',
    dataParams: {
      'api-version': apiVersion,
      CultureName: CultureName !== 'undefined' ? CultureName : 'fa',
      OnlyDynamics: false,
    },
    isHeaderJson: true,
  });
}

export async function fetchApplicationConfigurationApi() {
  return await getData({
    endPoint: `abp/application-configuration`,
    type: 'get',
    dataParams: {
      'api-version': apiVersion,
      IncludeLocalizationResources: false,
    },
  });
}
