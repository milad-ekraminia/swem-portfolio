import { ProductBrandFormData } from '@/types/pages/inventory-management/product-brands';
import {
  getData,
  getFormDataPost,
} from '@/lib/api-method/api-method-functions';

const apiVersion = import.meta.env.VITE_API_VERSION;

type dataParamsProps = {
  'api-version': string;
  maxResultCount: number;
  skipCount: number;
  sorting?: string;
  filterText?: string;
};

export async function fetchProductsBrandsList({
  skipCount,
  filterText,
  sorting,
  maxResultCount,
}: {
  skipCount: number;
  filterText: string;
  maxResultCount: number;
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
    endPoint: `app/product-brands`,
    type: 'get',
    dataParams: dataParams,
  });
}

export async function createNewProductsBrands(formData: any) {
  return await getFormDataPost({
    endPoint: `app/product-brands?api-version=${apiVersion}`,
    formData,
    type: 'post',
  });
}

export async function updateProductsBrands(formData: ProductBrandFormData) {
  return await getFormDataPost({
    endPoint: `app/product-brands/${formData?.id}?api-version=${apiVersion}`,
    formData: {
      concurrencyStamp: formData?.concurrencyStamp,
      brandName: formData?.brandName,
    },
    type: 'put',
  });
}
