import {
  defaultDataParams,
  multiConditionalDefaultDataParams,
} from '@/enum-data/definitions/organizations-data';
import { dataParamsProps } from '@/types/api-methods';
import { ISort } from '@/types/components/ui/table';
import {
  getData,
  getFormDataPost,
} from '@/lib/api-method/api-method-functions';

const apiVersion = import.meta.env.VITE_API_VERSION;

export async function fetchDefinitionsTimePeriodLookup() {
  return await getData({
    endPoint: `app/multi-conditional-statuses/time-period-lookup`,
    type: 'get',
    dataParams: defaultDataParams,
  });
}

export async function fetchDefinitionsGetMultiConditionalStatusesList({
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
    MCSFormula: string;
    MCSDescription: string;
  } = {
    'api-version': apiVersion,
    maxResultCount: pageSize,
    skipCount,
    MCSFormula: '',
    MCSDescription: '',
  };
  if (filterText) {
    dataParams.filterText = filterText;
  }

  if (sorting?.length > 0) {
    dataParams.sorting = sorting
      .map(({ sortName, direction }) =>
        direction === 'desc' ? `${sortName} DESC` : `${sortName}`,
      )
      .join(',');
  }

  return await getData({
    endPoint: `app/multi-conditional-statuses`,
    type: 'get',
    dataParams: dataParams,
  });
}

export async function fetchDefinitionsDeviceLookup({
  Filter,
}: {
  Filter?: string;
}) {
  const dataParams = { ...multiConditionalDefaultDataParams };

  if (Filter) {
    dataParams.Filter = Filter;
  }

  return await getData({
    endPoint: `app/multi-conditional-statuses/device-lookup`,
    type: 'get',
    dataParams,
  });
}

export async function fetchDefinitionsLabelLookup() {
  return await getData({
    endPoint: `app/multi-conditional-statuses/label-lookup`,
    type: 'get',
    dataParams: defaultDataParams,
  });
}

export async function fetchDefinitionsDerivedValueLookup({
  Filter,
}: {
  Filter?: string;
}) {
  const dataParams = { ...multiConditionalDefaultDataParams };

  if (Filter) {
    dataParams.Filter = Filter;
  }
  return await getData({
    endPoint: `app/multi-conditional-statuses/derived-value-lookup`,
    type: 'get',
    dataParams,
  });
}

export async function fetchDefinitionsUserLookup({
  Filter,
}: {
  Filter?: string;
}) {
  const dataParams = { ...multiConditionalDefaultDataParams };

  if (Filter) {
    dataParams.Filter = Filter;
  }
  return await getData({
    endPoint: `app/multi-conditional-statuses/user-lookup`,
    type: 'get',
    dataParams,
  });
}

// create new multi conditional status
export async function createNewConditionalStatus({
  formData,
}: {
  formData: any;
}) {
  return await getFormDataPost({
    endPoint: `app/multi-conditional-statuses/with-details?api-version=${apiVersion}`,
    formData,
    type: 'post',
  });
}

// update multi conditional status
export async function fetchDefinitionsConditionalDetail({
  conditionalId,
}: {
  conditionalId: number;
}) {
  return await getData({
    endPoint: `app/multi-conditional-statuses/${conditionalId}/with-details?api-version=${apiVersion}`,
    type: 'get',
  });
}

export async function updateConditionalStatus({
  conditionalId,
  formData,
}: {
  conditionalId: number;
  formData: any;
}) {
  return await getFormDataPost({
    endPoint: `app/multi-conditional-statuses/${conditionalId}/with-details?api-version=${apiVersion}`,
    formData,
    type: 'put',
  });
}
