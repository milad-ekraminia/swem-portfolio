import { ISort } from '@/types/components/ui/table';
import { getData } from '@/lib/api-method/api-method-functions';

const apiVersion = import.meta.env.VITE_API_VERSION;

export async function fetchDeviceInverterDefinition({
  tree_id,
}: {
  tree_id: number;
}) {
  const dataParams = {
    'api-version': apiVersion,
  };
  return await getData({
    endPoint: `app/devices/device-inverter-definition/${tree_id}`,
    type: 'get',
    dataParams,
  });
}

export async function fetchDeviceInverterInstantValue({
  tree_id,
  sortData,
}: {
  tree_id: number;
  sortData: ISort;
}) {
  const dataParams: any = {
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
    endPoint: `app/devices/device-inverter-instant-value/${tree_id}`,
    type: 'get',
    dataParams,
  });
}

export async function fetchInverterInstantValueLineChart({
  tree_id,
  selectedFilters,
}: {
  tree_id: number;
  selectedFilters: string[];
}) {
  const dataParams: any = {
    'api-version': apiVersion,
    // periodType: 2,
  };

  if (selectedFilters?.length > 0) {
    for (let i = 0; i < selectedFilters.length; i++) {
      dataParams[`SelectedFilters[${i}]`] =
        selectedFilters[i]?.charAt(0).toUpperCase() +
        selectedFilters[i]?.slice(1);
    }
  }

  return await getData({
    endPoint: `app/device-elec-inverter-instant-values/inverter-instant-value-chart/${tree_id}`,
    type: 'get',
    dataParams,
  });
}
