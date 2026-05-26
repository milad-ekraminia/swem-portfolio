import { SettingSvg } from '@/assets/icons/setting-svg';
import { Button } from '@/components/ui/button/button';
import { DropdownWrapper } from '@/components/ui/dropdown/dropdown-wrapper/drop-down-wrapper';
import SearchInput from '@/components/ui/input/search-input';
import FilterContent from '@/components/ui/table/filter-content/filter-content';
import { stockChangeTableColumns } from '@/enum-data/inventory-management/warehouses-stock-change-data';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { getCookie } from '@/helpers/cookies';
import { WareHousesStockChangesTableHeaderProps } from '@/types/pages/inventory-management/warehouses-stock-changes';
import { ArrowLeft, ArrowRight, DownloadIcon, Loader } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const StockChangeTableHeader = ({
  setSelectedColumnKeys,
  selectedColumnKeys,
  columnOrder,
  setColumnOrder,
  searchInputValue,
  searchInputHandler,
  isExcelDownloading,
  handleDownload,
  label,
}: WareHousesStockChangesTableHeaderProps) => {
  // const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isRTL = getCookie('CultureName') === 'fa';

  // const paramsObject = Object.fromEntries(searchParams.entries());

  const [resetCount, setResetCount] = useState(0);

  const resetFilter = () => setResetCount((prev) => prev + 1);

  const stockChangeColumns = stockChangeTableColumns();

  return (
    <div className="dv-organization-table-header">
      <div className="dv-organization-table-header__title-section title-section">
        <button type="button" onClick={() => navigate(-1)}>
          {isRTL ? <ArrowRight /> : <ArrowLeft />}
        </button>
        <h3>{`"${label}" Stok Değişiklikleri`}</h3>
      </div>
      <div className="dv-organization-table-header__actions">
        <SearchInput
          setSearchInputValue={searchInputHandler}
          searchInputValue={searchInputValue}
        />

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
            columns={stockChangeColumns}
          />
        </DropdownWrapper>
      </div>
    </div>
  );
};
