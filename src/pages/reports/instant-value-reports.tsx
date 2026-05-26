import { useEffect, useMemo, useState } from 'react';
import { FilesSvg } from '@/assets/icons/files-svg';
import { reportsInstantValuesCheckBoxOptions } from '@/enum-data/reports/reports-data';
import { dateFormatter, monthDateFormatter } from '@/helpers/format-data';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { reportsAddProfileInstantValueInitialValues } from '@/validations/reports/reports-validation';
import { useQuery } from '@tanstack/react-query';
import { useForm, useWatch } from 'react-hook-form';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';
import { reportsAddProfileInitialValuesTypes } from '@/types/pages/reports/reports';
import {
  getDeviceElecInstantValueChartReportApi,
  getDeviceElecInstantValueReportApi,
} from '@/services/reports/get-reports-apis';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import { ReportsFormWrapper } from '@/components/pages/reports/form-wrapper';
import ReportResults from '@/components/pages/reports/shared/report-results';

const baseBreadcrumbs: BreadcrumbItem[] = [
  {
    label: 'Menu:Reports',
  },
  { label: 'Menu:InstantValueReports' },
];

const title = {
  label: 'Menu:InstantValueReports',
  href: '/reports/instant-values',
};

export default function InstantValuesReports() {
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
      reportsAddProfileInstantValueInitialValues as reportsAddProfileInitialValuesTypes,
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
    indPhaseNr: Number(
      watchInfo?.find((item: any) => item?.fieldName === 'PhaseNo')?.fieldValue,
    ),
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
  const DeviceCategory = watchInfo?.find(
    (item: any) => item?.fieldName === 'DeviceCategory',
  )?.fieldValue;
  const DeviceModel = watchInfo?.find(
    (item: any) => item?.fieldName === 'DeviceModel',
  )?.fieldValue;

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
      'instant value reports table',
      currentPage,
      currentPage,
      sortData,
      pageSize,
      currentPage,
    ],
    queryFn: () =>
      getDeviceElecInstantValueReportApi({
        dataParams: {
          periodType: periodType,
          skipCount: currentPage * pageSize,
          maxResultCount: pageSize,
          deviceIds: selectedIds,
          readDateTimeMin: startDate?.fieldValue,
          readDateTimeMax: endDate?.fieldValue,
          sorting: sortData,
          ...(DeviceModel &&
            +DeviceModel !== -1 && {
              DeviceModelId: DeviceModel,
              deviceModelIdMin: DeviceModel,
              deviceModelIdMax: DeviceModel,
            }),
          ...(DeviceCategory &&
            +DeviceCategory !== -1 && {
              DeviceCategoryId: DeviceCategory,
              deviceCategoryIdMin: DeviceCategory,
              deviceCategoryIdMax: DeviceCategory,
            }),
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
    queryKey: ['index value reports chart'],

    queryFn: () =>
      getDeviceElecInstantValueChartReportApi({
        dataParams: {
          startDate: startDate?.fieldValue,
          endDate: endDate?.fieldValue,
          periodType: periodType,
          deviceIds: selectedIds,
          ...(DeviceModel &&
            +DeviceModel !== -1 && {
              DeviceModelId: DeviceModel,
              deviceModelIdMin: DeviceModel,
              deviceModelIdMax: DeviceModel,
            }),
          ...(DeviceCategory &&
            +DeviceCategory !== -1 && {
              DeviceCategoryId: DeviceCategory,
              deviceCategoryIdMin: DeviceCategory,
              deviceCategoryIdMax: DeviceCategory,
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
          if (periodType === 3) {
            // Monthly - show only month and year
            return monthDateFormatter(row?.original?.readDateTime);
          } else if (periodType === 2) {
            // Daily - show date without time
            return dateFormatter(row?.original?.readDateTime, false);
          } else if (periodType === 1) {
            // Hourly - show date with time
            return dateFormatter(row?.original?.readDateTime, true);
          } else {
            // Default (periodType === 0 or any other) - show date with time
            return dateFormatter(row?.original?.readDateTime, true);
          }
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
      dateFormatter: (d: string) => {
        if (periodType === 3) {
          // Monthly - show only month and year
          return monthDateFormatter(d);
        } else if (periodType === 2) {
          // Daily - show date without time
          return dateFormatter(d, false);
        } else if (periodType === 1) {
          // Hourly - show date with time
          return dateFormatter(d, true);
        } else {
          // Default (periodType === 0 or any other) - show date with time
          return dateFormatter(d, true);
        }
      },
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
              title={getTranslatedValue('Menu:InstantValueReports')}
              setValue={setValue}
              handleSubmit={handleSubmit}
              register={register}
              getValues={getValues}
              control={control}
              optionsList={reportsInstantValuesCheckBoxOptions}
              filterName="instant-value"
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
                  excelFileName: 'Menu:InstantValueReports',
                  excelUrl: `app/export-to-excel/export-to-excel-elec-instant-values-list?api-version=${import.meta.env.VITE_API_VERSION}`,
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
