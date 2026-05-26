import { SingleUserSettingSvg } from '@/assets/icons/single-user-setting-svg';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import ProductUnitsTable from '@/components/pages/inventory-management/product-units/product-units-table';

const baseBreadcrumbs: BreadcrumbItem[] = [
  { label: 'SystemAdministration', href: '' },
  { label: 'ProductUnits', href: '' },
];
const title = {
  label: 'ProductUnits',
  href: ``,
};

export default function ProductUnitsIndex() {
  return (
    <div className="page-wrapper">
      <PagesHeader
        title={title}
        breadcrumbs={baseBreadcrumbs}
        icon={<SingleUserSettingSvg />}
      />
      <div className="page-wrapper__body">
        <ProductUnitsTable />
      </div>
    </div>
  );
}
