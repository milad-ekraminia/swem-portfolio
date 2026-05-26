import SearchableDropdown from '@/components/ui/input/searchable-select/searchable-select';
import Table from '@/components/ui/table/table';
import { GlobalTableHeader } from '@/components/ui/table/table-head/global-table-header';
import { getTagReportsColumns } from '@/enum-data/reports/tag-reports';
import {
  downloadExcelFile,
  downloadExcelFileApiWithRow,
} from '@/helpers/download-excel-export';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { formatSelectOptions } from '@/helpers/format-select-options';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import {
  fetchGetGesLookup,
  fetchGetTagReports,
} from '@/services/reports/tag-reports';
import { ISort } from '@/types/components/ui/table';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useMemo, useState } from 'react';

export default function TagReportsTable() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [sortData, setSortData] = useState<ISort>([]);
  const [selectedOrganization, setSelectedOrganization] = useState<
    number | null
  >();
  const [searchTerm, setSearchTerm] = useState<string>('');

  const { data, isLoading } = useQuery({
    queryKey: [
      'get tag reports',
      sortData,
      searchTerm,
      currentPage,
      selectedOrganization,
    ],
    queryFn: () =>
      fetchGetTagReports({
        skipCount: currentPage * pageSize,
        sorting: sortData,
        filterText: searchTerm,
        maxResultCount: pageSize,
        id: Number(selectedOrganization),
      }),
    retry: false,
    enabled: !!selectedOrganization,
  });
  const { data: GESData, isLoading: GESLoading } = useQuery({
    queryKey: ['get GES lookup'],
    queryFn: () => fetchGetGesLookup(),
    retry: false,
  });

  const mutation = useMutation({
    mutationFn: downloadExcelFileApiWithRow,
    onSuccess: async (data) => {
      downloadExcelFile({
        response: data,
        fileName: getTranslatedValue('Menu:TagReports'),
      });
    },
    onError: async (error: AxiosError) => {
      const errorResponse = await apiErrorHandler(error);
      toastError(errorResponse?.error);
    },
  });

  const handleDownloadExcel = async () => {
    const mutateFormData: any = {
      organizationId: selectedOrganization,
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
        label={getTranslatedValue('TagReport')}
        tableColumns={memoizedBaseColumns}
        setSelectedColumnKeys={setSelectedColumnKeys}
        selectedColumnKeys={selectedColumnKeys}
        columnOrder={columnOrder}
        setColumnOrder={setColumnOrder}
        searchInputHandler={setSearchTerm}
        isExcelDownloading={mutation.isPending}
        handleDownload={handleDownloadExcel}
      />
    ),
    [selectedColumnKeys, columnOrder, handleDownloadExcel, mutation.isPending],
  );

  const formattedGESData = useMemo(() => {
    return GESData ? formatSelectOptions(GESData) : [];
  }, [GESData]);

  return (
    <div className="tag-reports">
      <div className="tag-reports__filter">
        <SearchableDropdown
          name="selectedOrganization"
          searchParameterLabel={'title'}
          options={formattedGESData}
          selectedVal={
            selectedOrganization
              ? formattedGESData?.find(
                (item: any) => item.value == selectedOrganization,
              )?.title
              : null
          }
          placeholder={getTranslatedValue('Organization')}
          handleChange={(value: any) => {
            setSelectedOrganization(Number(value));
          }}
          isLoading={GESLoading}
          isRequiredInput={true}
        />
      </div>
      <Table
        data={(data?.items as any) ?? []}
        columns={effectiveColumns}
        maxHeight="650px"
        isLoading={isLoading}
        headerChildren={header}
        totalCount={data?.totalCount || 0}
        pageChangeHandler={setCurrentPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        setSorting={setSortData}
        sorting={sortData}
        setPageSize={setPageSize}
        pageSize={pageSize}
        hasPagination={true}
      />
    </div>
  );
}
