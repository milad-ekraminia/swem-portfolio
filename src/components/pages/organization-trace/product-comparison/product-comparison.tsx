import { memo, useEffect, useState } from 'react';
import { getTodayDate } from '@/helpers/get-today-date';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { fetchProductComparison } from '@/services/organization-trace/product-comparison';
import ColumnChart from '@/components/ui/charts/column-chart/column-chart';
import LineChart from '@/components/ui/charts/line-chart/line-chart';

export const mockLineChartDataNoisy = {
  title: 'Grid Load Analysis',

  dates: [
    '00:00',
    '02:00',
    '04:00',
    '06:00',
    '08:00',
    '10:00',
    '12:00',
    '14:00',
    '16:00',
    '18:00',
    '20:00',
    '22:00',
  ],

  series: [
    {
      name: 'Consumption',
      data: [320, 280, 260, 300, 450, 780, 1100, 980, 760, 620, 500, 420],
    },
    {
      name: 'Production',
      data: [0, 0, 50, 200, 600, 1200, 1600, 1500, 1100, 700, 200, 0],
    },
    {
      name: 'Net Load',
      data: [320, 280, 210, 100, -150, -420, -500, -520, -340, -80, 300, 420],
    },
  ],

  colors: ['#1570EF', '#12B76A', '#F04438'],
};

const MemoProductComparison = () => {
  const treeData = useSelector((state: any) => state?.tree?.info);
  const { inserted_date, period_type } = useSelector(
    (state: any) => state.dateFilter.info,
  );
  const todayDate = getTodayDate();

  const [selectedDate, setSelectedDate] = useState<string>(
    inserted_date ?? todayDate,
  );

  useEffect(() => {
    if (inserted_date) {
      setSelectedDate(inserted_date);
    }
  }, [inserted_date]);

  const { data, isLoading } = useQuery({
    queryKey: [
      'Production Comparison',
      treeData?.tree_id,
      selectedDate,
      period_type,
    ],
    queryFn: () =>
      fetchProductComparison({
        orgId: treeData?.tree_id,
        periodType: period_type,
        date: selectedDate,
      }),
    retry: false,
  });

  console.log('🚀 ~ MemoProductComparison ~ data:', data);
  return (
    <div className="product-comparison">
      <div className="product-comparison__column-chart">
        <ColumnChart
          title={data?.title}
          categories={data?.categories ?? []}
          series={data?.series || []}
          downloadHandler={() => {}}
          isLoading={isLoading}
          colors={['#2E90FA', '#47CD89', '#FEC84B']}
          isStacked={false}
          type=""
        />
      </div>
      <div className="product-comparison__line-chart">
        <LineChart
          series={(mockLineChartDataNoisy.series as any) || []}
          dates={(mockLineChartDataNoisy.dates as string[]) || []}
          title={data?.title}
          isLoading={isLoading}
          chartId="plant_inverter_production_comparison"
          colors={['#2E90FA', '#47CD89', '#FEC84B']}
          removeXaxisData={true}
          xaxisType="category"
        />
      </div>
    </div>
  );
};

const ProductComparison = memo(MemoProductComparison);

export default ProductComparison;
