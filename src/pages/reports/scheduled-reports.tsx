import { FilesSvg } from '@/assets/icons/files-svg';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import ScheduledReportsTable from '@/components/pages/reports/scheduled/table';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';

const baseBreadcrumbs: BreadcrumbItem[] = [
  {
    label: 'Menu:Reports',
  },
  { label: 'mnuEMScheduledReport' },
];

const title = {
  label: 'mnuEMScheduledReport',
};

export default function ScheduledReportsIndex() {
  return (
    <div className="page-wrapper">
      <PagesHeader
        title={title}
        breadcrumbs={baseBreadcrumbs}
        icon={<FilesSvg />}
      />
      <div className="page-wrapper__body">
        <ScheduledReportsTable />
      </div>
    </div>
  );
}
