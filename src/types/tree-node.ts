export interface TreeNodeProps {
  caption: string;
  status: number;
  organizationType: number;
  organizationTreeNodeType: number;
  deviceModelType: number;
  childList: any[];
  level?: number;
  id: number | null;
  coordinateInformation: string | null;
  locationId: number | null;
  deviceModelId?: number;
  active: boolean;
  parentTitle: string;
}

export interface filterSelectedDataTypes {
  id: number;
  caption: string;
  organizationTreeNodeType: number;
}

export interface FilterProfileTreeNodeProps {
  caption: string;
  childList: any[];
  level?: number;
  id: number;
  organizationTreeNodeType: number;
  isAllExpanded: boolean;
  onSelect: (data: filterSelectedDataTypes[]) => void;
  selectedItems: filterSelectedDataTypes[];
  setSelectedItems: any;
}
