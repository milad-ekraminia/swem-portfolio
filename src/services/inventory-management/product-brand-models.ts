import { ProductBrandModelFormData } from '@/types/pages/inventory-management/product-brand-models';
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

export async function fetchProductsBrandModelsList({
  skipCount,
  filterText,
  sorting,
  maxResultCount,
}: {
  maxResultCount: number;
  skipCount: number;
  filterText: string;
  sorting: any[];
}) {
  const dataParams: dataParamsProps = {
    'api-version': apiVersion,
    maxResultCount,
    skipCount,
  };
  if (filterText) {
    dataParams.filterText = filterText;
  }

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
    endPoint: `app/product-brand-models`,
    type: 'get',
    dataParams: dataParams,
  });
}

export async function createNewProductsBrandModels(formData: any) {
  return await getFormDataPost({
    endPoint: `app/product-brand-models?api-version=${apiVersion}`,
    formData,
    type: 'post',
  });
}

export async function updateProductsBrandModels(
  formData: ProductBrandModelFormData,
) {
  return await getFormDataPost({
    endPoint: `app/product-brand-models/${formData?.id}?api-version=${apiVersion}`,
    formData: {
      concurrencyStamp: formData?.concurrencyStamp,
      modelName: formData?.modelName,
      productBrandId: formData?.productBrandId,
    },
    type: 'put',
  });
}

export async function fetchAllProductsBrands() {
  const dataParams: dataParamsProps = {
    'api-version': apiVersion,
    maxResultCount: 1000,
    skipCount: 0,
  };

  return await getData({
    endPoint: `app/product-brand-models/product-brand-lookup`,
    type: 'get',
    dataParams: dataParams,
  });
}
