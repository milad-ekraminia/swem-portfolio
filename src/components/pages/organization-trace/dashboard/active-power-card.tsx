import { memo } from 'react';
import { formatNumberWithCommas } from '@/helpers/format-number-with-commas';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useQuery } from '@tanstack/react-query';
import { fetchActivePowerSummary } from '@/services/organization-trace';
import { fetchOrganizationDailyProducedValue } from '@/services/organization-trace/dashboard-api';
import Card from '@/components/ui/cards/card';
import CardWithLoader from '@/components/ui/cards/card-with-loader';

const DashboardActivePowerCard = ({
  orgId,
  mapDataRefreshInterval,
}: {
  orgId: number;
  mapDataRefreshInterval?: number;
}) => {
  const { data, isLoading, isPending } = useQuery({
    queryKey: ['Fetch active power summary', orgId],
    queryFn: () => fetchActivePowerSummary({ tree_id: orgId }),
    retry: false,
    // enabled: !!treeData?.tree_id,
    // enabled: false,
    refetchInterval: mapDataRefreshInterval ? mapDataRefreshInterval : false,
  });

  const { data: info, isLoading: dailyLoading } = useQuery({
    queryKey: ['Organization Daily Produced Value', orgId],
    queryFn: () => fetchOrganizationDailyProducedValue({ orgId }),
    retry: false,
    enabled: !!orgId,
    refetchInterval: mapDataRefreshInterval ? mapDataRefreshInterval : false,
  });

  return isLoading || isPending || dailyLoading ? (
    <CardWithLoader />
  ) : (
    <Card
      title={getTranslatedValue('Total.InstantActivePower')}
      count={formatNumberWithCommas(data, 2)}
      parametre={'kW'}
      percent={info?.oneDayBeforeCompared ?? 0}
      periodicCount={0}
      chartData={info?.organizationPlantProductionDto}
      chartStatus={info?.oneDayBeforeCompared > 0}
      type={'chart'}
      hasDetails={false}
    />
  );
};
export default memo(DashboardActivePowerCard);
