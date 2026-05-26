import { dateFormatter } from '@/helpers/format-data';
import { getTranslatedValue } from '@/helpers/get-translated-value';

export const getColumns = () => {
  return [
    {
      header: getTranslatedValue('SecurityLogs:Date', 'AbpIdentity.texts'),
      accessorKey: 'creationTime',
      sort: 'CreationTime',
      size: 100,
      cell: ({ row }: any) => {
        return dateFormatter(row?.original?.creationTime);
      },
    },
    {
      header: getTranslatedValue('SecurityLogs:Action', 'AbpIdentity.texts'),
      accessorKey: 'action',
      sort: 'Action',
    },
    {
      header: getTranslatedValue('SecurityLogs:IpAddress', 'AbpIdentity.texts'),
      accessorKey: 'clientIpAddress',
      sort: 'ClientIpAddress',
    },
    {
      header: getTranslatedValue('SecurityLogs:Browser', 'AbpIdentity.texts'),
      accessorKey: 'browserInfo',
      sort: 'BrowserInfo',
    },

    {
      header: getTranslatedValue(
        'SecurityLogs:Application',
        'AbpIdentity.texts',
      ),
      accessorKey: 'applicationName',
      sort: 'ApplicationName',
      size: 200,
    },
    {
      header: getTranslatedValue('SecurityLogs:Identity', 'AbpIdentity.texts'),
      accessorKey: 'identity',
      sort: 'Identity',
    },
    {
      header: getTranslatedValue('SecurityLogs:UserName', 'AbpIdentity.texts'),
      accessorKey: 'userName',
      sort: 'UserName',
    },
    {
      header: getTranslatedValue('SecurityLogs:Client', 'AbpIdentity.texts'),
      accessorKey: 'clientId',
      sort: 'ClientId',
    },
    {
      header: getTranslatedValue(
        'SecurityLogs:CorrelationId',
        'AbpIdentity.texts',
      ),
      accessorKey: 'correlationId',
      size: 300,
      sort: 'CorrelationId',
    },
  ];
};
