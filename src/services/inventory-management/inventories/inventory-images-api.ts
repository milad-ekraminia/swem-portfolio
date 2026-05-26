import { getData } from '@/lib/api-method/api-method-functions';

type dataParamsProps = {
  'api-version': number;
  maxResultCount: number;
  skipCount?: number;
  InventoryId?: string;
};

const apiVersion = import.meta.env.VITE_API_VERSION;

export async function fetchInventoryImages({
  skipCount = 0,
  maxResultCount = 100,
  InventoryId,
}: {
  skipCount?: number;
  maxResultCount?: number;
  InventoryId?: string;
}) {
  const dataParams: dataParamsProps = {
    'api-version': apiVersion,
    skipCount,
    maxResultCount,
    InventoryId,
  };

  return await getData({
    endPoint: `app/inventory-images`,
    type: 'get',
    dataParams,
  });
}
