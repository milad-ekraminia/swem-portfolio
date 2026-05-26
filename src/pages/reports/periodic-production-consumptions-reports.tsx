import { FilesSvg } from '@/assets/icons/files-svg';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import { ReportsFormWrapper } from '@/components/pages/reports/form-wrapper';
import ReportResults from '@/components/pages/reports/shared/report-results';
import { getReportsCheckBoxOptions } from '@/enum-data/reports/reports-data';
import { getCookie } from '@/helpers/cookies';
import { dateFormatter } from '@/helpers/format-data';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import {
  getElecConsumptionPeriodicChartReportApi,
  getElecConsumptionPeriodicReportApi,
} from '@/services/reports/get-reports-apis';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';
import { reportsAddProfileInitialValuesTypes } from '@/types/pages/reports/reports';
import { reportsAddProfileInitialValues } from '@/validations/reports/reports-validation';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

const baseBreadcrumbs: BreadcrumbItem[] = [
  {
    label: 'Menu:Reports',
  },
  {
    label: 'Menu:PeriodicElecProductionConsumptionReports',
  },
];

const title = {
  label: 'Menu:PeriodicElecProductionConsumptionReports',
  href: '',
};

export default function PeriodicElecProductionConsumptionReports() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [chartCurrentPage, setChartCurrentPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [sortData] = useState<string[]>([]);
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
      reportsAddProfileInitialValues as reportsAddProfileInitialValuesTypes,
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

  const dynamicKeys = filteredList?.map((item: any) => item?.fieldName);

  const periodType = Number(
    watchInfo?.find((item: any) => item?.fieldName === 'ReportPeriod')
      ?.fieldValue,
  );

  const phaseNo = watchInfo?.find((item: any) => item?.fieldName === 'PhaseNo');
  const filterParameters: any =
    dynamicKeys && dynamicKeys?.length > 0
      ? [
        'DeviceDescription',
        'DeviceOrganizationName',
        'DeviceModelName',
        'ConsDate',
        ...dynamicKeys.map(
          (item: any) => item.charAt(0).toUpperCase() + item.slice(1),
        ),
      ]
      : [
        'DeviceDescription',
        'DeviceOrganizationName',
        'DeviceModelName',
        'ConsDate',
      ];

  const excelFormData: any = {
    indPhaseNr: Number(
      watchInfo?.find((item: any) => item?.fieldName === 'PhaseNo')?.fieldValue,
    ),
    filterParameter: filterParameters?.filter(
      (item: any) => item !== 'PeriodWindowSelectable',
    ),
    reportPeriod: periodType,
  };

  if (excelFormData?.PeriodType) {
    delete excelFormData?.PeriodType;
  }

  const selectedOrganizationsObjects = watchInfo?.find(
    (item: any) => item?.fieldName === 'SelectedOrganizationsObjects',
  );
  const startDate = watchInfo?.find(
    (item: any) => item?.fieldName === 'StartDateTime',
  );
  const DeviceCategory = watchInfo?.find(
    (item: any) => item?.fieldName === 'DeviceCategory',
  )?.fieldValue;
  const DeviceModel = watchInfo?.find(
    (item: any) => item?.fieldName === 'DeviceModel',
  )?.fieldValue;

  const endDate = watchInfo?.find(
    (item: any) => item?.fieldName === 'EndDateTime',
  );

  const rangeStart = watchInfo?.find(
    (item: any) => item?.fieldName === 'rangeStart',
  );
  const rangeEnd = watchInfo?.find(
    (item: any) => item?.fieldName === 'rangeEnd',
  );

  const selectedIds = useMemo(() => {
    return (selectedOrganizationsObjects?.fieldValue || [])?.length > 0 &&
      Array.isArray(selectedOrganizationsObjects?.fieldValue)
      ? selectedOrganizationsObjects?.fieldValue
        ?.filter((item: any) => item?.organizationTreeNodeType === 2)
        ?.map((item: any) => Number(item?.id))
      : [];
  }, [selectedOrganizationsObjects]);

  const {
    data: tableData,
    refetch,
    isFetching: reportLoading,
  } = useQuery({
    queryKey: [
      'Periodic Elec Production Consumption Report',
      currentPage,
      sortData,
      pageSize,
    ],
    queryFn: () =>
      getElecConsumptionPeriodicReportApi({
        dataParams: {
          ...(DeviceModel &&
            +DeviceModel !== -1 && { DeviceModelId: DeviceModel }),
          ...(DeviceCategory &&
            +DeviceCategory !== -1 && { DeviceCategoryId: DeviceCategory }),
          periodType: periodType - 1,
          skipCount: currentPage * pageSize,
          deviceIds: selectedIds,
          rangeStart: Number(rangeStart) || null,
          rangeEnd: Number(rangeEnd) || null,
          indPhaseNr: Number(phaseNo?.fieldValue) || 0,
          startDate: startDate?.fieldValue,
          endDate: endDate?.fieldValue,
          pageSize: pageSize,
          sorting: '',
        },
      }),
    retry: false,
    enabled: showResult,
  });

  const {
    data: chartData = [],
    refetch: chartRefetch,
    isFetching: chartIsLoading,
  } = useQuery({
    queryKey: ['index value reports chart', chartCurrentPage],
    queryFn: () =>
      getElecConsumptionPeriodicChartReportApi({
        dataParams: {
          startDate: startDate?.fieldValue,
          endDate: endDate?.fieldValue,
          periodType: periodType - 1,
          ...(DeviceModel &&
            +DeviceModel !== -1 && { DeviceModelId: DeviceModel }),
          ...(DeviceCategory &&
            +DeviceCategory !== -1 && { DeviceCategoryId: DeviceCategory }),
          deviceIds: selectedIds,
          rangeStart: Number(rangeStart) || null,
          rangeEnd: Number(rangeEnd) || null,
          indPhaseNr: Number(phaseNo?.fieldValue) || 0,
          allowedReturnParameters: filteredList?.map(
            (elem: any) =>
              elem?.fieldName.charAt(0).toUpperCase() +
              elem?.fieldName.slice(1),
          ),
          pageSize: 2,
          skipCount: chartCurrentPage * 2,
        },
      }),
    retry: false,
    enabled: showResult,
  });

  useEffect(() => {
    refetch();
  }, [currentPage]);

  useEffect(() => {
    chartRefetch();
  }, [chartCurrentPage]);

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
        title: 'DeviceDescription',
        accessorKey: 'deviceDescription',
        sort: 'DeviceDescription',
      },
      {
        title: 'DeviceOrganizationName',
        accessorKey: 'deviceOrganizationName',
        sort: 'DeviceOrganizationName',
      },
      {
        title: 'DeviceModel',
        accessorKey: 'deviceModelName',
        sort: 'DeviceModelName',
      },
      {
        title: 'Time',
        accessorKey: 'consDate',
        sort: 'Time',
        cell: ({ row }: any) => {
          const consDate = row.original?.consDate;
          const dateParts = consDate.split(' ');
          const date = dateParts[0];
          const time = dateParts[1] || null;
          const jalalliDate = dateFormatter(
            date,
            false,
            false,
            false,
            periodType === 3 ? 'YYYY-MM' : 'YYYY-MM-DD',
          );
          return time ? `${jalalliDate} , ${time}` : jalalliDate;
        },
      },
    ],
    [periodType],
  );

  const dataMapping = useMemo(
    () => ({
      xField: periodType - 1 < 1 ? 'date' : 'dateText',
      yField: 'value',
      groupBy: 'type',
      dateField: 'date',
      dateFormatter: (d: string) =>
        periodType - 1 > 1 ? d : dateFormatter(d, true, periodType - 1 > 1),
    }),
    [periodType],
  );

  const cultureName =
    getCookie('CultureName') ?? (import.meta.env.VITE_CULTURE_NAME as string);

  const optionsList = useMemo(() => getReportsCheckBoxOptions(), [cultureName]);
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
              title={getTranslatedValue(
                'Menu:PeriodicElecProductionConsumptionReports',
              )}
              setValue={setValue}
              handleSubmit={handleSubmit}
              register={register}
              getValues={getValues}
              control={control}
              isPeriodicProductionConsumptions={true}
              optionsList={optionsList}
              filterName="periodic-elec-prod-cons"
              errors={errors}
              responseIsLoading={reportLoading || chartIsLoading}
              onGetReport={handleReportGet}
              hasPhaseNo
            />
          </div>
          {showResult && (
            <div className="reports-response">
              <ReportResults
                baseColumns={staticTableHeaders}
                tableData={tableData?.items || []}
                isLoading={reportLoading}
                chartData={chartData?.items ?? []}
                dataMapping={dataMapping}
                chartIsLoading={chartIsLoading}
                dynamicColumns={checkBoxFiledNameList}
                pageSize={pageSize}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                setPageSize={setPageSize}
                chartCurrentPage={chartCurrentPage}
                selectedIds={selectedIds}
                setChartCurrentPage={setChartCurrentPage}
                totalCount={tableData?.totalCount ?? 0}
                excelParams={{
                  excelFormData,
                  watchInfo,
                  excelFileName:
                    'Menu:PeriodicElecProductionConsumptionReports',
                  excelUrl: `app/export-to-excel/export-to-excel-periodic-elec-production-consumption-list?api-version=${import.meta.env.VITE_API_VERSION}`,
                  excelType: 'PeriodicElecProductionConsumptionReports',
                }}
                chartType="bar"
                periodType={periodType - 1}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
