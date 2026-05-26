export interface WareHousesStockChangesTableHeaderProps {
  searchInputHandler: (value: string) => void;
  isExcelDownloading: any;
  handleDownload: any;
  selectedColumnKeys: string[];
  setSelectedColumnKeys: React.Dispatch<React.SetStateAction<string[]>>;
  columnOrder: string[];
  setColumnOrder: React.Dispatch<React.SetStateAction<string[]>>;
  searchInputValue: string;
  label?: string;
}

export type warehouseInitialValuesTypes = {
  warehouseId?: number;
  status: boolean;
  name: string;
  coordinate?: string;
  address: string;
  isDiscard?: boolean;
};
