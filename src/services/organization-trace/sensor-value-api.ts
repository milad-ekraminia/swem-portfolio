import { ISort } from '@/types/components/ui/table';
import { getData } from '@/lib/api-method/api-method-functions';

type dataParamsProps = {
  'api-version': string;
  sorting?: string;
};

const apiVersion = import.meta.env.VITE_API_VERSION;

export async function fetchSensorValue({
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
    endPoint: `app/devices/device-io-sensor-instant-value/${tree_id}`,
    type: 'get',
    dataParams,
  });
}

export async function fetchDeviceModelLabelList({
  deviceModelId,
}: {
  deviceModelId: number;
}) {
  const dataParams: dataParamsProps = {
    'api-version': apiVersion,
  };

  return await getData({
    endPoint: `app/labels/io-device-model-label-list/${deviceModelId}`,
    type: 'get',
    dataParams,
  });
}

export async function fetchSensorMeasurementList({
  tree_id,
  labelId,
}: {
  tree_id: number;
  labelId: number;
}) {
  const dataParams = {
    'api-version': apiVersion,
    deviceId: tree_id,
    labelId,
  };

  return await getData({
    endPoint: `app/io-device-sensor-values/io-sensor-measurement-list`,
    type: 'get',
    dataParams,
  });
}

export async function fetchSensorChartValuesBetweenDatesList({
  tree_id,
  labelId,
}: {
  tree_id: number;
  labelId: number;
}) {
  const dataParams = {
    'api-version': apiVersion,
    deviceId: tree_id,
    labelId,
  };

  return await getData({
    endPoint: `app/io-device-sensor-values/io-sensor-chart-values-between-dates-list`,
    type: 'get',
    dataParams,
  });
}
