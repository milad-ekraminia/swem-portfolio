import { ISort } from '@/types/components/ui/table';
import { getData } from '@/lib/api-method/api-method-functions';

type dataParamsProps = {
  'api-version': number;
  sorting?: string;
};

const apiVersion = import.meta.env.VITE_API_VERSION;

export async function fetchInverterStatus({
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
    endPoint: `app/devices/device-inverter-status/${tree_id}`,
    type: 'get',
    dataParams,
  });
}
