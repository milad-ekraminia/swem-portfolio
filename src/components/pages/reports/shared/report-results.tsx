import Tabs from '@/components/ui/tabs/tabs';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { ChartFieldMapping } from '@/types/pages/reports/reports-shared';
import React, { JSX, useState } from 'react';
import ExcelExportButton from './report-excel-export-button';
import ReportTable from './report-table';
import TabColumnChart from './tab-column-chart';
import TabLineChart from './tab-line-chart';


interface Props {
  readonly tableData: any;
  readonly dynamicColumns: string[];
  readonly baseColumns: any[];
  readonly chartIsLoading?: boolean;
  readonly headerChildren?: JSX.Element;
  readonly maxHeight?: number | string;
  readonly isLoading?: boolean;
  readonly currentPage?: number;
  readonly totalCount?: number;
  readonly chartData?: any[];
  readonly hasPagination?: boolean;
  readonly setCurrentPage?: React.Dispatch<React.SetStateAction<number>>;
  readonly sorting?: any;
  readonly setSorting?: any;
  readonly dataMapping?: ChartFieldMapping;
  readonly setPageSize?: any;
  readonly pageSize?: any;
  readonly excelParams?: {
    readonly excelFormData: any;
    readonly excelUrl: string;
    readonly excelFileName: string;
    readonly watchInfo: any;
    readonly excelType?: string;
    readonly customFormData?: any;
    readonly productionConsumptionsData?: any;
  };
  chartType?: 'area' | 'bar';
  periodType?: number;
  selectedIds?: number[];
  chartCurrentPage?: number;
  setChartCurrentPage?: React.Dispatch<React.SetStateAction<number>>;
  hasTab?: boolean
}

export default function ReportResults({
  tableData,
  baseColumns,
  dynamicColumns,
  currentPage,
  hasPagination,
  dataMapping,
  headerChildren,
  isLoading,
  maxHeight,
  pageSize,
  setCurrentPage,
  setPageSize,
  setSorting,
  sorting,
  periodType,
  chartData,
  totalCount,
  chartIsLoading = false,
  excelParams,
  chartType = 'area',
  chartCurrentPage,
  setChartCurrentPage,
  selectedIds,
  hasTab = true
}: Props) {
  const [activeTab, setActiveTab] = useState<string>('ReportButton');

  return (
    <div className="report-results ">
      <div className="report-results__header">
        {hasTab ? (
          <div className="report-results__header-tabs">
            <Tabs
              tabs={[
                {
                  title: 'ReportButton',
                },
                {
                  title: 'GraphicReportButton',
                },
              ]}
              activeTab={activeTab}
              onTabClick={(tab: string) => {
                setActiveTab(tab);
              }}
            />
          </div>
        ) : (
          <span>{getTranslatedValue('Menu:Reports')}</span>
        )}
        {excelParams && (
          <ExcelExportButton
            url={excelParams?.excelUrl}
            watchInfo={excelParams?.watchInfo}
            formData={excelParams?.excelFormData}
            fileName={getTranslatedValue(excelParams?.excelFileName)}
            customFormData={excelParams?.customFormData}
            productionConsumptionsData={excelParams?.productionConsumptionsData}
            excelType={excelParams?.excelType}
          />
        )}
      </div>
      <div className="report-results__content">
        {activeTab === 'ReportButton' ? (
          <div className="report-results__content-table">
            <ReportTable
              data={tableData}
              baseColumns={baseColumns}
              dynamicFields={dynamicColumns}
              maxHeight={maxHeight}
              isLoading={isLoading}
              headerChildren={headerChildren}
              totalCount={totalCount}
              pageChangeHandler={setCurrentPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              setSorting={setSorting}
              sorting={sorting}
              setPageSize={setPageSize}
              pageSize={pageSize}
              hasPagination={hasPagination}
            />
          </div>
        ) : null}
        <div
          className={` ${activeTab === 'GraphicReportButton' ? 'active' : 'hidden'} report-results__content-chart`}
        >
          {chartType === 'area' && dataMapping ? (
            <TabLineChart
              isLoading={chartIsLoading}
              chartData={chartData ?? []}
              dataMapping={dataMapping}
              isActive={activeTab === 'GraphicReportButton'}
            />
          ) : (
            <TabColumnChart
              currentPage={chartCurrentPage as any}
              setCurrentPage={setChartCurrentPage as any}
              chartData={chartData ?? []}
              isActive={activeTab === 'GraphicReportButton'}
              isLoading={chartIsLoading}
              periodType={periodType as number}
              selectedFields={dynamicColumns}
              selectedIds={selectedIds as number[]}
            />
          )}
        </div>
      </div>
    </div>
  );
}