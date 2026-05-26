import { ProductUnitFormData } from '@/types/pages/inventory-management/product-units';
import {
  getData,
  getFormDataPost,
} from '@/lib/api-method/api-method-functions';

type dataParamsProps = {
  'api-version': string;
  maxResultCount: number;
  skipCount: number;
  sorting?: string;
  filterText?: string;
};

const apiVersion = import.meta.env.VITE_API_VERSION;

export async function fetchProductsUnitList({
  skipCount,
  filterText,
  sorting,
  maxResultCount,
}: {
  skipCount: number;
  maxResultCount: number;
  filterText: string;
  sorting: any[];
}) {
  const dataParams: dataParamsProps = {
    'api-version': apiVersion,
    maxResultCount,
    skipCount,
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
  if (!filterText) {
    delete dataParams.filterText;
  }

  return await getData({
    endPoint: `app/product-units`,
    type: 'get',
    dataParams: dataParams,
  });
}

export async function createNewProductUnit(formData: ProductUnitFormData) {
  return await getFormDataPost({
    endPoint: `app/product-units?api-version=${apiVersion}`,
    formData,
    type: 'post',
  });
}

export async function updateProductUnit(formData: ProductUnitFormData) {
  return await getFormDataPost({
    endPoint: `app/product-units/${formData?.id}?api-version=${apiVersion}`,
    formData: {
      concurrencyStamp: formData?.concurrencyStamp,
      name: formData?.name,
    },
    type: 'put',
  });
}
