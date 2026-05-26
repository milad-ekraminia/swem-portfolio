import { SingleUserSettingSvg } from '@/assets/icons/single-user-setting-svg';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import ProductBrandsTable from '@/components/pages/inventory-management/product-brands/product-brands-table';

const baseBreadcrumbs: BreadcrumbItem[] = [
  { label: 'SystemAdministration' },
  { label: 'ProductBrands' },
];
const title = {
  label: 'ProductBrands',
  href: ``,
};

export default function ProductBrandsIndex() {
  return (
    <div className="page-wrapper">
      <PagesHeader
        title={title}
        breadcrumbs={baseBreadcrumbs}
        icon={<SingleUserSettingSvg />}
      />
      <div className="page-wrapper__body">
        <ProductBrandsTable />
      </div>
    </div>
  );
}
