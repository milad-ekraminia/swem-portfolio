import { dataParamsProps } from '@/types/api-methods';
import { ISort } from '@/types/components/ui/table';
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

export async function fetchPlantsList({
  skipCount,
  filterText,
  sorting,
  pageSize = 10,
}: {
  skipCount: number;
  filterText: string;
  sorting: ISort;
  pageSize?: number;
}) {
  const dataParams: dataParamsProps & {
    isDiscard?: boolean;
    isPlant?: boolean;
  } = {
    'api-version': apiVersion,
    maxResultCount: pageSize,
    skipCount,
    isPlant: true,
    isDiscard: false,
  };
  if (filterText) {
    dataParams.filterText = filterText;
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
    dataParams: dataParams,
  });
}

export async function fetchPlantsCardsList({
  skipCount,
  filterText,
  filterMode,
  sorting,
  pageSize,
}: {
  skipCount: number;
  filterText: string;
  filterMode?: string;
  sorting: ISort;
  pageSize?: number;
}) {
  let dataParams: dataParamsProps = {
    'api-version': apiVersion,
    maxResultCount: pageSize ?? 1000,
    skipCount,
  };
  if (filterText) {
    dataParams.filterText = filterText;
  }

  if (filterMode) {
    if (filterMode === 'all') {
      dataParams = {
        'api-version': apiVersion,
        maxResultCount: pageSize ?? 1000,
        skipCount,
      };
      if (filterText) {
        dataParams.filterText = filterText;
      }
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
    endPoint: `app/warehouses/plant-lookup`,
    type: 'get',
    dataParams: dataParams,
  });
}

export async function fetchPlantsLookup() {
  return await getData({
    endPoint: `app/warehouses/plant-lookup`,
    type: 'get',
    dataParams: defaultDataParams,
  });
}

export async function createNewInventoriesWithUseExcel({
  formData,
  id,
}: {
  formData: any;
  id: number;
}) {
  return await getFormDataPost({
    endPoint: `app/import-from-excel/import-inventories-from-excel/${id}?api-version=${apiVersion}`,
    formData: formData,
    type: 'post',
    hasExcel: true,
  });
}
