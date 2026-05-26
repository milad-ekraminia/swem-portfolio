import Toggle from '@/components/ui/input/toggle-button/toggle';
import { getTranslatedValue } from '@/helpers/get-translated-value';

export const InverterInstantValueTableHeader = ({
  formattedDate,
  setViewMode,
  viewMode,
}: any) => {
  return (
    <div className="inverter-instant-value-table-header">
      <div className="title">
        <span className="text">
          {getTranslatedValue('InverterInstantValue')}
        </span>
        <span className="header-date-status">{formattedDate}</span>
      </div>
      <div className="action">
        <span>{getTranslatedValue('GraphView')}</span>
        <Toggle
          isOn={viewMode == 'list'}
          setIsOn={() => {
            setViewMode(viewMode == 'list' ? 'chart' : 'list');
          }}
        />
        <span>{getTranslatedValue('ListView')}</span>
      </div>
    </div>
  );
};
