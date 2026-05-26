import { FilesSvg } from '@/assets/icons/files-svg';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import TagReportsTable from '@/components/pages/reports/tag-reports/table';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';

const baseBreadcrumbs: BreadcrumbItem[] = [
  {
    label: 'Menu:Reports',
  },
  { label: 'TagReport' },
];

const title = {
  label: 'TagReport',
  href: '/reports/tag-reports',
};

export default function TagReportsIndex() {
  return (
    <div className="page-wrapper">
      <PagesHeader
        title={title}
        breadcrumbs={baseBreadcrumbs}
        icon={<FilesSvg />}
      />
      <div className="page-wrapper__body">
        <TagReportsTable />
      </div>
    </div>
  );
}
