import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';

export interface PagesHeaderProps {
  title: BreadcrumbItem;
  breadcrumbs: BreadcrumbItem[];
  icon?: React.ReactNode;
}
