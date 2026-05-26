import { FilesSvg } from '@/assets/icons/files-svg';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import { ReportsFormWrapper } from '@/components/pages/reports/form-wrapper';
import ReportResults from '@/components/pages/reports/shared/report-results';
import { dateFormatter } from '@/helpers/format-data';
import { formatNumberWithCommas } from '@/helpers/format-number-with-commas';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import {
  getGetWeatherDataOWMSChartReportApi,
  getGetWeatherDataOWMSReportApi,
} from '@/services/reports/get-reports-apis';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';
import { reportsAddProfileInitialValuesTypes } from '@/types/pages/reports/reports';
import { reportsAddProfileWeatherReportInitialValues } from '@/validations/reports/reports-validation';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

const baseBreadcrumbs: BreadcrumbItem[] = [
  {
    label: 'Menu:Reports',
  },
  { label: 'Menu:WeatherReports' },
];

const title = {
  label: 'Menu:WeatherReports',
  href: '/reports/weather',
};

export default function WeatherReports() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [sortData, setSortData] = useState<string[]>([]);
  const [showResult, setShowResult] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useForm<reportsAddProfileInitialValuesTypes>({
    defaultValues:
      reportsAddProfileWeatherReportInitialValues as reportsAddProfileInitialValuesTypes,
    context: {
      isProfileNameRequired: false,
    },
  });

  const watchInfo = useWatch({
    control,
    name: 'filterProfileFields',
  });

  const filteredList = watchInfo?.filter(
    (field: any) => field?.fieldType === 1 && field?.fieldValue === 'True',
  );

  const excelFormData: any = {
    cityId: Number(
      watchInfo?.find((item: any) => item?.fieldName === 'City')?.fieldValue,
    ),
    filterParameter: [
      'LocationName',
      'WeatherDataDateTime',
      'Temperature',
      'HumidityRatio',
      'Pressure',
      'CloudsRatio',
      'WindSpeed',
      'Visibility',
    ],
  };

  const startDate = watchInfo?.find(
    (item: any) => item?.fieldName === 'StartDateTime',
  );
  const endDate = watchInfo?.find(
    (item: any) => item?.fieldName === 'EndDateTime',
  );
  const weatherDataLocationIdMin = watchInfo?.find(
    (item: any) => item?.fieldName === 'City',
  );
  const cityId =
    Number(
      watchInfo?.find((item: any) => item?.fieldName === 'City')?.fieldValue,
    ) || null;

  const {
    data: tableData,
    refetch,
    isFetching: reportLoading,
  } = useQuery({
    queryKey: ['weather report table list', currentPage, sortData, pageSize],
    queryFn: () =>
      getGetWeatherDataOWMSReportApi({
        dataParams: {
          skipCount: currentPage * pageSize,
          maxResultCount: pageSize,
          weatherDataLocationIdMin: Number(
            weatherDataLocationIdMin?.fieldValue,
          ),
          weatherDataLocationIdMax: Number(
            weatherDataLocationIdMin?.fieldValue,
          ),
          weatherDataDateTimeMin: startDate?.fieldValue,
          weatherDataDateTimeMax: endDate?.fieldValue,
          sorting: sortData,
        },
      }),
    retry: false,
    enabled: false,
  });

  const {
    data: chartData = [],
    refetch: chartRefetch,
    isFetching: chartIsLoading,
  } = useQuery({
    queryKey: ['weather reports chart'],
    queryFn: () =>
      getGetWeatherDataOWMSChartReportApi({
        dataParams: {
          startDate: startDate?.fieldValue,
          endDate: endDate?.fieldValue,
          cityId,
        },
      }),
    retry: false,
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, [currentPage])

  const handleReportGet = () => {
    refetch();
    chartRefetch();
    setShowResult(true);
  };

  const checkBoxFiledNameList =
    filteredList?.map((elem) => elem?.fieldName as string) ?? [];

  // static table headers
  const staticTableHeaders: any[] = useMemo(
    () => [
      {
        title: 'City',
        accessorKey: 'locationName',
        sort: 'LocationName',
      },
      {
        title: 'Date',
        accessorKey: 'date',
        sort: 'WeatherDataDateTime',
        cell: ({ row }: any) => {
          return dateFormatter(row?.original?.weatherDataDateTime, true);
        },
      },
      {
        title: 'Temperature',
        accessorKey: 'temperature',
        sort: 'Temperature',
      },
      {
        title: 'HumidityRatioWUnit',
        accessorKey: 'humidityRatio',
        sort: 'HumidityRatio',
        cell: ({ row }: any) => {
          return formatNumberWithCommas(row?.original?.humidityRatio, 3) ?? '-';
        },
      },
      {
        title: 'PressureWUnit',
        accessorKey: 'pressure',
        sort: 'Pressure',
        cell: ({ row }: any) => {
          return formatNumberWithCommas(row?.original?.pressure, 3) ?? '-';
        },
      },
      {
        title: 'CloudsRatioWUnit',
        accessorKey: 'cloudsRatio',
        sort: 'CloudsRatio',
        cell: ({ row }: any) => {
          return formatNumberWithCommas(row?.original?.cloudsRatio, 3) ?? '-';
        },
      },
      {
        title: 'WindSpeedWUnit',
        accessorKey: 'windSpeed',
        sort: 'WindSpeed',
      },
      {
        title: 'VisibilityWUnit',
        accessorKey: 'visibility',
        sort: 'Visibility',
        cell: ({ row }: any) => {
          return formatNumberWithCommas(row?.original?.visibility, 3) ?? '-';
        },
      },
    ],
    [],
  );

  const dataMapping = useMemo(
    () => ({
      xField: 'date',
      yField: 'value',
      groupBy: 'type',
      dateField: 'date',
      dateFormatter: (d: string) => dateFormatter(d, true),
    }),
    [],
  );

  return (
    <div className="page-wrapper">
      <PagesHeader
        title={title}
        breadcrumbs={baseBreadcrumbs}
        icon={<FilesSvg />}
      />
      <div className="page-wrapper__body">
        <div className="reports">
          <div className="reports-form">
            <ReportsFormWrapper
              title={getTranslatedValue('Menu:WeatherReports')}
              setValue={setValue}
              handleSubmit={handleSubmit}
              register={register}
              getValues={getValues}
              control={control}
              hasPeriodType={false}
              filterName="weather"
              isWeatherReport={true}
              errors={errors}
              responseIsLoading={reportLoading || chartIsLoading}
              onGetReport={handleReportGet}
            />
          </div>
          {showResult && (
            <div className="reports-response">
              <ReportResults
                baseColumns={staticTableHeaders}
                tableData={tableData?.items || []}
                isLoading={reportLoading}
                chartData={chartData ?? []}
                dataMapping={dataMapping}
                chartIsLoading={chartIsLoading}
                dynamicColumns={checkBoxFiledNameList}
                pageSize={pageSize}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                setPageSize={setPageSize}
                setSorting={setSortData}
                sorting={sortData}
                totalCount={tableData?.totalCount ?? 0}
                excelParams={{
                  excelFormData,
                  watchInfo,
                  excelFileName: 'Menu:WeatherReports',
                  excelUrl: `app/export-to-excel/export-to-excel-weather-list?api-version=${import.meta.env.VITE_API_VERSION}`,
                  excelType: 'weather',
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
