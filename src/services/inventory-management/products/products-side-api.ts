import { dataParamsProps } from '@/types/api-methods';
import { getData } from '@/lib/api-method/api-method-functions';

const apiVersion = import.meta.env.VITE_API_VERSION;
const defaultDataParams: dataParamsProps = {
  'api-version': apiVersion,
  maxResultCount: 1000,
  skipCount: 0,
};

export async function fetchProductBrandLookup() {
  return await getData({
    endPoint: `app/products/product-brand-lookup`,
    type: 'get',
    dataParams: defaultDataParams,
  });
}

export async function fetchProductTypeLookup() {
  return await getData({
    endPoint: `app/products/product-type-lookup`,
    type: 'get',
    dataParams: defaultDataParams,
  });
}
export async function fetchProductBrandModelLookup() {
  return await getData({
    endPoint: `app/products/product-brand-model-lookup`,
    type: 'get',
    dataParams: defaultDataParams,
  });
}
export async function fetchProductManufacturerLookup() {
  return await getData({
    endPoint: `app/products/product-manufacturer-lookup`,
    type: 'get',
    dataParams: defaultDataParams,
  });
}
