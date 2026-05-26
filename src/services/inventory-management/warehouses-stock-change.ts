import { ISort } from '@/types/components/ui/table';
import { getData } from '@/lib/api-method/api-method-functions';

const apiVersion = import.meta.env.VITE_API_VERSION;

export async function fetchInventoryStockChanges({
  skipCount,
  maxResultCount = 10,
  sortData,
  FilterText,
  inventoryId,
  warehouseId,
}: {
  skipCount: number;
  maxResultCount?: number;
  sortData: ISort;
  FilterText?: string;
  inventoryId?: number;
  warehouseId?: number | string;
}) {
  const dataParams: any = {
    'api-version': apiVersion,
    skipCount,
    maxResultCount,
    FilterText,
  };
  if (warehouseId) {
    dataParams.warehouseId = warehouseId;
  }

  if (inventoryId) {
    dataParams.inventoryId = inventoryId;
    delete dataParams.warehouseId;
  }

  if (!FilterText) {
    delete dataParams.FilterText;
  }

  if (sortData?.length > 0) {
    dataParams.sorting = sortData
      .map(({ sortName, direction }: any) =>
        direction === 'desc' ? `${sortName} DESC` : `${sortName}`,
      )
      .join(',');
  }

  return await getData({
    endPoint: `app/stock-changes`,
    type: 'get',
    dataParams,
  });
}
