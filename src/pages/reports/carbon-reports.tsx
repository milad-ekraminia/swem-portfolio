import { FilesSvg } from '@/assets/icons/files-svg';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import { ReportsFormWrapper } from '@/components/pages/reports/form-wrapper';
import ReportResults from '@/components/pages/reports/shared/report-results';
import { dateFormatter } from '@/helpers/format-data';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { getTariffEnvironmentalPollutionsApi } from '@/services/reports/get-reports-apis';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';
import { reportsAddProfileInitialValuesTypes } from '@/types/pages/reports/reports';
import { reportsAddProfileCarbonReportInitialValues } from '@/validations/reports/carbon-reports';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

const baseBreadcrumbs: BreadcrumbItem[] = [
  {
    label: 'Menu:Reports',
  },
  { label: 'CarbonEmissionsPeriodReport' },
];

const title = {
  label: 'CarbonEmissionsPeriodReport',
  href: '/reports/carbon',
};

export default function CarbonReports() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
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
      reportsAddProfileCarbonReportInitialValues as reportsAddProfileInitialValuesTypes,
    context: {
      isProfileNameRequired: false,
    },
  });

  const watchInfo = useWatch({
    control,
    name: 'filterProfileFields',
  });

  const startDate = watchInfo?.find(
    (item: any) => item?.fieldName === 'StartDateTime',
  );
  const endDate = watchInfo?.find(
    (item: any) => item?.fieldName === 'EndDateTime',
  );

  const {
    data: tableData,
    refetch,
    isFetching: reportLoading,
  } = useQuery({
    queryKey: ['tariff environmental pollutions', currentPage, pageSize],
    queryFn: () =>
      getTariffEnvironmentalPollutionsApi({
        dataParams: {
          skipCount: currentPage * pageSize,
          maxResultCount: pageSize,
          readDateTimeMin: startDate?.fieldValue,
          readDateTimeMax: endDate?.fieldValue,
        },
      }),
    retry: false,
    enabled: false,
  });

  // const {
  //   data: chartData = [],
  //   refetch: chartRefetch,
  //   isFetching: chartIsLoading,
  // } = useQuery({
  //   queryKey: ['carbon reports chart'],
  //   queryFn: () =>
  //     ({
  //       dataParams: {
  //         startDate: startDate?.fieldValue,
  //         endDate: endDate?.fieldValue,
  //       },
  //     }),
  //   retry: false,
  //   enabled: false,
  // });

  useEffect(() => {
    refetch();
  }, [currentPage])

  const handleReportGet = () => {
    refetch();
    // chartRefetch();
    setShowResult(true);
  };

  // static table headers
  const staticTableHeaders: any[] = useMemo(() => [
    {
      title: 'TariffDescription',
      accessorKey: 'tariffDescription',
    },
    {
      title: 'StartDate',
      accessorKey: 'startDate',
      cell: ({ row }: any) => {
        return dateFormatter(row?.original?.readDateTime, true);
      },
    },
    {
      title: 'EndDate',
      accessorKey: 'endDate',
      cell: ({ row }: any) => {
        return dateFormatter(row?.original?.readDateTime, true);
      },
    },
    {
      title: 'em_tep_value',
      accessorKey: 'tep',
    },
    {
      title: 'CarbonEmissionValue',
      accessorKey: 'tariffCarbon',
    },
    {
      title: 'unit',
      accessorKey: 'unit',
    },
    {
      title: 'em_tree_value',
      accessorKey: 'treeCount',
    },
  ], []);

  const excelFormData: any = {
    filterParameter: [
      'TariffDescription',
      'StartDate',
      'EndDate',
      'Tep',
      'TariffCarbon',
      'Unit',
      'TreeCount',
    ],
  };

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
              title={getTranslatedValue('CarbonEmissionsPeriodReport')}
              setValue={setValue}
              handleSubmit={handleSubmit}
              register={register}
              getValues={getValues}
              control={control}
              hasPeriodType={false}
              filterName="tariff-environmental-pollutions"
              isCarbonReport={true}
              errors={errors}
              // responseIsLoading={reportLoading || chartIsLoading}
              responseIsLoading={false}
              onGetReport={handleReportGet}
            />
          </div>
          {showResult && (
            <div className="reports-response">
              <ReportResults
                baseColumns={staticTableHeaders}
                tableData={tableData?.items || []}
                isLoading={reportLoading}
                // chartData={chartData ?? []}
                chartData={[]}
                dataMapping={dataMapping}
                // chartIsLoading={chartIsLoading}
                chartIsLoading={false}
                dynamicColumns={[]}
                pageSize={pageSize}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                setPageSize={setPageSize}
                totalCount={tableData?.totalCount ?? 0}
                excelParams={{
                  excelFormData,
                  watchInfo,
                  excelFileName: 'CarbonEmissionsPeriodReport',
                  excelUrl: `app/export-to-excel/export-to-excel-tariff-environmental-pollutions-list?api-version=${import.meta.env.VITE_API_VERSION}`,
                }}
                hasTab={false}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
