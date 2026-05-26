import { memo, useMemo, useState } from 'react';
import heatmapNoData from '@/assets/images/no-heatmap-chart-data.png';
import { getCookie } from '@/helpers/cookies';
import { formatNumberWithCommas } from '@/helpers/format-number-with-commas';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useQuery } from '@tanstack/react-query';
import Chart from 'react-apexcharts';
import { fetchOrganizationPlantWeeklyProductionValues } from '@/services/organization-trace/dashboard-api';
import EmptyContent from '@/components/ui/empty-content/empty-content';
import DateInput from '@/components/ui/input/date-input/date-input';
import { Loader } from '@/components/ui/loader/loader';

const today = new Date();
today.setHours(0, 0, 0, 0);
const sevenDaysAgo = new Date();
sevenDaysAgo.setDate(today.getDate() - 6);

const startOfDay = (d: Date) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};

const endOfDay = (d: Date) => {
  const x = new Date(d);
  x.setHours(23, 59, 59, 999);
  return x;
};

const addDays = (d: Date, n: number) => {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
};

function SolarEnergyWidget({
  mapDataRefreshInterval,
}: {
  mapDataRefreshInterval: number;
}) {
  // new DateObject()?.toDate()?.toISOString()
  const todayEnd = endOfDay(new Date());
  const [startDate, setStartDate] = useState<string | null>(
    sevenDaysAgo?.toISOString(),
  );
  const [endDate, setEndDate] = useState<string | null>(today?.toISOString());

  const { data, isLoading } = useQuery({
    queryKey: [
      'Organization Plant Weekly Production Values',
      startDate,
      endDate,
    ],
    queryFn: () =>
      fetchOrganizationPlantWeeklyProductionValues({
        StartDate: startDate ?? '',
        EndDate: endDate ?? '',
      }),
    retry: false,
    enabled: Boolean(startDate && endDate),
    refetchInterval: mapDataRefreshInterval ? mapDataRefreshInterval : false,
  });

  const cultureName = useMemo(() => getCookie('CultureName') || 'en', []);
  const isPersian = cultureName === 'fa' || cultureName === 'fa-IR';
  const chartFontFamily = isPersian
    ? 'YekanBakh, sans-serif'
    : 'InterVariable, sans-serif';

  const series = data?.map((org: any) => ({
    name: org?.organizationName,
    data: (org?.organizationPlantProduction || [])?.map((prod: any) =>
      parseFloat(prod.productionValue?.toFixed(2)),
    ),
  }));

  const allValues = (series ?? [])?.flatMap((s: any) => s.data) ?? [];

  const min = Math.min(...allValues);
  const max = Math.max(...allValues);

  const steps = 5;
  const stepSize = (max - min) / steps;

  const colors = ['#eff8ff', '#d1e9ff', '#b2ddff', '#84caff', '#53b1fd'];

  const ranges = Array.from({ length: steps }, (_, i) => ({
    from: min + i * stepSize,
    to: i === steps - 1 ? max : min + (i + 1) * stepSize,
    color: colors[i],
  }));

  const formatLegendLabel = (value?: string) => {
    if (!value) return '';
    const numericValue = Number(value.trim());
    return Number.isFinite(numericValue)
      ? formatNumberWithCommas(numericValue, 0)
      : value.trim();
  };

  const categories = [1, 2, 3, 4, 5, 6, 7].map((value) =>
    formatNumberWithCommas(value, 0),
  );

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'heatmap',
      fontFamily: chartFontFamily,
      toolbar: { show: false },
    },
    plotOptions: {
      heatmap: {
        radius: 3,
        useFillColorAsStroke: true,
        shadeIntensity: 0.5,
        distributed: true,
        enableShades: false,
        colorScale: {
          ranges,
        },
      },
    },
    dataLabels: {
      enabled: false,
      style: {
        fontFamily: chartFontFamily,
        colors: ['#fff'],
      },
    },
    xaxis: {
      categories,
      tooltip: { enabled: false },
      labels: {
        style: {
          fontFamily: chartFontFamily,
        },
      },
    },
    grid: {
      show: false,
    },
    yaxis: {
      labels: {
        style: {
          fontFamily: chartFontFamily,
        },
      },
    },
    legend: {
      position: 'bottom',
      fontFamily: chartFontFamily,
      formatter(legendName) {
        const [from, to] = (legendName ?? '').split('-');
        const formattedFrom = formatLegendLabel(from);
        const formattedTo = formatLegendLabel(to);
        if (!formattedFrom && !formattedTo) return legendName;
        if (!formattedTo) return formattedFrom;
        if (!formattedFrom) return formattedTo;
        return `${formattedFrom} - ${formattedTo}`;
      },
      markers: {
        shape: 'circle',
      },
    },
    tooltip: {
      style: {
        fontFamily: chartFontFamily,
      },
      y: {
        formatter(value) {
          return formatNumberWithCommas(value, 2);
        },
      },
    },
  };

  const HAS_DATE_LIMIT = !!startDate && !endDate;

  const isEmpty =
    series && series?.every((item: any) => item.data.length === 0);

  return (
    <div className="solar-energy-widget">
      <div className="widget-header">
        <div className="info">
          <div className="info-title">
            {getTranslatedValue('energy_production')}
          </div>
        </div>

        <DateInput
          range
          name="date"
          customIcon={<></>}
          value={[startDate, endDate] as any}
          onChange={(value) => {
            setStartDate(value?.[0] || null);
            setEndDate(value?.[1] || null);
          }}
          minDate={
            HAS_DATE_LIMIT
              ? startOfDay(addDays(new Date(startDate), -6))
              : undefined
          }
          hasMax
          maxDate={
            HAS_DATE_LIMIT
              ? (() => {
                  const s0 = startOfDay(new Date(startDate));
                  const plus7End = endOfDay(addDays(s0, 6));
                  return plus7End < todayEnd ? plus7End : todayEnd;
                })()
              : undefined
          }
        />
      </div>

      <div className="widget-body">
        {isLoading ? (
          <div>
            <Loader />
          </div>
        ) : isEmpty ? (
          <EmptyContent height={350} width={430} img={heatmapNoData} />
        ) : (
          <Chart
            options={options}
            series={series}
            type="heatmap"
            height={350}
            width={430}
          />
        )}
      </div>
    </div>
  );
}

export default memo(SolarEnergyWidget);
