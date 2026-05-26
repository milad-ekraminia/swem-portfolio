import { useQuery } from '@tanstack/react-query';
import { fetchDataRefreshRates } from '@/services/system-administration/definitions/firm-configurations';

export const useDataRefreshRates = (
  names: number[],
): (number | undefined)[] => {
  const { data: refreshRates } = useQuery({
    queryKey: ['data-refresh-rates'],
    queryFn: () => fetchDataRefreshRates(),
    retry: false,
  });

  // Return values in the same order as the input names array
  return names.map((id) => {
    const rate = refreshRates?.find((rate: any) => +rate?.id === id);
    return rate ? rate.value * 1000 : 0;
  });
};
