import { AlarmsPageSvg } from '@/assets/icons/alars-page-svg';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';
import OrgTraceHeader from '@/components/layouts/page-layout/organization-trace-header/organization-trace-header';
import { AlarmsPageContent } from '@/components/pages/organization-trace/alarms/alarms-page-content';

export const AlarmsPage = () => {
  const baseBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Monitoring Measurement' },
    { label: 'Alarms' },
  ];

  // Conditionally insert Atolla
  const breadcrumbs = [...baseBreadcrumbs];

  const title = {
    label: 'Alarms',
  };

  return (
    <div className="page-wrapper">
      <OrgTraceHeader
        title={title}
        breadcrumbs={breadcrumbs}
        icon={<AlarmsPageSvg />}
      />
      <AlarmsPageContent />
    </div>
  );
};
