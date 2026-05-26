import { calculateSomething } from '@/helpers/production-forcast-api';
import { ISort } from '@/types/components/ui/table';
import { getFormDataPost } from '@/lib/api-method/api-method-functions';

const apiVersion = import.meta.env.VITE_API_VERSION;

export async function fetchProductionForecast({
  organizationId,
  date,
  periodType,
  sorting = [],
}: {
  organizationId: number;
  date: string;
  periodType: string;
  sorting?: ISort;
}) {
  const formData: any = {
    organizationId,
    date,
    periodType: calculateSomething(periodType),
  };

  if (sorting?.length > 0) {
    formData.sorting = sorting
      .map(({ sortName, direction }) =>
        direction === 'desc' ? `${sortName} DESC` : `${sortName}`,
      )
      .join(',');
  }
  return await getFormDataPost({
    endPoint: `app/devices/inverter-device-forecast?api-version=${apiVersion}`,
    formData,
    type: 'post',
  });
}
