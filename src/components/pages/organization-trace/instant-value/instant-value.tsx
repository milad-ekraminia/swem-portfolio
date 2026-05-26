import { memo } from 'react';
import InstantValueChart from './instant-value-chart';
import InstantValueTable from './instant-value-table';

const MemoInstantValue = () => {
  return (
    <div className="instant-value-container">
      <InstantValueTable />
      <InstantValueChart />
    </div>
  );
};

const InstantValue = memo(MemoInstantValue);

export default InstantValue;
