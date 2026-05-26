import { dataParamsProps } from '@/types/api-methods';
import { ISort } from '@/types/components/ui/table';
import {
  getData,
  getFormDataPost,
} from '@/lib/api-method/api-method-functions';

const apiVersion = import.meta.env.VITE_API_VERSION;

export async function getRolesList({
  skipCount,
  filterText,
  sorting,
  pageSize = 10,
}: {
  skipCount: number;
  filterText: string;
  sorting: ISort;
  pageSize?: number;
}) {
  const dataParams: dataParamsProps & {
    ExtraProperties: string;
    filter?: string;
  } = {
    'api-version': apiVersion,
    maxResultCount: pageSize,
    skipCount,
    filter: filterText,
    ExtraProperties: 'Volo.Abp.Data.ExtraPropertyDictionary',
  };

  if (sorting?.length > 0) {
    dataParams.sorting = sorting
      .map(({ sortName, direction }) =>
        direction === 'desc' ? `${sortName} DESC` : `${sortName}`,
      )
      .join(',');
  }

  if (!filterText) {
    delete dataParams.filter;
  }

  return await getData({
    endPoint: `identity/roles`,
    type: 'get',
    dataParams: dataParams,
  });
}

export async function createNewRole(formData: any) {
  return await getFormDataPost({
    endPoint: `identity/roles?api-version=${apiVersion}`,
    formData,
    type: 'post',
  });
}

export async function updateRole({
  formData,
  roleId,
}: {
  formData: any;
  roleId: string;
}) {
  return await getFormDataPost({
    endPoint: `identity/roles/${roleId}?api-version=${apiVersion}`,
    formData,
    type: 'put',
  });
}

// RolePermissions

export async function getRolePermissions({
  providerKey,
}: {
  providerKey: string;
}) {
  return await getData({
    endPoint: `permission-management/permissions`,
    dataParams: {
      providerName: 'R',
      providerKey,
      'api-version': apiVersion,
    },
    type: 'get',
  });
}

export async function updateRolePermissions({
  formData,
  providerKey,
}: {
  formData: any;
  providerKey: string;
}) {
  return await getFormDataPost({
    endPoint: `permission-management/permissions?providerName=R&providerKey=${providerKey}&api-version=${apiVersion}`,
    formData,
    type: 'put',
  });
}

// RoleInfo
export async function getRoleInfo(id: string) {
  return await getData({
    endPoint: `identity/roles/${id}`,
    dataParams: {
      'api-version': apiVersion,
    },
    type: 'get',
  });
}

export async function getAllRolesList() {
  return await getData({
    endPoint: `identity/roles/all`,
    dataParams: {
      'api-version': apiVersion,
    },
    type: 'get',
  });
}

// Move Users
export async function moveAllUsersInRole({ roleId }: { roleId: string }) {
  return await getFormDataPost({
    endPoint: `identity/roles/${roleId}/move-all-users?api-version=${apiVersion}`,
    formData: {},
    type: 'put',
  });
}

export async function moveAllUsersIntoAnotherRole({
  currentRoleId,
  roleId,
}: {
  currentRoleId: string;
  roleId: string;
}) {
  return await getFormDataPost({
    endPoint: `identity/roles/${currentRoleId}/move-all-users?api-version=${apiVersion}&roleId=${roleId}`,
    formData: {},
    type: 'put',
  });
}
