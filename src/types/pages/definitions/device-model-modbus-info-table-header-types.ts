export interface DevicesModelModbusInfoTableHeaderTypes {
  selectedColumnKeys: string[];
  setSelectedColumnKeys: React.Dispatch<React.SetStateAction<string[]>>;
  columnOrder: string[];
  setColumnOrder: React.Dispatch<React.SetStateAction<string[]>>;
  searchInputHandler: (value: string) => void;
  setNewItem: (value: boolean) => void;
  handleDownload: any;
  onBack: any;
  setShowUploadExcel: (value: boolean) => void;
}
