import { ISort } from '@/types/components/ui/table';


type dataParamsProps = {
  'api-version': number;
  sorting?: string;
};

const apiVersion = import.meta.env.VITE_API_VERSION;

export async function fetchDeviceModelCommStatusList({
  tree_id,
  sortData,
}: {
  tree_id: number;
  sortData: ISort;
}) {
  console.log('🚀 ~ fetchDeviceModelCommStatusList ~ tree_id:', tree_id);
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
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    {
      deviceModelName: 'Huawei SUN2000-100KTL',
      online: 124,
      offline: 6,
      passive: 2,
    },
    {
      deviceModelName: 'Sungrow SG125CX',
      online: 98,
      offline: 4,
      passive: 1,
    },
    {
      deviceModelName: 'Fronius Eco 27.0-3-S',
      online: 76,
      offline: 9,
      passive: 3,
    },
    {
      deviceModelName: 'SMA Sunny Tripower CORE2',
      online: 142,
      offline: 5,
      passive: 0,
    },
    {
      deviceModelName: 'Growatt MAX 125KTL3-X',
      online: 88,
      offline: 7,
      passive: 4,
    },
  ];
}
export async function fetchDeviceModelCommStatusChartList({
  tree_id,
}: {
  tree_id: number;
}) {
  const dataParams: dataParamsProps = {
    'api-version': apiVersion,
  };
  console.log(
    '🚀 ~ fetchDeviceModelCommStatusChartList ~ dataParams:',
    dataParams,
    tree_id,
  );
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    {
      label: 'No Access',
      value: 18,
    },
    {
      label: 'Online',
      value: 142,
    },
    {
      label: 'Offline',
      value: 26,
    },
  ];
}