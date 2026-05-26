import { dataParamsProps } from '@/types/api-methods';
import { ISort } from '@/types/components/ui/table';
import { PlantImageFormData } from '@/types/pages/system-administration/definitions/plant-images';
import {
  getData,
  getFormDataPost,
} from '@/lib/api-method/api-method-functions';

const apiVersion = import.meta.env.VITE_API_VERSION;

export async function getPlantImages({
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

  if (!filterText) {
    delete dataParams.filterText;
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
    endPoint: `app/plant-images`,
    type: 'get',
    dataParams: dataParams,
  });
}

export async function getPartialPlantsList() {
  return await getData({
    endPoint: `app/organizations/plants-and-partial-plants-list`,
    dataParams: {
      'api-version': apiVersion,
    },
    type: 'get',
  });
}

export async function createNewPlantImage({
  formData,
}: {
  formData: PlantImageFormData;
}) {
  return await getFormDataPost({
    endPoint: `app/plant-images?api-version=${apiVersion}`,
    formData,
    type: 'post',
  });
}

export async function updatePlantImage({
  formData,
  id,
}: {
  formData: PlantImageFormData;
  id: number;
}) {
  return await getFormDataPost({
    endPoint: `app/plant-images/${id}?api-version=${apiVersion}`,
    formData,
    type: 'put',
  });
}
