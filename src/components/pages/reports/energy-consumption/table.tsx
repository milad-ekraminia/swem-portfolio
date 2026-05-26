import { ReportsFormWrapper } from '@/components/pages/reports/form-wrapper';
import { GlobalTableHeader } from '@/components/ui/table/table-head/global-table-header';
import { SAMPLE_TABLE_DATA } from '@/enum-data/reports/energy-consumption';
import { getTagReportsColumns } from '@/enum-data/reports/tag-reports';
import {
  downloadExcelFile,
  downloadExcelFileApiWithRow,
} from '@/helpers/download-excel-export';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { dateFormatter } from '@/helpers/format-data';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import { reportsAddProfileInitialValuesTypes } from '@/types/pages/reports/reports';
import { reportsAddProfileIndexValuesInitialValues } from '@/validations/reports/reports-validation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import ReportTable from '../shared/report-table';

export default function EnergyConsumptionReportsTable() {
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
      // TODO ->  Modify this when final data structure and fields are available
      reportsAddProfileIndexValuesInitialValues as reportsAddProfileInitialValuesTypes,
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

  const { data, refetch, isFetching } = useQuery({
    queryKey: [
      'Energy Consumption Report Table',
      currentPage,
      sortData,
      pageSize,
    ],
    queryFn: () =>
      //  TODO ->  Change this to the actual api
      ({ items: SAMPLE_TABLE_DATA, totalCount: SAMPLE_TABLE_DATA.length }),
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
        title: 'StartDate',
        accessorKey: 'startDate',
        sort: 'StartDate',
        cell: ({ row }: any) => {
          return dateFormatter(row?.original?.startDate);
        },
      },
      {
        title: 'EndDate',
        accessorKey: 'endDate',
        sort: 'EndDate',
        cell: ({ row }: any) => {
          return dateFormatter(row?.original?.endDate);
        },
      },
      {
        title: 'em_consumption_value',
        accessorKey: 'consumptionValue',
        sort: 'ConsumptionValue',
        cell: ({ row }: any) => {
          return dateFormatter(row?.original?.consumptionValue);
        },
      },
      {
        title: 'unit',
        accessorKey: 'unit',
        sort: 'unit',
        cell: ({ row }: any) => {
          return dateFormatter(row?.original?.unit);
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
        fileName: getTranslatedValue('em_report_energy_consumption_no_period'),
      });
    },
    onError: async (error: AxiosError) => {
      const errorResponse = await apiErrorHandler(error);
      toastError(errorResponse?.error);
    },
  });

  const handleDownloadExcel = async () => {
    // TODO ->  Change this to this page's actual columns when they are finalized
    const mutateFormData: any = {
      organizationName: null,
      subOrganization: 'N/A',
      deviceAccessPointId: null,
      accessPointName: null,
      accessPointIp: null,
      accessPointPort: null,
      deviceDescription: null,
      protocol: 'N/A',
      deviceSerialNr: null,
      deviceCommAddress: null,
      deviceModelId: null,
      deviceModelName: null,
      labelId: null,
      labelName: null,
      modbusAddress: null,
      functionType: null,
      functionTypeName: null,
      dataTypeId: null,
      dataTypeName: null,
      data: null,
      filterParameter: [
        'OrganizationName',
        'SubOrganization',
        'AccessPointName',
        'AccessPointIp',
        'AccessPointPort',
        'DeviceDescription',
        'Protocol',
        'DeviceModelName',
        'LabelName',
        'DeviceCommAddress',
        'FunctionTypeName',
        'ModbusAddress',
        'DataTypeName',
        'DeviceSerialNr',
      ],
    };

    mutation.mutate({
      // TODO ->  Change this to this sections api when its available
      url: `app/export-to-excel/export-to-excel-tag-report-list?api-version=${import.meta.env.VITE_API_VERSION}`,
      formData: mutateFormData,
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
          title={getTranslatedValue('em_report_energy_consumption_no_period')}
          setValue={setValue}
          handleSubmit={handleSubmit}
          register={register}
          getValues={getValues}
          control={control}
          hasPeriodType={false}
          // TODO ->  This name is required for getting the right filter fields : modify this to corect one when api is deliverd
          filterName="energy-consumption-report"
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
