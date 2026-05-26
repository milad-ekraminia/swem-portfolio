import StatusTag from '@/components/ui/status-tag/status-tag';
import { dateFormatter } from '@/helpers/format-data';
// import { dateFormatter } from '@/helpers/format-data';
import { getTranslatedValue } from '@/helpers/get-translated-value';

export const changeTypeOptions = [
  {
    title: getTranslatedValue('Created'),
    value: 'Created',
  },
  {
    title: getTranslatedValue('Updated'),
    value: 'Updated',
  },
  {
    title: getTranslatedValue('Deleted'),
    value: 'Deleted',
  },
];

export const getColumns = (
  handleDetailModal: (derivedValue: any | null) => void,
) => {
  return [
    {
      header: '',
      id: 1,
      accessorKey: '',
      sort: '',

      size: 100,
      cell: ({ row }: any) => {
        return (
          <div style={{ gap: '4px', display: 'flex', alignItems: 'center' }}>
            <StatusTag
              label={row?.original?.httpStatusCode || '-'}
              color={
                row?.original?.httpStatusCode >= 200 &&
                  row?.original?.httpStatusCode < 300
                  ? 'success'
                  : 'danger'
              }
            />

            <StatusTag
              label={row?.original?.httpMethod || '-'}
              color={'blue'}
            />
          </div>
        );
      },
    },
    {
      header: getTranslatedValue('HttpRequest', 'AbpAuditLogging.texts'),
      accessorKey: 'url',
      sort: 'Url',
      size: 300,
    },

    {
      header: getTranslatedValue('UserName', 'AbpAuditLogging.texts'),
      accessorKey: 'userName',
      sort: 'UserName',
      cell: ({ row }: any) => row?.original?.userName || '-',
    },

    {
      header: getTranslatedValue('IpAddress', 'AbpAuditLogging.texts'),
      accessorKey: 'clientIpAddress',
      sort: 'ClientIpAddress',
      cell: ({ row }: any) => row?.original?.clientIpAddress || '-',
    },
    {
      header: getTranslatedValue('Date', 'AbpAuditLogging.texts'),
      accessorKey: 'executionTime',
      sort: 'ExecutionTime',
      cell: ({ row }: any) => {
        if (!row?.original?.executionTime) return '-';
        return dateFormatter(row.original.executionTime, true, false, true);
      },
    },

    {
      header: getTranslatedValue('DurationMs', 'AbpAuditLogging.texts'),
      accessorKey: 'executionDuration',
      sort: 'ExecutionDuration',
      cell: ({ row }: any) => `${row?.original?.executionDuration || 0} ms`,
    },
    {
      header: getTranslatedValue('ApplicationName', 'AbpAuditLogging.texts'),
      accessorKey: 'applicationName',
      sort: 'ApplicationName',
      cell: ({ row }: any) => row?.original?.applicationName || '-',
    },
    {
      header: getTranslatedValue('CorrelationId', 'AbpAuditLogging.texts'),
      accessorKey: 'correlationId',
      sort: 'CorrelationId',
      cell: ({ row }: any) => row?.original?.correlationId || '-',
    },

    {
      header: getTranslatedValue('Actions'),
      accessorKey: '',
      sort: '',
      cell: ({ row }: any) => (
        <div className="dv-edit-delete-buttons ">
          <span
            style={{
              color: 'var(--text-brand-secondary-700)',
              fontSize: 'var(--text-sm)',
              fontWeight: 600,
              cursor: 'pointer',
            }}
            onClick={() => handleDetailModal(row.original.id)}
          >
            {getTranslatedValue('Detail', 'AbpAuditLogging.texts')}
          </span>
        </div>
      ),
    },
  ];
};

export const getEntityChangesColumns = (
  handleDetailModal: (derivedValue: any | null) => void,
) => {
  const getChangeTypeLabel = (changeType: number) => {
    switch (changeType) {
      case 0:
        return 'Created';
      case 1:
        return 'Updated';
      case 2:
        return 'Deleted';
      default:
        return changeType.toString();
    }
  };

  return [
    {
      header: getTranslatedValue('ChangeTime', 'AbpAuditLogging.texts'),
      accessorKey: 'changeTime',
      sort: 'ChangeTime',
      cell: ({ row }: any) => {
        if (!row?.original?.changeTime) return '-';
        return dateFormatter(row.original.changeTime, true, false, true);
      },
    },

    {
      header: getTranslatedValue('ChangeType', 'AbpAuditLogging.texts'),
      accessorKey: 'changeType',
      sort: 'ChangeType',
      cell: ({ row }: any) => {
        const changeType = row?.original?.changeType;
        if (changeType === undefined || changeType === null) return '-';
        return getChangeTypeLabel(changeType);
      },
    },

    {
      header: getTranslatedValue('TenantId', 'AbpAuditLogging.texts'),
      accessorKey: 'tenantId',
      sort: 'TenantId',
      cell: ({ row }: any) => row?.original?.tenantId || '-',
    },
    {
      header: getTranslatedValue('EntityId', 'AbpAuditLogging.texts'),
      accessorKey: 'entityId',
      sort: 'EntityId',
      cell: ({ row }: any) => row?.original?.entityId || '-',
    },

    {
      header: getTranslatedValue('EntityTypeFullName', 'AbpAuditLogging.texts'),
      accessorKey: 'entityTypeFullName',
      sort: 'EntityTypeFullName',
      size: 300,
      cell: ({ row }: any) => row?.original?.entityTypeFullName || '-',
    },
    {
      header: getTranslatedValue('Actions'),
      accessorKey: '',
      sort: '',
      cell: ({ row }: any) => (
        <div className="dv-edit-delete-buttons ">
          <span
            style={{
              color: 'var(--text-brand-secondary-700)',
              fontSize: 'var(--text-sm)',
              fontWeight: 600,
              cursor: 'pointer',
            }}
            onClick={() => handleDetailModal(row.original.id)}
          >
            {getTranslatedValue('Detail', 'AbpAuditLogging.texts')}
          </span>
        </div>
      ),
    },
  ];
};

export const SAMPLE_AUDI_LOG_TABLE_DATA = [
  {
    httpsStatusCode: '200',
    httpStatus: 'GET',
    httpRequest: '/api/users',
    userName: 'johndoe',
    ipAddress: '192.168.1.10',
    date: '2025-08-18 10:23:45',
    executionDuration: 2,
    duration: 123,
    comments: '',
    extraProperties: '{}',

    applicationName: 'SwemApp',
    browserInfo:
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36',
    correlationId: 'abc123-xyz789',
    actions: [
      {
        id: 1,
        title: 'WebNet.WebNetUtils.WebNetConfigurationAppService',
        executionDuration: 2,
        parameters: '',
      },
    ],
  },
  {
    httpsStatusCode: '404',
    httpStatus: 'POST',
    httpRequest: '/api/login',
    extraProperties: '{}',
    actions: [
      {
        id: 1,
        title: 'WebNet.WebNetUtils.WebNetConfigurationAppService',
        executionDuration: 2,
        parameters: '',
      },
    ],
    comments: '',
    browserInfo:
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36',
    userName: 'janedoe',
    ipAddress: '192.168.1.11',
    date: '2025-08-18 11:15:30',
    executionDuration: 1,
    duration: 87,
    applicationName: 'SwemApp',
    correlationId: 'def456-uvw123',
  },
  {
    httpsStatusCode: '500',
    httpStatus: 'PUT',
    extraProperties: '{}',
    actions: [
      {
        id: 1,
        title: 'WebNet.WebNetUtils.WebNetConfigurationAppService',
        executionDuration: 2,
        parameters: '',
      },
    ],
    comments: '',
    browserInfo:
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36',
    executionDuration: 6,
    httpRequest: '/api/settings',
    userName: 'admin',
    ipAddress: '192.168.1.12',
    date: '2025-08-18 12:05:10',
    duration: 210,
    applicationName: 'SwemAdmin',
    correlationId: 'ghi789-rst456',
  },
];

export const SAMPLE_ENTITY_CHANGES_TABLE_DATA = [
  {
    id: 'e64063d8-a327-feb9-70ad-3a1d5c5e8cd4',
    auditLogId: 'a45e60df-c7f8-5dd1-e99e-3a1d5c5e8ccc',
    tenantId: null,
    changeTime: '2025-11-03T18:18:53.8372512',
    changeType: 2,
    entityId: '83d645d0-faca-b62f-ba8d-3a1d5aa9363c',
    entityTypeFullName: 'Volo.Abp.Identity.IdentitySession',
    propertyChanges: [
      {
        tenantId: null,
        entityChangeId: 'e64063d8-a327-feb9-70ad-3a1d5c5e8cd4',
        newValue: null,
        originalValue: '"324eb899-2008-4b73-98e4-3a09cf8d9d3b"',
        propertyName: 'TenantId',
        propertyTypeFullName: 'System.Guid',
        id: '9531084c-8350-9ece-fffe-3a1d5c5e8cd4',
      },
    ],
  },
  {
    id: 'f64063d8-a327-feb9-70ad-3a1d5c5e8cd5',
    auditLogId: 'b55e60df-c7f8-5dd1-e99e-3a1d5c5e8ccc',
    tenantId: null,
    changeTime: '2025-11-03T17:15:30.5372512',
    changeType: 1,
    entityId: '93d645d0-faca-b62f-ba8d-3a1d5aa9363c',
    entityTypeFullName: 'Volo.Abp.Identity.IdentityUser',
    propertyChanges: [
      {
        tenantId: null,
        entityChangeId: 'f64063d8-a327-feb9-70ad-3a1d5c5e8cd4',
        newValue: '"newvalue@example.com"',
        originalValue: '"oldvalue@example.com"',
        propertyName: 'Email',
        propertyTypeFullName: 'System.String',
        id: 'a531084c-8350-9ece-fffe-3a1d5c5e8cd4',
      },
    ],
  },
  {
    id: 'g64063d8-a327-feb9-70ad-3a1d5c5e8cd6',
    auditLogId: 'c65e60df-c7f8-5dd1-e99e-3a1d5c5e8ccc',
    tenantId: null,
    changeTime: '2025-11-03T16:10:22.8372512',
    changeType: 0,
    entityId: 'a3d645d0-faca-b62f-ba8d-3a1d5aa9363c',
    entityTypeFullName: 'WebNet.Organizations.Organization',
    propertyChanges: [
      {
        tenantId: null,
        entityChangeId: 'g64063d8-a327-feb9-70ad-3a1d5c5e8cd4',
        newValue: '"New Organization"',
        originalValue: null,
        propertyName: 'Name',
        propertyTypeFullName: 'System.String',
        id: 'b531084c-8350-9ece-fffe-3a1d5c5e8cd4',
      },
    ],
  },
];
