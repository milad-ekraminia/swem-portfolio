import { ISort } from '@/types/components/ui/table';
import { getData } from '@/lib/api-method/api-method-functions';

const apiVersion = import.meta.env.VITE_API_VERSION;

type dataParamsProps = {
  'api-version': number;
  sorting?: string;
};

export async function fetchDeviceIndexValueList({
  tree_id,
  sortData,
}: {
  tree_id: number;
  sortData: ISort;
}) {
  const dataParams: dataParamsProps = {
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
    endPoint: `app/devices/device-index-value-list/${tree_id}`,
    type: 'get',
    dataParams,
  });
}

export async function fetchInverterIndexValueLineChart({
  tree_id,
}: {
  tree_id: number;
}) {
  const dataParams: dataParamsProps = {
    'api-version': apiVersion,
  };

  return await getData({
    endPoint: `app/device-elec-hourly-consumptions/inverter-index-value-chart/${tree_id}`,
    type: 'get',
    dataParams,
  });
}

export async function fetchInverterIndexValueMonthlyLineChart({
  tree_id,
}: {
  tree_id: number;
}) {
  const dataParams: dataParamsProps = {
    'api-version': apiVersion,
  };

  return await getData({
    endPoint: `app/device-elec-hourly-consumptions/inverter-index-value-monthly-chart/${tree_id}`,
    type: 'get',
    dataParams,
  });
}

export async function fetchInverterIndexValueHeatmapChart({
  tree_id,
}: {
  tree_id: number;
}) {
  const dataParams: dataParamsProps = {
    'api-version': apiVersion,
  };

  return await getData({
    endPoint: `app/device-elec-hourly-consumptions/energy-prod-periodic-hourly-chart/${tree_id}`,
    type: 'get',
    dataParams,
  });
}

export async function fetchInverterIndexConsValueHeatmapChart({
  tree_id,
}: {
  tree_id: number;
}) {
  const dataParams: dataParamsProps = {
    'api-version': apiVersion,
  };

  return await getData({
    endPoint: `app/device-elec-hourly-consumptions/energy-cons-periodic-hourly-chart/${tree_id}`,
    type: 'get',
    dataParams,
  });
}
