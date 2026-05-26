import { AddPlusSvg } from '@/assets/icons/add-plus-svg';
import { FunnelSvg } from '@/assets/icons/funnel-svg';
import { GridSvg } from '@/assets/icons/grid-svg';
import { ListSvg } from '@/assets/icons/list-svg';
import { SettingSvg } from '@/assets/icons/setting-svg';
import { Button } from '@/components/ui/button/button';
import { DropdownWrapper } from '@/components/ui/dropdown/dropdown-wrapper/drop-down-wrapper';
import SearchInput from '@/components/ui/input/search-input';
import FilterContent from '@/components/ui/table/filter-content/filter-content';
import { wareHousesTableColumns } from '@/enum-data/inventory-management/warehouses-data';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { WareHousesTableHeaderProps } from '@/types/pages/inventory-management/warehouses';
import { DownloadIcon, Loader } from 'lucide-react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const WareHousesTableHeader = ({
  setSelectedColumnKeys,
  selectedColumnKeys,
  columnOrder,
  setColumnOrder,
  searchInputValue,
  searchInputHandler,
  setNewItem,
  isExcelDownloading,
  handleDownload,
  setIsTable,
  setShowEditModal,
  isTable,
}: WareHousesTableHeaderProps) => {
  const [searchParams] = useSearchParams();
  const paramsObject = Object.fromEntries(searchParams.entries());

  const [resetCount, setResetCount] = useState(0);

  const resetFilter = () => setResetCount((prev) => prev + 1);

  const devicesTableColumns = wareHousesTableColumns();

  return (
    <div className="dv-organization-table-header">
      <div className="dv-organization-table-header__title-section">
        <h3>{getTranslatedValue('Warehouses')}</h3>
      </div>
      <div className="dv-organization-table-header__actions">
        <Button
          variant="secondary-blue"
          onClick={() => setIsTable(paramsObject?.table ? false : true)}
          leftIcon={
            paramsObject?.table ? (
              <GridSvg width="20" stroke="var(--brand-600)" />
            ) : (
              <ListSvg width="20" stroke="var(--brand-600)" />
            )
          }
          className="change-view-style-btn"
        >
          {getTranslatedValue('ChangeViewStyle')}
        </Button>
        <SearchInput
          setSearchInputValue={searchInputHandler}
          searchInputValue={searchInputValue}
        />
        {setNewItem &&
          <Button
            onClick={() => setNewItem(true)}
            leftIcon={<AddPlusSvg stroke="#FFFFFF" />}
          >
            {getTranslatedValue('NewWarehouse')}
          </Button>
        }
        {
          setShowEditModal &&
          <Button
            variant="secondary"
            onClick={() => setShowEditModal(true)}
            disabled={isExcelDownloading}
          >
            <FunnelSvg />
          </Button>
        }
        {
          handleDownload &&
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
        }
        {isTable && (
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
              columns={devicesTableColumns}
            />
          </DropdownWrapper>
        )}
      </div>
    </div>
  );
};
