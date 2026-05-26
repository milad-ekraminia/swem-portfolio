import { dataParamsProps } from '@/types/api-methods';
import { ISort } from '@/types/components/ui/table';
import {
  getData,
  getFormDataPost,
} from '@/lib/api-method/api-method-functions';

const apiVersion = import.meta.env.VITE_API_VERSION;

export async function getAssignableRolesList() {
  const dataParams: any = {
    'api-version': apiVersion,
  };

  return await getData({
    endPoint: `identity/users/assignable-roles`,
    type: 'get',
    dataParams: dataParams,
  });
}

export async function getUsersList({
  skipCount,
  filter,
  sorting,
  pageSize = 10,
  filterValues,
}: {
  skipCount: number;
  filter: string;
  sorting: ISort;
  pageSize?: number;
  filterValues: any;
}) {
  let dataParams: dataParamsProps & {
    ExtraProperties: string;
    filter?: string;
  } = {
    'api-version': apiVersion,
    maxResultCount: pageSize,
    skipCount,
    filter,
    ExtraProperties: 'Volo.Abp.Data.ExtraPropertyDictionary',
  };

  if (Object.keys(filterValues)?.length > 0) {
    dataParams = {
      ...dataParams,
      ...filterValues,
    };
  }

  if (sorting?.length > 0) {
    dataParams.sorting = sorting
      .map(({ sortName, direction }) =>
        direction === 'desc' ? `${sortName} DESC` : `${sortName}`,
      )
      .join(',');
  }

  if (!filter) {
    delete dataParams.filter;
  }

  return await getData({
    endPoint: `identity/users`,
    type: 'get',
    dataParams: dataParams,
  });
}

export async function getExternalLoginProviders() {
  const dataParams: any = {
    'api-version': apiVersion,
  };

  return await getData({
    endPoint: `identity/users/external-login-Providers`,
    type: 'get',
    dataParams: dataParams,
  });
}

export async function getAvailableOrganizationUnits() {
  const dataParams: any = {
    'api-version': apiVersion,
  };

  return await getData({
    endPoint: `identity/users/available-organization-units`,
    type: 'get',
    dataParams: dataParams,
  });
}

export async function getUserOrganizationProfileLookup() {
  return await getData({
    endPoint: `app/user-organization-profiles/user-organization-profile-lookup`,
    type: 'get',
  });
}

export async function getMimicProfilesLookup() {
  return await getData({
    endPoint: `app/mimic-profile/mimic-profiles-lookup`,
    type: 'get',
  });
}

export async function getOrganizationLookup() {
  return await getData({
    endPoint: `app/organizations/organizations-lookup`,
    type: 'get',
  });
}

export async function createNewUser(formData: any) {
  return await getFormDataPost({
    endPoint: `identity/users?api-version=${apiVersion}`,
    formData,
    type: 'post',
  });
}

export async function getUserUnits(id: string) {
  return await getData({
    endPoint: `identity/users/${id}/organization-units?api-version=${apiVersion}`,
    type: 'get',
  });
}

export async function updateUser({
  formData,
  userId,
}: {
  formData: any;
  userId: string;
}) {
  return await getFormDataPost({
    endPoint: `identity/users/${userId}?api-version=${apiVersion}`,
    formData,
    type: 'put',
  });
}

export async function getUserInfo(id: string) {
  return await getData({
    endPoint: `identity/users/by-id/${id}?api-version=${apiVersion}`,
    type: 'get',
  });
}

// Lock and unlock user

export async function updateLock({
  date,
  userId,
}: {
  date: string;
  userId: string;
}) {
  return await getFormDataPost({
    endPoint: `identity/users/${userId}/lock/${date}?api-version=${apiVersion}`,
    formData: {},
    type: 'put',
  });
}

export async function updateUnLock(userId: string) {
  return await getFormDataPost({
    endPoint: `identity/users/${userId}/unlock/?api-version=${apiVersion}`,
    formData: {},
    type: 'put',
  });
}

// permission

export async function getUserPermission(id: string) {
  return await getData({
    endPoint: `permission-management/permissions`,
    dataParams: {
      'api-version': apiVersion,
      providerName: 'U',
      providerKey: id,
    },
    type: 'get',
  });
}

export async function updateUserPermission({
  userId,
  formData,
}: {
  userId: string;
  formData: { name: string; isGranted: boolean }[];
}) {
  return await getFormDataPost({
    endPoint: `permission-management/permissions?providerName=U&providerKey=${userId}&api-version=${apiVersion}`,
    formData: {
      permissions: formData,
    },
    type: 'put',
  });
}

// password
export async function setUserPasswordApi({
  userId,
  password,
}: {
  userId: string;
  password: string;
}) {
  return await getFormDataPost({
    endPoint: `identity/users/${userId}/change-password/?api-version=${apiVersion}`,
    formData: {
      newPassword: password,
    },
    type: 'put',
  });
}

// two factor
export async function setTwoFactorApi({
  userId,
  status,
}: {
  userId: string;
  status: boolean;
}) {
  return await getFormDataPost({
    endPoint: `identity/users/${userId}/two-factor/${status ? 'True' : 'false'}?api-version=${apiVersion}`,
    formData: {},
    type: 'put',
  });
}

// sessions
export async function getSessions({
  userId,
  skipCount = 0,
}: {
  userId: string;
  skipCount: number;
}) {
  return await getData({
    endPoint: `identity/sessions`,
    dataParams: {
      'api-version': apiVersion,
      UserId: userId,
      maxResultCount: 10,
      skipCount,
      ExtraProperties: 'Volo.Abp.Data.ExtraPropertyDictionary',
    },
    type: 'get',
  });
}

// import files
export async function importUsersFile({
  File,
  fileType = 'Excel',
}: {
  File: File;
  fileType: string;
}) {
  const formData = new FormData();
  formData.append('File', File);
  return await getFormDataPost({
    endPoint: `identity/users/import-users-from-file?FileType=${fileType}&api-version=${apiVersion}`,
    formData,
    type: 'post',
    // hasExcel: true,
  });
}

// claim

export async function getAllClaimTypes() {
  return await getData({
    endPoint: `identity/users/all-claim-types?api-version=${apiVersion}`,
    type: 'get',
  });
}

export async function getUserClaim(id: string) {
  return await getData({
    endPoint: `identity/users/${id}/claims?api-version=${apiVersion}`,
    type: 'get',
  });
}

export async function updateUserClaim({
  userId,
  dataParams,
}: {
  dataParams: any;
  userId: string;
}) {
  return await getFormDataPost({
    endPoint: `identity/users/${userId}/claims?api-version=${apiVersion}`,
    formData: dataParams,
    type: 'put',
  });
}
