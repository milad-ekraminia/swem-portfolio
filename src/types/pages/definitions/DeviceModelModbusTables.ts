export interface DevicesModelModbusTableHeaderProps {
  selectedColumnKeys: string[];
  setSelectedColumnKeys: React.Dispatch<React.SetStateAction<string[]>>;
  columnOrder: string[];
  setColumnOrder: React.Dispatch<React.SetStateAction<string[]>>;
  searchInputHandler: (value: string) => void;
  isExcelDownloading: any;
  handleDownload: any;
}
