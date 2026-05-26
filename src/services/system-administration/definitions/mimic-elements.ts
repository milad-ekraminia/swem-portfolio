import { dataParamsProps } from '@/types/api-methods';
import { ISort } from '@/types/components/ui/table';
import {
  MimicElementFormData,
  RelatedElement,
  RelatedElementFormData,
} from '@/types/pages/system-administration/definitions/mimic-elements';
import {
  getData,
  getFormDataPost,
} from '@/lib/api-method/api-method-functions';

const apiVersion = import.meta.env.VITE_API_VERSION;

interface PaginationParams {
  skipCount: number;
  filterText?: string;
  sorting: ISort;
  maxResultCount: number;
}

interface FormDataParams<T> {
  formData: T;
}

export async function getMimicElements({
  skipCount,
  filterText,
  maxResultCount,
  sorting,
}: PaginationParams) {
  const dataParams: dataParamsProps = {
    'api-version': apiVersion,
    maxResultCount,
    skipCount,
    ...(filterText ? { filterText } : {}),
  };

  if (sorting.length) {
    dataParams.sorting = sorting
      .map(({ sortName, direction }) =>
        direction === 'desc' ? `${sortName} DESC` : sortName,
      )
      .join(',');
  }

  return getData({
    endPoint: 'app/mimic-elements',
    type: 'get',
    dataParams,
  });
}

export async function getMimicElementsDefinitions() {
  return getData({
    endPoint: `app/mimic-elements/static-filtered-mimic-elements-lookup?api-version=${apiVersion}`,
    type: 'get',
  });
}

export async function createNewMimicElement({
  formData,
}: FormDataParams<MimicElementFormData>) {
  const response = await getFormDataPost({
    endPoint: `app/mimic-elements?api-version=${apiVersion}`,
    formData,
    type: 'post',
  });

  return { response, submittedFormData: formData };
}

export async function createNewMimicElementDetail({
  formData,
  lastParams,
}: FormDataParams<RelatedElementFormData> & { lastParams: boolean }) {
  const response = await getFormDataPost({
    endPoint: `app/mimic-element-components?api-version=${apiVersion}`,
    formData,
    type: 'post',
  });

  return { lastParams, response };
}

export async function updateMimicElement({
  formData,
  mimicElementId,
}: FormDataParams<MimicElementFormData> & { mimicElementId: number }) {
  const response = await getFormDataPost({
    endPoint: `app/mimic-elements/${mimicElementId}?api-version=${apiVersion}`,
    formData,
    type: 'put',
  });

  return { response, submittedFormData: formData };
}

export async function getMimicElementDetailDefinitions({
  elementId,
}: {
  elementId: number;
}): Promise<RelatedElement[]> {
  return getData({
    endPoint: `app/mimic-element-components/details-list/${elementId}?api-version=${apiVersion}`,
    type: 'get',
  });
}

export async function deleteMimicElementDetail({
  mimicElementComponentId,
}: {
  mimicElementComponentId: number;
}) {
  return getData({
    endPoint: `app/mimic-element-components/${mimicElementComponentId}?api-version=${apiVersion}`,
    type: 'delete',
  });
}
