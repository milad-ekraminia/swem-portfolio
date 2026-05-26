import { ISort } from '@/types/components/ui/table';
import { getData } from '@/lib/api-method/api-method-functions';

type dataParamsProps = {
  'api-version': string;
  maxResultCount: number;
  OrganizationId?: number;
  skipCount: number;
  sorting?: string;
  filterText?: string;
};

const apiVersion = import.meta.env.VITE_API_VERSION;
const defaultDataParams: dataParamsProps = {
  'api-version': apiVersion,
  maxResultCount: 1000,
  skipCount: 0,
};

export async function fetchGetGesLookup() {
  return await getData({
    endPoint: `app/alarm-configurations/g-eSLookup`,
    type: 'get',
    dataParams: defaultDataParams,
  });
}

export async function fetchGetTagReports({
  id,
  sorting,
  filterText,
  skipCount,
  maxResultCount,
}: {
  id: number;
  sorting: ISort;
  filterText: string;
  skipCount: number;
  maxResultCount: number;
}) {
  const dataParams: dataParamsProps = {
    OrganizationId: id,
    'api-version': apiVersion,
    maxResultCount,
    skipCount,
    filterText,
  };

  if (sorting.length) {
    dataParams.sorting = sorting
      .map(({ sortName, direction }) =>
        direction === 'desc' ? `${sortName} DESC` : sortName,
      )
      .join(',');
  }

  if (!filterText) {
    delete dataParams.filterText;
  }

  return await getData({
    endPoint: `app/labels/tag-reports`,
    type: 'get',
    dataParams,
  });
}
