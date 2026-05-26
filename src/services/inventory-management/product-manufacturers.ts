import { ProductManufacturerFormData } from '@/types/pages/inventory-management/product-manufacturers';
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

export async function fetchProductsManufacturersList({
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
    endPoint: `app/product-manufacturers`,
    type: 'get',
    dataParams: dataParams,
  });
}

export async function createNewProductsManufacturers(formData: any) {
  return await getFormDataPost({
    endPoint: `app/product-manufacturers?api-version=${apiVersion}`,
    formData: {
      manufacturerTitle: formData?.manufacturerTitle,
      manufacturerNo: formData?.manufacturerNo?.toString(),
    },
    type: 'post',
  });
}

export async function updateProductsManufacturers(
  formData: ProductManufacturerFormData,
) {
  return await getFormDataPost({
    endPoint: `app/product-manufacturers/${formData?.id}?api-version=${
      apiVersion
    }`,
    formData: {
      concurrencyStamp: formData?.concurrencyStamp,
      manufacturerTitle: formData?.manufacturerTitle,
      manufacturerNo: formData?.manufacturerNo?.toString(),
    },
    type: 'put',
  });
}
