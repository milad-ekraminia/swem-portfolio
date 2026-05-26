import { memo } from 'react';
import { cardsTitle } from '@/enum-data/organization-trace/org-trace-index';
import { formatNumberWithCommas } from '@/helpers/format-number-with-commas';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { fetchActivePowerSummary } from '@/services/organization-trace';
import { fetchOrganizationDailyProducedValue } from '@/services/organization-trace/dashboard-api';
import Card from '@/components/ui/cards/card';
import CardWithLoader from '@/components/ui/cards/card-with-loader';

const ActivePowerSummary = ({
  refetchInterval,
}: {
  refetchInterval?: number;
}) => {
  console.log("🚀 ~ ActivePowerSummary ~ refetchInterval:", refetchInterval)
  const treeData = useSelector((state: any) => state?.tree?.info);
  console.log('treeData', treeData);
  const { data, isLoading, isPending } = useQuery({
    queryKey: ['Fetch active power summary', treeData?.tree_id],
    queryFn: () => fetchActivePowerSummary({ tree_id: treeData?.tree_id }),
    retry: false,
    enabled: true,
  });

  const { data: info, isLoading: dailyLoading } = useQuery({
    queryKey: ['Organization Daily Produced Value', treeData?.tree_id],
    queryFn: () =>
      fetchOrganizationDailyProducedValue({ orgId: treeData?.tree_id }),
    retry: false,
    enabled: true,
  });

  return isLoading || isPending || dailyLoading ? (
    <CardWithLoader />
  ) : (
    <Card
      title={cardsTitle()[0].title}
      count={formatNumberWithCommas(data, 2)}
      parametre={cardsTitle()[0].unit}
      type={'chart'}
      hasDetails={false}
      percent={info?.oneDayBeforeCompared ?? 0}
      periodicCount={0}
      chartData={info?.organizationPlantProductionDto as any}
      chartStatus={info?.oneDayBeforeCompared as any > 0}
    />
  );
};
export default memo(ActivePowerSummary);
