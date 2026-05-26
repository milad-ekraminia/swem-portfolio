export interface WareHousesTableHeaderProps {
  searchInputHandler: (value: string) => void;
  setNewItem: (value: boolean) => void;
  isExcelDownloading: any;
  handleDownload: any;
  setIsTable: any;
  breadCrumbInfo?: {
    label: string;
    id: number;
  }[];
  selectedColumnKeys: string[];
  setSelectedColumnKeys: React.Dispatch<React.SetStateAction<string[]>>;
  columnOrder: string[];
  setColumnOrder: React.Dispatch<React.SetStateAction<string[]>>;
  searchInputValue: string;
  queryKey: string;
  handleClick?: (item: any) => void;
  setShowEditModal: any;
  isTable?: boolean;
}

export type warehouseInitialValuesTypes = {
  warehouseId?: number;
  status: boolean;
  name: string;
  coordinate?: string;
  address: string;
  isDiscard?: boolean;
};
