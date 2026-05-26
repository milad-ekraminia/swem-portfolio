export interface ActiveAlarmsTableHeaderProps {
  selectedColumnKeys: string[];
  setSelectedColumnKeys: React.Dispatch<React.SetStateAction<string[]>>;
  columnOrder: string[];
  setColumnOrder: React.Dispatch<React.SetStateAction<string[]>>;
  handleCancelAlarms: () => void;
  handleApproveAlarms: () => void;
  isCancelPending?: boolean;
  isApprovePending?: boolean;
}

export interface CommunicationTable {
  effectiveColumns: any;
}

export interface ProfileFormData {
  selectedDevices: any[];
  selectedChartTypes: any[];
  plantId: number;
  name: string;
}

export interface GraphicFormWrapperProps {
  handleDownload: any;
  isExcelDownloading: any;
  handleSubmit: any;
  register: any;
  setValue: any;
  control: any;
  errors: any;
  filterName: string;
  isSensorReport?: boolean;
  isSystemAlarm?: boolean;
  isArchive?: boolean;
  isWeatherReport?: boolean;
  isCarbonReport?: boolean;
  isPeriodicProductionConsumptions?: boolean;
  onGetReport?: VoidFunction;
  responseIsLoading: boolean;
  hasPeriodType?: boolean;
  children?: any;
}

export interface PlantSummaryTableHeaderProps {
  selectedColumnKeys: string[];
  setSelectedColumnKeys: React.Dispatch<React.SetStateAction<string[]>>;
  columnOrder: string[];
  setColumnOrder: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface TreeNodeProps {
  caption: string;
  status: number;
  organizationType: number;
  organizationTreeNodeType: number;
  deviceModelType: number;
  childList: any[];
  level?: number;
  id: number | null;
  deviceModelId?: number;
  active: boolean;
  parentTitle: string;
  type?: number;
  locationId?: number;
}
