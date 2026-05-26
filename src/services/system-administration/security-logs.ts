import { dataParamsProps } from '@/types/api-methods';
import { ISort } from '@/types/components/ui/table';
import { getData } from '@/lib/api-method/api-method-functions';

const apiVersion = import.meta.env.VITE_API_VERSION;

export async function getSecurityLogsList({
  skipCount = 0,
  sorting = [],
  filterValues,
  maxResultCount = 10,
}: {
  skipCount?: number;
  sorting?: ISort;
  filterValues?: any;
  maxResultCount?: number;
}) {
  let dataParams: dataParamsProps & {
    ExtraProperties: string;
    filter?: string;
  } = {
    'api-version': apiVersion,
    maxResultCount,
    skipCount,
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

  return await getData({
    endPoint: `identity/security-logs`,
    type: 'get',
    dataParams: dataParams,
  });
}
