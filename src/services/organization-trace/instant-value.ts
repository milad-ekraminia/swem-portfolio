import { ISort } from '@/types/components/ui/table';
import { getData } from '@/lib/api-method/api-method-functions';

const apiVersion = import.meta.env.VITE_API_VERSION;

export async function fetchDeviceInstantValue({
  tree_id,
  sortData,
}: {
  tree_id: number;
  sortData: ISort;
}) {
  const dataParams: any = {
    sorting: '',
    'api-version': apiVersion,
  };

  if (sortData?.length > 0) {
    dataParams.sorting = sortData
      .map(({ sortName, direction }) =>
        direction === 'desc' ? `${sortName} DESC` : `${sortName}`,
      )
      .join(',');
  }

  return await getData({
    endPoint: `app/devices/device-instant-value/${tree_id}`,
    type: 'get',
    dataParams,
  });
}

export async function fetchInstantValueLineChart({
  tree_id,
  selectedFilters,
}: {
  tree_id: number;
  selectedFilters: string[];
}) {
  const dataParams: any = {
    'api-version': apiVersion,
  };

  if (selectedFilters?.length > 0) {
    for (let i = 0; i < selectedFilters.length; i++) {
      dataParams[`SelectedFilters[${i}]`] =
        selectedFilters[i]?.charAt(0).toUpperCase() +
        selectedFilters[i]?.slice(1);
    }
  }

  return await getData({
    endPoint: `app/device-elec-instant-values/instant-value-chart/${tree_id}`,
    type: 'get',
    dataParams,
  });
}
