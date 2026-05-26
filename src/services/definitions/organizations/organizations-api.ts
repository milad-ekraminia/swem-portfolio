import { ISort } from '@/types/components/ui/table';
import { organizationsDataParamsProps } from '@/types/pages/definitions/organizations.type';
import {
  getData,
  getFormDataPost,
} from '@/lib/api-method/api-method-functions';

const apiVersion = import.meta.env.VITE_API_VERSION;
const defaultDataParams = {
  'api-version': apiVersion,
  maxResultCount: 10,
};

export async function fetchOrganizationId() {
  const dataParams = defaultDataParams;
  return await getData({
    endPoint: `app/web-net-identity-user/app-user-organization-id`,
    type: 'get',
    dataParams,
  });
}

export async function fetchSubOrganizations({
  OrganizationParentId,
  skipCount,
  sorting,
}: {
  OrganizationParentId: number;
  skipCount: number;
  sorting: ISort;
}) {
  const dataParams: organizationsDataParamsProps = {
    OrganizationParentId,
    ...defaultDataParams,
    skipCount,
  };

  // Sorting and search should be added after filter mode because of the filter mode logic reset all data
  if (sorting?.length > 0) {
    dataParams.sorting = sorting
      .map(({ sortName, direction }) =>
        direction === 'desc' ? `${sortName} DESC` : `${sortName}`,
      )
      .join(',');
  }

  return await getData({
    endPoint: `app/organizations`,
    type: 'get',
    dataParams: dataParams,
  });
}

export async function fetchOneOrganization({
  initialOrgId,
}: {
  initialOrgId: number;
}) {
  const dataParams = defaultDataParams;

  return await getData({
    endPoint: `app/organizations/${initialOrgId}`,
    type: 'get',
    dataParams: dataParams,
  });
}

export async function fetchSearchedOrganizations({
  OrganizationParentId,
  skipCount,
  sorting,
  filterText,
}: {
  OrganizationParentId: number;
  skipCount: number;
  sorting: ISort;
  filterText: string;
}) {
  const dataParams: organizationsDataParamsProps = {
    OrganizationParentId,
    ...defaultDataParams,
    skipCount,
  };
  if (filterText) {
    dataParams.filterText = filterText;
  }

  if (sorting?.length > 0) {
    dataParams.sorting = sorting
      .map(({ sortName, direction }) =>
        direction === 'desc' ? `${sortName} DESC` : `${sortName}`,
      )
      .join(',');
  }

  return await getData({
    endPoint: `app/organizations/filtered-ogranizations`,
    type: 'get',
    dataParams: dataParams,
  });
}

// FETCH LOCATION NAMES FOR ORGANIZATION
export async function fetchLocationNamesList() {
  const dataParams = defaultDataParams;
  return await getData({
    endPoint: `app/system-weather-data-location-oWMS/tfn-tenant-weather-city-own`,
    type: 'get',
    dataParams,
  });
}

export async function fetchPlantSensorDeviceLookup(orgId: number) {
  const dataParams = defaultDataParams;
  return await getData({
    endPoint: `app/devices/organization-plant-sensor-device-lookup/${orgId}`,
    type: 'get',
    dataParams,
  });
}

export async function fetchPlantDevicesLookup(orgId: number) {
  const dataParams = defaultDataParams;
  return await getData({
    endPoint: `app/devices/organization-plant-devices-lookup/${orgId}`,
    type: 'get',
    dataParams,
  });
}

export async function fetchParentRmsaStationLookup() {
  const dataParams = defaultDataParams;
  return await getData({
    endPoint: `app/organizations/organization-station-parent-rmsa-stationn-lookup`,
    type: 'get',
    dataParams,
  });
}

export async function fetchMimicDiagramLookup(orgId: number) {
  const dataParams = defaultDataParams;
  return await getData({
    endPoint: `app/mimic-diagrams/organization-mimic-diagram-lookup/${orgId}`,
    type: 'get',
    dataParams,
  });
}

export async function fetchEditOrgPlantDetailLookup(orgId: number) {
  const dataParams = defaultDataParams;
  return await getData({
    endPoint: `app/organizations/organization-plant-details/${orgId}`,
    type: 'get',
    dataParams,
  });
}

export async function createNewOrganization(formData: any) {
  return await getFormDataPost({
    endPoint: `app/organizations?api-version=${apiVersion}`,
    formData,
    type: 'post',
  });
}
export async function updateOrganization(formData: any) {
  const { orgId, ...remainingData } = formData;
  return await getFormDataPost({
    endPoint: `app/organizations/${orgId}?api-version=${apiVersion}`,
    formData: remainingData,
    type: 'put',
  });
}
