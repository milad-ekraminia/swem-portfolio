import { AddPlusSvg } from '@/assets/icons/add-plus-svg';
import { SettingSvg } from '@/assets/icons/setting-svg';
import { Button } from '@/components/ui/button/button';
import { DropdownWrapper } from '@/components/ui/dropdown/dropdown-wrapper/drop-down-wrapper';
import SearchInput from '@/components/ui/input/search-input';
import FilterContent from '@/components/ui/table/filter-content/filter-content';
import { organizationsTableColumns as baseColumns } from '@/enum-data/definitions/organizations-data';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { organizationsTableHeaderProps } from '@/types/pages/definitions/organizations.type';
import { memo, useState } from 'react';

const MemoTableHeader = ({
  setSelectedColumnKeys,
  selectedColumnKeys,
  columnOrder,
  setColumnOrder,
  searchInputValue,
  searchInputHandler,
  setNewItem,
  handleChangeSubOrgId,
  queryKey,
  updateHandler,
}: organizationsTableHeaderProps) => {
  const [resetCount, setResetCount] = useState(0);

  const resetFilter = () => setResetCount((prev) => prev + 1);

  const devicesTableColumns = baseColumns({
    handleChangeSubOrgId,
    queryKey,
    updateHandler,
  });

  return (
    <div className="dv-organization-table-header">
      <div className="dv-organization-table-header__title-section">
        <h3>{getTranslatedValue('DashboardMap')}</h3>
      </div>
      <div className="dv-organization-table-header__actions">
        <SearchInput
          setSearchInputValue={searchInputHandler}
          searchInputValue={searchInputValue}
        />
        <Button
          onClick={() => setNewItem(true)}
          leftIcon={<AddPlusSvg stroke="#FFFFFF" />}
        >
          {getTranslatedValue('NewLocation')}
        </Button>
        <DropdownWrapper
          title={getTranslatedValue('ColumnsList')}
          toggleBtn={
            <Button
              leftIcon={<SettingSvg fill="var(--brand-600)" />}
              variant="secondary"
            />
          }
          closeButton={true}
          // leftOffset="-280px"
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
            columns={devicesTableColumns}
          />
        </DropdownWrapper>
      </div>
    </div>
  );
};

const TableHeader = memo(MemoTableHeader);

export default TableHeader;
