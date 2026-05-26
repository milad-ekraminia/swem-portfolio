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

function TotalGeneratedEnergyWidget({ orgId, mapDataRefreshInterval }: Props) {
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

    // Helper function to get display key (hour for Daily, dateText for others)
    const getDisplayKey = (item: any) => {
      if (type === 'Daily' && item.consDate) {
        const date = new Date(item.consDate);
        const hours = String(date.getHours()).padStart(2, '0');
        return `${hours}:00`;
      }
      return item.dateText;
    };

    const seen = new Set<string>();
    return (data?.fn_App_ConsumptionGraphDto ?? [])?.filter((item: any) => {
      const key = getDisplayKey(item);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [data, type]);

  const categories = useMemo(() => {
    const getDisplayKey = (item: any) => {
      if (type === 'Daily' && item.consDate) {
        const date = new Date(item.consDate);
        const hours = String(date.getHours()).padStart(2, '0');
        return `${hours}:00`;
      }
      return item.dateText;
    };
    return uniqueData.map((item: any) => getDisplayKey(item));
  }, [uniqueData, type]);
  const series = [
    {
      name: getTranslatedValue('SolarEnergy'),
      data: uniqueData.map((item: any) => Number(item.indActive1Exp ?? 0)),
    },
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar',
      height: 350,
      stacked: false,
      fontFamily: 'inherit',
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        borderRadius: 2.5,
        horizontal: false,
        columnWidth: '60%',
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
          return formatNumberWithCommas(val, 2);
        },
      },
    },
    fill: {
      opacity: 1,
      colors: ['#FFC107'],
    },
    tooltip: {
      y: {
        formatter: (val: number) => formatNumberWithCommas(val, 2),
      },
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
          // disabled
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

export default memo(TotalGeneratedEnergyWidget);
