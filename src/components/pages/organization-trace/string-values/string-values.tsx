import StringValueChart from './string-value-line-chart';
import { StringValuesTable } from './string-values-table';

export const StringValues = () => {
  return (
    <div className="string-values-container">
      <StringValuesTable />
      <StringValueChart />
    </div>
  );
};
