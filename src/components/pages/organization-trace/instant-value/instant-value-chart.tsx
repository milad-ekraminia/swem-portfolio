import { memo, useState } from 'react';
import { instantChartFilterValueHandler } from '@/enum-data/organization-trace/inverter-instant-chart-filter-value-handler';
import { generateRandomColors } from '@/helpers/generate-random-colors';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { instantChartTypeValueList } from '@/helpers/select-option-data';
import { useQuery } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { fetchInstantValueLineChart } from '@/services/organization-trace/instant-value';
import LineChart from '@/components/ui/charts/line-chart/line-chart';
import SelectInput from '@/components/ui/input/select-input/select-input';

const MemoInstantValueChart = () => {
  const treeData = useSelector((state: any) => state?.tree?.info);
  const [chartType, setChartType] = useState<string>('em_instant_current');

  const { data, isLoading } = useQuery({
    queryKey: ['Instant Value Line Chart', treeData?.tree_id, chartType],
    queryFn: () =>
      fetchInstantValueLineChart({
        tree_id: treeData?.tree_id,
        selectedFilters: instantChartFilterValueHandler(chartType),
      }),
    retry: false,
    enabled: !!treeData?.tree_id,
  });

  const uniqueDates = [
    ...new Set(data?.map((item: any) => item.dateText)),
  ] as string[];

  const uniqueTypes = [
    ...new Set(data?.map((item: any) => item.type)),
  ] as string[];

  const series = uniqueTypes.map((type) => ({
    name: type.toString(),
    data: [] as { x: string; y: string }[],
  }));

  uniqueDates.forEach((dateText) => {
    uniqueTypes.forEach((type, typeIndex) => {
      const entry = data?.find(
        (item: any) => item.dateText === dateText && item.type === type,
      );
      const value = entry?.value ?? 0;
      series[typeIndex].data.push({ x: dateText, y: String(value) });
    });
  });

  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

  const lastOneHourData = data?.filter(
    (item: any) => new Date(item?.date) > oneHourAgo,
  );

  const uniqueTimes = [
    ...new Set(lastOneHourData?.map((item: any) => item.dateText)),
  ] as string[];

  const timeSeries = uniqueTypes.map((type) => ({
    name: type.toString(),
    data: [] as { x: string; y: string }[],
  }));

  uniqueTimes.forEach((dateText) => {
    uniqueTypes.forEach((type, typeIndex) => {
      const entry = data?.find(
        (item: any) => item.dateText === dateText && item.type === type,
      );
      const value = entry?.value ?? 0;
      timeSeries[typeIndex].data.push({ x: dateText, y: String(value) });
    });
  });
  type FormValues = {
    mySelect: string;
  };

  const { control } = useForm<FormValues>();

  return (
    <div className="instant-value-chart">
      <LineChart
        series={timeSeries}
        dates={uniqueTimes}
        title={getTranslatedValue(`DailyDataChart`)}
        isLoading={isLoading}
        chartId="hourly-instant-value-chart"
        xaxisType="category"
        colors={generateRandomColors(timeSeries?.length)}
      >
        <Controller
          control={control}
          name="mySelect"
          defaultValue="em_instant_current"
          render={({ field, fieldState }) => (
            <SelectInput
              name="mySelect"
              placeholder={getTranslatedValue('em_instant_current')}
              options={instantChartTypeValueList}
              field={field}
              error={fieldState.error?.message}
              onChange={(val) => {
                field.onChange(val);
                setChartType(val);
              }}
            />
          )}
        />
      </LineChart>

      {series?.length > 0 && (
        <LineChart
          series={series}
          dates={uniqueDates}
          title={getTranslatedValue(`DailyDataChart`)}
          isLoading={isLoading}
          chartId="instant-value-chart"
          xaxisType="category"
          colors={generateRandomColors(series?.length)}
        />
      )}
    </div>
  );
};

const InstantValueChart = memo(MemoInstantValueChart);

export default InstantValueChart;
