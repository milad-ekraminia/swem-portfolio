import { dataParamsProps } from '@/types/api-methods';
import { ISort } from '@/types/components/ui/table';
import { getData } from '@/lib/api-method/api-method-functions';

const apiVersion = import.meta.env.VITE_API_VERSION;

export async function fetchProductsList({
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
  const dataParams: dataParamsProps = {
    'api-version': apiVersion,
    maxResultCount: pageSize,
    skipCount,
    filterText,
  };

  if (sorting?.length > 0) {
    dataParams.sorting = sorting
      .map(({ sortName, direction }) =>
        direction === 'desc' ? `${sortName} DESC` : `${sortName}`,
      )
      .join(',');
  }

  if (!filterText) {
    delete dataParams.filterText;
  }

  return await getData({
    endPoint: `app/products`,
    type: 'get',
    dataParams,
  });
}
