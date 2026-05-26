import { AddPlusSvg } from '@/assets/icons/add-plus-svg';
import { SearchSvg } from '@/assets/icons/search-svg';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input/Input';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { FirmWeatherDataLocationTableHeaderProps } from '@/types/pages/definitions/firmWeatherDataLocation';
import { DownloadIcon, Loader } from 'lucide-react';

export const FirmWeatherDataLocationTableHeader = ({
  searchInputHandler,
  setNewItem,
  isExcelDownloading,
  handleDownload,
}: FirmWeatherDataLocationTableHeaderProps) => {
  return (
    <div className="firm-weather-data-location-table-header">
      <span>{getTranslatedValue('FirmWeatherDataLocations')}</span>
      <div className="actions">
        <Input
          leftIcon={<SearchSvg />}
          onChange={(e) => {
            searchInputHandler(e.target.value);
          }}
          placeholder={getTranslatedValue('search')}
        />
        {setNewItem && (
          <Button
            onClick={() => setNewItem(true)}
            leftIcon={<AddPlusSvg stroke="#FFFFFF" />}
          >
            {getTranslatedValue('NewLocation')}
          </Button>
        )}
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
        {/* commented because this table just have 2 columns */}
        {/* <DropdownWrapper
          title={getTranslatedValue("ColumnsList")}
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
                {getTranslatedValue("Clear", "AbpUi.texts")}
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
            columns={accessPointsTableColumns}
          />
        </DropdownWrapper> */}
      </div>
    </div>
  );
};
