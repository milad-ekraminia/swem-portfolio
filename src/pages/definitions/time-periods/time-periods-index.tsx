import { SingleUserSettingSvg } from '@/assets/icons/single-user-setting-svg';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import TimePeriodsTable from '@/components/pages/definitions/time-periods/time-periods-table';

const baseBreadcrumbs: BreadcrumbItem[] = [
  {
    label: 'SystemAdministration',
  },
  {
    label: 'Menu:Definitions',
  },
  { label: 'Menu:TimePeriods' },
];

const title = {
  label: `${
    getTranslatedValue('Menu:Definitions') +
    ' - ' +
    getTranslatedValue('Menu:TimePeriods')
  }`,
  href: ``,
};

export default function TimePeriodsIndex() {
  return (
    <div className="page-wrapper">
      <PagesHeader
        title={title}
        breadcrumbs={baseBreadcrumbs}
        icon={<SingleUserSettingSvg />}
      />
      <div className="page-wrapper__body">
        <TimePeriodsTable />
      </div>
    </div>
  );
}
