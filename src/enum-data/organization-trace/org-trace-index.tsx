import { dateFormatter } from '@/helpers/format-data';
import { formatNumberWithCommas } from '@/helpers/format-number-with-commas';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import Image from '@/components/ui/image/image';


export const cardsTitle = () => [
  {
    title: 'WidgetHeader:TotalPower',
    desc: 'WidgetHeader:TotalPower',
    unit: 'kW',
  },
  {
    title: 'IndCurrentDayActive1ExpCons',
    desc: 'production_revenue',
    unit: 'KWh',
  },
  {
    title: 'IndCurrentMonthActive1ExpCons',
    desc: 'production_revenue',
    unit: 'MWh',
  },
  {
    title: 'IndCurrentYearActive1ExpCons',
    desc: 'production_revenue',
    unit: 'MWh',
  },
];
export const plantEnergyType = {
  1: 'SunLand',
  2: 'Wind',
  3: 'Hydro',
  4: 'SunRoof',
};
export const plantSummaryColumns = (
  handleAlarmClick: (info: any) => void,
  handlePlantNavigate: (info: any) => void,
) => [
    {
      header: getTranslatedValue('em_org_plant_name'),
      accessorKey: 'organizationName',
      size: 180,
      cell: ({ row }: any) => {
        const info = row.original;

        return (
          <div
            style={{
              left: '-4px',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <div
              aria-label="commActiveAlarmCount"
              style={{
                width: '18px',
                height: '18px',
                backgroundColor:
                  info?.commActiveAlarmCount !== 0 ? '#D92D20' : '#079455',
                borderRadius: '4px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#ffffff',
                fontWeight: '600',
                fontSize: '12px',
              }}
              onClick={() => {
                if (info?.commActiveAlarmCount > 0) {
                  handleAlarmClick(info);
                }
              }}
            >
              {info?.commActiveAlarmCount > 0 ? info?.commActiveAlarmCount : null}
            </div>
            <span
              onClick={() => {
                handlePlantNavigate(info);
              }}
            >
              {info?.organizationName}
            </span>
          </div>
        );
      },
      sort: 'OrganizationName',
    },
    {
      header: getTranslatedValue('em_energy_type'),
      accessorKey: 'organizationPlantEnergyType',
      cell: ({ row }: any) => {
        const value = row.original.organizationPlantEnergyType;

        return value
          ? getTranslatedValue(
            `Enum:PlantEnergyType.${plantEnergyType[value as keyof typeof plantEnergyType]
            }`,
          )
          : '-';
      },
      sort: 'OrganizationPlantEnergyType',
      size: 150,
    },
    {
      header: getTranslatedValue('em_org_plant_weather_info'),
      accessorKey: 'weatherImage',
      size: 100,
      cell: ({ row }: any) => {
        const image = row.original?.weatherImage;

        return image ? (
          <Image
            className="max-30"
            src={`${import.meta.env.VITE_MAIN_URL}/images/weather-images/${image}`}
            alt="weather-icon"
          />
        ) : (
          '-'
        );
      },
      sort: 'WeatherImage',
    },
    {
      header: getTranslatedValue('em_inv_dc_rated_power'),
      accessorKey: 'deviceDCRatedPower',
      flex: 'unset',
      size: 140,
      sort: 'DeviceDCRatedPower',
      cell: ({ row }: any) => {
        const info = row.original;
        return <> {formatNumberWithCommas(info?.deviceDCRatedPower ?? 0, 3)}</>;
      },
    },
    {
      header: getTranslatedValue('em_inv_ac_limited_power'),
      accessorKey: 'deviceACLimitedPower',
      flex: 'unset',
      size: 120,
      sort: 'DeviceACLimitedPower',
      cell: ({ row }: any) => {
        const info = row.original;
        return <> {formatNumberWithCommas(info?.deviceACLimitedPower ?? 0, 3)}</>;
      },
    },
    {
      header: getTranslatedValue('production_active_power'),
      accessorKey: 'invACActPowerTotal',
      flex: 'unset',
      size: 100,
      sort: 'InvACActPowerTotal',
      cell: ({ row }: any) => {
        const info = row.original;
        return <> {formatNumberWithCommas(info?.invACActPowerTotal ?? 0, 3)}</>;
      },
    },
    {
      header: getTranslatedValue('radiation'),
      accessorKey: 'compensatedRadiation',
      flex: 'unset',
      size: 130,

      sort: 'CompensatedRadiation',
      cell: ({ row }: any) => {
        const info = row.original;
        return <> {formatNumberWithCommas(info?.compensatedRadiation ?? 0, 3)}</>;
      },
    },
    {
      header: getTranslatedValue('em_re_production'),
      accessorKey: 'production',
      flex: 'unset',
      sort: 'SystemPerformanceRatio',
      size: 100,
      cell: ({ row }: any) => {
        const info = row.original;
        return <> {formatNumberWithCommas(info?.production ?? 0, 3)}</>;
      },
    },
    {
      header: getTranslatedValue('em_re_spr'),
      accessorKey: 'em_re_spr',
      flex: 'unset',
      sort: 'SpecificProduction',
      size: 100,
      cell: ({ row }: any) => {
        const info = row.original;
        return <> {formatNumberWithCommas(info?.em_re_spr ?? 0, 3)}</>;
      },
    },
    {
      header: getTranslatedValue('em_re_specific_production'),
      accessorKey: 'specificProduction',
      flex: 'unset',
      size: 180,
      sort: 'SpecificProduction',
      cell: ({ row }: any) => {
        const info = row.original;
        return <> {formatNumberWithCommas(info?.specificProduction ?? 0, 3)}</>;
      },
    },
    {
      header: getTranslatedValue('em_re_eao'),
      accessorKey: 'eao',
      flex: 'unset',
      sort: 'EAO',
      size: 50,
      cell: ({ row }: any) => {
        const info = row.original;
        return <> {formatNumberWithCommas(info?.eao ?? 0, 3)}</>;
      },
    },
    {
      header: getTranslatedValue('em_re_inverter_status'),
      accessorKey: 'inverterCount',
      flex: 'unset',
      size: 100,
      sort: 'InverterCount',
      cell: ({ row }: any) => {
        const info = row.original;

        return (
          <>
            {info?.inverterCount - info?.inverterWorkCount || 0} /{' '}
            {info?.inverterCount}
          </>
        );
      },
    },
    {
      header: getTranslatedValue('last_success_communication_time'),
      accessorKey: 'deviceLastSuccessComm',
      flex: 'unset',
      size: 150,
      sort: 'DeviceLastSuccessComm',
      cell: ({ row }: any) => {
        const info = row.original;

        return info?.deviceLastSuccessComm
          ? dateFormatter(info?.deviceLastSuccessComm, true, false, true)
          : '-';
      },
    },
  ];

export const summaryTableColumns = () => [
  {
    header: "Plant Name",
    accessorKey: "organizationName",
    size: 150,
    sort: "OrganizationName",
  },
  {
    header: "DC Rated Power",
    accessorKey: "deviceDCRatedPower",
    size: 120,
    sort: "DeviceDCRatedPower",
  },
  {
    header: "AC Limited Power",
    accessorKey: "deviceACLimitedPower",
    size: 100,
    sort: "DeviceACLimitedPower",
  },
  {
    header: "AC Active Power Total",
    accessorKey: "invACActPowerTotal",
    size: 120,
    sort: "InvACActPowerTotal",
  },
  {
    header: "Production",
    accessorKey: "production",
    size: 100,
    sort: "Production",
  },
  {
    header: "EAO",
    accessorKey: "eao",
    size: 150,
    sort: "EAO",
  },
  {
    header: "Inverter Status",
    accessorKey: "inverterCount",
    size: 150,
    sort: "InverterCount",
  },
  {
    header: "Last Communication Time",
    accessorKey: "deviceLastSuccessComm",
    size: 180,
    sort: "DeviceLastSuccessComm",
  },
];

export const communicationTableColumns = () => [
  {
    header: 'Device Model',
    accessorKey: 'deviceModelName',
    sort: 'DeviceModelName',
    size: 250,
  },
  {
    header: 'Online',
    accessorKey: 'online',
    sort: 'Online',
  },
  {
    header: 'Offline',
    accessorKey: 'offline',
    sort: 'Offline',
  },
  {
    header: 'Passive',
    accessorKey: 'passive',
    sort: 'Passive',
  },
];


export const treeFilterMultiOptions = () => [
  { displayName: getTranslatedValue('Warning'), value: 1, id: 1 },
  { displayName: getTranslatedValue('Critical'), value: 2, id: 2 },
  { displayName: getTranslatedValue('Danger'), value: 3, id: 3 },
];
export const treeFilterSingleOptions = [
  { displayName: getTranslatedValue('ShowAllDevices'), value: 'all', id: 1 },
  { displayName: getTranslatedValue('ActiveDevices'), value: 'active', id: 2 },
  {
    displayName: getTranslatedValue('PassiveDevices'),
    value: 'disabled',
    id: 3,
  },
];
export const datePickerFormatOptions = () => [
  {
    displayName: getTranslatedValue('Daily'),
    value: 'Daily',
    id: 1,
  },
  {
    displayName: getTranslatedValue('Monthly'),
    value: 'Monthly',
    id: 2,
  },
  {
    displayName: getTranslatedValue('Yearly'),
    value: 'Yearly',
    id: 3,
  },
];
export const datePickerShortCutLists = [
  {
    displayName: getTranslatedValue('Today'),
    value: 'today',
    id: 1,
  },
  {
    displayName: getTranslatedValue('Yesterday'),
    value: 'yesterday',
    id: 2,
  },
  {
    displayName: getTranslatedValue('This Month'),
    value: 'this month',
    id: 3,
  },
  {
    displayName: getTranslatedValue('This Year'),
    value: 'this year',
    id: 4,
  },
];
const getIconColor = (status: any) => {
  if (status === 2)
    return {
      color: '#EF6820',
      bg: '#FEF6EE',
      border: '#F9DBAF',
      iconColor: '#EF6820',
    };
  if (status === 3)
    return {
      color: '#B42318',
      bg: '#FEF3F2',
      border: '#FECDCA',
      iconColor: '#F04438',
    };
  if (status === 1)
    return {
      color: '#B54708',
      bg: '#FFFAEB',
      border: '#FEDF89',
      iconColor: '#F79009',
    };
  return { color: '', bg: '', border: '' };
};

const getStatus = (stat: any) => {
  if (stat == -1) {
    return '-';
  } else if (stat == 1) {
    return getTranslatedValue('Warning');
  } else if (stat == 2) {
    return getTranslatedValue('Critical');
  } else if (stat == 3) {
    return getTranslatedValue('Danger');
  }
};

export const alarmModalTableColumns = [
  {
    header: getTranslatedValue('Device'),
    accessorKey: 'deviceDescription',
    sort: '',
    size: 200,
  },
  {
    header: getTranslatedValue('AlarmDescription'),
    accessorKey: 'alarmDescription',
    sort: '',
    size: 200,
  },
  {
    header: getTranslatedValue('AlarmLevel'),
    accessorKey: 'alarmConfLevel',
    sort: '',
    size: 100,
    cell: ({ row }: any) => {
      const info = row.original;
      const colors = getIconColor(info?.alarmConfLevel);
      return info?.alarmConfLevel > 0 ? (
        <div
          className="modal-alarm-table-item"
          style={{ backgroundColor: colors?.bg, borderColor: colors?.border }}
        >
          <span
            className="dot"
            style={{ backgroundColor: colors?.iconColor }}
          ></span>
          <span className="title" style={{ color: colors?.color }}>
            {getStatus(info?.alarmConfLevel)}
          </span>
        </div>
      ) : (
        <>-</>
      );
    },
  },
  {
    header: getTranslatedValue('StartDate'),
    accessorKey: 'creationTime',
    sort: '',
    size: 150,
    cell: ({ row }: any) => {
      const info = row.original;

      return dateFormatter(info?.creationTime, true, false, true);
    },
  },
];

export const plantDetailTableColumns = () => [
  {
    header: getTranslatedValue('DeviceDescription'),
    accessorKey: 'deviceDescription',
    sort: 'DeviceDescription',
    size: 150,
  },
  {
    header: getTranslatedValue('DeviceDCRatedPower'),
    accessorKey: 'deviceDCRatedPower',
    sort: 'DeviceDCRatedPower',
    size: 120,
    cell: ({ row }: any) => {
      const info = row.original;

      return <>{formatNumberWithCommas(info?.deviceDCRatedPower ?? 0, 3)} </>;
    },
  },
  {
    header: getTranslatedValue('DeviceACRatedPower'),
    accessorKey: 'deviceACRatedPower',
    sort: 'DeviceACRatedPower',
    size: 140,
    cell: ({ row }: any) => {
      const info = row.original;

      return <>{formatNumberWithCommas(info?.deviceACRatedPower ?? 0, 3)} </>;
    },
  },
  {
    header: getTranslatedValue('DeviceACLimitedPower'),
    accessorKey: 'deviceACLimitedPower',
    sort: 'DeviceACLimitedPower',
    size: 140,
    cell: ({ row }: any) => {
      const info = row.original;

      return <>{formatNumberWithCommas(info?.deviceACLimitedPower ?? 0, 3)} </>;
    },
  },
  {
    header: getTranslatedValue('ActivePowerWUnit'),
    accessorKey: 'invACActPowerTotal',
    sort: 'InvACActPowerTotal',
    size: 80,
    cell: ({ row }: any) => {
      const info = row.original;

      return <>{formatNumberWithCommas(info?.invACActPowerTotal ?? 0, 3)} </>;
    },
  },
  {
    header: getTranslatedValue('ComparisonWUnit'),
    accessorKey: 'comparison',
    sort: 'DeviceDCRatedPower',
    size: 100,
    cell: ({ row }: any) => {
      const info = row.original;

      return <>{formatNumberWithCommas(info?.comparison ?? 0, 3)} </>;
    },
  },
  {
    header: getTranslatedValue('Production'),
    accessorKey: 'production',
    sort: 'Production',
    size: 150,
    cell: ({ row }: any) => {
      const info = row.original;

      return <>{formatNumberWithCommas(info?.production ?? 0, 3)} </>;
    },
  },
  {
    header: getTranslatedValue('em_re_eao'),
    accessorKey: 'eao',
    sort: 'EAO',
    size: 50,
    cell: ({ row }: any) => {
      const info = row.original;

      return <>{formatNumberWithCommas(info?.eao ?? 0, 3)} </>;
    },
  },
  {
    header: getTranslatedValue('ActiveAlarmCount'),
    accessorKey: 'approvedActiveAlarmCount',
    sort: 'ActiveAlarmCount',
    size: 150,
    cell: ({ row }: any) => {
      const info = row.original;

      return (
        <>
          {info?.approvedActiveAlarmCount ?? 0} /{info?.activeAlarmCount ?? 0}
        </>
      );
    },
  },
  {
    header: getTranslatedValue('DeviceLastSuccessComm'),
    accessorKey: 'activeAlarmCount',
    sort: 'DeviceLastSuccessComm',
    size: 200,
    cell: ({ row }: any) => {
      const info = row.original;

      return dateFormatter(info?.deviceLastSuccessComm, true);
    },
  },
];

const productionForecastValue = (info: any, period_type: any) => {
  if (period_type === 'Daily') {
    return info?.productionCalculatedForecast / 30;
  } else if (period_type === 'Yearly') {
    return info?.productionCalculatedForecast * 12;
  } else {
    return info?.productionCalculatedForecast / 100 || 0;
  }
};

export const productionForecastTableColumns = (period_type: any) => [
  {
    header: getTranslatedValue('DeviceDescription'),
    accessorKey: 'deviceDescription',
    sort: 'DeviceDescription',
    size: 130,
  },
  {
    header: getTranslatedValue('DeviceDCRatedPower'),
    accessorKey: 'deviceDCRatedPower',
    sort: 'DeviceDCRatedPower',
    size: 120,
    cell: ({ row }: any) => {
      const info = row.original;
      return <>{formatNumberWithCommas(info?.deviceDCRatedPower ?? 0, 3)}</>;
    },
  },
  {
    header: getTranslatedValue('DeviceACRatedPower'),
    accessorKey: 'deviceACRatedPower',
    sort: 'DeviceACRatedPower',
    size: 120,
    cell: ({ row }: any) => {
      const info = row.original;
      return <>{formatNumberWithCommas(info?.deviceACRatedPower ?? 0, 3)}</>;
    },
  },
  {
    header: getTranslatedValue('DeviceACLimitedPower'),
    accessorKey: 'deviceACLimitedPower',
    sort: 'DeviceACLimitedPower',
    size: 120,
    cell: ({ row }: any) => {
      const info = row.original;
      return <>{formatNumberWithCommas(info?.deviceACLimitedPower ?? 0, 3)}</>;
    },
  },
  {
    header: getTranslatedValue('EAO'),
    accessorKey: 'eao',
    sort: 'EAO',
    size: 50,
    cell: ({ row }: any) => {
      const info = row.original;
      return <>{formatNumberWithCommas(info?.eao ?? 0, 3)}</>;
    },
  },
  {
    header: getTranslatedValue('ProductionForecastWUnit'),
    accessorKey: 'productionCalculatedForecast',
    sort: 'ProductionCalculatedForecast',
    size: 120,
    cell: ({ row }: any) => {
      const info = row.original;
      return (
        <>
          {formatNumberWithCommas(
            productionForecastValue(info, period_type) ?? 0,
            3,
          )}
        </>
      );
    },
  },
  {
    header: getTranslatedValue('Production'),
    accessorKey: 'production',
    sort: 'Production',
    size: 80,
    cell: ({ row }: any) => {
      const info = row.original;
      return <>{formatNumberWithCommas(info?.production ?? 0, 3)}</>;
    },
  },
  {
    header: getTranslatedValue('Prediction'),
    accessorKey: 'predictionData',
    sort: 'PredictionData',
    size: 80,
    cell: ({ row }: any) => {
      const info = row.original;
      return <>{formatNumberWithCommas(info?.predictionData ?? 0, 3)}</>;
    },
  },
  {
    header: getTranslatedValue('PredictionAccuracyRate'),
    accessorKey: 'predictionAccuracyRate',
    sort: 'PredictionAccuracyRate',
    size: 200,
    cell: ({ row }: any) => {
      const info = row.original;
      return (
        <>{formatNumberWithCommas(info?.predictionAccuracyRate ?? 0, 3)}</>
      );
    },
  },
];

export const deviceIndexValueListTableColumns = () => [
  {
    header: getTranslatedValue('IndexValueName'),
    accessorKey: 'name',
    sort: 'Name',
    size: 150,
  },
  {
    header: getTranslatedValue('ActiveImp'),
    accessorKey: 'activeImp',
    sort: 'ActiveImp',
    size: 150,
    cell: ({ row }: any) => {
      const info = row.original;
      return <>{formatNumberWithCommas(info?.activeImp ?? 0, 3)}</>;
    },
  },
  {
    header: getTranslatedValue('ActiveExpBase'),
    accessorKey: 'activeExpBase',
    sort: 'ActiveExp',
    size: 150,
    cell: ({ row }: any) => {
      const info = row.original;
      return <>{formatNumberWithCommas(info?.activeExp ?? 0, 3)}</>;
    },
  },
  {
    header: getTranslatedValue('ActiveExp'),
    accessorKey: 'activeExp',
    sort: 'ActiveExp',
    size: 150,
    cell: ({ row }: any) => {
      const info = row.original;
      return <>{formatNumberWithCommas(info?.activeExp ?? 0, 3)}</>;
    },
  },
  {
    header: getTranslatedValue('ReactiveImp'),
    accessorKey: 'reactiveImp',
    sort: 'ReactiveImp',
    size: 150,
    cell: ({ row }: any) => {
      const info = row.original;
      return <>{formatNumberWithCommas(info?.reactiveImp ?? 0, 3)}</>;
    },
  },
  {
    header: getTranslatedValue('ReactiveExp'),
    accessorKey: 'reactiveExp',
    sort: 'ReactiveExp',
    size: 150,
    cell: ({ row }: any) => {
      const info = row.original;
      return <>{formatNumberWithCommas(info?.reactiveExp ?? 0, 3)}</>;
    },
  },
];

export const deviceInverterInstantValueTableColumns = () => [
  {
    header: getTranslatedValue('measurement'),
    accessorKey: 'name',
    sort: 'Name',
    size: 150,
  },
  {
    header: getTranslatedValue('phase_1'),
    accessorKey: 'phase1',
    sort: 'Phase1',
    size: 150,
    cell: ({ row }: any) => {
      const info = row.original;
      return <>{formatNumberWithCommas(info?.phase1 ?? 0, 3)}</>;
    },
  },
  {
    header: getTranslatedValue('phase_2'),
    accessorKey: 'phase2',
    sort: 'Phase2',
    size: 150,

    cell: ({ row }: any) => {
      const info = row.original;
      return <>{formatNumberWithCommas(info?.phase2 ?? 0, 3)}</>;
    },
  },
  {
    header: getTranslatedValue('phase_3'),
    accessorKey: 'phase3',
    sort: 'Phase3',
    size: 150,
    cell: ({ row }: any) => {
      const info = row.original;
      return <>{formatNumberWithCommas(info?.phase3 ?? 0, 3)}</>;
    },
  },
  {
    header: getTranslatedValue('avg_total_short'),
    accessorKey: 'avgTotal',
    sort: 'AvgTotal',
    size: 150,
    cell: ({ row }: any) => {
      const info = row.original;
      return <>{formatNumberWithCommas(info?.avgTotal ?? 0, 3)}</>;
    },
  },
];

export const stringValuesTableColumns = () => [
  {
    header: getTranslatedValue('InverterStringValueName'),
    accessorKey: 'name',
    sort: 'Name',
    size: 150,
  },
  {
    header: getTranslatedValue('InputVoltage'),
    accessorKey: 'voltage',
    sort: 'Voltage',
    size: 150,
    cell: ({ row }: any) => {
      const info = row.original;
      return <>{formatNumberWithCommas(info?.voltage, 3)}</>;
    },
  },
  {
    header: getTranslatedValue('InputCurrent'),
    accessorKey: 'current',
    sort: 'Current',
    size: 150,
    cell: ({ row }: any) => {
      const info = row.original;
      return <>{formatNumberWithCommas(info?.voltage, 3)}</>;
    },
  },
];
export const inverterStatusTableColumn = () => [
  {
    header: getTranslatedValue('measurement'),
    accessorKey: 'name',
    sort: 'Name',
    size: 350,
    cell: ({ row }: any) => {
      const info = row.original;
      return (
        <>
          {info.name} {info.unit ?? ''}
        </>
      );
    },
  },
  {
    header: getTranslatedValue('value'),
    accessorKey: 'phase',
    sort: 'Phase',
    size: 350,
    cell: ({ row }: any) => {
      const info = row.original;
      return <>{formatNumberWithCommas(info?.phase ?? 0, 3)}</>;
    },
  },
];
export const inverterCalculatedDataTableColumns = () => [
  {
    header: getTranslatedValue('measurement'),
    accessorKey: 'name',
    sort: 'Name',
    size: 350,
  },
  {
    header: getTranslatedValue('value'),
    accessorKey: 'phase',
    sort: 'Phase',
    size: 350,
    cell: ({ row }: any) => {
      const info = row.original;
      return <>{formatNumberWithCommas(info?.phase ?? 0, 3)}</>;
    },
  },
];
export const inverterDetailsTableColumns = () => [
  {
    header: getTranslatedValue('ValueName'),
    accessorKey: 'key1',
    size: 250,
    cell: ({ row }: any) => {
      const info = row.original;
      return <>{getTranslatedValue(info?.key)}</>;
    },
  },
  {
    header: getTranslatedValue('value'),
    accessorKey: 'value',
    sort: '',
    size: 350,
  },
];

export const SensorValuesTableHeaders = () => [
  {
    header: getTranslatedValue('measurement'),
    accessorKey: 'key1',
    sort: 'Name',

    size: 250,
    cell: ({ row }: any) => {
      const info = row.original;
      return (
        <>
          {info.name} {info.unit ?? ''}
        </>
      );
    },
  },
  {
    header: getTranslatedValue('value'),
    accessorKey: 'value',
    sort: 'Phase',
    size: 350,
    cell: ({ row }: any) => {
      const info = row.original;
      return <>{formatNumberWithCommas(info.value ?? 0, 3)}</>;
    },
  },
];
export const deviceInverterInstantValueTableHeaders = () => [
  {
    header: getTranslatedValue('measurement'),
    accessorKey: 'name',
    sort: 'Name',
    size: 150,
    cell: ({ row }: any) => {
      const info = row.original;
      return <>{getTranslatedValue(info.name)}</>;
    },
  },
  {
    header: getTranslatedValue('phase_1'),
    accessorKey: 'phase1',
    sort: 'Phase1',
    size: 150,
    cell: ({ row }: any) => {
      const info = row.original;
      return <>{formatNumberWithCommas(info.phase1 ?? 0, 3)}</>;
    },
  },
  {
    header: getTranslatedValue('phase_2'),
    accessorKey: 'phase2',
    sort: 'Phase2',
    size: 150,
    cell: ({ row }: any) => {
      const info = row.original;
      return <>{formatNumberWithCommas(info.phase2 ?? 0, 3)}</>;
    },
  },
  {
    header: getTranslatedValue('phase_3'),
    accessorKey: 'phase3',
    sort: 'Phase3',
    size: 150,
    cell: ({ row }: any) => {
      const info = row.original;
      return <>{formatNumberWithCommas(info.phase3 ?? 0, 3)}</>;
    },
  },
  {
    header: getTranslatedValue('avg_total_short'),
    accessorKey: 'avgTotal',
    sort: 'AvgTotal',
    size: 150,
    cell: ({ row }: any) => {
      const info = row.original;
      return <>{formatNumberWithCommas(info.avgTotal ?? 0, 3)}</>;
    },
  },
];

export const instantDataChartParameters = () => [
  {
    title: getTranslatedValue('em_instant_voltage'),
    value: 0,
  },
  {
    title: getTranslatedValue('em_instant_voltage_line_line'),
    value: 1,
  },
  {
    title: getTranslatedValue('em_instant_current'),
    value: 2,
  },
  {
    title: getTranslatedValue('em_instant_active_power'),
    value: 3,
  },
  {
    title: getTranslatedValue('em_instant_reactive_power'),
    value: 4,
  },
  {
    title: getTranslatedValue('em_instant_apperant_power'),
    value: 5,
  },
  {
    title: getTranslatedValue('em_instant_cos'),
    value: 6,
  },
  {
    title: getTranslatedValue('em_instant_power_factor'),
    value: 7,
  },
  {
    title: getTranslatedValue('em_instant_frequency'),
    value: 8,
  },
  {
    title: getTranslatedValue('em_instant_dc_voltage'),
    value: 9,
  },
  {
    title: getTranslatedValue('em_instant_dc_current'),
    value: 10,
  },
  {
    title: getTranslatedValue('em_instant_dc_active_power'),
    value: 11,
  },
];