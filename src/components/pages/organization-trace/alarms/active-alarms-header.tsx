import { SettingSvg } from '@/assets/icons/setting-svg';
import { Button } from '@/components/ui/button/button';
import { DropdownWrapper } from '@/components/ui/dropdown/dropdown-wrapper/drop-down-wrapper';
import FilterContent from '@/components/ui/table/filter-content/filter-content';
import { activeAlarmsTableColumns as baseColumns } from '@/enum-data/organization-trace/active-alarms-table-columns';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { ActiveAlarmsTableHeaderProps } from '@/types/pages/organization-trace';
import { useState } from 'react';

export const ActiveAlarmsHeader = ({
  setSelectedColumnKeys,
  selectedColumnKeys,
  columnOrder,
  setColumnOrder,
  handleCancelAlarms,
  handleApproveAlarms,
  isCancelPending,
  isApprovePending,
  selectedRows,
}: ActiveAlarmsTableHeaderProps & { selectedRows: any }) => {
  const [resetCount, setResetCount] = useState(0);

  const resetFilter = () => setResetCount((prev) => prev + 1);
  const ActiveAlarmsTableColumns = baseColumns({
    refetch: () => { },
  });
  return (
    <div className="plant-summary-header">
      <span>{getTranslatedValue('acive alarms')}</span>
      <div className="actions">
        {selectedRows.length > 0 && (
          <>
            <Button
              variant="primary"
              onClick={handleApproveAlarms}
              disabled={isApprovePending}
            >
              {getTranslatedValue('Approve')}
            </Button>
            <Button
              variant="secondary"
              onClick={handleCancelAlarms}
              disabled={isCancelPending}
            >
              {getTranslatedValue('End')}
            </Button>
          </>
        )}
        <DropdownWrapper
          title={getTranslatedValue('ColumnsList')}
          toggleBtn={
            <Button
              leftIcon={<SettingSvg fill="var(--brand-600)" />}
              variant="secondary"
            />
          }
          closeButton={true}
          direction="left"
          bottomButtons={
            <div>
              <Button onClick={resetFilter} variant="secondary">
                {getTranslatedValue('Delete')}
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
            columns={ActiveAlarmsTableColumns}
          />
        </DropdownWrapper>
      </div>
    </div>
  );
};
