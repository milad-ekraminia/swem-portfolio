import { dataParamsProps } from '@/types/api-methods';
import { ISort } from '@/types/components/ui/table';
import {
  getData,
  getFormDataPost,
} from '@/lib/api-method/api-method-functions';

const apiVersion = import.meta.env.VITE_API_VERSION;

export async function getOrganizationLookUp() {
  const dataParams: dataParamsProps = {
    'api-version': apiVersion,
    maxResultCount: 1000,
    skipCount: 0,
  };

  return await getData({
    endPoint: `app/user-organization-profile-details/organization-lookup`,
    type: 'get',
    dataParams: dataParams,
  });
}
export async function getUserOrganizationList({
  skipCount = 0,
  filterText = '',
  sorting = [],
  maxResultCount = 10,
}: {
  skipCount?: number;
  filterText?: string;
  sorting?: ISort;
  maxResultCount?: number;
}) {
  const dataParams: dataParamsProps = {
    'api-version': apiVersion,
    maxResultCount: maxResultCount,
    skipCount,
    filterText: filterText,
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
    endPoint: `app/user-organization-profiles`,
    type: 'get',
    dataParams: dataParams,
  });
}
export async function getUserOrganizationProfileDetails({
  skipCount = 0,
  sorting = [],
  maxResultCount = 10,
  id,
}: {
  skipCount?: number;
  filterText?: string;
  sorting?: ISort;
  maxResultCount?: number;
  id: number;
  filterValues?: any;
}) {
  const dataParams: dataParamsProps & { UserOrganizationProfileId: any } = {
    'api-version': apiVersion,
    maxResultCount: maxResultCount,
    skipCount,
    UserOrganizationProfileId: id,
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
    endPoint: `app/user-organization-profile-details/detailed/by-user-organization-profile`,
    type: 'get',
    dataParams: dataParams,
  });
}
export async function createUserOrganizationProfile(formData: any) {
  return await getFormDataPost({
    endPoint: `app/user-organization-profiles?api-version=${apiVersion}`,
    formData,
    type: 'post',
  });
}

export async function editUserOrganizationProfile({ formData, userId }: any) {
  return await getFormDataPost({
    endPoint: `app/user-organization-profiles/${userId}?api-version=${apiVersion}`,
    formData,
    type: 'put',
  });
}
export async function deleteMultiUserOrganizationProfile({ dataParams }: any) {
  return await getData({
    endPoint: `app/user-organization-profiles?api-version=${apiVersion}&${dataParams}`,
    dataParams: {},
    type: 'delete',
  });
}
export async function createUserOrganizationProfileDetail(formData: any) {
  return await getFormDataPost({
    endPoint: `app/user-organization-profile-details?api-version=${apiVersion}`,
    formData,
    type: 'post',
  });
}
export async function editUserOrganizationProfileDetail({
  formData,
  userOrganizationProfileId,
}: any) {
  return await getFormDataPost({
    endPoint: `app/user-organization-profile-details/${userOrganizationProfileId}?api-version=${apiVersion}`,
    formData,
    type: 'put',
  });
}
