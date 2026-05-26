import { FilesSvg } from '@/assets/icons/files-svg';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import { ReportsFormWrapper } from '@/components/pages/reports/form-wrapper';
import ElecProductionConsumptionReportsTable from '@/components/pages/reports/production-consumptions-report/table';
import { reportsProductionConsumptionsCheckBoxOptions } from '@/enum-data/reports/reports-data';
import { dateFormatter } from '@/helpers/format-data';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { getDeviceElecHourlyConsumptionsReportApi } from '@/services/reports/get-reports-apis';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';
import { reportsAddProfileInitialValuesTypes } from '@/types/pages/reports/reports';
import { reportsAddProfileElecProdConsInitialValues } from '@/validations/reports/reports-validation';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

const baseBreadcrumbs: BreadcrumbItem[] = [
  {
    label: 'Menu:Reports',
  },
  {
    label: 'Menu:ElecProductionConsumptionReports',
  },
];

const title = {
  label: 'Menu:ElecProductionConsumptionReports',
  href: '',
};

export default function ElecProductionConsumptionReports() {
  const [currentPage, setCurrentPage] = useState<number>(0);
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
      reportsAddProfileElecProdConsInitialValues as reportsAddProfileInitialValuesTypes,
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

  const excelFormData: any = {
    filterParameter:
      dynamicKeys && dynamicKeys?.length > 0
        ? [
          'DeviceDescription',
          'DeviceOrganizationName',
          'ConsStartDateTime',
          'ConsEndDateTime',
          'DeviceModelName',
          'IndPhaseNr',
          ...dynamicKeys.map(
            (item: any) => item.charAt(0).toUpperCase() + item.slice(1),
          ),
        ]
        : [
          'DeviceDescription',
          'DeviceOrganizationName',
          'ConsStartDateTime',
          'ConsEndDateTime',
          'DeviceModelName',
          'IndPhaseNr',
        ],
  };

  const selectedOrganizationsObjects = watchInfo?.find(
    (item: any) => item?.fieldName === 'SelectedOrganizationsObjects',
  );
  const startDate = watchInfo?.find(
    (item: any) => item?.fieldName === 'StartDateTime',
  );
  const endDate = watchInfo?.find(
    (item: any) => item?.fieldName === 'EndDateTime',
  );
  const phaseNo = watchInfo?.find((item: any) => item?.fieldName === 'PhaseNo');

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
      'production consumptions report list',
      currentPage,
      sortData,
      pageSize,
    ],
    queryFn: () =>
      getDeviceElecHourlyConsumptionsReportApi({
        dataParams: {
          skipCount: currentPage * pageSize,
          maxResultCount: pageSize,
          deviceIds: selectedIds,
          indPhaseNrMax: Number(phaseNo?.fieldValue),
          indPhaseNrMin: Number(phaseNo?.fieldValue),
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
          consDateTimeMin: startDate?.fieldValue,
          consDateTimeMax: endDate?.fieldValue,
          sorting: sortData,
        },
      }),
    retry: false,
    enabled: showResult,
  });

  useEffect(() => {
    refetch();
  }, [currentPage]);

  const handleReportGet = () => {
    refetch();
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
        title: 'StartDate',
        accessorKey: 'consStartDateTime',
        sort: 'ConsStartDateTime',
        cell: ({ row }: any) => {
          return dateFormatter(row.original?.consStartDateTime, true);
        },
      },
      {
        title: 'EndDate',
        accessorKey: 'consEndDateTime',
        sort: 'ConsEndDateTime',
        cell: ({ row }: any) => {
          return dateFormatter(row.original?.consEndDateTime, true);
        },
      },
    ],
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
              title={getTranslatedValue(
                'Menu:ElecProductionConsumptionReports',
              )}
              setValue={setValue}
              handleSubmit={handleSubmit}
              register={register}
              getValues={getValues}
              control={control}
              hasPeriodType={false}
              optionsList={reportsProductionConsumptionsCheckBoxOptions}
              filterName="elec-prod-cons"
              errors={errors}
              responseIsLoading={reportLoading}
              onGetReport={handleReportGet}
            />
          </div>
          {showResult && (
            <div className="reports-response">
              <ElecProductionConsumptionReportsTable
                baseColumns={staticTableHeaders}
                tableData={tableData?.items || []}
                isLoading={reportLoading}
                dynamicColumns={checkBoxFiledNameList}
                pageSize={pageSize}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                setPageSize={setPageSize}
                totalCount={tableData?.totalCount ?? 0}
                excelParams={{
                  excelFormData,
                  watchInfo,
                  excelFileName: 'Menu:ElecProductionConsumptionReports',
                  excelUrl: `app/export-to-excel/export-to-excel-hourly-consumption-list?api-version=${import.meta.env.VITE_API_VERSION}`,
                  excelType: 'production-consumptions',
                  productionConsumptionsData: tableData?.items || [],
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
