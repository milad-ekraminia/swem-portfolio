import { useDataRefreshRates } from '@/hooks/useDataRefreshRates';
import ActiveAlarmsTable from './active-alarms-table';
import PassiveAlarmsTable from './passive-alarms-table';

export const AlarmTable = ({
  isDeviceAlarm = false,
}: {
  isDeviceAlarm?: boolean;
}) => {
  const [passiveAlarmsInterval, activeAlarmsInterval] = useDataRefreshRates(
    isDeviceAlarm ? [494, 492] : [493, 491],
  );

  return (
    <div className="alarms-table">
      <ActiveAlarmsTable refreshInterval={activeAlarmsInterval} />
      <PassiveAlarmsTable refreshInterval={passiveAlarmsInterval} />
    </div>
  );
};
