import { FilesSvg } from '@/assets/icons/files-svg';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import MonthlyDemandReportsTable from '@/components/pages/reports/monthly-demand/table';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';

const baseBreadcrumbs: BreadcrumbItem[] = [
  {
    label: 'Menu:Reports',
  },
  { label: 'em_report_elec_demand_monthly_bread_crumb_header' },
];

const title = {
  label: 'em_report_elec_demand_monthly_bread_crumb_header',
  href: '/reports/tag-reports',
};

export default function MonthlyDemandReports() {
  return (
    <div className="page-wrapper">
      <PagesHeader
        title={title}
        breadcrumbs={baseBreadcrumbs}
        icon={<FilesSvg />}
      />
      <div className="page-wrapper__body">
        <MonthlyDemandReportsTable />
      </div>
    </div>
  );
}
