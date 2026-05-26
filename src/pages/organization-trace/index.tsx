import { OrgTraceHeaderSvg } from '@/assets/icons/org-trace-header-svg';
import OrgTraceHeader from '@/components/layouts/page-layout/organization-trace-header/organization-trace-header';
import { OrgTrace } from '@/components/pages/organization-trace';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';
import { useSelector } from 'react-redux';

export const OrganizationTrace = () => {
  const treeData = useSelector((state: any) => state?.tree?.info);

  const organizationName = treeData?.title ?? 'Organizasyon';
  console.log("🚀 ~ OrganizationTracesdef ~ treeData:", treeData)
  const baseBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Monitoring Measurement' },
    { label: 'Organization Trace' },
  ];

  const breadcrumbs = [...baseBreadcrumbs];

  // If we have tree data
  if (treeData?.title) {
    // If type is 0 (root organization), just show the organization name
    if (treeData.type === 0) {
      breadcrumbs.push({
        label: treeData.title,
      });
    } else {
      // For other types, show parent first, then current
      if (treeData.parentTitle) {
        breadcrumbs.push({
          label: treeData.parentTitle,
        });
      }
      breadcrumbs.push({
        label: treeData.title,
      });
    }
  }

  const title = {
    label: organizationName,
    // href: `/monitoring/organization/${organizationName
    //   .toLowerCase()
    //   .replace(/\s+/g, '-')}`,
  };

  return (
    <div className="page-wrapper">
      <OrgTraceHeader
        title={title}
        breadcrumbs={breadcrumbs}
        icon={<OrgTraceHeaderSvg />}
      />
      <OrgTrace />
    </div>
  );
};
