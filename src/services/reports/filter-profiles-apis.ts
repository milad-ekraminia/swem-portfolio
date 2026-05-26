import {
  getData,
  getFormDataPost,
} from '@/lib/api-method/api-method-functions';

type dataParamsProps = {
  'api-version': string;
  maxResultCount: number;
  skipCount: number;
  filter?: string;
};

const apiVersion = import.meta.env.VITE_API_VERSION;
const defaultDataParams: dataParamsProps = {
  'api-version': apiVersion,
  maxResultCount: 1000,
  skipCount: 0,
};

export async function fetchAllFilterProfiles({ filter }: { filter: string }) {
  const dataParams: dataParamsProps = {
    ...defaultDataParams,
    filter,
  };

  return await getData({
    endPoint: `app/filter-profiles/filter-profile-by-report-type`,
    type: 'get',
    dataParams: dataParams,
  });
}
export async function fetchAllFilterProfilesTrendAnalyse() {
  const dataParams = {
    ...defaultDataParams,
    Filter: 'trend-analysis',
  };

  return await getData({
    endPoint: `app/filter-profiles/filter-profile-by-report-type`,
    type: 'get',
    dataParams: dataParams,
  });
}

export async function createNewFilterProfile(formData: any) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { profileId, ...remainingData } = formData;
  return await getFormDataPost({
    endPoint: `app/filter-profiles/with-fields?api-version=${apiVersion}`,
    formData: remainingData,
    type: 'post',
  });
}

export async function updateFilterProfile(formData: any) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { profileName, reportType, ...remainingData } = formData;
  return await getFormDataPost({
    endPoint: `app/filter-profiles/profile-fields?api-version=${apiVersion}`,
    formData: remainingData,
    type: 'put',
  });
}
export async function updateFilterProfileTrendAnalyse(formData: any) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { profileName, reportType, ...remainingData } = formData;
  return await getFormDataPost({
    endPoint: `app/filter-profiles/${formData?.id}/trend-analysis-profile-with-fields?api-version=${apiVersion}`,
    formData: remainingData,
    type: 'put',
  });
}

export async function fetchFilterProfileFieldValues({
  filter_profile_id,
}: {
  filter_profile_id: string;
}) {
  return await getData({
    endPoint: `app/filter-profiles/${filter_profile_id}/filter-profile-fields-by-profile-id?api-version=${apiVersion}`,
    type: 'get',
    dataParams: {},
  });
}
