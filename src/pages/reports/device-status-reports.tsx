import { FilesSvg } from '@/assets/icons/files-svg';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import { ReportsFormWrapper } from '@/components/pages/reports/form-wrapper';
import ReportResults from '@/components/pages/reports/shared/report-results';
import { deviceStatusReportFields } from '@/enum-data/reports/device-status';
import { dateFormatter } from '@/helpers/format-data';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { getDeviceElecStatusValuesApi } from '@/services/reports/get-reports-apis';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';
import { reportsAddProfileInitialValuesTypes } from '@/types/pages/reports/reports';
import { reportsAddProfileDeviceStatusInitialValues } from '@/validations/reports/reports-validation';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

const baseBreadcrumbs: BreadcrumbItem[] = [
  {
    label: 'Menu:Reports',
  },
  {
    label: getTranslatedValue('DeviceStatusInfo'),
  },
];

const title = {
  label: getTranslatedValue('DeviceStatusInfo'),
};

export default function DeviceStatusReports() {
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
      reportsAddProfileDeviceStatusInitialValues as reportsAddProfileInitialValuesTypes,
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

  const selectedOrganizationsObjects = watchInfo?.find(
    (item: any) => item?.fieldName === 'SelectedOrganizationsObjects',
  );

  const selectedIds = useMemo(() => {
    return (selectedOrganizationsObjects?.fieldValue || [])?.length > 0 &&
      Array.isArray(selectedOrganizationsObjects?.fieldValue)
      ? selectedOrganizationsObjects?.fieldValue
        ?.filter((item: any) => item?.organizationTreeNodeType === 2)
        ?.map((item: any) => Number(item?.id))
      : [];
  }, [selectedOrganizationsObjects]);

  const startDate = watchInfo?.find(
    (item: any) => item?.fieldName === 'StartDateTime',
  );
  const endDate = watchInfo?.find(
    (item: any) => item?.fieldName === 'EndDateTime',
  );
  const deviceModelId = Number(
    watchInfo?.find((item: any) => item?.fieldName === 'DeviceModel')
      ?.fieldValue,
  );
  const deviceCategoryId = Number(
    watchInfo?.find((item: any) => item?.fieldName === 'DeviceCategory')
      ?.fieldValue,
  );

  const {
    data: tableData,
    refetch,
    isFetching: reportLoading,
  } = useQuery({
    queryKey: ['device elec status values', currentPage, sortData, pageSize],
    queryFn: () => getDeviceElecStatusValuesApi({
      dataParams: {
        skipCount: currentPage * pageSize,
        maxResultCount: pageSize,
        deviceIds: selectedIds,
        deviceCategoryIdMax: deviceCategoryId > -1 ? deviceCategoryId : null,
        deviceCategoryIdMin: deviceCategoryId > -1 ? deviceCategoryId : null,
        deviceModelIdMax: deviceModelId > -1 ? deviceModelId : null,
        deviceModelIdMin: deviceModelId > -1 ? deviceModelId : null,
        readDateTimeMin: startDate?.fieldValue,
        readDateTimeMax: endDate?.fieldValue,
        sorting: sortData,
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
    queryKey: ['Energy Index Report Chart', chartCurrentPage],
    queryFn: () =>
    //  TODO ->  Change this to the actual api
    {
      return { items: [], totalCount: 0 };
    },
    retry: false,
    enabled: showResult,
  });

  useEffect(() => {
    refetch();
  }, [currentPage])

  const handleReportGet = () => {
    refetch();
    chartRefetch();
    setShowResult(true);
  };
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
          return dateFormatter(row?.original?.readDateTime, true);
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
  };

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
              title={getTranslatedValue('DeviceStatusInfo')}
              setValue={setValue}
              handleSubmit={handleSubmit}
              register={register}
              getValues={getValues}
              control={control}
              hasPeriodType={false}
              optionsList={deviceStatusReportFields}
              filterName="device-elec-status-values"
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
                chartData={(chartData as any)?.items ?? []}
                dataMapping={dataMapping}
                chartIsLoading={chartIsLoading}
                dynamicColumns={dynamicKeys as any}
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
                  excelFileName: 'device-elec-status-values',
                  excelUrl: `app/export-to-excel/export-to-excel-device-elec-status-values-list?api-version=${import.meta.env.VITE_API_VERSION}`,
                }}
                chartType="area"
                hasTab={false}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
