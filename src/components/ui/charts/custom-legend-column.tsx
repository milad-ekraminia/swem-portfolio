import { memo, useCallback } from 'react';
import { CheckIconSvg } from '@/assets/icons/check-svg';
import { getClassNames } from '@/helpers/get-class-names';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import ApexCharts from 'apexcharts';
import { DropdownWrapper } from '../dropdown/dropdown-wrapper/drop-down-wrapper';
import { CustomLegendDropdown } from './custom-legend-dropdown';

const MemoCustomLegend = ({
  filteredSeries,
  colors,
  chartId,
  hiddenSeries,
  setHiddenSeries,
  maxShownItems = 5,
}: {
  filteredSeries: any[];
  colors: string[];
  chartId: string;
  hiddenSeries: string[];
  setHiddenSeries: React.Dispatch<React.SetStateAction<string[]>>;
  maxShownItems?: number;
}) => {
  // const [activeSeries, setActiveSeries] = useState<string | null>(null); // For "show only" feature

  const batchToggleSeries = useCallback(
    (seriesNames: string[], shouldHide: boolean) => {
      const updatedHiddenSeries = shouldHide
        ? [...hiddenSeries, ...seriesNames]
        : hiddenSeries.filter((name) => !seriesNames.includes(name));

      ApexCharts.exec(
        chartId,
        shouldHide ? 'hideSeries' : 'showSeries',
        seriesNames,
      );
      setHiddenSeries(updatedHiddenSeries);
    },
    [chartId, hiddenSeries, setHiddenSeries],
  );

  const toggleSeries = (seriesName: string) => {
    const isHidden = hiddenSeries.includes(seriesName);
    batchToggleSeries([seriesName], !isHidden);
  };

  // const toggleShowOnlySeries = (seriesName: string) => {
  //   if (activeSeries === seriesName) {
  //     // Reset all series
  //     filteredSeries.forEach((s: any) => {
  //       ApexCharts.exec(chartId, "showSeries", s.name);
  //     });
  //     setHiddenSeries([]); // Clear all hidden series
  //     setActiveSeries(null);
  //   } else {
  //     // Show only the clicked series and hide others
  //     filteredSeries.forEach((s: any) => {
  //       if (s.name === seriesName) {
  //         ApexCharts.exec(chartId, "showSeries", s.name);
  //       } else {
  //         ApexCharts.exec(chartId, "hideSeries", s.name);
  //       }
  //     });

  //     setHiddenSeries(
  //       filteredSeries
  //         .filter((s: any) => s.name !== seriesName)
  //         .map((s: any) => s.name)
  //     );
  //     setActiveSeries(seriesName); // Set the clicked series as active
  //   }
  // };
  const toggleAllSeries = () => {
    const areAllHidden = hiddenSeries.length === filteredSeries.length;

    if (areAllHidden) {
      // Show all
      filteredSeries.forEach((s: any) => {
        ApexCharts.exec(chartId, 'showSeries', s.name);
      });
      setHiddenSeries([]);
      // setActiveSeries(null);
    } else {
      // Hide all
      filteredSeries.forEach((s: any) => {
        ApexCharts.exec(chartId, 'hideSeries', s.name);
      });
      setHiddenSeries(filteredSeries.map((s: any) => s.name));
      // setActiveSeries(null);
    }
  };
  const visibleSeries = filteredSeries.slice(0, maxShownItems);
  const extraSeries = filteredSeries.slice(maxShownItems);
  return (
    <div aria-label={chartId} className="custom-legend-container">
      <div>
        <div className="custom-legend">
          {[...visibleSeries].map((s: any) => (
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
          {extraSeries.length > 0 && (
            <div className="custom-legend__item">
              <span className="custom-legend__item-title-toggler">
                +{extraSeries?.length}
              </span>
            </div>
          )}
        </div>
        {extraSeries?.length > 0 && (
          <div className="custom-legend__actions">
            <DropdownWrapper
              toggleBtn={<span>{getTranslatedValue('ShowAll')}</span>}
              closeButton={false}
              // leftOffset="-220px"
            >
              <CustomLegendDropdown
                toggleSeries={toggleSeries}
                toggleAllSeries={toggleAllSeries}
                filteredSeries={filteredSeries}
                hiddenSeries={hiddenSeries}
                colors={colors}
              />
            </DropdownWrapper>
          </div>
        )}
      </div>
    </div>
  );
};

const CustomLegendColumn = memo(MemoCustomLegend);

export default CustomLegendColumn;
{
  /* Toggle show only one series */
}
// <button
//   className={`show-only-btn text-sm ${
//     activeSeries === s.name ? "text-red-500" : "text-blue-500"
//   } underline`}
//   onClick={() => toggleShowOnlySeries(s.name)}
//   aria-label={`Show only ${s.name}`}
// >
//   {/* <FontAwesomeIcon icon={faEye} size="xs" /> */}
// </button>
