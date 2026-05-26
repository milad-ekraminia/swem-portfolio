import { dataParamsProps } from '@/types/api-methods';
import { ISort } from '@/types/components/ui/table';
import { getData } from '@/lib/api-method/api-method-functions';

const apiVersion = import.meta.env.VITE_API_VERSION;
const defaultDataParams: dataParamsProps = {
  'api-version': apiVersion,
  maxResultCount: 1000,
  skipCount: 0,
};

type dataProps = dataParamsProps & {
  warehouseId?: string;
  serialNumber: string;
  ProductId?: string;
};

export async function fetchInventoriesCategorizedList({
  serialNumber,
  skipCount,
  filterText,
  sorting,
  pageSize = 10,
  ProductId,
  warehouseId,
}: {
  serialNumber: string;
  skipCount: number;
  filterText: string;
  sorting: ISort;
  pageSize?: number;
  ProductId?: string;
  warehouseId?: string;
}) {
  let dataParams: dataProps = {
    serialNumber,
    'api-version': apiVersion,
    maxResultCount: pageSize,
    skipCount,
  };
  if (filterText) {
    dataParams.filterText = filterText;
  }

  if (ProductId) dataParams.ProductId = ProductId;
  if (warehouseId) dataParams.warehouseId = warehouseId;

  if (sorting?.length > 0) {
    dataParams.sorting = sorting
      .map(({ sortName, direction }) =>
        direction === 'desc' ? `${sortName} DESC` : `${sortName}`,
      )
      .join(',');
  }

  dataParams = Object.fromEntries(
    Object.entries(dataParams).filter(([, value]) => value !== ''),
  ) as dataProps;

  return await getData({
    endPoint: `app/inventories/categorized-list`,
    type: 'get',
    dataParams,
  });
}

export async function fetchProductUnitLookup() {
  return await getData({
    endPoint: `app/product-types/product-unit-lookup`,
    type: 'get',
    dataParams: defaultDataParams,
  });
}

export async function fetchConsumableProductLookup() {
  return await getData({
    endPoint: `app/products/consumable-product-lookup`,
    type: 'get',
    dataParams: defaultDataParams,
  });
}
