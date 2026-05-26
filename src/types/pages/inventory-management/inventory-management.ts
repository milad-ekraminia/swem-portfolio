export type toolBarProps = {
  title: string;
  newButton?: string;
  changeViewButton?: string;
  setTableShow?: (data: boolean) => void;
  tableShow?: boolean;
  showConvertMode?: boolean;
  downloadExcelHandler?: () => void;
  downloadTemplateHandler?: () => void;
  backButton?: () => void;
  setNewItemHandler?: (data: boolean) => void;
  isExcelLoading?: boolean;
  description?: string;
  descriptionTitle?: string;
  breadcrumbs?: { name: string; link?: string; isGray?: boolean }[];
};

export type customToolBarProps = toolBarProps & {
  setSearchInputValue?: (value: string) => void; // Overriding this property to make it required
  setShowImportModal?: (data: boolean) => void;
  filterMode?: string;
  setFilterMode?: (data: string) => void;
  bysFilterMode?: boolean;
  setBysFilterMode?: (data: boolean) => void;
  setShowDeleteModalForSelected?: (data: any) => void;
  selectedIds?: any;
  showBreadCrumb?: any;
  usersFilterMode?: boolean;
  setUsersFilterMode?: (data: boolean) => void;
  handlePrevOrgOnBreadcrumbs?: any;
};

export type exportFilterProps = {
  address: null;
  coordinate: null;
  downloadToken: null;
  filterText: string | null;
  isDiscard: boolean | null;
  isPlant: null;
  name: null;
  organizationIdMax: null;
  organizationIdMin: null;
  status: boolean | null; // Use the boolean | null type
  warehouseId: null;
};

export type newInventoryInitialValues = {
  productId: number;
  amount: number;
  warehouseId: number;
  inUse: boolean;
  serialNumber: string;
  guaranteeStart?: string;
  guaranteeEnd?: string;
  description?: string;
};

export type warehouseInitialValuesTypes = {
  warehouseId?: number;
  status: boolean;
  name: string;
  coordinate?: string;
  address: string;
  isDiscard?: boolean;
};

export type updateWarehouseInitialValuesTypes = {
  status: boolean;
  name: string;
  coordinate?: string;
  address: string;
  isDiscard?: boolean;
  warehouseId?: number;
  id?: number;
};

export type StockChangesProps = {
  searchedValue: string;
};

export type addConsumableInitialValuesProps = {
  productId: number;
  amount?: number;
  inventoryId: number;
  description?: string;
};

export type newProductInitialValues = {
  productName: string;
  barcodeNumber: string;
  currentStockAmount?: number;
  purchaseNumber?: number | null;
  status?: boolean;
  isConsumable?: boolean;
  stockNumber?: string;
  productBrandId: number;
  productBrandModelId: number;
  productManufacturerId: number;
  productTypeId: number;
};

export type updateProductInitialValues = {
  productId: number;
  productName: string;
  barcodeNumber: string;
  currentStockAmount?: number;
  purchaseNumber?: number | null;
  status?: boolean;
  isConsumable?: boolean;
  stockNumber?: string;
  productBrandId: number;
  productBrandModelId: number;
  productManufacturerId: number;
  productTypeId: number;
};

export type newProductTypeInitialValues = {
  name: string;
  description: string;
  productUnitId: number;
};

export type updateProductTypeInitialValues = {
  productTypeId: number;
  name: string;
  description: string;
  productUnitId: number;
};
