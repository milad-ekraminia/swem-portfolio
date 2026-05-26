import { SingleUserSettingSvg } from '@/assets/icons/single-user-setting-svg';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import MimicElementsTable from '@/components/pages/system-administration/definitions/mimic-elements/table';

const baseBreadcrumbs: BreadcrumbItem[] = [
  { label: 'SystemAdministration' },
  {
    label: `${getTranslatedValue('Menu:Definitions')} - ${getTranslatedValue('Menu:MimicElements')}`,
  },
];
const title = {
  label: `${getTranslatedValue('Menu:Definitions')} - ${getTranslatedValue('Menu:MimicElements')}`,
};

export default function MimicElementsIndex() {
  return (
    <div className="page-wrapper">
      <PagesHeader
        title={title}
        breadcrumbs={baseBreadcrumbs}
        icon={<SingleUserSettingSvg />}
      />
      <div className="page-wrapper__body">
        <MimicElementsTable />
      </div>
    </div>
  );
}
