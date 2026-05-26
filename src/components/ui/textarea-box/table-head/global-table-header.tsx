import { useState } from 'react';
import { AddPlusSvg } from '@/assets/icons/add-plus-svg';
import { SearchSvg } from '@/assets/icons/search-svg';
import { SettingSvg } from '@/assets/icons/setting-svg';
import { getCookie } from '@/helpers/cookies';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import {
  ArrowLeft,
  ArrowRight,
  DownloadIcon,
  Funnel,
  Loader,
} from 'lucide-react';
import { Button } from '@/components/ui/button/button';
import { DropdownWrapper } from '@/components/ui/dropdown/dropdown-wrapper/drop-down-wrapper';
import { Input } from '@/components/ui/input/Input';
import FilterContent from '@/components/ui/table/filter-content/filter-content';

interface GlobalTableHeaderProps {
  selectedColumnKeys: string[];
  setSelectedColumnKeys: React.Dispatch<React.SetStateAction<string[]>>;
  columnOrder: string[];
  setColumnOrder: React.Dispatch<React.SetStateAction<string[]>>;
  searchInputHandler?: (value: string) => void;
  setNewItem?: (value: boolean) => void;
  isExcelDownloading?: any;
  handleDownload?: any;
  label: string;
  newButtonLabel?: string;
  hasFilterTable?: boolean;
  hasFilterModal?: boolean;
  tableColumns: any;
  onBack?: () => void;
  openFilterModal?: () => void;
}

export const GlobalTableHeader = ({
  setSelectedColumnKeys,
  selectedColumnKeys,
  columnOrder,
  setColumnOrder,
  searchInputHandler,
  setNewItem,
  isExcelDownloading = false,
  handleDownload,
  label,
  newButtonLabel,
  openFilterModal,
  hasFilterTable = true,
  tableColumns,
  hasFilterModal,
  onBack,
}: GlobalTableHeaderProps) => {
  const [resetCount, setResetCount] = useState(0);
  const isRTL = getCookie('CultureName') === 'fa';

  const resetFilter = () => setResetCount((prev) => prev + 1);

  return (
    <div className="table-header">
      {onBack && (
        <button onClick={onBack}>
          {isRTL ? (
            <ArrowRight stroke="#344054" width={20} height={20} />
          ) : (
            <ArrowLeft stroke="#344054" width={20} height={20} />
          )}
        </button>
      )}
      <span>{getTranslatedValue(label)}</span>
      <div className="actions">
        {searchInputHandler && (
          <Input
            leftIcon={<SearchSvg />}
            onChange={(e) => {
              searchInputHandler?.(e.target.value);
            }}
            placeholder={getTranslatedValue('search')}
          />
        )}
        {setNewItem && newButtonLabel && (
          <Button
            onClick={() => setNewItem(true)}
            leftIcon={<AddPlusSvg stroke="#FFFFFF" />}
          >
            {getTranslatedValue(newButtonLabel)}
          </Button>
        )}

        {hasFilterModal && (
          <Button
            variant="secondary"
            onClick={openFilterModal}
            disabled={isExcelDownloading}
          >
            <Funnel size={19} stroke="#344054" />
          </Button>
        )}
        {handleDownload && (
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
        )}

        {hasFilterTable && (
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
              columns={tableColumns}
            />
          </DropdownWrapper>
        )}
      </div>
    </div>
  );
};
