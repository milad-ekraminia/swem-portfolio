import { memo, useMemo, useState } from 'react';
import noChartData from '@/assets/images/no-column-chart-data.png';
import { formatNumberWithCommas } from '@/helpers/format-number-with-commas';
import { getTodayDate } from '@/helpers/get-today-date';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { timeAgoFrom } from '@/helpers/time-ago';
import { useQuery } from '@tanstack/react-query';
import Chart from 'react-apexcharts';
import { fetchProductComparison } from '@/services/organization-trace/product-comparison';
import EmptyContent from '@/components/ui/empty-content/empty-content';
import SelectInput from '@/components/ui/input/select-input/select-input';
import { Loader } from '@/components/ui/loader/loader';

interface Props {
  orgId: number;
  mapDataRefreshInterval: number;
}

function SolarGeneratedEnergyWidget({ orgId, mapDataRefreshInterval }: Props) {
  const todayDate = getTodayDate();
  const [type, setType] = useState<string>('Yearly');

  const { data, isLoading } = useQuery({
    queryKey: ['Production Comparison', orgId, type],
    queryFn: () =>
      fetchProductComparison({
        orgId,
        date: todayDate,
        periodType: type,
      }),
    retry: false,
    enabled: Boolean(type && orgId),
    refetchInterval: mapDataRefreshInterval ? mapDataRefreshInterval : false,
  });

  const uniqueData = useMemo(() => {
    if (!data) return [];
    const seen = new Set<string>();
    return (data?.fn_App_ConsumptionGraphDto ?? [])?.filter((item: any) => {
      if (seen.has(item.dateText)) return false;
      seen.add(item.dateText);
      return true;
    });
  }, [data]);

  const categories = uniqueData.map((item: any) => item.dateText);
  const series = [
    {
      name: getTranslatedValue('ProducedEnergy'),
      data: uniqueData.map((item: any) => item.indActive1Exp ?? 0),
    },
    {
      name: getTranslatedValue('ExpectedEnergy'),
      data: uniqueData.map((item: any) => item.productionForecast ?? 0),
    },
  ];

  const maxValue = useMemo(() => {
    const allValues = series.flatMap((s) => s.data as number[]);
    const max = Math.max(...allValues, 0);
    return Math.ceil(max * 1.1);
  }, [series]);

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
      fontFamily: 'inherit',
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        borderRadius: 2.5,
        borderRadiusApplication: 'around',
        horizontal: false,
        columnWidth: '45%',
      },
    },
    dataLabels: { enabled: false },
    stroke: {
      show: true,
      width: 2,
      lineCap: 'round',
      colors: ['transparent'],
    },
    xaxis: { categories },
    yaxis: {
      min: 0,
      labels: {
        formatter(val) {
          return `${formatNumberWithCommas(val, 1)}`;
        },
      },
      max: maxValue,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.5,
        gradientToColors: ['#53b0fd'],
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
      colors: ['#195ed4', '#e5f2fd'],
    },
    tooltip: {
      y: {
        formatter: (val: number) => formatNumberWithCommas(val, 1),
      },
    },
    grid: {
      show: false,
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'right',
      width: 280,
      height: 25,
      itemMargin: { horizontal: 0, vertical: 0 },
      markers: { shape: 'circle', size: 7 },
    },
  };

  const typeOptions = [
    { displayName: 'yearly', value: 'Yearly' },
    { displayName: 'Monthly', value: 'Monthly' },
    { displayName: 'Daily', value: 'Daily' },
  ];

  const isEmpty =
    series && series?.every((item: any) => item.data.length === 0);

  return (
    <div className="generated-energy-widget">
      <div className="widget-header">
        <div className="info">
          <div className="info-title">
            {getTranslatedValue('ProducedEnergy')}
            <div className="info-title-unit">(MWh)</div>
          </div>
          <div className="info-description">
            {getTranslatedValue('latest_updates')}{' '}
            {timeAgoFrom(data?.lastReadDateTime)}
          </div>
        </div>

        <SelectInput
          name="type"
          value={type}
          onChange={(value) => setType(value)}
          options={typeOptions}
        />
      </div>

      <div className="widget-body">
        {isLoading ? (
          <div>
            <Loader />
          </div>
        ) : uniqueData?.length > 0 || !isEmpty ? (
          <Chart
            options={options}
            series={series}
            type="bar"
            height={350}
            width={430}
          />
        ) : (
          <EmptyContent height={350} width={430} img={noChartData} />
        )}
      </div>
    </div>
  );
}

export default memo(SolarGeneratedEnergyWidget);
