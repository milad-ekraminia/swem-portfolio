import { AlertSvg } from '@/assets/icons/alert-svg';
import { formatNumberWithCommas } from '@/helpers/format-number-with-commas';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import DefinitionCardLoader from './definition-card-loader';

export default function DeviceInverterDefinitionCard({
  title,
  value,
  unit,
  isLoading,
  type,
}: Readonly<{
  title: string;
  value: number;
  unit: string;
  isLoading: boolean;
  type: 'warning' | 'success' | 'info';
}>) {
  let backgroundColor = '#FFFAEB';
  let iconBackgroundColor = '#FEF0C7';
  let color = '#DC6803';
  if (type === 'success') {
    backgroundColor = '#ECFDF3';
    iconBackgroundColor = '#DCFAE6';
    color = '#079455';
  } else if (type === 'info') {
    backgroundColor = '#EFF8FF';
    iconBackgroundColor = '#D1E9FF';
    color = '#175CD3';
  }
  return (
    <div className="device-inverter-definition-card">
      {isLoading ? (
        <DefinitionCardLoader />
      ) : (
        <>
          <div
            className="device-inverter-definition-card__header"
            style={{ backgroundColor }}
          >
            <span
              className="device-inverter-definition-card__header-icon"
              style={{ backgroundColor: iconBackgroundColor }}
            >
              <AlertSvg width="16" height="16" stroke={color} />
            </span>
            <span
              aria-label="title"
              className="device-inverter-definition-card__header-title"
              style={{ color }}
            >
              {getTranslatedValue(title)}
            </span>
          </div>
          <div className="device-inverter-definition-card__body">
            <span
              aria-label="value"
              className="device-inverter-definition-card__body-title"
            >
              {formatNumberWithCommas(value || 0, 3)}
            </span>
            <span
              aria-label="unit"
              className="device-inverter-definition-card__body-unit"
            >
              {unit}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
