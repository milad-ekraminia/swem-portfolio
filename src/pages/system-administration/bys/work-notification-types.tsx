import { SingleUserSettingSvg } from '@/assets/icons/single-user-setting-svg';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import { WorkNotificationTypesTable } from '@/components/pages/system-administration/bys/work-notification-types/table';

const WorkNotificationTypes = () => {
  const baseBreadcrumbs: BreadcrumbItem[] = [
    {
      label: 'SystemAdministration',
    },
    {
      label: 'Menu:MaintenanceAndRepair',
    },
    {
      label: 'Menu:WorkNotificationTypes',
    },
  ];
  const title = {
    label: `${getTranslatedValue(
      'Menu:MaintenanceAndRepair',
    )} - ${getTranslatedValue('Menu:WorkNotificationTypes')}`,
    href: ``,
  };
  return (
    <div className="page-wrapper bys-work-notifications">
      <PagesHeader
        title={title}
        breadcrumbs={baseBreadcrumbs}
        icon={<SingleUserSettingSvg stroke="#323232" />}
      />
      <div className="page-wrapper__body">
        <WorkNotificationTypesTable />
      </div>
    </div>
  );
};

export default WorkNotificationTypes;
