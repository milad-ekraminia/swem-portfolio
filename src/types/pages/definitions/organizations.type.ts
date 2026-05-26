export type organizationsDataParamsProps = {
  OrganizationParentId: number;
  'api-version': string;
  maxResultCount: number;
  skipCount: number;
  sorting?: string;
  filterText?: string;
};

export type BreadCrumbInfoProps = {
  label: string;
  id: number;
  isGray?: boolean;
};

export type organizationsTableProps = {
  ng: number;
  re: number;
  activeTab: string;
  setNewItem: (item: any) => void;
};

export type organizationsTableHeaderProps = {
  breadCrumbInfo: {
    label: string;
    id: number;
  }[];
  handleClick: (item: any) => void;
  selectedColumnKeys: string[];
  setSelectedColumnKeys: React.Dispatch<React.SetStateAction<string[]>>;
  columnOrder: string[];
  setColumnOrder: React.Dispatch<React.SetStateAction<string[]>>;
  searchInputValue: string;
  searchInputHandler: (value: string) => void;
  setNewItem: (value: boolean) => void;
  handleChangeSubOrgId: (name: string, id: number) => void;
  queryKey: string;
  updateHandler: (item: any) => void;
};

export type organizationsBreadcrumbProps = {
  items: {
    label: string;
    id: number;
  }[];
  handleClick: (item: any) => void;
};
