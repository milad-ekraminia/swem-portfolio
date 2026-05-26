import { dataParamsProps } from '@/types/api-methods';
import { ScheduledReportFormData } from '@/types/pages/reports/scheduled';
import {
  getData,
  getFormDataPost,
} from '@/lib/api-method/api-method-functions';

const apiVersion = import.meta.env.VITE_API_VERSION;

export async function fetchScheduledReportsList({
  maxResultCount,
  skipCount,
  filterText,
  sorting,
}: {
  maxResultCount: number;
  skipCount: number;
  filterText: string;
  sorting: any[];
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
      .map((sortOption) => {
        let sort = '';
        sort += sortOption.sortName;
        if (sortOption.direction === 'desc') sort += ` DESC`;
        return sort;
      })
      .join(',');
  }

  if (!filterText) {
    delete dataParams.filterText;
  }

  return await getData({
    endPoint: `app/scheduled-reports`,
    type: 'get',
    dataParams,
  });
}

export async function getReportsFilterProfileList() {
  return await getData({
    endPoint: `app/scheduled-reports/reports-filter-profiles-list?api-version=${apiVersion}`,
    dataParams: {},
    type: 'get',
  });
}

export async function createScheduledReportApi({
  formData,
}: {
  formData: ScheduledReportFormData;
}) {
  delete formData.LastReportTime;
  delete formData.NextReportTime;

  return await getFormDataPost({
    endPoint: `app/scheduled-reports?api-version=${apiVersion}`,
    formData,
    type: 'post',
  });
}

export async function updateScheduledReportApi({
  scheduledId,
  formData,
}: {
  scheduledId: number;
  formData: ScheduledReportFormData;
}) {
  return await getFormDataPost({
    endPoint: `app/scheduled-reports/${scheduledId}?api-version=${apiVersion}`,
    type: 'put',
    formData,
  });
}
