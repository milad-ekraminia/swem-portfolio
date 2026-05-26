export type BreadcrumbItem = {
  label: string;
  href?: string;

  dispatchData?: {
    tree_id: number;
    title: string;
    parentTitle?: string;
    type: number;
    deviceModelType?: number;
    deviceModelId?: number;
  };
};

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  title: BreadcrumbItem;
  icon?: React.ReactNode;
}
