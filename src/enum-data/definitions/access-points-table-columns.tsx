import ActionButtons from '@/components/ui/action/action-buttons';
import { StatusIcon } from '@/components/ui/status-icon';
import { dateFormatter } from '@/helpers/format-data';
import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import {
  accessPointCommLineEnum,
  accessPointCommMethodEnum,
  accessPointCommTypeEnum,
  accessPointProtocolIdEnum,
  mqttConnectionProtocolEnum,
  mqttVersionEnum,
  opcConnectionProtocolEnum,
  opcMessageSecurityModeEnum,
} from './enum';

export const AccessPointsTableColumns = ({
  onEdit,
  queryKey,
}: {
  onEdit?: (row: any) => void;
  queryKey: string;
}) => [
    {
      header: getTranslatedValue('Active'),
      accessorKey: 'active',
      sort: 'Active',
      size: 50,
      cell: ({ row }: any) => {
        return <>{<StatusIcon status={row?.original?.active} />}</>;
      },
    },
    {
      header: getTranslatedValue('AccessPointName'),
      accessorKey: 'accessPointName',
      sort: 'AccessPointName',
    },
    {
      header: getTranslatedValue('AccessPointDescription'),
      accessorKey: 'accessPointDescription',
      sort: 'AccessPointDescription',
    },
    {
      header: getTranslatedValue('AccessPointCommType'),
      accessorKey: 'accessPointCommType',
      sort: 'AccessPointCommType',
      cell: ({ row }: any) => {
        const info = row?.original;
        return (
          <>
            {getTranslatedValue(
              accessPointCommTypeEnum[
              info?.accessPointCommType as keyof typeof accessPointCommTypeEnum
              ],
            ) ?? '-'}
          </>
        );
      },
    },
    {
      header: getTranslatedValue('AccessPointCommMethod'),
      accessorKey: 'accessPointCommMethod',
      sort: 'AccessPointCommMethod',
      cell: ({ row }: any) => {
        const info = row?.original;
        return (
          <>
            {getTranslatedValue(
              accessPointCommMethodEnum[
              info?.accessPointCommMethod as keyof typeof accessPointCommMethodEnum
              ],
            ) ?? '-'}
          </>
        );
      },
    },
    {
      header: getTranslatedValue('AccessPointProtocolId'),
      accessorKey: 'accessPointProtocolId',
      sort: 'AccessPointProtocolId',
      cell: ({ row }: any) => {
        const info = row?.original;
        return (
          <>
            {getTranslatedValue(
              accessPointProtocolIdEnum[
              info?.accessPointProtocolId as keyof typeof accessPointProtocolIdEnum
              ],
            ) ?? '-'}
          </>
        );
      },
    },
    {
      header: getTranslatedValue('AccessPointCommLine'),
      accessorKey: 'accessPointCommLine',
      sort: 'AccessPointCommLine',
      size: 100,
      cell: ({ row }: any) => {
        const info = row?.original;
        return (
          <>
            {getTranslatedValue(
              accessPointCommLineEnum[
              info?.accessPointCommLine as keyof typeof accessPointCommLineEnum
              ],
            ) ?? '-'}
          </>
        );
      },
    },
    {
      header: getTranslatedValue('AccessPointBackEndService'),
      accessorKey: 'accessPointBackEndService',
      sort: 'AccessPointBackEndService',
    },
    {
      header: getTranslatedValue('AccessPointPort'),
      accessorKey: 'accessPointPort',
      sort: 'AccessPointPort',
    },
    {
      header: getTranslatedValue('AccessPointSerialNr'),
      accessorKey: 'accessPointSerialNr',
      sort: 'AccessPointSerialNr',
    },
    {
      header: getTranslatedValue('AccessPointComPort'),
      accessorKey: 'accessPointComPort',
      sort: 'AccessPointComPort',
    },
    {
      header: getTranslatedValue('AccessPointLastConnTime'),
      accessorKey: 'accessPointLastConnTime',
      sort: 'AccessPointLastConnTime',
      cell: ({ row }: any) => {
        const info = row?.original;
        return (
          <>
            {info?.accessPointLastConnTime
              ? dateFormatter(info?.accessPointLastConnTime, true)
              : '-'}
          </>
        );
      },
    },
    {
      header: getTranslatedValue('AccessPointConnStatus'),
      accessorKey: 'accessPointConnStatus',
      sort: 'AccessPointConnStatus',
    },
    {
      header: getTranslatedValue('AccessPointLastThreadUpd'),
      accessorKey: 'accessPointLastThreadUpd',
      sort: 'AccessPointLastThreadUpd',
      size: 230,
      cell: ({ row }: any) => {
        const info = row?.original;
        return (
          <>
            {info?.accessPointLastThreadUpd
              ? dateFormatter(info?.accessPointLastThreadUpd)
              : '-'}
          </>
        );
      },
    },
    {
      header: getTranslatedValue('AccessPointTimeout'),
      accessorKey: 'accessPointTimeout',
      sort: 'AccessPointTimeout',
    },
    {
      header: getTranslatedValue('AccessPointQueryRetryCnt'),
      accessorKey: 'accessPointQueryRetryCnt',
      sort: 'AccessPointQueryRetryCnt',
    },
    {
      header: getTranslatedValue('AccessPointLogFlag'),
      accessorKey: 'accessPointLogFlag',
      sort: 'AccessPointLogFlag',
      size: 100,
      cell: ({ row }: any) => {
        return <>{<StatusIcon status={row?.original?.accessPointLogFlag} />}</>;
      },
    },
    {
      header: getTranslatedValue('AccessPointIp'),
      accessorKey: 'accessPointIp',
      sort: 'AccessPointIp',
    },
    {
      header: getTranslatedValue('SubscriberUserName'),
      accessorKey: 'subscriberUserName',
      sort: 'SubscriberUserName',
    },
    {
      header: getTranslatedValue('SubscriberPassword'),
      accessorKey: 'subscriberPassword',
      sort: 'SubscriberPassword',
    },
    {
      header: getTranslatedValue('SubscriberClientId'),
      accessorKey: 'subscriberClientId',
      sort: 'SubscriberClientId',
    },
    {
      header: getTranslatedValue('MqttConnectionProtocol'),
      accessorKey: 'mqttConnectionProtocol',
      sort: 'MqttConnectionProtocol',
      size: 100,
      cell: ({ row }: any) => {
        const info = row?.original;
        return (
          <>
            {getTranslatedValue(
              mqttConnectionProtocolEnum[
              info?.mqttConnectionProtocol as keyof typeof mqttConnectionProtocolEnum
              ],
            ) ?? '-'}
          </>
        );
      },
    },
    {
      header: getTranslatedValue('MqttVersion'),
      accessorKey: 'mqttVersion',
      sort: 'MqttVersion',
      size: 100,
      cell: ({ row }: any) => {
        const info = row?.original;
        return (
          <>
            {getTranslatedValue(
              mqttVersionEnum[info?.mqttVersion as keyof typeof mqttVersionEnum],
            ) ?? '-'}
          </>
        );
      },
    },
    {
      header: getTranslatedValue('SSLVersion'),
      accessorKey: 'sslVersion',
      sort: 'SSLVersion',
    },
    {
      header: getTranslatedValue('OpcConnectionUrl'),
      accessorKey: 'opcConnectionUrl',
      sort: 'OpcConnectionUrl',
    },
    {
      header: getTranslatedValue('OpcUserName'),
      accessorKey: 'opcUserName',
      sort: 'OpcUserName',
    },
    {
      header: getTranslatedValue('OpcPassword'),
      accessorKey: 'opcPassword',
      sort: 'OpcPassword',
    },
    {
      header: getTranslatedValue('OpcConnectionProtocol'),
      accessorKey: 'opcConnectionProtocol',
      sort: 'OpcConnectionProtocol',
      size: 230,
      cell: ({ row }: any) => {
        const info = row?.original;
        return (
          <>
            {getTranslatedValue(
              opcConnectionProtocolEnum[
              info?.opcConnectionProtocol as keyof typeof opcConnectionProtocolEnum
              ],
            ) ?? '-'}
          </>
        );
      },
    },
    {
      header: getTranslatedValue('OpcNodeId'),
      accessorKey: 'opcNodeId',
      sort: 'OpcNodeId',
    },
    {
      header: getTranslatedValue('Certificate'),
      accessorKey: 'certificate',
      sort: 'Certificate',
    },
    {
      header: getTranslatedValue('PrivateKey'),
      accessorKey: 'privateKey',
      sort: 'PrivateKey',
    },
    {
      header: getTranslatedValue('CACertificate'),
      accessorKey: 'caCertificate',
      sort: 'CACertificate',
    },
    {
      header: getTranslatedValue('OpcMessageSecurityMode'),
      accessorKey: 'opcMessageSecurityMode',
      sort: 'OpcMessageSecurityMode',
      size: 150,
      cell: ({ row }: any) => {
        const info = row?.original;
        return (
          <>
            {getTranslatedValue(
              opcMessageSecurityModeEnum[
              info?.opcMessageSecurityMode as keyof typeof opcMessageSecurityModeEnum
              ],
            ) ?? '-'}
          </>
        );
      },
    },
    {
      header: getTranslatedValue('AccessPointConfPort'),
      accessorKey: 'accessPointConfPort',
      sort: 'AccessPointConfPort',
    },
    {
      header: getTranslatedValue('Actions'),
      accessorKey: '',
      sort: '',
      size: 100,
      cell: ({ row }: any) => {
        return (
          <ActionButtons
            deleteUrl={`app/access-points/${row?.original?.id}?api-version=${import.meta.env.VITE_API_VERSION}`}
            queryKey={queryKey}
            disabledDelete={!getPermission('WebNet.AccessPoints.Delete')}
            disabledEdit={!getPermission('WebNet.AccessPoints.Edit')}
            updateHandler={() => {
              onEdit?.(row?.original);
            }}
          />
        );
      },
    },
  ];
