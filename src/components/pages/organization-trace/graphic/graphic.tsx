import noData from '@/assets/images/no-chart-data.svg';
import CommonContainerWithHeader from '@/components/ui/common-container-with-header/common-container-with-header';
import EmptyContent from '@/components/ui/empty-content/empty-content';
import { dateFormatter } from '@/helpers/format-data';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useDownloadFile } from '@/hooks/use-download-file';
import useLabelByDevice from '@/hooks/use-label-by-device';
import { getGraphicReports } from '@/services/organization-trace/graphics';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { DateObject } from 'react-multi-date-picker';
import { GraphicFormWrapper } from './graphic-form-wrapper';
import ReportResults from './report-results';
import ArchiveInfo from './table-archive-info';
import ConsumptionCounter from './table-consumption-counter';
import MeasurementData from './table-measurement-data';
import WeatherInfo from './table-weather-info';

const initialFormData = {
  period: 1,
  startDate: '2025-06-12T00:00:00Z',
  endDate: '2025-09-27T23:59:59Z',
  measurementData: [],
  consumptionMeter: [],
  deviceArchive: [],
  weatherData: [],
};

type RecordItem = {
  readDateTime: string;
  value: number;
  serial?: string;
  [key: string]: any;
};

type DataGroup = {
  records?: RecordItem[];
  aggregationType?: string;
  color?: string;
  serial?: string;
  yAxis?: number;
  description?: string;
  deviceId?: string;
  labelId?: string;
};

function normalizeData(
  groups: DataGroup[] = [],
  devicesMap: Map<string, any>,
): RecordItem[] {
  return groups.flatMap((group) =>
    (group.records ?? []).map((record) => ({
      ...record,
      aggregationType: group.aggregationType,
      color: group.color,
      description: `${group.description}`,
      deviceId: group.deviceId,
      device: group.deviceId
        ? devicesMap.get(group.deviceId)?.displayName
        : undefined,
      labelId: group.labelId,
      date: record.readDateTime,
      serial: group.serial ?? 'bar',
      yAxis: group.yAxis,
    })),
  );
}

function convertChartData(input: any, devicesMap: Map<string, any>) {
  if (!input) return [];
  return [
    ...normalizeData(input.consumptionMeter, devicesMap),
    ...normalizeData(input.deviceArchive, devicesMap),
    ...normalizeData(input.measurementData, devicesMap),
    ...normalizeData(input.weatherData, devicesMap),
  ];
}

function GraphicContent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    defaultValues: {
      startDate: new DateObject(),
      endDate: new DateObject(),
    },
  });

  const [showResult, setShowResult] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const onSubmit = (data: any) => {
    setFormData((prev) => ({
      ...prev,
      period: data?.Period ?? prev.period,
      startDate: data?.StartDateTime ?? prev.startDate,
      endDate: data?.EndDateTime ?? prev.endDate,
      measurementData: data?.measurementDataFields ?? [],
      consumptionMeter: data?.consInformationFields ?? [],
      deviceArchive: data?.deviceArchiveFields ?? [],
      weatherData: data?.weatherInfoFields ?? [],
    }));
    setShowResult(true);
  };

  const { data: chartData = [], isFetching: chartIsLoading } = useQuery({
    queryKey: ['index value reports chart', formData],
    queryFn: () =>
      getGraphicReports({
        dataParams: formData,
      }),
    retry: false,
    enabled: !!formData,
  });

  const { devices, allLabels } = useLabelByDevice({});
  const watchInfo = useWatch({ control, name: 'filterProfileFields' as any });

  // Create a Map for O(1) device lookups instead of O(n) with find()
  const devicesMap = useMemo(() => {
    if (!devices?.length) return new Map();
    return new Map(devices.map((d: any) => [d?.id, d]));
  }, [devices]);

  // Memoize converted chart data to avoid recalculating on every render
  const convertedChartData = useMemo(
    () => convertChartData(chartData, devicesMap),
    [chartData, devicesMap],
  );

  const dataMapping = useMemo(
    () => ({
      xField: 'date',
      yField: 'value',
      groupBy: 'device',
      dateField: 'date',
      dateFormatter: (d: string) => dateFormatter(d, true),
    }),
    [],
  );

  const excelParams = useMemo(
    () => ({
      excelFormData: { filterParameter: [] },
      watchInfo,
      excelFileName: 'Menu:CarbonReports',
      excelUrl: `app/export-to-excel/export-to-excel-carbon-list?api-version=${import.meta.env.VITE_API_VERSION}`,
    }),
    [watchInfo],
  );

  const { downloadHandler, isExcelDownloading } = useDownloadFile();
  const handleDownload = () => {
    downloadHandler({
      excelUrl: `app/labels/get-trend-analysis-excel-file?`,
      fileName: getTranslatedValue('WorkNotifications'),
      getTokenUrl: `app/labels/download-token?api-version=${import.meta.env.VITE_API_VERSION}`,
    });
  };
  return (
    <CommonContainerWithHeader label="em_gbm_page_header">
      <form className="inner-form" onSubmit={handleSubmit(onSubmit)}>
        <GraphicFormWrapper
          setValue={setValue}
          handleSubmit={handleSubmit}
          register={register}
          hasPeriodType
          control={control}
          filterName="weather"
          isWeatherReport
          errors={errors}
          responseIsLoading={false}
          // responseIsLoading={chartIsLoading}
          onGetReport={() => setShowResult(true)}
          handleDownload={handleDownload}
          isExcelDownloading={isExcelDownloading}
        >
          <MeasurementData
            allLabels={allLabels}
            devices={devices}
            control={control}
            label="em_gbm_measurement_info"
          />
          <ConsumptionCounter
            allLabels={allLabels}
            devices={devices}
            control={control}
            label="em_gbm_consumption_counter_info"
          />
          <ArchiveInfo
            allLabels={allLabels}
            devices={devices}
            control={control}
            label="em_gbm_archive_info"
          />
          <WeatherInfo control={control} label="em_gbm_weather_info" />
        </GraphicFormWrapper>
      </form>

      {showResult &&
        (convertedChartData?.length || chartIsLoading ? (
          <div className="reports-response">
            <ReportResults
              baseColumns={[]}
              tableData={[]}
              isLoading={false}
              chartData={convertedChartData || []}
              dataMapping={dataMapping}
              chartIsLoading={chartIsLoading}
              dynamicColumns={[]}
              chartPeriod={formData.period}
              totalCount={0}
              excelParams={excelParams}
            />
          </div>
        ) : (
          <div className="graphic-empty-table">
            <EmptyContent height={350} width={430} img={noData} /> :
          </div>
        ))}
    </CommonContainerWithHeader>
  );
}

export default GraphicContent;
