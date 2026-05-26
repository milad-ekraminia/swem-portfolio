import { dataParamsProps } from '@/types/api-methods';
import { getData } from '@/lib/api-method/api-method-functions';

const apiVersion = import.meta.env.VITE_API_VERSION;
const defaultDataParams: dataParamsProps = {
  'api-version': apiVersion,
  maxResultCount: 1000,
  skipCount: 0,
};

export async function fetchBarcodedProductLookup() {
  return await getData({
    endPoint: `app/inventories/barcoded-product-lookup`,
    type: 'get',
    dataParams: defaultDataParams,
  });
}

export async function fetchWarehouseLookup() {
  return await getData({
    endPoint: `app/inventories/warehouse-lookup`,
    type: 'get',
    dataParams: defaultDataParams,
  });
}
