import { dataParamsProps } from '@/types/api-methods';
import { ISort } from '@/types/components/ui/table';
import {
  getData,
  getFormDataPost,
} from '@/lib/api-method/api-method-functions';

const apiVersion = import.meta.env.VITE_API_VERSION;

export async function fetchFormulasList({
  skipCount,
  filterText,
  sorting,
  maxResultCount,
}: {
  skipCount: number;
  filterText: string;
  sorting: ISort;
  maxResultCount: number;
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
      .map(({ sortName, direction }) =>
        direction === 'desc' ? `${sortName} DESC` : `${sortName}`,
      )
      .join(',');
  }

  if (!filterText) {
    delete dataParams.filterText;
  }

  return await getData({
    endPoint: `app/formulas`,
    type: 'get',
    dataParams: dataParams,
  });
}

export async function createNewFormula(formData: any) {
  return await getFormDataPost({
    endPoint: `app/formulas?api-version=${apiVersion}`,
    formData,
    type: 'post',
  });
}

// update
export async function updateFormulaDetails({
  formData,
  formulaId,
}: {
  formData: any;
  formulaId: number;
}) {
  return await getFormDataPost({
    endPoint: `app/formulas/${formulaId}?api-version=${apiVersion}`,
    formData,
    type: 'put',
  });
}
