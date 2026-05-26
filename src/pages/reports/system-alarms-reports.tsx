import { FilesSvg } from '@/assets/icons/files-svg';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import { ReportsFormWrapper } from '@/components/pages/reports/form-wrapper';
import SystemAlarmReportsTable from '@/components/pages/reports/system-alarms/table';
import {
  getFieldValue,
  getNumberFieldValue,
} from '@/enum-data/reports/system-alarms';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { getSystemAlarmReportApi } from '@/services/reports/get-reports-apis';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';
import { reportsAddProfileInitialValuesTypes } from '@/types/pages/reports/reports';
import { reportsAddProfileSystemAlarmReportInitialValues } from '@/validations/reports/reports-validation';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

const baseBreadcrumbs: BreadcrumbItem[] = [
  {
    label: 'Menu:Reports',
  },
  { label: 'Menu:SystemAlarmReports' },
];

const title = {
  label: 'Menu:SystemAlarmReports',
  href: '/reports/system-alarms',
};

export default function SystemAlarmReports() {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortData, setSortData] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useForm<reportsAddProfileInitialValuesTypes>({
    defaultValues:
      reportsAddProfileSystemAlarmReportInitialValues as reportsAddProfileInitialValuesTypes,
    context: { isProfileNameRequired: false },
  });

  // Watch filter fields
  const filterFields = useWatch({
    control,
    name: 'filterProfileFields',
  }) as any;

  // Extract filter values
  const labelId = getNumberFieldValue(filterFields, 'Label');
  const deviceCategoryId = getNumberFieldValue(filterFields, 'DeviceCategory');
  const deviceModelId = getNumberFieldValue(filterFields, 'DeviceModel');
  const startDate = getFieldValue(filterFields, 'StartDateTime');
  const endDate = getFieldValue(filterFields, 'EndDateTime');
  const alarmStatus = getNumberFieldValue(filterFields, 'AlarmStatus');
  const approvalStatus = getNumberFieldValue(filterFields, 'AlarmApproval');
  const alarmLevel = getNumberFieldValue(filterFields, 'AlarmLevel');
  const selectedOrganizationsObjects = getFieldValue(
    filterFields,
    'SelectedOrganizationsObjects',
  ) as
    | Array<{ id: string | number; organizationTreeNodeType: number }>
    | undefined;

  // Memoize selected device IDs
  const selectedIds = useMemo<number[]>(() => {
    if (
      Array.isArray(selectedOrganizationsObjects) &&
      selectedOrganizationsObjects.length > 0
    ) {
      return selectedOrganizationsObjects
        .filter((item) => item.organizationTreeNodeType === 2)
        .map((item) => Number(item.id));
    }
    return [];
  }, [selectedOrganizationsObjects]);
  console.log(approvalStatus, 'approvalStatus');
  // Query for system alarm reports
  const { data, refetch, isFetching } = useQuery({
    queryKey: [
      'system alarm reports list',
      currentPage,
      sortData,
      pageSize,
      labelId,
      deviceCategoryId,
      deviceModelId,
      startDate,
      endDate,
      alarmStatus,
      approvalStatus,
      alarmLevel,
      selectedIds,
    ],
    queryFn: () =>
      getSystemAlarmReportApi({
        dataParams: {
          sorting: sortData,
          skipCount: currentPage * pageSize,
          pageSize,
          deviceIds: selectedIds,
          deviceCategoryId,
          deviceModelId,
          startDate,
          endDate,
          alarmStatus,
          approvalStatus,
          labelId,
          alarmLevel,
        },
      }),
    enabled: showResult,
  });

  useEffect(() => {
    refetch();
  }, [currentPage]);

  const handleReportGet = () => {
    setShowResult(true);
    refetch();
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
              title={getTranslatedValue('SystemAlarmReport')}
              setValue={setValue}
              handleSubmit={handleSubmit}
              register={register}
              getValues={getValues}
              control={control}
              isSystemAlarm={true}
              hasPeriodType={false}
              filterName="system-alarm"
              errors={errors}
              responseIsLoading={isFetching}
              onGetReport={handleReportGet}
            />
          </div>
          {showResult && (
            <div className="reports-response">
              <SystemAlarmReportsTable
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                filterFields={filterFields}
                setSorting={setSortData}
                sorting={sortData}
                setPageSize={setPageSize}
                pageSize={pageSize}
                isLoading={isFetching}
                selectedIds={selectedIds}
                data={data}
                refetch={refetch}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
