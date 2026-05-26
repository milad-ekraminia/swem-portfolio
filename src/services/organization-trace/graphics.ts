import { dataParamsProps } from '@/types/api-methods';
import {
  getData,
  getFormDataPost,
} from '@/lib/api-method/api-method-functions';

const apiVersion = import.meta.env.VITE_API_VERSION;
const defaultDataParams: dataParamsProps = {
  'api-version': apiVersion,
  maxResultCount: 1000,
  skipCount: 0,
};

export async function fetchDevices() {
  return await getData({
    endPoint: `app/devices/device-lookup`,
    type: 'get',
    dataParams: defaultDataParams,
  });
}

export async function fetchLabelsByDevice({
  deviceId,
}: {
  deviceId: number | null;
}) {
  const dataParams: dataParamsProps = {
    ...defaultDataParams,
    id: deviceId ?? 0,
  };

  return await getData({
    endPoint: `app/labels/localized-label-lookup-by-device-id`,
    type: 'get',
    dataParams: dataParams,
  });
}
export async function fetchAllLabels() {
  return await getData({
    endPoint: `app/labels/localized-tfn-ac-labels2Lookup`,
    type: 'get',
    dataParams: defaultDataParams,
  });
}
export async function getGraphicReports({ dataParams }: { dataParams: any }) {
  return await getFormDataPost({
    endPoint: `app/labels/get-trend-analysis-report?api-version=${apiVersion}`,
    formData: dataParams,
    type: 'post',
  });
}
