import { useMemo, useState } from 'react';
import { SettingSvg } from '@/assets/icons/setting-svg';
import { communicationTableColumns as baseColumns } from '@/enum-data/organization-trace/org-trace-index';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { Button } from '@/components/ui/button/button';
import { DropdownWrapper } from '@/components/ui/dropdown/dropdown-wrapper/drop-down-wrapper';
import FilterContent from '@/components/ui/table/filter-content/filter-content';
import { CommunicationInfoChart } from './communication-info-chart';
import { CommunicationInfoTable } from './communication-info-table';

export const CommunicationInfo = () => {
  // Memoize the static columns
  const memoizedColumns = useMemo(() => baseColumns(), []);

  const [columnOrder, setColumnOrder] = useState<string[]>(
    memoizedColumns.map((col) => col.accessorKey),
  );
  const [selectedColumnKeys, setSelectedColumnKeys] = useState<string[]>(
    memoizedColumns.map((col) => col.accessorKey),
  );
  const [resetCount, setResetCount] = useState(0);

  const resetFilter = () => setResetCount((prev) => prev + 1);

  // Memoize filtered columns for performance
  const effectiveColumns = useMemo(() => {
    return columnOrder
      .filter((accessorKey) => selectedColumnKeys.includes(accessorKey))
      .map((accessorKey) =>
        memoizedColumns.find((col) => col.accessorKey === accessorKey),
      )
      .filter(Boolean) as any;
  }, [columnOrder, selectedColumnKeys, memoizedColumns]);

  return (
    <div className="communication-info">
      <div className="communication-info__header">
        <h4>{getTranslatedValue('DeviceCommunicationStatusChart')}</h4>
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
            columns={memoizedColumns}
          />
        </DropdownWrapper>
      </div>
      <div className="communication-info__body">
        <CommunicationInfoTable effectiveColumns={effectiveColumns} />
        <CommunicationInfoChart />
      </div>
    </div>
  );
};
