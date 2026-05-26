import { useEffect, useState } from 'react';
import { getRandomColorWithExclude } from '@/helpers/generate-random-colors';
import LineChartEcharts from '@/components/ui/charts/line-chart/line-chart-echart';
import { Loader } from '@/components/ui/loader/loader';
import { getTranslatedValue } from '@/helpers/get-translated-value';

type ChartFieldMapping = {
  xField: string; // X-axis value (can be dateText, formatted date, etc.)
  yField: string; // Y-axis value
  groupBy: string; // Series grouping field
  dateField?: string; // Used for sorting and formatting if needed
  dateFormatter?: (date: string) => string | number; // Optional custom formatter
};
interface Props {
  dataMapping: ChartFieldMapping;
  chartData: any[];
  isLoading: boolean;
  isActive: boolean;
}

function formatChartDataBatched<T extends Record<string, any>>(
  data: T[],
  mapping: ChartFieldMapping,
  batchSize: number,
): Promise<{ series: any[]; dates: any[] }> {
  return new Promise((resolve) => {
    const { xField, yField, groupBy, dateFormatter } = mapping;

    const groupsData: Record<string, Record<string, any>> = {};
    const seenDates = new Set<string>();
    const datesArray: any[] = [];
    const selectedColors: any[] = [];
    let currentIndex = 0;

    function processBatch() {
      const endIndex = Math.min(currentIndex + batchSize, data.length);

      for (let i = currentIndex; i < endIndex; i++) {
        const item = data[i];
        const group = item[groupBy];

        // const rawXValue = item[xField];
        const rawXValue = dateFormatter?.(item[xField]);

        const xValueStr = String(rawXValue);
        const yValue = item[yField];

        if (!groupsData[group]) {
          groupsData[group] = {};
        }

        if (!(xValueStr in groupsData[group])) {
          groupsData[group][xValueStr] = { x: rawXValue, y: yValue };
          if (!seenDates.has(xValueStr)) {
            seenDates.add(xValueStr);
            datesArray.push(rawXValue);
          }
        }
      }

      currentIndex = endIndex;

      if (currentIndex < data.length) {
        setTimeout(processBatch, 0);
      } else {
        const series = Object.keys(groupsData).map((name) => {
          const color = getRandomColorWithExclude(selectedColors);
          const translated_name = getTranslatedValue(name);
          selectedColors.push(color);
          return {
            name: translated_name,
            data: Object.values(groupsData[name]),
            color: color,
          };
        });

        resolve({ series, dates: datesArray });
      }
    }

    processBatch();
  });
}

export default function TabLineChart({
  chartData,
  dataMapping,
  isLoading,
  isActive,
}: Props) {
  const [formattedData, setFormattedData] = useState({ series: [], dates: [] });
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const formatData = async () => {
      if (!chartData || chartData.length === 0) {
        setFormattedData({ series: [], dates: [] });
        setIsProcessing(false);
        return;
      }
      setIsProcessing(true);
      try {
        const result = await formatChartDataBatched(
          chartData,
          dataMapping,
          250,
        );
        setFormattedData(result as any);
      } catch (error) {
        console.error('Error formatting chart data:', error);
        setFormattedData({ series: [], dates: [] });
      } finally {
        setIsProcessing(false);
      }
    };
    formatData();
  }, [chartData, dataMapping]);

  return isActive ? (
    <>
      {/* Data loading phase */}
      {(isLoading || isProcessing) && <Loader />}

      {/* Chart display */}
      {!isLoading && !isProcessing && (
        <LineChartEcharts
          series={formattedData.series}
          dates={formattedData.dates}
        />
      )}
    </>
  ) : null;
}
