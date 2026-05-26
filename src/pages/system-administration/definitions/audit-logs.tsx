import { SingleUserSettingSvg } from '@/assets/icons/single-user-setting-svg';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import AuditLogsTab from '@/components/pages/system-administration/definitions/audit-logs/audit-logs';
import EntityChangesTab from '@/components/pages/system-administration/definitions/audit-logs/entity-changes';
import Tabs from '@/components/ui/tabs/tabs';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';
import { useState } from 'react';

const baseBreadcrumbs: BreadcrumbItem[] = [
  {
    label: 'SystemAdministration',
  },
  {
    label: getTranslatedValue('Menu:AuditLogging', 'AbpAuditLogging.texts'),
  },
];

const title = {
  label: getTranslatedValue('Menu:AuditLogging', 'AbpAuditLogging.texts'),
};

export default function AuditLogsIndex() {
  const [activeTab, setActiveTab] = useState<string>('auditLogs');

  return (
    <div className="page-wrapper audit-logs">
      <PagesHeader
        title={title}
        breadcrumbs={baseBreadcrumbs}
        icon={<SingleUserSettingSvg />}
      />
      <div className="page-wrapper__body">
        <Tabs
          activeTab={activeTab}
          onTabClick={(tab: string) => setActiveTab(tab)}
          tabs={[
            {
              title: getTranslatedValue(
                'Menu:AuditLogging',
                'AbpAuditLogging.texts',
              ),
              value: 'auditLogs',
            },
            {
              title: getTranslatedValue(
                'EntityChanges',
                'AbpAuditLogging.texts',
              ),
              value: 'entityChanges',
            },
          ]}
        ></Tabs>
        {activeTab === 'auditLogs' ? <AuditLogsTab /> : <EntityChangesTab />}
      </div>
    </div>
  );
}
