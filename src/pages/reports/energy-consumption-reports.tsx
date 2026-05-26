import { FilesSvg } from '@/assets/icons/files-svg';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import EnergyConsumptionReportsTable from '@/components/pages/reports/energy-consumption/table';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';

const baseBreadcrumbs: BreadcrumbItem[] = [
  {
    label: 'Menu:Reports',
  },
  { label: 'em_report_energy_consumption_no_period' },
];

const title = {
  label: 'em_report_energy_consumption_no_period',
};

export default function EnergyConsumptionReports() {
  return (
    <div className="page-wrapper">
      <PagesHeader
        title={title}
        breadcrumbs={baseBreadcrumbs}
        icon={<FilesSvg />}
      />
      <div className="page-wrapper__body">
        <EnergyConsumptionReportsTable />
      </div>
    </div>
  );
}
