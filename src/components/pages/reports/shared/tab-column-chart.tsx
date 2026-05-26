import BarChartEcharts from '@/components/ui/charts/column-chart/column-chart-echarts';
import { Loader } from '@/components/ui/loader/loader';
import Pagination from '@/components/ui/table/pagination/Pagination';
import {
  daysOfMonthDateFormatter,
  monthDateFormatter,
} from '@/helpers/format-data';
import { generateRandomColors } from '@/helpers/generate-random-colors';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { memo, useMemo } from 'react';

interface Props {
  chartData: any[];
  isLoading: boolean;
  isActive: boolean;
  selectedIds: number[];
  selectedFields: string[];
  periodType: number;
  currentPage: number;
  setCurrentPage?: React.Dispatch<React.SetStateAction<number>>;
}

interface DeviceValue {
  ConstDate: string;
  [key: string]: string | number | null; // Dynamic keys for data
}

interface DeviceItem {
  deviceId: number;
  deviceDescription: string;
  deviceOrganizationName: string;
  values: DeviceValue[];
}

interface ChartData {
  orgName: string;
  categories: string[];
  series: { name: string; data: number[] }[];
}

const generateChartData = (
  items: DeviceItem[] = [],
  dynamicFields: string[],
  periodType: number,
): ChartData[] => {
  if (!items || items.length === 0) return [];
  return items?.map((item) => {
    const categories =
      item?.values?.map((value) => {
        if (!value.ConstDate) return '';

        if (periodType === 0) {
          const dateParts = value.ConstDate.split(' ');
          const date = dateParts[0]?.split('-');
          const time = dateParts[1] || '';
          const hourlyDateValue = date && date.length >= 3 ? `${date[2]}.${date[1]}` : '';
          return time ? `${hourlyDateValue} ${time}` : hourlyDateValue;
        }

        return periodType === 1
          ? daysOfMonthDateFormatter(value.ConstDate)
          : monthDateFormatter(value.ConstDate);
      }) || [];

    const series = dynamicFields.map((key: string) => ({
      name: getTranslatedValue(key.charAt(0).toUpperCase() + key.slice(1)),
      color: generateRandomColors(1)[0],
      data: item.values.map(
        (value) =>
          (value[key.charAt(0).toUpperCase() + key.slice(1)] as number) || 0,
      ), // Replace null with 0
    }));

    return {
      orgName: `${item?.deviceOrganizationName || ''} ${item?.deviceDescription}`,
      categories,
      series,
    };
  });
};

const MemoReportsColumnChart = ({
  chartData,
  isActive,
  isLoading,
  periodType,
  selectedFields,
  currentPage,
  setCurrentPage,
  selectedIds,
}: Props) => {
  const data = useMemo(
    () => generateChartData(chartData, selectedFields, periodType),
    [chartData, currentPage],
  );
  return isLoading ? (
    <Loader />
  ) : isActive ? (
    data.length ? (
      <div className="flex flex-col gap-2 rounded-lg bg-white p-6">
        {data?.map((chart: any) => {
          return chart?.orgName ? (
            <div key={chart?.orgName} className="chart-container">
              <div className="chart-title">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {chart.orgName}
                </h3>
              </div>
              <BarChartEcharts
                categories={chart.categories}
                series={chart.series}
                isStacked={false}
              />
            </div>
          ) : null;
        })}
        {setCurrentPage && (
          <Pagination
            currentPage={currentPage || 0}
            totalPages={Math.ceil(selectedIds?.length / 2)}
            onPageChange={(page: number) => setCurrentPage(page)}
            totalCount={selectedIds?.length}
          />
        )}
      </div>
    ) : null
  ) : null;
};

const TabColumnChart = memo(MemoReportsColumnChart);

export default TabColumnChart;
