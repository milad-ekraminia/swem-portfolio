import { SingleUserSettingSvg } from '@/assets/icons/single-user-setting-svg';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import ProductManufacturersTable from '@/components/pages/inventory-management/product-manufacturers/product-manufacturers-table';

const baseBreadcrumbs: BreadcrumbItem[] = [
  { label: 'SystemAdministration', href: '' },
  {
    label: 'Menu:ProductManufacturers',
    href: '',
  },
];
const title = {
  label: 'Menu:ProductManufacturers',
  href: ``,
};

export default function ProductManufacturersIndex() {
  return (
    <div className="page-wrapper">
      <PagesHeader
        title={title}
        breadcrumbs={baseBreadcrumbs}
        icon={<SingleUserSettingSvg />}
      />
      <div className="page-wrapper__body">
        <ProductManufacturersTable />
      </div>
    </div>
  );
}
