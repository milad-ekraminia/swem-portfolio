import { getTranslatedValue } from '@/helpers/get-translated-value';

export const SensorValueTableHeader = ({ formattedDate }: any) => {
  return (
    <div className="sensor-value-header">
      <span>{getTranslatedValue('em_io_sensor_value')}</span>
      <span className="header-date-status">{formattedDate}</span>
    </div>
  );
};
