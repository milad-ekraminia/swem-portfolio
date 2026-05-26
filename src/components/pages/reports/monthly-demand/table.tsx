import { ReportsFormWrapper } from '@/components/pages/reports/form-wrapper';
import { GlobalTableHeader } from '@/components/ui/table/table-head/global-table-header';
import {
  monthlyDemandReportFields,
} from '@/enum-data/reports/monthly-demand';
import { getTagReportsColumns } from '@/enum-data/reports/tag-reports';
import {
  downloadExcelFile,
  downloadExcelFileApiWithRow,
} from '@/helpers/download-excel-export';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { dateFormatter } from '@/helpers/format-data';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import { getMonthlyDemandReportApi } from '@/services/reports/get-reports-apis';
import { reportsAddProfileInitialValuesTypes } from '@/types/pages/reports/reports';
import { reportsAddProfileMonthlyDemandInitialValues } from '@/validations/reports/reports-validation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import ReportTable from '../shared/report-table';

export default function MonthlyDemandReportsTable() {
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
      reportsAddProfileMonthlyDemandInitialValues as reportsAddProfileInitialValuesTypes,
    context: {
      isProfileNameRequired: false,
    },
  });

  const watchInfo = useWatch({
    control,
    name: 'filterProfileFields',
  });

  const selectedOrganizationsObjects = watchInfo?.find(
    (item: any) => item?.fieldName === 'SelectedOrganizationsObjects',
  );
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

  const selectedIds = useMemo(() => {
    return (selectedOrganizationsObjects?.fieldValue || [])?.length > 0 &&
      Array.isArray(selectedOrganizationsObjects?.fieldValue)
      ? selectedOrganizationsObjects?.fieldValue
        ?.filter((item: any) => item?.organizationTreeNodeType === 2)
        ?.map((item: any) => Number(item?.id))
      : [];
  }, [selectedOrganizationsObjects]);

  const filteredList = watchInfo?.filter(
    (field: any) => field?.fieldType === 1 && field?.fieldValue === 'True',
  );
  const dynamicKeys = filteredList?.map((item: any) => item?.fieldName);

  const { data, refetch, isFetching } = useQuery({
    queryKey: ['Monthly Demand Report Table', currentPage, sortData, pageSize],
    queryFn: () =>
      getMonthlyDemandReportApi({
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

  useEffect(() => {
    refetch();
  }, [currentPage])

  const handleReportGet = () => {
    refetch();
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
      // TODO -> Modify these to match the api data structure when available
      {
        title: 'em_demand_period_date',
        accessorKey: 'demandPeriodDate',
        sort: 'DemandPeriodDate',
        cell: ({ row }: any) => {
          return dateFormatter(row?.original?.demandPeriodDate);
        },
      },
      {
        title: 'BeginningTerm',
        accessorKey: 'beginningTerm',
        sort: 'BeginningTerm',
        cell: ({ row }: any) => {
          return dateFormatter(row?.original?.beginningTerm);
        },
      },
      {
        title: 'EndTerm',
        accessorKey: 'dndTerm',
        sort: 'EndTerm',
        cell: ({ row }: any) => {
          return dateFormatter(row?.original?.endTerm);
        },
      },
    ],
    [],
  );

  const mutation = useMutation({
    mutationFn: downloadExcelFileApiWithRow,
    onSuccess: async (data) => {
      downloadExcelFile({
        response: data,
        fileName: getTranslatedValue(
          'em_report_elec_demand_monthly_bread_crumb_header',
        ),
      });
    },
    onError: async (error: AxiosError) => {
      const errorResponse = await apiErrorHandler(error);
      toastError(errorResponse?.error);
    },
  });

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

  if (excelFormData?.PeriodType) {
    delete excelFormData?.PeriodType;
  }

  const handleDownloadExcel = async () => {
    mutation.mutate({
      url: `app/export-to-excel/export-to-excel-device-elec-demand-monthlies-list?api-version=${import.meta.env.VITE_API_VERSION}`,
      formData: excelFormData,
    });
  };

  const memoizedBaseColumns = useMemo(() => getTagReportsColumns(), [data]);
  const [selectedColumnKeys, setSelectedColumnKeys] = useState<string[]>(
    memoizedBaseColumns.map((col) => col.accessorKey),
  );
  const [columnOrder, setColumnOrder] = useState<string[]>(
    memoizedBaseColumns.map((col) => col.accessorKey),
  );
  const effectiveColumns = useMemo(() => {
    return columnOrder
      .filter((key) => selectedColumnKeys.includes(key))
      .map((key) => memoizedBaseColumns.find((col) => col.accessorKey === key))
      .filter(Boolean) as typeof memoizedBaseColumns;
  }, [columnOrder, selectedColumnKeys, memoizedBaseColumns]);

  const header = useMemo(
    () => (
      <GlobalTableHeader
        label={getTranslatedValue('Report.Title')}
        tableColumns={effectiveColumns}
        setSelectedColumnKeys={setSelectedColumnKeys}
        selectedColumnKeys={selectedColumnKeys}
        columnOrder={columnOrder}
        setColumnOrder={setColumnOrder}
        handleDownload={handleDownloadExcel}
      />
    ),
    [selectedColumnKeys, columnOrder, handleDownloadExcel, mutation.isPending],
  );

  return (
    <div className="reports">
      <div className="reports-form">
        <ReportsFormWrapper
          title={getTranslatedValue(
            'em_report_elec_demand_monthly_bread_crumb_header',
          )}
          setValue={setValue}
          handleSubmit={handleSubmit}
          register={register}
          getValues={getValues}
          control={control}
          hasPeriodType={false}
          optionsList={monthlyDemandReportFields}
          filterName="device-elec-demand-monthlies"
          errors={errors}
          responseIsLoading={isFetching}
          onGetReport={handleReportGet}
        />
      </div>
      {showResult && (
        <div className="reports-response">
          <ReportTable
            baseColumns={staticTableHeaders}
            dynamicFields={dynamicKeys as any}
            data={(data?.items as any) ?? []}
            maxHeight="650px"
            isLoading={isFetching}
            headerChildren={header}
            totalCount={data?.totalCount || 0}
            pageChangeHandler={setCurrentPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            sorting={sortData}
            setPageSize={setPageSize}
            pageSize={pageSize}
            hasPagination={true}
          />
        </div>
      )}
    </div>
  );
}
