import { dateFormatter, formatTime } from '@/helpers/format-data';
import { getPermission } from '@/helpers/get-permission-helper';
import { ApproveAlarmComponent } from './approve-alarm';


export const activeAlarmsTableColumns = ({
  refetch,
  hasAlarms,
  isPassive,
}: any) => [
  {
    header: "Organization",
    accessorKey: "deviceOrganizationName",
    size: 200,
    sort: "DeviceOrganizationName",
    cell: ({ row }: any) => {
      const getIconColor = () => {
        if (row?.original?.alarmConfLevel === 2) return "#EF6820"; // critical
        if (row?.original?.alarmConfLevel === 3) return "#D92D20"; // danger
        if (row?.original?.alarmConfLevel === 1) return "#FDB022"; // warning
        return "";
      };

      return (
        <span style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "100%",
              backgroundColor: getIconColor(),
              padding: "4px",
            }}
          />
          <span>{row?.original?.deviceOrganizationName}</span>
        </span>
      );
    },
  },
  {
    header: "Device",
    accessorKey: "deviceDescription",
    size: 180,
    sort: "DeviceDescription",
  },

  ...(hasAlarms
    ? [
        {
          header: "Alarm Create Date",
          accessorKey: "iotmanager_mail_body_alarmcreatedate",
          size: 200,
          sort: "AlarmDescription",
          cell: ({ row }: any) => {
            return dateFormatter(row?.original?.creationTime, true);
          },
        },
      ]
    : [
        {
          header: "Device Model",
          accessorKey: "deviceModelName",
          size: 150,
          sort: "DeviceModelName",
        },
      ]),

  {
    header: "Alarm Description",
    accessorKey: "alarmDescription",
    size: 200,
    sort: "AlarmDescription",
  },

  {
    header: "Alarm Duration",
    accessorKey: "alarmTime",
    cell: ({ row }: any) => {
      return formatTime(row?.original?.alarmTime);
    },
    size: 100,
    sort: "AlarmTime",
  },

  ...(getPermission("WebNet.Alarms.Management")
    ? [
        {
          header: "Alarm Approval",
          accessorKey: "",
          sort: "AlarmApproved",
          size: 280,
          cell: ({ row }: any) => (
            <ApproveAlarmComponent
              isPassive={isPassive}
              row={row}
              refetch={refetch}
            />
          ),
        },
      ]
    : []),

  {
    header: "Updated By",
    accessorKey: "UpdatedBy",
    sort: "UpdatedBy",
    size: 280,
    cell: ({ row }: any) => {
      const info = row?.original;
      const dateTime = info?.alarmApprovedDateTime;

      return (
        <>
          {dateTime ? (
            <>
              {info?.lastUpdateUserFullName || "- - -"} -{" "}
              {dateFormatter(dateTime, true, false, true)}
            </>
          ) : (
            "--"
          )}
        </>
      );
    },
  },
];