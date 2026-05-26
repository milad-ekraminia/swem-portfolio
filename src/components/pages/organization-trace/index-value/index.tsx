import { memo } from 'react';
import IndexValueMonthLineChart from '@/components/pages/organization-trace/index-value/index-value-month-line-chart';
import IndexValuesHeatMap from './index-value-heatmap';
import IndexValueLineChart from './index-value-line-chart';
import IndexValueTable from './index-value-table';
import { useDataRefreshRates } from '@/hooks/useDataRefreshRates';

const MemoIndexValues = ({ orgType }: { orgType?: number }) => {
  const [indexValuesInterval] = useDataRefreshRates([498]);

  return (
    <div className="index-values-container">
      <IndexValueTable refreshInterval={indexValuesInterval} />
      <IndexValueLineChart refreshInterval={indexValuesInterval} />
      <IndexValueMonthLineChart refreshInterval={indexValuesInterval} />
      {orgType === 5 && <IndexValuesHeatMap orgType={orgType} refreshInterval={indexValuesInterval} />}
      <IndexValuesHeatMap refreshInterval={indexValuesInterval} />
    </div>
  );
};

const IndexValues = memo(MemoIndexValues);

export default IndexValues;
