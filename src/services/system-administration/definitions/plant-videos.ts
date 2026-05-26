import { dataParamsProps } from '@/types/api-methods';
import { ISort } from '@/types/components/ui/table';
import { PlantVideoFormData } from '@/types/pages/system-administration/definitions/plant-videos';
import {
  getData,
  getFormDataPost,
} from '@/lib/api-method/api-method-functions';

const apiVersion = import.meta.env.VITE_API_VERSION;

export async function getPlantVideos({
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
    endPoint: `app/plant-videos`,
    type: 'get',
    dataParams: dataParams,
  });
}

export async function createNewPlantVideo({
  formData,
}: {
  formData: PlantVideoFormData;
}) {
  return await getFormDataPost({
    endPoint: `app/plant-videos?api-version=${apiVersion}`,
    formData,
    type: 'post',
  });
}

export async function updatePlantVideo({
  formData,
  id,
}: {
  formData: PlantVideoFormData;
  id: number;
}) {
  return await getFormDataPost({
    endPoint: `app/plant-videos/${id}?api-version=${apiVersion}`,
    formData,
    type: 'put',
  });
}
