export interface SidebarProps {
  resources: any;
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface NavItem {
  Icon: React.ComponentType<any>;
  id: string | number;
  route?: string;
  title: string;
  children?: NavItem[];
  permission?: string;
  target?: string;
  isMain?: boolean;
}

export interface SidebarState {
  showSubItems: number;
  showSubItem: any;
  showSidebar: boolean;
  isTogglingButton: boolean;
}

