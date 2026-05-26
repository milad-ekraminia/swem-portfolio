import { alarmLevelType } from '@/enum-data/definitions/enum';
import { plantEnergyType } from '@/enum-data/organization-trace/org-trace-index';
import { formatNumberWithCommas } from '@/helpers/format-number-with-commas';
import { getTranslatedValue } from '@/helpers/get-translated-value';


export const PanelsTableColumns = () => [
  {
    header: getTranslatedValue('em_weather_city'),
    accessorKey: 'provinceName',
    sort: '',
  },
  {
    header: getTranslatedValue('Status'),
    accessorKey: 'alarmLevelType',
    sort: '',
    cell: ({ row }: any) => {
      const value = row.original.alarmLevelType;

      return value
        ? (
          <div className={`badge-status ${row.original.alarmLevelType === 1 || row.original.alarmLevelType === 10 ? "warning" :
            row.original.alarmLevelType === 2 ? "critical" :
              row.original.alarmLevelType === 3 ? "dangerous" : "success"
            }`
          }>
            <div className="dot"></div>
            {
              row.original.alarmLevelType < 1 ? getTranslatedValue("Active") :
                getTranslatedValue(`Enum:AlarmLevelType.${alarmLevelType[row.original.alarmLevelType as keyof typeof alarmLevelType]}`)}
          </div>
        )
        : '-';
    },
  },
  {
    header: getTranslatedValue('Plant'),
    accessorKey: 'plantCounts',
    sort: '',
  },
  {
    header: getTranslatedValue('EnergyType'),
    accessorKey: 'plantEnergyType',
    sort: '',
    cell: ({ row }: any) => {
      const value = row.original.plantEnergyType;

      return value
        ? getTranslatedValue(
          `Enum:PlantEnergyType.${plantEnergyType[value as keyof typeof plantEnergyType]
          }`,
        )
        : '-';
    },
  },
  {
    header: getTranslatedValue('em_org_plant_weather_info'),
    accessorKey: 'temperature',
    sort: '',
  },
  {
    header: getTranslatedValue('DeviceDCRatedPower'),
    accessorKey: 'dcRatedPower',
    sort: '',
    cell: ({ row }: any) => {
      const value = row.original.dcRatedPower;
      return formatNumberWithCommas(value, 2)
    },
  },
  {
    header: getTranslatedValue('DeviceACLimitedPower'),
    accessorKey: 'acRatedPower',
    sort: '',
    cell: ({ row }: any) => {
      const value = row.original.acRatedPower;
      return formatNumberWithCommas(value, 2)
    },
  }
];