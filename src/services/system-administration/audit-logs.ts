import { ISort } from '@/types/components/ui/table';
import { getData } from '@/lib/api-method/api-method-functions';

const apiVersion = import.meta.env.VITE_API_VERSION;

export async function getAuditLogsList({
  skipCount = 0,
  sorting = [],
  filterValues,
  maxResultCount = 10,
}: {
  skipCount?: number;
  sorting?: ISort;
  filterValues?: any;
  maxResultCount?: any;
}) {
  let dataParams: any & {
    StartTime?: string;
    EndTime?: string;
    Url?: string;
    UserName?: string;
    ApplicationName?: string;
    ClientIpAddress?: string;
    CorrelationId?: string;
    MaxExecutionDuration?: number;
    MinExecutionDuration?: number;
    HttpMethod?: string;
    HttpStatusCode?: number;
    HasException?: boolean;
  } = {
    'api-version': apiVersion,
    MaxResultCount: maxResultCount,
    SkipCount: skipCount,
  };

  if (Object.keys(filterValues || {})?.length > 0) {
    dataParams = {
      ...dataParams,
      ...filterValues,
    };
  }

  if (sorting?.length > 0) {
    dataParams.Sorting = sorting
      .map(({ sortName, direction }) =>
        direction === 'desc' ? `${sortName} DESC` : `${sortName}`,
      )
      .join(',');
  } else {
    dataParams.Sorting = '';
  }

  return await getData({
    endPoint: `audit-logging/audit-logs`,
    type: 'get',
    dataParams: dataParams,
  });
}

export async function getEntityChangesList({
  skipCount = 0,
  sorting = [],
  filterValues,
  maxResultCount = 10,
}: {
  skipCount?: number;
  sorting?: ISort;
  filterValues?: any;
  maxResultCount?: any;
}) {
  let dataParams: any & {
    StartDate?: string;
    EndDate?: string;
    ChangeType?: number;
    EntityId?: string;
    EntityTypeFullName?: string;
  } = {
    'api-version': apiVersion,
    MaxResultCount: maxResultCount,
    SkipCount: skipCount,
  };

  if (Object.keys(filterValues || {})?.length > 0) {
    dataParams = {
      ...dataParams,
      ...filterValues,
    };
  }

  if (sorting?.length > 0) {
    dataParams.Sorting = sorting
      .map(({ sortName, direction }) =>
        direction === 'desc' ? `${sortName} DESC` : `${sortName}`,
      )
      .join(',');
  } else {
    dataParams.Sorting = '';
  }

  return await getData({
    endPoint: `audit-logging/audit-logs/entity-changes`,
    type: 'get',
    dataParams: dataParams,
  });
}

export async function getAuditLogDetail(id: string) {
  const dataParams: any = {
    'api-version': apiVersion,
  };

  return await getData({
    endPoint: `audit-logging/audit-logs/${id}`,
    type: 'get',
    dataParams: dataParams,
  });
}

export async function getEntityChangeDetail(id: string) {
  const dataParams: any = {
    'api-version': apiVersion,
  };

  return await getData({
    endPoint: `audit-logging/audit-logs/entity-change-with-username/${id}`,
    type: 'get',
    dataParams: dataParams,
  });
}
