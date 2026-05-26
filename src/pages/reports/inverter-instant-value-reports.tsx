import { FilesSvg } from '@/assets/icons/files-svg';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import { ReportsFormWrapper } from '@/components/pages/reports/form-wrapper';
import ReportResults from '@/components/pages/reports/shared/report-results';
import { reportsInverterInstantCheckBoxOptions } from '@/enum-data/reports/reports-data';
import { dateFormatter, monthDateFormatter } from '@/helpers/format-data';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import {
  getDeviceElecInverterInstantValueChartReportApi,
  getDeviceElecInverterInstantValueReportApi,
} from '@/services/reports/get-reports-apis';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';
import { reportsAddProfileInitialValuesTypes } from '@/types/pages/reports/reports';
import { reportsAddProfileInverterInstantValuesInitialValues } from '@/validations/reports/reports-validation';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

const baseBreadcrumbs: BreadcrumbItem[] = [
  {
    label: 'Menu:Reports',
  },
  {
    label: 'Menu:InverterInstantValueReports',
  },
];

const title = {
  label: 'Menu:InverterInstantValueReports',
  href: '/reports/inverter-instant-values',
};

export default function InverterInstantValueReports() {
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
      reportsAddProfileInverterInstantValuesInitialValues as reportsAddProfileInitialValuesTypes,
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

  const excelFormData: any = {
    filterParameter:
      dynamicKeys && dynamicKeys?.length > 0
        ? [
          'DeviceDescription',
          'DeviceOrganizationName',
          'DeviceModelName',
          'ReadDateTime',
          ...dynamicKeys.map(
            (item: any) => item.charAt(0).toUpperCase() + item.slice(1),
          ),
        ]
        : [
          'DeviceDescription',
          'DeviceOrganizationName',
          'DeviceModelName',
          'ReadDateTime',
        ],
    reportPeriodType: periodType,
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
  const endDate = watchInfo?.find(
    (item: any) => item?.fieldName === 'EndDateTime',
  );
  const deviceModelId = watchInfo?.find(
    (item: any) => item?.fieldName === 'DeviceModel',
  );

  const deviceCategoryId = watchInfo?.find(
    (item: any) => item?.fieldName === 'DeviceCategory',
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
      'inverter instant value table report',
      currentPage,
      sortData,
      pageSize,
    ],
    queryFn: () =>
      getDeviceElecInverterInstantValueReportApi({
        dataParams: {
          periodType: periodType,
          skipCount: currentPage * pageSize,
          maxResultCount: pageSize,
          deviceIds: selectedIds,
          deviceCategoryIdMax:
            Number(deviceCategoryId?.fieldValue) > -1
              ? Number(deviceCategoryId?.fieldValue)
              : null,
          deviceCategoryIdMin:
            Number(deviceCategoryId?.fieldValue) > -1
              ? Number(deviceCategoryId?.fieldValue)
              : null,
          deviceModelIdMax:
            Number(deviceModelId?.fieldValue) > -1
              ? Number(deviceModelId?.fieldValue)
              : null,
          deviceModelIdMin:
            Number(deviceModelId?.fieldValue) > -1
              ? Number(deviceModelId?.fieldValue)
              : null,
          readDateTimeMin: startDate?.fieldValue,
          readDateTimeMax: endDate?.fieldValue,
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
    queryKey: ['inverter instant value reports chart'],
    queryFn: () =>
      getDeviceElecInverterInstantValueChartReportApi({
        dataParams: {
          startDate: startDate?.fieldValue,
          endDate: endDate?.fieldValue,
          periodType: periodType,
          deviceIds: selectedIds,
          ...(deviceModelId?.fieldValue &&
            +deviceModelId?.fieldValue !== -1 && {
            deviceModel: deviceModelId?.fieldValue,
          }),
          ...(deviceCategoryId?.fieldValue &&
            +deviceCategoryId?.fieldValue !== -1 && {
            deviceCategory: deviceCategoryId?.fieldValue,
          }),

          selectedFilters: filteredList?.map(
            (elem: any) =>
              elem?.fieldName.charAt(0).toUpperCase() +
              elem?.fieldName.slice(1),
          ),
        },
      }),
    retry: false,
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, [currentPage]);

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
        title: 'ReadDate',
        accessorKey: 'readDateTime',
        sort: 'ReadDateTime',
        cell: ({ row }: any) => {
          return periodType === 3
            ? monthDateFormatter(row?.original?.readDateTime)
            : dateFormatter(row?.original?.readDateTime, periodType <= 1);
        },
      },
    ],
    [periodType],
  );

  const dataMapping = useMemo(
    () => ({
      // xField: periodType < 2 ? 'date' : 'dateText',
      xField: 'date',
      yField: 'value',
      groupBy: 'type',
      dateField: 'date',
      dateFormatter: (d: string) => dateFormatter(d, true),
    }),
    [periodType],
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
              title={getTranslatedValue('Menu:InverterInstantValueReports')}
              setValue={setValue}
              handleSubmit={handleSubmit}
              register={register}
              getValues={getValues}
              control={control}
              optionsList={reportsInverterInstantCheckBoxOptions}
              filterName="inverter-instant-value"
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
                  excelFileName: 'Menu:InverterInstantValueReports',
                  excelUrl: `app/export-to-excel/export-to-excel-inverter-instant-value-list?api-version=${import.meta.env.VITE_API_VERSION}`,
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
