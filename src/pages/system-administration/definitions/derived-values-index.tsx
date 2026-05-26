import { SingleUserSettingSvg } from '@/assets/icons/single-user-setting-svg';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import DerivedValuesTable from '@/components/pages/system-administration/definitions/derived-values/table';

const baseBreadcrumbs: BreadcrumbItem[] = [
  { label: 'SystemAdministration' },
  {
    label: `${getTranslatedValue('Menu:Definitions')} - ${getTranslatedValue('Menu:DerivedValues')}`,
  },
];
const title = {
  label: `${getTranslatedValue('Menu:Definitions')} - ${getTranslatedValue('Menu:DerivedValues')}`,
  href: `/system-administation/definitions/derived-values`,
};

export default function DerivedValuesIndex() {
  return (
    <div className="page-wrapper">
      <PagesHeader
        title={title}
        breadcrumbs={baseBreadcrumbs}
        icon={<SingleUserSettingSvg />}
      />
      <div className="page-wrapper__body">
        <DerivedValuesTable />
      </div>
    </div>
  );
}
