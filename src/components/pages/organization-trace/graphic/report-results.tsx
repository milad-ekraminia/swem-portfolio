import React, { JSX } from 'react';
import { ChartFieldMapping } from '@/types/pages/reports/reports-shared';
import TabLineChartMixed from '../../reports/shared/tab-line-chart-mixed';

// Chart field mapping
const dataMappingDummy = {
  xField: 'date', // X-axis values (dates in this case)
  yField: 'value', // Y-axis values
  groupBy: 'device', // Groups series by device type
  dateField: 'date',
  dateFormatter: (date: string) =>
    new Date(date).toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
};


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
  readonly chartData?: any;
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
  chartPeriod?: number | string;
  setChartCurrentPage?: React.Dispatch<React.SetStateAction<number>>;
}

export default function ReportResults({
  chartIsLoading = false,
  chartData,
  chartPeriod,
}: Props) {
  return (
    <div className="report-results ">
      <div className="report-results__content">
        <div className={`  report-results__content-chart`}>
          <TabLineChartMixed
            isLoading={chartIsLoading}
            chartData={chartData}
            dataMapping={dataMappingDummy}
            isActive={true}
            chartPeriod={chartPeriod}
          />
        </div>
      </div>
    </div>
  );
}
