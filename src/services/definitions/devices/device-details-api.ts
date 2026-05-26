import { getData } from '@/lib/api-method/api-method-functions';

type dataParamsProps = {
  'api-version': number;
};

const apiVersion = import.meta.env.VITE_API_VERSION;

export async function fetchDeviceDetails({ tree_id }: { tree_id: number }) {
  const dataParams: dataParamsProps = {
    'api-version': apiVersion,
  };

  return await getData({
    endPoint: `app/devices/device-details/${tree_id}`,
    type: 'get',
    dataParams,
  });
}
