import { getData } from '@/lib/api-method/api-method-functions';

const apiVersion = import.meta.env.VITE_API_VERSION;

export async function fetchIntegerConfigurationNg() {
  const dataParams = {
    'api-version': apiVersion,
    configurationKey: 'ng_ms_using',
  };
  return await getData({
    endPoint: `app/system-configurations/integer-configuration-for-tenant`,
    type: 'get',
    dataParams,
  });
}

export async function fetchIntegerConfigurationRe() {
  const dataParams = {
    'api-version': apiVersion,
    configurationKey: 're_ms_using',
  };
  return await getData({
    endPoint: `app/system-configurations/integer-configuration-for-tenant`,
    type: 'get',
    dataParams,
  });
}
