import Table from '@/components/ui/table/table';
import { GlobalTableHeader } from '@/components/ui/table/table-head/global-table-header';
import { getColumns, getFieldValue, getNumberFieldValue } from '@/enum-data/reports/system-alarms';
import { downloadExcelFile, downloadExcelFileApiWithRow } from '@/helpers/download-excel-export';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import React, { useMemo, useState } from 'react';


interface Props {
  data: any;
  isLoading?: boolean;
  currentPage?: number;
  setCurrentPage?: React.Dispatch<React.SetStateAction<number>>;
  sorting?: any;
  setSorting?: any;
  setPageSize?: any;
  pageSize?: any;
  filterFields: any;
  selectedIds: any;
  refetch: any;
}

export default function SystemAlarmReportsTable({
  data,
  currentPage,
  isLoading,
  pageSize,
  setCurrentPage,
  setPageSize,
  setSorting,
  sorting,
  filterFields,
  selectedIds,
  refetch,
}: Props) {
  const labelId = getNumberFieldValue(filterFields, 'Label');
  const startDate = getFieldValue(filterFields, 'StartDateTime');
  const endDate = getFieldValue(filterFields, 'EndDateTime');
  const alarmStatus = getNumberFieldValue(filterFields, 'AlarmStatus');
  const approvalStatus = getNumberFieldValue(filterFields, 'AlarmApproval');
  const alarmLevel = getNumberFieldValue(filterFields, 'AlarmLevel');

  const mutation = useMutation({
    mutationFn: downloadExcelFileApiWithRow,
    onSuccess: async (data) => {
      downloadExcelFile({
        response: data,
        fileName: getTranslatedValue('Menu:SystemAlarmReports'),
      });
    },
    onError: async (error: AxiosError) => {
      const errorResponse = await apiErrorHandler(error);
      toastError(errorResponse?.error);
    },
  });

  const handleDownloadExcel = async () => {
    const mutateFormData: any = {
      alarmStatusId: alarmStatus,
      alarmApprovalId: approvalStatus,
      alarmLevelId: alarmLevel,
      labelId,
      filterParameter: [
        'DeviceDescription',
        'DeviceOrganizationName',
        'DeviceModelName',
        'AlarmDescription',
        'LabelName',
        'AlarmConfLevel',
        'AlarmStatus',
        'AlarmValue',
        'CreationTime',
        'AlarmTime',
        'LastUpdateUserFullName',
        'AlarmApprovedDateTime',
        'AlarmApprovedUserFullName',
      ],
      startDate,
      endDate,
      deviceIdList: selectedIds,
    };

    mutation.mutate({
      url: `app/export-to-excel/export-to-excel-system-alarm-list?api-version=${import.meta.env.VITE_API_VERSION}`,
      formData: mutateFormData,
    });
  };

  const memoizedBaseColumns = useMemo(() => getColumns({ refetch }), [data]);
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
        label={getTranslatedValue('Menu:SystemAlarmReports')}
        tableColumns={memoizedBaseColumns}
        setSelectedColumnKeys={setSelectedColumnKeys}
        selectedColumnKeys={selectedColumnKeys}
        columnOrder={columnOrder}
        setColumnOrder={setColumnOrder}
        handleDownload={handleDownloadExcel}
        isExcelDownloading={mutation.isPending}
      />
    ),
    [selectedColumnKeys, columnOrder, mutation.isPending],
  );

  return (
    <Table
      data={data?.items ?? []}
      columns={effectiveColumns}
      maxHeight="650px"
      isLoading={isLoading}
      headerChildren={header}
      totalCount={data?.totalCount ?? 0}
      pageChangeHandler={setCurrentPage}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
      setSorting={setSorting}
      sorting={sorting}
      setPageSize={setPageSize}
      pageSize={pageSize}
      hasPagination={true}
    />
  );
}