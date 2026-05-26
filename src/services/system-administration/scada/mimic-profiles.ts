import { ISort } from '@/types/components/ui/table';
import { MimicProfileFormData } from '@/types/pages/system-administration/scada/mimic-profiles';
import {
  getData,
  getFormDataPost,
} from '@/lib/api-method/api-method-functions';

const apiVersion = import.meta.env.VITE_API_VERSION;

export async function fetchAllMimicProfiles({
  filterText,
  skipCount,
  maxResultCount,
  sorting,
}: {
  filterText?: string;
  skipCount: number;
  maxResultCount: number;
  sorting: ISort;
}) {
  const dataParams: any = {
    'api-version': apiVersion,
    filterText,
    maxResultCount,
    skipCount,
  };

  if (sorting?.length > 0) {
    dataParams.sorting = sorting
      .map((sortOption) => {
        let sort = '';
        sort += sortOption.sortName;
        if (sortOption.direction === 'desc') sort += ` DESC`;
        return sort;
      })
      .join(',');
  }

  if (!filterText) delete dataParams.filterText;

  return await getData({
    endPoint: `app/mimic-profile`,
    type: 'get',
    dataParams: dataParams,
  });
}

export async function fetchAllMimicDiagrams() {
  return await getData({
    endPoint: `app/mimic-diagrams/list`,
    type: 'get',
    dataParams: { 'api-version': apiVersion },
  });
}

export async function createNewMimicProfile(formData: any) {
  return await getFormDataPost({
    endPoint: `app/mimic-profile?api-version=${apiVersion}`,
    formData,
    type: 'post',
  });
}

export async function updateMimicProfile({
  formData,
  id,
}: {
  formData: MimicProfileFormData;
  id: number;
}) {
  return await getFormDataPost({
    endPoint: `app/mimic-profile/${id}?api-version=${apiVersion}`,
    formData,
    type: 'put',
  });
}
