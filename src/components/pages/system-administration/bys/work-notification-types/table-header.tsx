import { AddPlusSvg } from '@/assets/icons/add-plus-svg';
import { Button } from '@/components/ui/button/button';
import SearchInput from '@/components/ui/input/search-input';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { DownloadIcon, Loader } from 'lucide-react';

export const WorkNotificationTypesTableHeader = ({
  searchInputValue,
  searchInputHandler,
  setNewItem,
  isExcelDownloading,
  handleDownload,
}: {
  searchInputValue: any;
  searchInputHandler: any;
  setNewItem: any;
  isExcelDownloading: any;
  handleDownload: any;
}) => {
  return (
    <div className="dv-organization-table-header">
      <div className="dv-organization-table-header__title-section">
        <h3>{getTranslatedValue('WorkNotificationTypes')}</h3>
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
          {getTranslatedValue('NewWorkNotificationType')}
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
      </div>
    </div>
  );
};
