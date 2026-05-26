import React, { JSX } from 'react';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import ExcelExportButton from '../shared/report-excel-export-button';
import ReportTable from '../shared/report-table';

interface Props {
  readonly tableData: any;
  readonly dynamicColumns: string[];
  readonly baseColumns: any[];
  readonly headerChildren?: JSX.Element;
  readonly maxHeight?: number | string;
  readonly isLoading?: boolean;
  readonly currentPage?: number;
  readonly totalCount?: number;
  readonly hasPagination?: boolean;
  readonly setCurrentPage?: React.Dispatch<React.SetStateAction<number>>;
  readonly sorting?: any;
  readonly setSorting?: any;
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
}

export default function ElecProductionConsumptionReportsTable({
  tableData,
  baseColumns,
  dynamicColumns,
  currentPage,
  hasPagination,
  headerChildren,
  isLoading,
  maxHeight,
  pageSize,
  setCurrentPage,
  setPageSize,
  setSorting,
  sorting,
  totalCount,
  excelParams,
}: Props) {
  return (
    <div className="report-results ">
      <div className="report-results__header">
        <span className="report-results__header-title">
          {getTranslatedValue('Report.Title')}
        </span>
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
      </div>
    </div>
  );
}
