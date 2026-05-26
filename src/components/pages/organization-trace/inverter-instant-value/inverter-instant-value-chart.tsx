import LineChart from '@/components/ui/charts/line-chart/line-chart';
import SelectInput from '@/components/ui/input/select-input/select-input';
import { inverterInstantChartFilterValueHandler } from '@/enum-data/organization-trace/inverter-instant-chart-filter-value-handler';
import { generateRandomColors } from '@/helpers/generate-random-colors';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { getUniqueValues } from '@/helpers/get-unique-values';
import { inverterInstantChartTypeValueList } from '@/helpers/select-option-data';
import { fetchInverterInstantValueLineChart } from '@/services/organization-trace/inverter-instant-value-api';
import { useQuery } from '@tanstack/react-query';
import { memo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

const MemoInverterInstantValueChart = () => {
  const treeData = useSelector((state: any) => state?.tree?.info);
  const [chartType, setChartType] = useState<string>('em_instant_voltage');

  const { data, isLoading } = useQuery({
    queryKey: [
      'Inverter Instant Value Line Chart',
      treeData?.tree_id,
      chartType,
    ],
    queryFn: () =>
      fetchInverterInstantValueLineChart({
        tree_id: treeData?.tree_id,
        selectedFilters: inverterInstantChartFilterValueHandler(chartType),
      }),
    retry: false,
    enabled: !!treeData?.tree_id,
  });

  const uniqueDates = getUniqueValues(data, 'date');

  const uniqueTypes = getUniqueValues(data, 'type');

  const series = uniqueTypes.map((type) => ({
    name: type.toString(),
    data: [] as { x: string; y: string }[],
  }));

  uniqueDates.forEach((date) => {
    uniqueTypes.forEach((type, typeIndex) => {
      const entry = data?.find(
        (item: any) => item.date === date && item.type === type,
      );
      const value = entry?.value ?? 0;
      series[typeIndex].data.push({ x: date, y: String(value) });
    });
  });
  type FormValues = {
    mySelect: string; // or string[] if it's a multi-select
  };

  const { control } = useForm<FormValues>();

  return (
    <div className="inverter-instant-value-chart">
      <LineChart
        series={series}
        dates={uniqueDates}
        title={getTranslatedValue(`DailyDataChart`)}
        isLoading={isLoading}
        chartId="inverter-instant-value-chart"
        colors={generateRandomColors(series?.length)}
      >
        <Controller
          control={control}
          name="mySelect"
          render={({ field, fieldState }) => (
            <SelectInput
              name="mySelect"
              placeholder={getTranslatedValue('em_instant_current')}
              options={inverterInstantChartTypeValueList}
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
    </div>
  );
};

const InverterInstantValueChart = memo(MemoInverterInstantValueChart);

export default InverterInstantValueChart;
