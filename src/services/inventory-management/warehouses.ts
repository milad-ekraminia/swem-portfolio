import { dataParamsProps } from '@/types/api-methods';
import { ISort } from '@/types/components/ui/table-box';
import {
  getData,
  getFormDataPost,
} from '@/lib/api-method/api-method-functions';

const apiVersion = import.meta.env.VITE_API_VERSION;
const defaultDataParams: dataParamsProps = {
  'api-version': apiVersion,
  maxResultCount: 1000,
  skipCount: 0,
};

export async function fetchFirmWeatherDataLocationOWMSList({
  skipCount = 0,
  maxResultCount = 1000,
}: {
  skipCount?: number;
  maxResultCount?: number;
}) {
  const dataParams: dataParamsProps = {
    'api-version': apiVersion,
    maxResultCount,
    skipCount,
  };

  return await getData({
    endPoint: `app/firm-weather-data-location-oWMS/countries-lookup`,
    type: 'get',
    dataParams: dataParams,
  });
}

export async function fetchFirmWeatherDataLocationsList({
  skipCount,
  maxResultCount,
}: {
  skipCount: number;
  maxResultCount: number;
}) {
  const dataParams: dataParamsProps = {
    'api-version': apiVersion,
    maxResultCount,
    skipCount,
  };

  return await getData({
    endPoint: `app/firm-weather-data-location-oWMS`,
    type: 'get',
    dataParams: dataParams,
  });
}

export async function fetchCountriesFirmNotContainsLookupList({
  Filter,
}: {
  Filter: string;
}) {
  const dataParams: any = { ...defaultDataParams };
  if (Filter) {
    dataParams.Filter = Filter;
  }

  return await getData({
    endPoint: `app/firm-weather-data-location-oWMS/countries-firm-not-contains-lookup`,
    type: 'get',
    dataParams: dataParams,
  });
}

export async function fetchWarehouseList({
  isPlant,
  skipCount,
  filterText,
  filterMode,
  sorting = [],
  status,
}: {
  isPlant: boolean;
  skipCount: number;
  filterText: string;
  filterMode?: string;
  sorting?: ISort;
  status?: boolean;
}) {
  let dataParams: any = {
    'api-version': apiVersion,
    maxResultCount: 1000,
    skipCount,
    isPlant,
  };
  if (filterText) {
    dataParams.filterText = filterText;
  }

  if (filterMode) {
    if (filterMode === 'all') {
      dataParams = {
        'api-version': apiVersion,
        maxResultCount: 1000,
        skipCount,
        isPlant,
      };
      if (filterText) {
        dataParams.filterText = filterText;
      }
    } else if (filterMode === 'discard') {
      dataParams.isDiscard = true;
    } else if (filterMode === 'active') {
      dataParams.status = true;
    } else {
      dataParams.status = false;
    }
  }

  // Sorting and search should be added after filter mode because of the filter mode logic reset all data
  if (sorting?.length > 0) {
    dataParams.sorting = sorting
      .map(({ sortName, direction }) =>
        direction === 'desc' ? `${sortName} DESC` : `${sortName}`,
      )
      .join(',');
  }

  return await getData({
    endPoint: `app/warehouses`,
    type: 'get',
    dataParams:
      typeof status === 'boolean'
        ? {
            ...dataParams,
            status,
          }
        : dataParams,
  });
}

export async function fetchWarehouseLookup() {
  return await getData({
    endPoint: `app/inventories/warehouse-lookup`,
    type: 'get',
    dataParams: defaultDataParams,
  });
}

export async function createNewWarehouse(formData: any) {
  return await getFormDataPost({
    endPoint: `app/warehouses?api-version=${apiVersion}`,
    formData,
    type: 'post',
  });
}

export async function updateWarehouse(formData: any) {
  return await getFormDataPost({
    endPoint: `app/warehouses/${formData?.id}?api-version=${apiVersion}`,
    formData,
    type: 'put',
  });
}

export async function fetchWarehouseDetails({
  warehouseId,
}: {
  warehouseId: number;
}) {
  return await getData({
    endPoint: `app/warehouses/${warehouseId}/with-navigation-properties?api-version=${apiVersion}`,
    type: 'get',
  });
}
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
  warehouseId?: number;
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
    dataParams.sorting = sortData.join(',');
  }

  return await getData({
    endPoint: `app/stock-changes`,
    type: 'get',
    dataParams,
  });
}

export async function fetchWarehouseInventoryList({
  warehouseId,
  sorting,
}: {
  warehouseId: number;
  sorting: ISort;
}) {
  const dataParams: any = {
    'api-version': apiVersion,
    maxResultCount: 6,
    skipCount: 0,
    warehouseId,
  };
  if (sorting?.length > 0) {
    dataParams.sorting = sorting
      .map(({ sortName, direction }) =>
        direction === 'desc' ? `${sortName} DESC` : `${sortName}`,
      )
      .join(',');
  }

  return await getData({
    endPoint: `app/inventories`,
    type: 'get',
    dataParams: dataParams,
  });
}
