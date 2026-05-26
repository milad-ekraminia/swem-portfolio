import { dateFormatter, formatTime } from '@/helpers/format-data';
import { ApproveAlarmComponent } from './approve-alarm';

export const passiveAlarmsTableColumns = ({ refetch, hasAlarms }: any) => [
  {
    header: 'Organization',
    accessorKey: 'deviceOrganizationName',
    sort: 'DeviceOrganizationName',
    size: 200,
    cell: ({ row }: any) => {
      const getIconColor = () => {
        if (row?.original?.alarmConfLevel === 2) return '#EF6820';
        if (row?.original?.alarmConfLevel === 3) return '#D92D20';
        if (row?.original?.alarmConfLevel === 1) return '#FDB022';
        return '';
      };

      return (
        <span style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '100%',
              backgroundColor: getIconColor(),
              padding: '4px',
            }}
          />
          <span>{row?.original?.deviceOrganizationName}</span>
        </span>
      );
    },
  },

  {
    header: 'Device',
    accessorKey: 'deviceDescription',
    sort: 'DeviceDescription',
    size: 200,
  },

  ...(hasAlarms
    ? [
        {
          header: 'Alarm Create Date',
          accessorKey: 'iotmanager_mail_body_alarmcreatedate',
          size: 200,
          sort: 'AlarmDescription',
          cell: ({ row }: any) => {
            return dateFormatter(row?.original?.creationTime, true);
          },
        },
      ]
    : [
        {
          header: 'Device Model',
          accessorKey: 'deviceModelName',
          size: 150,
          sort: 'DeviceModelName',
        },
      ]),

  {
    header: 'Alarm Description',
    accessorKey: 'alarmDescription',
    sort: 'AlarmDescription',
    size: 200,
  },

  {
    header: 'Alarm Duration',
    accessorKey: 'alarmTime',
    sort: 'AlarmTime',
    size: 100,
    cell: ({ row }: any) => {
      return formatTime(row?.original?.alarmTime);
    },
  },

  {
    header: 'Alarm Approval',
    accessorKey: '',
    sort: 'AlarmApproved',
    size: 200,
    cell: ({ row }: any) => {
      return <ApproveAlarmComponent isPassive row={row} refetch={refetch} />;
    },
  },

  {
    header: 'Updated By',
    accessorKey: 'UpdatedBy',
    sort: 'UpdatedBy',
    size: 280,
    cell: ({ row }: any) => {
      const info = row?.original;
      const dateTime = info?.alarmApprovedDateTime;

      return (
        <>
          {dateTime ? (
            <>
              {info?.lastUpdateUserFullName || '- - -'} -{' '}
              {dateFormatter(dateTime?.split('T')[0])}&nbsp;
              {dateTime?.split('T')[1].split('.')[0]}
            </>
          ) : (
            '--'
          )}
        </>
      );
    },
  },
];