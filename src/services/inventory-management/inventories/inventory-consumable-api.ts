import { getData } from '@/lib/api-method/api-method-functions';

const apiVersion = import.meta.env.VITE_API_VERSION;

type dataParamsProps = {
  'api-version': number;
  maxResultCount: number;
  skipCount?: number;
  productId?: string;
  InventoryId?: string;
};

export async function fetchInventoryConsumables({
  skipCount = 0,
  maxResultCount = 100,
  InventoryId,
}: {
  skipCount?: number;
  maxResultCount?: number;
  InventoryId?: string;
}) {
  const dataParams: dataParamsProps = {
    'api-version': apiVersion as unknown as number,
    skipCount,
    maxResultCount,
  };
  if (InventoryId) {
    dataParams.InventoryId = InventoryId;
  }

  return await getData({
    endPoint: `app/inventory-consumables`,
    type: 'get',
    dataParams,
  });
}

export async function fetchProductConsumables({
  skipCount = 0,
  maxResultCount = 100,
  productId,
}: {
  skipCount?: number;
  maxResultCount?: number;
  productId?: string;
}) {
  const dataParams: dataParamsProps = {
    'api-version': apiVersion as unknown as number,
    skipCount,
    maxResultCount,
  };
  if (productId) {
    dataParams.productId = productId;
  }

  return await getData({
    endPoint: `app/inventory-consumables`,
    type: 'get',
    dataParams,
  });
}
