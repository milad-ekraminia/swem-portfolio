import { SingleUserSettingSvg } from '@/assets/icons/single-user-setting-svg';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import ProductBrandModelsTable from '@/components/pages/inventory-management/product-brand-models/product-brand-models-table';

const baseBreadcrumbs: BreadcrumbItem[] = [
  { label: 'SystemAdministration' },
  {
    label: 'Menu:ProductBrandModels',
  },
];
const title = {
  label: 'Menu:ProductBrandModels',
};

export default function ProductBrandModelsIndex() {
  return (
    <div className="page-wrapper">
      <PagesHeader
        title={title}
        breadcrumbs={baseBreadcrumbs}
        icon={<SingleUserSettingSvg />}
      />
      <div className="page-wrapper__body">
        <ProductBrandModelsTable />
      </div>
    </div>
  );
}
