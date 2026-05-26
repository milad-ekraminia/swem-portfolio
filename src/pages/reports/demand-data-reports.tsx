import { FilesSvg } from '@/assets/icons/files-svg';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import DemandDataReportsTable from '@/components/pages/reports/demand-data/table';

const baseBreadcrumbs: BreadcrumbItem[] = [
  {
    label: 'Menu:Reports',
  },
  {
    label: 'mnuEMReportElecDemand',
  },
];

const title = {
  label: 'mnuEMReportElecDemand',
};

export default function DemandDataReports() {
  return (
    <div className="page-wrapper">
      <PagesHeader
        title={title}
        breadcrumbs={baseBreadcrumbs}
        icon={<FilesSvg />}
      />
      <div className="page-wrapper__body">
        <DemandDataReportsTable />
      </div>
    </div>
  );
}
