import { SettingSvg } from '@/assets/icons/setting-svg';
import { Button } from '@/components/ui/button/button';
import { DropdownWrapper } from '@/components/ui/dropdown/dropdown-wrapper/drop-down-wrapper';
import FilterContent from '@/components/ui/table/filter-content/filter-content';
import { productionForecastTableColumns as basicColumn } from '@/enum-data/organization-trace/org-trace-index';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { PlantSummaryTableHeaderProps } from '@/types/pages/organization-trace';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export const ProductionForecastHeader = ({
  setSelectedColumnKeys,
  selectedColumnKeys,
  columnOrder,
  setColumnOrder,
}: PlantSummaryTableHeaderProps) => {
  const { period_type } = useSelector((state: any) => state.dateFilter.info);
  const [resetCount, setResetCount] = useState(0);
  const resetFilter = () => setResetCount((prev) => prev + 1);
  const productionForcastTableColumns = basicColumn(period_type);
  return (
    <div className="plant-summary-header">
      <span>{getTranslatedValue('re_plant_forecast')}</span>
      <DropdownWrapper
        title={getTranslatedValue('ColumnsList')}
        toggleBtn={
          <Button
            leftIcon={<SettingSvg fill="var(--brand-600)" />}
            variant="secondary-blue"
          />
        }
        closeButton={true}
        direction="left"
        size="semi-medium"
        bottomButtons={
          <div>
            <Button onClick={resetFilter} variant="secondary">
              {getTranslatedValue('Clear', 'AbpUi.texts')}
            </Button>
          </div>
        }
      >
        <FilterContent
          setSelectedColumnKeys={setSelectedColumnKeys}
          selectedColumnKeys={selectedColumnKeys}
          columnOrder={columnOrder}
          setColumnOrder={setColumnOrder}
          resetSignal={resetCount}
          columns={productionForcastTableColumns}
        />
      </DropdownWrapper>
    </div>
  );
};
