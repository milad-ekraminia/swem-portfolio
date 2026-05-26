import { SotwareVersionsSvg } from '@/assets/icons/software-versions';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import SoftwareVersionsTable from '@/components/pages/software-versions/software-versions-table';

const baseBreadcrumbs: BreadcrumbItem[] = [{ label: 'SoftwareVersions' }];
const title = {
  label: 'SoftwareVersions',
};

export default function SoftwareVersions() {
  return (
    <div className="page-wrapper">
      <PagesHeader
        title={title}
        breadcrumbs={baseBreadcrumbs}
        icon={<SotwareVersionsSvg />}
      />
      <div className="page-wrapper__body software-versions">
        <SoftwareVersionsTable />
      </div>
    </div>
  );
}
