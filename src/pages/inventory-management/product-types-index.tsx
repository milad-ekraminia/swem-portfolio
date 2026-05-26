import { SingleUserSettingSvg } from '@/assets/icons/single-user-setting-svg';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import ProductTypesTable from '@/components/pages/inventory-management/product-types/product-types-table';

const baseBreadcrumbs: BreadcrumbItem[] = [
  { label: 'SystemAdministration', href: '' },
  { label: 'ProductTypes', href: '' },
];
const title = {
  label: 'ProductTypes',
  href: ``,
};

export default function ProductTypesIndex() {
  return (
    <div className="page-wrapper">
      <PagesHeader
        title={title}
        breadcrumbs={baseBreadcrumbs}
        icon={<SingleUserSettingSvg />}
      />
      <div className="page-wrapper__body">
        <ProductTypesTable />
      </div>
    </div>
  );
}
