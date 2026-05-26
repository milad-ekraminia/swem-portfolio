import { ProductTypeFormData } from '@/types/pages/inventory-management/product-types';
import {
  getData,
  getFormDataPost,
} from '@/lib/api-method/api-method-functions';

const apiVersion = import.meta.env.VITE_API_VERSION;

type dataParamsProps = {
  'api-version': number;
  maxResultCount: number;
  skipCount: number;
  sorting?: string;
  filterText: string;
};

export async function fetchProductTypesList({
  skipCount = 0,
  maxResultCount = 10,
  sorting,
  filterText,
}: {
  skipCount: number;
  maxResultCount?: number;
  sorting: any[];
  filterText: string;
}) {
  const dataParams: dataParamsProps = {
    'api-version': apiVersion,
    skipCount,
    maxResultCount,
    filterText,
  };
  // Sorting and search should be added after filter mode because of the filter mode logic reset all data
  if (sorting?.length > 0) {
    dataParams.sorting = sorting
      .map((sortOption) => {
        let sort = '';
        sort += sortOption.sortName;
        if (sortOption.direction === 'desc') sort += ` DESC`;
        return sort;
      })
      .join(',');
  }

  return await getData({
    endPoint: `app/product-types`,
    type: 'get',
    dataParams,
  });
}

export async function fetchProductUnitLookup() {
  const dataParams = {
    'api-version': apiVersion,
    maxResultCount: 1000,
    skipCount: 0,
  };

  return await getData({
    endPoint: `app/product-types/product-unit-lookup`,
    type: 'get',
    dataParams,
  });
}
export async function createNewProductType(formData: any) {
  return await getFormDataPost({
    endPoint: `app/product-types?api-version=${apiVersion}`,
    formData,
    type: 'post',
  });
}

export async function updateProductType(formData: ProductTypeFormData) {
  const { id, ...remainingData } = formData;
  return await getFormDataPost({
    endPoint: `app/product-types/${id}?api-version=${apiVersion}`,
    formData: remainingData,
    type: 'put',
  });
}
