import { SingleUserSettingSvg } from '@/assets/icons/single-user-setting-svg';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import MimicProfilesTable from '@/components/pages/system-administration/scada/mimc-profiles/table';

const baseBreadcrumbs: BreadcrumbItem[] = [
  { label: 'SystemAdministration' },
  {
    label: `${getTranslatedValue('Menu:Definitions')} - ${getTranslatedValue(
      'Menu:MimicProfiles',
    )}`,
  },
];
const title = {
  label: getTranslatedValue('Menu:MimicProfiles'),
  href: `/system-administration/scada/mimic-profiles`,
};

export default function MimicProfilesIndex() {
  return (
    <div className="page-wrapper">
      <PagesHeader
        title={title}
        breadcrumbs={baseBreadcrumbs}
        icon={<SingleUserSettingSvg />}
      />
      <div className="page-wrapper__body">
        <MimicProfilesTable />
      </div>
    </div>
  );
}
