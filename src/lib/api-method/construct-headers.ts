import { getCookie } from '@/helpers/cookies';
import { Headers } from '@/types/api-methods';

const TENANT = import.meta.env.VITE_API_TENANT;

export const constructHeaders = (
  token: string | null | undefined,
  isHeaderJson?: boolean,
  hasTenant?: boolean,
  hasExcel?: boolean,
): { headers: Headers } => {
  const currentLanguage =
    getCookie('CultureName') ?? (import.meta.env.VITE_CULTURE_NAME as string);

  const headers: Headers = {
    'Access-Control-Allow-Origin': '*/*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Accept-Language': currentLanguage,
  };

  if (hasExcel) {
    headers['__tenant'] = TENANT;
    headers['Accept'] =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    headers['Content-Type'] = 'application/json';
  }

  if (hasTenant) {
    headers['__tenant'] = TENANT;
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (isHeaderJson) {
    headers['Content-Type'] = 'application/x-www-form-urlencoded;';
    headers['Accept'] = '*/*';
    headers['Access-Control-Allow-Credentials'] = 'true';
  }

  return { headers };
};
