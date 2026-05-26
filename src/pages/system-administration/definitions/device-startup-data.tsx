import { SingleUserSettingSvg } from '@/assets/icons/single-user-setting-svg';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import DeviceStartupDataTable from '@/components/pages/system-administration/definitions/device-startup-data/table';

const baseBreadcrumbs: BreadcrumbItem[] = [
  { label: 'SystemAdministration' },
  {
    label: `${getTranslatedValue('Menu:Definitions')} - ${getTranslatedValue('DeviceStartupData')}`,
  },
];
const title = {
  label: `${getTranslatedValue('Menu:Definitions')} - ${getTranslatedValue('DeviceStartupData')}`,
};

export default function DeviceStartupDataIndex() {
  return (
    <div className="page-wrapper">
      <PagesHeader
        title={title}
        breadcrumbs={baseBreadcrumbs}
        icon={<SingleUserSettingSvg />}
      />
      <div className="page-wrapper__body">
        <DeviceStartupDataTable />
      </div>
    </div>
  );
}
