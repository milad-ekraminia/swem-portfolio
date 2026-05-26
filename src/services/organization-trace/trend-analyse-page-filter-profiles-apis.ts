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

export async function createNewFilterProfileTrendAnalyse(formData: any) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { profileId, ...remainingData } = formData;
  return await getFormDataPost({
    endPoint: `app/filter-profiles/trend-analysis-profile-with-fields?api-version=${import.meta.env.VITE_API_VERSION}`,
    formData: remainingData,
    type: 'post',
  });
}
