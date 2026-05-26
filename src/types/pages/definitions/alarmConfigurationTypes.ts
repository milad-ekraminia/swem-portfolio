export interface AlarmConfigurationTableHeaderProps {
  selectedColumnKeys: string[];
  setSelectedColumnKeys: React.Dispatch<React.SetStateAction<string[]>>;
  columnOrder: string[];
  setColumnOrder: React.Dispatch<React.SetStateAction<string[]>>;
  searchInputHandler: (value: string) => void;
  setNewItem: (value: boolean) => void;
  isExcelDownloading: any;
  handleDownload: any;
}
