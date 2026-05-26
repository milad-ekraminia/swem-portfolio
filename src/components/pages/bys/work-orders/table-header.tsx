import { AddPlusSvg } from '@/assets/icons/add-plus-svg';
import { FunnelSvg } from '@/assets/icons/funnel-svg';
import { SettingSvg } from '@/assets/icons/setting-svg';
import { Button } from '@/components/ui/button/button';
import { DropdownWrapper } from '@/components/ui/dropdown/dropdown-wrapper/drop-down-wrapper';
import SearchInput from '@/components/ui/input/search-input';
import FilterContent from '@/components/ui/table/filter-content/filter-content';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { DownloadIcon, Loader } from 'lucide-react';
import { useState } from 'react';

export const BysWorkOrdersTableHeader = ({
  setSelectedColumnKeys,
  selectedColumnKeys,
  columnOrder,
  setColumnOrder,
  searchInputValue,
  searchInputHandler,
  setNewItem,
  isExcelDownloading,
  handleDownload,
  setShowFunnelModal,
  tableColumns,
  // setIsTable,
  label,
  newButtonLabel,
}: any) => {
  // const [searchParams] = useSearchParams();
  // const paramsObject = Object.fromEntries(searchParams.entries());

  const [resetCount, setResetCount] = useState(0);

  const resetFilter = () => setResetCount((prev) => prev + 1);

  return (
    <div className="dv-organization-table-header">
      <div className="dv-organization-table-header__title-section">
        <h3>{label}</h3>
      </div>
      <div className="dv-organization-table-header__actions">
        <SearchInput
          setSearchInputValue={searchInputHandler}
          searchInputValue={searchInputValue}
        />
        {setNewItem && <Button
          onClick={() => setNewItem(true)}
          leftIcon={<AddPlusSvg stroke="#FFFFFF" />}
        >
          {newButtonLabel}
        </Button>}
        <Button
          onClick={() => setShowFunnelModal(true)}
          variant="secondary"
          disabled={isExcelDownloading}
        >
          <FunnelSvg />
        </Button>
        <Button
          variant="secondary"
          onClick={handleDownload}
          disabled={isExcelDownloading}
        >
          {isExcelDownloading ? (
            <Loader className="animate-spin" stroke="#344054" />
          ) : (
            <DownloadIcon stroke="#344054" width={20} height={20} />
          )}
        </Button>

        <DropdownWrapper
          title={getTranslatedValue('ColumnsList')}
          toggleBtn={
            <Button
              leftIcon={<SettingSvg fill="var(--brand-600)" />}
              variant="secondary"
            />
          }
          size="medium"
          closeButton={true}
          // leftOffset="-280px"
          direction="left"
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
            columns={tableColumns}
          />
        </DropdownWrapper>
      </div>
    </div>
  );
};
