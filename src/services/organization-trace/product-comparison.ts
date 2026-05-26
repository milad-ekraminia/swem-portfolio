type dataParamsProps = {
  'api-version': number;
  periodType: string;
  date: string;
};

const apiVersion = import.meta.env.VITE_API_VERSION;

export async function fetchProductComparison({
  orgId,
  periodType = 'Daily',
  date,
}: {
  orgId: number;
  periodType?: string;
  date: string;
}) {
  const dataParams: dataParamsProps = {
    'api-version': apiVersion,
    periodType,
    date,
  };

  console.log('fetchProductComparison params:', {
    orgId,
    ...dataParams,
  });

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    title: 'Energy Plant Performance',
    categories: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    series: [
      {
        name: 'Active Power',
        data: [0, 120, 850, 1400, 1100, 300],
      },
      {
        name: 'Reactive Power',
        data: [50, 80, 120, 200, 160, 70],
      },
      {
        name: 'Forecast',
        data: [0, 100, 900, 1300, 1200, 400],
      },
    ],
    colors: ['#1570EF', '#F04438', '#667085'],
  };
}
