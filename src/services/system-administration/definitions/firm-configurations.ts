import {
  getData,
  getFormDataPost,
} from '@/lib/api-method/api-method-functions';

const apiVersion = import.meta.env.VITE_API_VERSION;

export interface DataRefreshRate {
  name: string;
  value: number;
}

export async function fetchFirmConfigurationsList() {
  return await getData({
    endPoint: `app/system-configurations/firm-configurations?api-version=${apiVersion}`,
    type: 'get',
  });
}

export async function fetchMimicDiagramLookupList() {
  return await getData({
    endPoint: `app/system-configurations/mimic-diagram-lookup?SkipCount=0&MaxResultCount=1000&api-version=${apiVersion}`,
    type: 'get',
  });
}

export async function fetchOrganizationUserRolesLookupList() {
  return await getData({
    endPoint: `app/organizations/user-roles-lookup?api-version=${apiVersion}`,
    type: 'get',
  });
}

export async function saveFirmConfiguration({ formData }: { formData: any }) {
  const response = await getFormDataPost({
    endPoint: `app/system-configurations/firm-configurations?api-version=${apiVersion}`,
    formData,
    type: 'put',
  });

  return { response, formData };
}

export async function fetchDataRefreshRates(): Promise<DataRefreshRate[]> {
  return await getData({
    endPoint: `app/system-configurations/data-refresh-rate?api-version=${apiVersion}`,
    type: 'get',
  });
}
