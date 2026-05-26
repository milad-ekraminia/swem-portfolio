import EchartsMixed from '@/components/ui/charts/line-chart/echart-mixed';
import { Loader } from '@/components/ui/loader/loader';
import { getRandomColorWithExclude } from '@/helpers/generate-random-colors';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useEffect, useMemo, useState } from 'react';

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
  chartPeriod?: number | string;
}

function formatChartDataBatched<T extends Record<string, any>>(
  data: T[],
  mapping: ChartFieldMapping,
  batchSize: number,
): Promise<{ series: any[]; dates: any[] }> {
  return new Promise((resolve) => {
    const { xField, yField, groupBy, dateFormatter } = mapping;

    const groupsData: Record<string, Array<{ x: any; y: any }>> = {};
    // Store metadata for each group to avoid find() calls later
    const groupsMetadata: Record<
      string,
      { color: string; serial: string; yAxis: number }
    > = {};
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
        const rawXValue = dateFormatter?.(item[xField]) ?? item[xField];

        const xValueStr = String(rawXValue);
        const yValue = item[yField];

        if (!groupsData[group]) {
          groupsData[group] = [];
          // Store metadata on first occurrence - avoids find() later
          groupsMetadata[group] = {
            color: item.color,
            serial: item.serial || 'line',
            yAxis: item.yAxis,
          };
        }

        // Always push the data point (no deduplication)
        groupsData[group].push({ x: rawXValue, y: yValue });

        // Track unique dates for x-axis
        if (!seenDates.has(xValueStr)) {
          seenDates.add(xValueStr);
          datesArray.push(rawXValue);
        }
      }

      currentIndex = endIndex;

      if (currentIndex < data.length) {
        setTimeout(processBatch, 0);
      } else {
        // Sort dates array once
        const sortedDates = datesArray.sort((a, b) => {
          // Handle different date formats (timestamp, string, etc.)
          const dateA = new Date(a).getTime();
          const dateB = new Date(b).getTime();
          return dateA - dateB;
        });

        const series = Object.keys(groupsData).map((name) => {
          const color = getRandomColorWithExclude(selectedColors);
          const translated_name = getTranslatedValue(name);
          selectedColors.push(color);

          // Get metadata from stored object instead of find() calls
          const metadata = groupsMetadata[name];
          const yAxis = metadata?.yAxis;

          // Sort each series data by x value (date)
          const sortedData = groupsData[name].sort((a, b) => {
            const dateA = new Date(a.x).getTime();
            const dateB = new Date(b.x).getTime();
            return dateA - dateB;
          });

          return {
            name: translated_name,
            data: sortedData,
            color: metadata?.color || color,
            serial: metadata?.serial || 'line',
            yAxis: +yAxis === 1 ? 1 : +yAxis === 2 ? 0 : 0,
          };
        });

        resolve({ series, dates: sortedDates });
      }
    }

    processBatch();
  });
}

export default function TabLineChartMixed({
  chartData,
  dataMapping,
  isLoading,
  isActive,
  chartPeriod,
}: Props) {
  const [formattedData, setFormattedData] = useState({ series: [], dates: [] });
  const [isProcessing, setIsProcessing] = useState(true);

  // Memoize dataMapping to prevent unnecessary re-formatting when object reference changes
  const stableDataMapping = useMemo(() => dataMapping, [dataMapping]);

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
          stableDataMapping,
          500, // Increased batch size for better performance
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
  }, [chartData, stableDataMapping]);
  return isActive ? (
    <>
      {/* Data loading phase */}
      {(isLoading || isProcessing) && <Loader />}

      {/* Chart display */}
      {!isLoading && !isProcessing && (
        <EchartsMixed
          series={formattedData.series}
          dates={formattedData.dates}
          chartPeriod={chartPeriod}
        />
      )}
    </>
  ) : null;
}
