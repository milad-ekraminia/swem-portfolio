import { CheckIconSvg } from '@/assets/icons/check-svg';
import { getClassNames } from '@/helpers/get-class-names';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useState } from 'react';
import Toggle from '../input/toggle-button/toggle';

export const CustomLegendDropdown = ({
  toggleAllSeries,
  filteredSeries,
  toggleSeries,
  hiddenSeries,
}: {
  toggleSeries: (item: any) => void;
  toggleAllSeries: () => void;
  filteredSeries: any;
  colors: any;
  hiddenSeries: string[];
}) => {
  const [isOn, setIsOn] = useState(false);
  return (
    <div className="custom-legend-drop-down">
      <div className="custom-legend-drop-down__show-all">
        <Toggle
          isOn={isOn}
          setIsOn={() => {
            toggleAllSeries();
            setIsOn(!isOn);
          }}
        />
        <span className="">{getTranslatedValue('EnableAll')}</span>
      </div>
      <div className="custom-legend-drop-down__items">
        {[...filteredSeries].map((s: any) => (
          <div
            key={s.name}
            className={getClassNames('custom-legend__item', [
              [hiddenSeries.includes(s.name), 'disabled'],
            ])}
          >
            <span
              style={{
                backgroundColor: s.color,
              }}
              className="custom-legend__item-status"
            >
              {!hiddenSeries.includes(s.name) ? (
                <CheckIconSvg width="12" height="12" stroke="#fff" />
              ) : (
                ''
              )}
            </span>
            <button
              className="custom-legend__item-title-toggler"
              onClick={() => toggleSeries(s.name)}
            >
              {s.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
